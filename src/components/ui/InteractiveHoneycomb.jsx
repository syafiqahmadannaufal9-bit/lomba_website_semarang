import React, { useEffect, useRef } from 'react';

export default function InteractiveHoneycomb() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId = null;
    let isVisible = false;
    const mouse = { x: -9999, y: -9999 };

    // Target 30fps instead of 60fps — halves CPU load, imperceptible to human eye
    const TARGET_FPS = 30;
    const FRAME_INTERVAL = 1000 / TARGET_FPS;
    let lastFrameTime = 0;

    const R = 38;
    const hexW = Math.sqrt(3) * R;
    const hexH = 1.5 * R;
    let hexagons = [];

    const initHexagons = (w, h) => {
      hexagons = [];
      const cols = Math.ceil(w / hexW) + 2;
      const rows = Math.ceil(h / hexH) + 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          let x = c * hexW;
          if (r % 2 !== 0) x += hexW / 2;
          hexagons.push({
            x,
            y: r * hexH,
            glow: 0,
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.018 + Math.random() * 0.012, // Slightly faster pulse for 30fps
          });
        }
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent.offsetWidth || window.innerWidth;
      const h = parent.offsetHeight || window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      initHexagons(w, h);
    };

    // Reusable hexagon path builder
    const hexPath = (x, y, size) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i + Math.PI / 6;
        const px = x + size * Math.cos(a);
        const py = y + size * Math.sin(a);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const render = (timestamp) => {
      if (!isVisible) return;

      // Throttle to TARGET_FPS
      if (timestamp - lastFrameTime < FRAME_INTERVAL) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastFrameTime = timestamp;

      animationFrameId = requestAnimationFrame(render);

      const w = canvas.width;
      const h = canvas.height;
      if (!w || !h || hexagons.length === 0) return;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#050507';
      ctx.fillRect(0, 0, w, h);

      const mx = mouse.x;
      const my = mouse.y;
      const RADIUS = 190;
      // Only process hexagons in a square bounding box around mouse (spatial pruning)
      const mouseNear = mx > -500;

      // --- Pass 1: Draw full base grid in ONE batched path (huge perf win) ---
      ctx.beginPath();
      for (let i = 0; i < hexagons.length; i++) {
        const hex = hexagons[i];
        for (let j = 0; j < 6; j++) {
          const a = (Math.PI / 3) * j + Math.PI / 6;
          const px = hex.x + R * Math.cos(a);
          const py = hex.y + R * Math.sin(a);
          if (j === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
      }
      ctx.lineWidth = 0.9;
      ctx.strokeStyle = 'rgba(255,255,255,0.045)';
      ctx.stroke();

      // --- Pass 2: Only process hexagons that have visible glow ---
      for (let i = 0; i < hexagons.length; i++) {
        const hex = hexagons[i];

        // Ambient slow pulse (advance phase every frame)
        hex.pulsePhase += hex.pulseSpeed;
        const ambient = ((Math.sin(hex.pulsePhase) + 1) / 2) * 0.065;

        // Only do distance calc if mouse is nearby (spatial optimization)
        if (mouseNear) {
          const dx = hex.x - mx;
          const dy = hex.y - my;
          // Quick bounding box reject before expensive sqrt
          if (Math.abs(dx) < RADIUS && Math.abs(dy) < RADIUS) {
            const dist = Math.sqrt(dx * dx + dy * dy);
            const target = dist < RADIUS ? (1 - dist / RADIUS) * 0.92 : 0;
            hex.glow += target > hex.glow
              ? (target - hex.glow) * 0.22
              : (target - hex.glow) * 0.04;
          } else {
            // Outside bounding box — decay glow quickly
            if (hex.glow > 0.001) hex.glow *= 0.96;
            else hex.glow = 0;
          }
        } else {
          // No mouse — let glow fade to zero
          if (hex.glow > 0.001) hex.glow *= 0.96;
          else hex.glow = 0;
        }

        const total = Math.max(hex.glow, ambient);
        // Skip hexagons that are effectively invisible — biggest perf win
        if (total < 0.015) continue;

        // Outer glow stroke — only use shadowBlur when glow is significant
        ctx.save();
        hexPath(hex.x, hex.y, R);
        if (hex.glow > 0.05) {
          ctx.shadowColor = `rgba(220,60,50,${(hex.glow * 0.85).toFixed(3)})`;
          ctx.shadowBlur = 10 * hex.glow; // Reduced from 12 to 10
        }
        ctx.lineWidth = 1.4 + total * 1.6;
        ctx.strokeStyle = `rgba(231,76,60,${(total * 0.9).toFixed(3)})`;
        ctx.stroke();
        ctx.restore();

        // Inner highlight (no shadow — cheap)
        if (total > 0.02) {
          ctx.save();
          hexPath(hex.x, hex.y, R);
          ctx.lineWidth = 0.6;
          ctx.strokeStyle = `rgba(255,145,165,${(total * 0.65).toFixed(3)})`;
          ctx.stroke();
          ctx.restore();
        }
      }
    };

    // Throttled mousemove — process at most once per rAF
    let mouseMoveScheduled = false;
    const handleMouseMove = (e) => {
      if (mouseMoveScheduled) return;
      mouseMoveScheduled = true;
      requestAnimationFrame(() => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouseMoveScheduled = false;
      });
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    // Intersection Observer — stop rAF loop when not in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !animationFrameId) {
            animationFrameId = requestAnimationFrame(render);
          } else if (!isVisible && animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        });
      },
      { threshold: 0.01 }
    );

    observer.observe(canvas);

    const parent = canvas.parentElement;
    parent.addEventListener('mousemove', handleMouseMove, { passive: true });
    parent.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resize, { passive: true });

    setTimeout(() => {
      resize();
    }, 0);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Bottom gradient */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '40%',
          background: 'linear-gradient(to top, #050507 0%, rgba(5,5,7,0.75) 50%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      {/* Top vignette */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '12%',
          background: 'linear-gradient(to bottom, #050507 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
    </>
  );
}
