import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Stack.css';

// ponytail: Removed drag logic entirely. YAGNI. Minimum that works: pure click.
export default function Stack({
  randomRotation = false,
  cards = [],
  animationConfig = { stiffness: 260, damping: 20 },
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  onActiveCardChange = null
}) {
  const [isPaused, setIsPaused] = useState(false);

  const [stack, setStack] = useState(() => {
    if (cards.length) {
      return cards.map((content, index) => ({ id: index + 1, content }));
    }
    return [];
  });

  useEffect(() => {
    if (cards.length) {
      const newStack = cards.map((content, index) => ({ id: index + 1, content }));
      setStack(newStack);
      
      if (onActiveCardChange && newStack.length > 0) {
        const topCardIndex = newStack.length - 1;
        onActiveCardChange(topCardIndex);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  const sendToBack = (id) => {
    setStack(prev => {
      const newStack = [...prev];
      const cardIndex = newStack.findIndex(card => card.id === id);
      
      if (cardIndex === -1) {
        return prev;
      }
      
      const [card] = newStack.splice(cardIndex, 1);
      newStack.unshift(card);
      
      if (onActiveCardChange && newStack.length > 0) {
        const topCard = newStack[newStack.length - 1];
        const activeCardIndex = topCard.id - 1;
        onActiveCardChange(activeCardIndex);
      }
      
      return newStack;
    });
  };

  useEffect(() => {
    if (autoplay && stack.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        const topCardId = stack[stack.length - 1].id;
        sendToBack(topCardId);
      }, autoplayDelay);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayDelay, stack, isPaused]);

  return (
    <div
      className="stack-container"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {stack.map((card, index) => {
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;
        
        return (
          <div key={card.id} style={{ position: 'absolute', width: '100%', height: '100%' }}>
            <motion.div
              className="card"
              onClick={() => sendToBack(card.id)}
              animate={{
                rotateZ: (stack.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - stack.length * 0.06,
                transformOrigin: '90% 90%'
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping
              }}
            >
              {card.content}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
