import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './GridMotion.css';

const GridMotion = ({
  items = [],
  gradientColor = '#e74c3c',
}) => {
  const rowRefs = useRef([]);
  const mouseXRef = useRef(window.innerWidth / 2);
  const wrapperRef = useRef(null);

  const cols = 4;
  const rows = 4;
  const totalItems = cols * rows;

  const filledItems = Array.from({ length: totalItems }, (_, i) => items[i] ?? `Item ${i + 1}`);
  const gridRows = Array.from({ length: rows }, (_, r) =>
    filledItems.slice(r * cols, r * cols + cols)
  );

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (e) => {
      const rect = wrapperRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseXRef.current = e.clientX - rect.left;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const updateRows = () => {
      const centerX = (wrapperRef.current?.offsetWidth ?? window.innerWidth) / 2;
      const maxShift = 80;

      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const direction = i % 2 === 0 ? 1 : -1;
        const normalized = (mouseXRef.current - centerX) / centerX;
        const shift = direction * normalized * maxShift;
        gsap.to(row, {
          x: shift,
          duration: 1.4,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      });
    };

    gsap.ticker.add(updateRows);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(updateRows);
    };
  }, []);

  return (
    <div className="gm-wrapper" ref={wrapperRef}>
      <div
        className="gm-bg"
        style={{ background: `linear-gradient(135deg, #1a0a08 0%, ${gradientColor}66 50%, #1a0a08 100%)` }}
      />
      <div className="gm-skew-container">
        <div className="gm-grid">
          {gridRows.map((rowItems, rowIdx) => (
            <div
              key={rowIdx}
              className="gm-row"
              ref={(el) => (rowRefs.current[rowIdx] = el)}
            >
              {rowItems.map((item, colIdx) => (
                <div key={colIdx} className="gm-cell">
                  {item && typeof item === 'string' && item.match(/\.(png|jpe?g|webp|gif|svg)$/i) ? (
                    <img src={item} alt="" className="gm-img" />
                  ) : typeof item === 'string' ? (
                    <span className="gm-label">{item}</span>
                  ) : (
                    item
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="gm-fade gm-fade-top" />
      <div className="gm-fade gm-fade-bottom" />
      <div className="gm-fade gm-fade-left" />
      <div className="gm-fade gm-fade-right" />
    </div>
  );
};

export default GridMotion;
