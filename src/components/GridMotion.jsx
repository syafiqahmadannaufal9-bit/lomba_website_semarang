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
  const isVisibleRef = useRef(false);

  const cols = 4;
  const rows = 4;
  const totalItems = cols * rows;

  const filledItems = Array.from({ length: totalItems }, (_, i) => items[i] ?? `Item ${i + 1}`);
  const gridRows = Array.from({ length: rows }, (_, r) =>
    filledItems.slice(r * cols, r * cols + cols)
  );

  useEffect(() => {
    // Use lag smoothing at a reasonable value (0 = no smoothing = more jank at low fps)
    // 200ms window, 2x threshold — smooths out frame spikes without losing responsiveness
    gsap.ticker.lagSmoothing(200, 16);

    // Throttled mousemove — max one update per rAF frame
    let mouseMoveScheduled = false;
    const handleMouseMove = (e) => {
      if (mouseMoveScheduled) return;
      mouseMoveScheduled = true;
      requestAnimationFrame(() => {
        const rect = wrapperRef.current?.getBoundingClientRect();
        if (rect) mouseXRef.current = e.clientX - rect.left;
        mouseMoveScheduled = false;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Row update function — only runs when visible
    const updateRows = () => {
      if (!isVisibleRef.current) return; // Skip when off-screen

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

    // Intersection Observer — pause GSAP updates when GridMotion is off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        // Reset rows toward center when leaving viewport
        if (!entry.isIntersecting) {
          rowRefs.current.forEach((row) => {
            if (!row) return;
            gsap.to(row, { x: 0, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
          });
        }
      },
      { threshold: 0.01 }
    );

    if (wrapperRef.current) observer.observe(wrapperRef.current);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(updateRows);
      observer.disconnect();
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
                  {item && typeof item === 'string' && item.match(/\.(png|jpe?g|jpe|webp|gif|svg)$/i) ? (
                    <img src={item} alt="" className="gm-img" loading="lazy" />
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
