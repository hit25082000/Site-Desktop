import React, { useRef, useEffect, useState } from 'react';

export default function CanvasReveal({
  initialBg = '/hero_result.png',
  initialOverlay = '/hero_original.png'
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [bgSrc, setBgSrc] = useState(initialBg);
  const [overlaySrc, setOverlaySrc] = useState(initialOverlay);
  const [isSwapped, setIsSwapped] = useState(false);

  const pointsRef = useRef([]);
  const prevCoordsRef = useRef(null);
  const isHoveringRef = useRef(false);
  const overlayImgRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  const MAX_RADIUS = 75; // 75px radius as requested
  const SHRINK_RATE = 2.5; // shrink rate per frame
  const DELAY_FRAMES = 90; // 1.5 seconds at 60fps

  // Load the overlay image
  useEffect(() => {
    const img = new Image();
    img.src = overlaySrc;
    img.onload = () => {
      overlayImgRef.current = img;
      drawCanvas();
    };
  }, [overlaySrc]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      resizeCanvas();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    drawCanvas();
  };

  // Helper to draw image covering the canvas (like object-cover)
  const drawImageCover = (ctx, img, w, h) => {
    if (!img || img.naturalWidth === 0) return;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const r = Math.min(w / iw, h / ih);
    let nw = iw * r;
    let nh = ih * r;
    if (nw < w) nw = w;
    if (nh < h) nh = h;
    const cx = (iw - w / r) * 0.5;
    const cy = (ih - h / r) * 0.5;
    const cw = w / r;
    const ch = h / r;
    ctx.drawImage(img, cx, cy, cw, ch, 0, 0, w, h);
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !overlayImgRef.current) return;
    const ctx = canvas.getContext('2d');
    
    // Clear and draw background
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1.0;
    drawImageCover(ctx, overlayImgRef.current, canvas.width, canvas.height);

    // Apply destination-out circles for the trail
    if (pointsRef.current.length > 0) {
      ctx.globalCompositeOperation = 'destination-out';
      pointsRef.current.forEach((pt) => {
        const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, pt.radius);
        grad.addColorStop(0, 'rgba(0,0,0,1)');
        grad.addColorStop(0.8, 'rgba(0,0,0,0.8)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  };

  // The animation tick loop
  const tick = () => {
    let active = false;

    // Update trail points
    pointsRef.current = pointsRef.current
      .map((pt) => {
        if (pt.delay > 0) {
          pt.delay -= 1;
          active = true;
          return pt;
        } else {
          pt.radius -= SHRINK_RATE;
          if (pt.radius > 0) {
            active = true;
            return pt;
          }
          return null;
        }
      })
      .filter(Boolean);

    drawCanvas();

    if (active || isHoveringRef.current) {
      animationFrameIdRef.current = requestAnimationFrame(tick);
    } else {
      animationFrameIdRef.current = null;
    }
  };

  const startAnimation = () => {
    if (!animationFrameIdRef.current) {
      animationFrameIdRef.current = requestAnimationFrame(tick);
    }
  };

  // Interpolate trail between points for smoothness when moving fast
  const addTrailSegment = (x1, y1, x2, y2) => {
    const dist = Math.hypot(x2 - x1, y2 - y1);
    const steps = Math.ceil(dist / 6); // step every 6px
    const newPoints = [];

    for (let i = 0; i <= steps; i++) {
      const t = steps === 0 ? 0 : i / steps;
      const cx = x1 + (x2 - x1) * t;
      const cy = y1 + (y2 - y1) * t;
      newPoints.push({
        x: cx,
        y: cy,
        radius: MAX_RADIUS,
        delay: DELAY_FRAMES
      });
    }

    pointsRef.current = [...pointsRef.current, ...newPoints];
    startAnimation();
  };

  // Mouse & Touch Handlers
  const handleMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (prevCoordsRef.current) {
      addTrailSegment(prevCoordsRef.current.x, prevCoordsRef.current.y, x, y);
    } else {
      pointsRef.current.push({
        x,
        y,
        radius: MAX_RADIUS,
        delay: DELAY_FRAMES
      });
      startAnimation();
    }

    prevCoordsRef.current = { x, y };
  };

  const handleStart = (e) => {
    isHoveringRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    prevCoordsRef.current = { x, y };
    pointsRef.current.push({
      x,
      y,
      radius: MAX_RADIUS,
      delay: DELAY_FRAMES
    });
    startAnimation();
  };

  const handleEnd = () => {
    isHoveringRef.current = false;
    prevCoordsRef.current = null;
  };

  // Swap Images on Click
  const handleContainerClick = (e) => {
    // Invert the source files
    setBgSrc(bgSrc === initialBg ? initialOverlay : initialBg);
    setOverlaySrc(overlaySrc === initialOverlay ? initialBg : initialOverlay);
    setIsSwapped(!isSwapped);
    // Reset points
    pointsRef.current = [];
    prevCoordsRef.current = null;
  };

  // Trigger resize on mount once overlay load resolves
  useEffect(() => {
    if (overlayImgRef.current) {
      resizeCanvas();
    }
  }, [bgSrc, overlaySrc]);

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseEnter={handleStart}
      onTouchStart={handleStart}
      onMouseLeave={handleEnd}
      onTouchEnd={handleEnd}
      onTouchCancel={handleEnd}
      className="relative w-full aspect-[3/4] max-h-[75vh] mx-auto rounded-3xl overflow-hidden cursor-crosshair shadow-sm group select-none"
      style={{ touchAction: 'none' }}
    >
      {/* Background Image (always visible behind erased canvas areas) */}
      <img
        alt={isSwapped ? "Foto Original" : "Resultado com IA"}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={bgSrc}
      />

      {/* Canvas displaying the overlay image, which gets erased */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
      />

      {/* Badge Tags */}
      <div className="absolute top-4 left-4 bg-white/90 text-neutral-900 text-xs px-3 py-1 rounded-full font-geist backdrop-blur-md pointer-events-none shadow-lg z-20 transition-opacity duration-300 group-hover:opacity-0">
        {isSwapped ? "📷 Foto Original" : "✨ Resultado com IA"}
      </div>
      <div className="absolute top-4 left-4 bg-black/80 text-white text-xs px-3 py-1 rounded-full font-geist backdrop-blur-md pointer-events-none shadow-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {isSwapped ? "✨ Revelar Resultado" : "📷 Revelar Original"}
      </div>
    </div>
  );
}
