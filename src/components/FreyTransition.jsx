import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

/* ── Tiny spark particles that fire when powering up ── */
function Spark({ delay, x, y, color }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: 3,
        height: 3,
        left: `${50 + x}%`,
        top: `${50 + y}%`,
        backgroundColor: color,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1.5, 1, 0],
        x: [0, x * 4, x * 8],
        y: [0, y * 4, y * 8],
      }}
      transition={{
        duration: 1.2,
        delay,
        repeat: Infinity,
        repeatDelay: 2 + Math.random() * 2,
      }}
    />
  );
}

export function FreyTransition({ activeColor }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isPowered, setIsPowered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth out the scroll value to prevent "jumping from frame to frame" on mousewheel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // ── CAMERA movement via translateZ (perspective-based zoom) ──
  // Phase 1 (0 → 0.2):  Camera far away, FREY visible but dim
  // Phase 2 (0.2 → 0.4): Camera dollies IN toward FREY
  // Phase 3 (0.4 → 0.65): Camera holds close — FREY powers up
  // Phase 4 (0.65 → 0.85): Camera dollies BACK OUT
  // Phase 5 (0.85 → 1.0): Fade to next section

  // Phase 1 (0 → 0.15):  Camera neutral, FREY visible but dim
  // Phase 2 (0.15 → 0.35): Camera perfectly zooms IN
  // Phase 3 (0.35 → 0.6): Camera holds close — FREY powers up
  // Phase 4 (0.6 → 0.8): Camera zooms BACK OUT
  // Phase 5 (0.8 → 1.0): Fade to next section

  // Camera Scale: Perfectly smooth 2D/3D scaling
  const cameraScale = useTransform(smoothProgress,
    [0,    0.15,  0.35,  0.6,   0.8,   1],
    [1,    1,     1.6,   1.6,   1,     0.8]
  );

  // Power-up glow intensity
  const glowIntensity = useTransform(smoothProgress,
    [0, 0.3, 0.42, 0.55, 0.65, 0.8],
    [0, 0,   1,    1,    1,    0]
  );

  // FREY text color: dim shadow → powered white
  const textColor = useTransform(glowIntensity, (g) =>
    g > 0.5 ? '#ffffff' : 'rgba(255, 255, 255, 0.06)'
  );

  // Text glow shadow
  const textShadow = useTransform(glowIntensity, (g) =>
    g > 0
      ? `0 0 ${g * 40}px ${activeColor}, 0 0 ${g * 80}px ${activeColor}80, 0 0 ${g * 160}px ${activeColor}40`
      : 'none'
  );

  // Subtitle appears during hold phase
  const subtitleOpacity = useTransform(smoothProgress,
    [0, 0.4, 0.48, 0.6, 0.72],
    [0, 0,   1,    1,   0]
  );

  // Horizontal power line width
  const powerLineWidth = useTransform(glowIntensity, [0, 0.5, 1], ['0%', '30%', '60%']);

  // Overall section opacity
  const sectionOpacity = useTransform(smoothProgress,
    [0, 0.05, 0.85, 1],
    [0, 1,    1,    0]
  );

  // Track power state for sparks
  useEffect(() => {
    const unsub = smoothProgress.on("change", (v) => {
      setIsPowered(v > 0.38 && v < 0.72);
    });
    return unsub;
  }, [smoothProgress]);

  // Canvas: Draw converging structured PCB traces
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const centerX = w / 2;
    const centerY = h / 2;

    const generateConvergingTraces = () => {
      const traces = [];
      const vias = [];
      const gridSize = 20;
      const numBuses = 16;
      
      for (let b = 0; b < numBuses; b++) {
        // start angle
        const angle = (b / numBuses) * Math.PI * 2 + (Math.random() * 0.2);
        const startR = Math.max(w, h) * 0.8;
        const startX = Math.round((centerX + Math.cos(angle) * startR) / gridSize) * gridSize;
        const startY = Math.round((centerY + Math.sin(angle) * startR) / gridSize) * gridSize;
        
        const numLines = 1 + Math.floor(Math.random() * 4);
        const spacing = 8;
        
        let cx = startX;
        let cy = startY;
        const masterPath = [{x: cx, y: cy}];
        
        // Route towards center using 45 and 90 deg lines
        while (Math.hypot(centerX - cx, centerY - cy) > 100) {
          const dx = centerX - cx;
          const dy = centerY - cy;
          
          let nx = cx; let ny = cy;
          const moveType = Math.floor(Math.random() * 3); // 0: H, 1: V, 2: 45-deg
          const stepSize = (2 + Math.floor(Math.random() * 5)) * gridSize;
          
          if (moveType === 0 && Math.abs(dx) > gridSize) {
            nx += Math.sign(dx) * stepSize;
          } else if (moveType === 1 && Math.abs(dy) > gridSize) {
            ny += Math.sign(dy) * stepSize;
          } else {
            const diag = Math.min(Math.abs(dx), Math.abs(dy), stepSize);
            nx += Math.sign(dx) * diag;
            ny += Math.sign(dy) * diag;
          }
          
          cx = nx; cy = ny;
          masterPath.push({x: cx, y: cy});
          if (masterPath.length > 25) break;
        }
        
        masterPath.push({x: centerX, y: centerY});
        
        const dx = masterPath[1].x - masterPath[0].x;
        const dy = masterPath[1].y - masterPath[0].y;
        const len = Math.hypot(dx, dy) || 1;
        const normX = -dy / len;
        const normY = dx / len;
        
        for (let l = 0; l < numLines; l++) {
          const offset = (l - (numLines - 1) / 2) * spacing;
          const path = masterPath.map(p => ({
            x: p.x + normX * offset,
            y: p.y + normY * offset
          }));
          traces.push(path);
          if (Math.random() > 0.3) vias.push(path[0]);
        }
      }
      return { traces, vias };
    };

    const pcbData = generateConvergingTraces();

    let animId;
    let lastProgress = -1;

    const draw = () => {
      const progress = smoothProgress.get();
      if (Math.abs(progress - lastProgress) < 0.001) {
        animId = requestAnimationFrame(draw);
        return;
      }
      lastProgress = progress;

      ctx.clearRect(0, 0, w, h);

      const traceProgress = Math.min(1, progress / 0.35);
      const powered = progress > 0.38 && progress < 0.72;
      const color = activeColor || '#e8612d';

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      pcbData.traces.forEach((path) => {
        const drawLen = Math.floor(path.length * traceProgress);
        if (drawLen < 2) return;

        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (let j = 1; j < drawLen; j++) {
          ctx.lineTo(path[j].x, path[j].y);
        }
        
        if (powered) {
          // Outer glow (fast alternative to shadowBlur)
          ctx.strokeStyle = color;
          ctx.lineWidth = 4;
          ctx.globalAlpha = 0.3;
          ctx.stroke();
          // Core bright line
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = 0.8;
          ctx.stroke();
        } else {
          ctx.strokeStyle = `rgba(60, 70, 90, ${0.15 + traceProgress * 0.2})`;
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = 1.0;
          ctx.stroke();
        }
      });

      if (traceProgress > 0.1) {
        pcbData.vias.forEach(v => {
          ctx.globalAlpha = powered ? 0.8 : (0.15 + traceProgress * 0.2);
          // Copper ring
          ctx.fillStyle = powered ? color : 'rgba(60, 70, 85, 0.6)';
          ctx.beginPath();
          ctx.arc(v.x, v.y, 3.5, 0, Math.PI * 2);
          ctx.fill();
          // Inner hole
          ctx.fillStyle = '#020203';
          ctx.beginPath();
          ctx.arc(v.x, v.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        });
      }
      
      ctx.globalAlpha = 1.0;

      if (powered) {
        const glowSize = 130;
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowSize);
        gradient.addColorStop(0, `${color}30`);
        gradient.addColorStop(0.5, `${color}10`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(centerX - glowSize, centerY - glowSize, glowSize * 2, glowSize * 2);
      }

    };

    // Scroll-driven rendering instead of continuous rAF loop
    let pendingFrame = null;
    const requestDraw = () => {
      if (!pendingFrame) {
        pendingFrame = requestAnimationFrame(() => {
          draw();
          pendingFrame = null;
        });
      }
    };

    const unsub = smoothProgress.on("change", requestDraw);
    requestDraw(); // Initial draw
    window.addEventListener('resize', resize);

    return () => {
      unsub();
      if (pendingFrame) cancelAnimationFrame(pendingFrame);
      window.removeEventListener('resize', resize);
    };
  }, [activeColor, smoothProgress]);

  // Pre-generated spark positions
  const sparks = Array.from({ length: 12 }, (_, i) => ({
    x: (Math.random() - 0.5) * 30,
    y: (Math.random() - 0.5) * 20,
    delay: Math.random() * 1.5,
  }));

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-transparent"
      style={{ height: '300vh' }}
    >
      {/* Sticky viewport — the "screen" the camera looks through */}
      <motion.div
        className="sticky top-0 w-full h-screen overflow-hidden"
        style={{
          opacity: sectionOpacity,
        }}
      >
        {/* ── CAMERA RIG ── moves via scale, everything inside scales with it */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            scale: cameraScale,
          }}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />

          {/* FREY text — scales along with the camera rig */}
          <div
            className="relative z-10 flex flex-col items-center justify-center px-12 py-16"
          >
            {/* Ambient occlusion/darkness mask behind text to block busy background lines */}
            <div
              className="absolute inset-0 pointer-events-none -z-10"
              style={{
                background: 'radial-gradient(circle, rgba(2, 2, 3, 0.95) 0%, rgba(2, 2, 3, 0.85) 50%, rgba(2, 2, 3, 0) 75%)',
                transform: 'scale(1.3)',
                filter: 'blur(10px)',
              }}
            />

            <motion.h2
              style={{
                fontFamily: "'Anton', sans-serif",
                color: textColor,
                textShadow: textShadow,
              }}
              className="text-7xl sm:text-8xl md:text-[10rem] lg:text-[13rem] uppercase tracking-[0.15em] select-none pointer-events-none leading-none"
            >
              FREY
            </motion.h2>

            {/* Subtitle — visible during powered hold */}
            <motion.p
              style={{
                opacity: subtitleOpacity,
                color: activeColor,
              }}
              className="text-[10px] sm:text-xs md:text-sm tracking-[0.5em] uppercase font-bold font-mono mt-2 sm:mt-4"
            >
              ELEVATING SOFTWARE ENGINEERING STANDARDS SINCE 2026
            </motion.p>

            {/* Horizontal power line */}
            <motion.div
              className="mt-6 h-[2px] rounded-full"
              style={{
                backgroundColor: activeColor,
                width: powerLineWidth,
                opacity: glowIntensity,
                boxShadow: useTransform(glowIntensity, (g) =>
                  `0 0 ${g * 30}px ${activeColor}`
                ),
              }}
            />

            {/* Sparks during power-on */}
            {isPowered &&
              sparks.map((s, i) => (
                <Spark
                  key={i}
                  delay={s.delay}
                  x={s.x}
                  y={s.y}
                  color={activeColor}
                />
              ))}
          </div>

          {/* Corner circuit decorations */}
          <motion.div
            className="absolute top-12 left-12 pointer-events-none z-0"
            style={{ opacity: useTransform(smoothProgress, [0, 0.15], [0, 0.4]) }}
          >
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <path d="M0 40 L40 40 L40 0" stroke={activeColor} strokeWidth="1" opacity="0.3" />
              <circle cx="40" cy="40" r="3" fill={activeColor} opacity="0.5" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute bottom-12 right-12 pointer-events-none z-0"
            style={{ opacity: useTransform(smoothProgress, [0, 0.15], [0, 0.4]) }}
          >
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <path d="M80 40 L40 40 L40 80" stroke={activeColor} strokeWidth="1" opacity="0.3" />
              <circle cx="40" cy="40" r="3" fill={activeColor} opacity="0.5" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Scan line — stays in screen-space, not camera-space */}
        <motion.div
          className="absolute left-0 w-full h-[1px] pointer-events-none z-20"
          style={{
            top: useTransform(smoothProgress, [0.38, 0.55], ['30%', '70%']),
            opacity: useTransform(glowIntensity, [0, 0.5, 1], [0, 0.6, 0]),
            background: `linear-gradient(90deg, transparent, ${activeColor}80, transparent)`,
            boxShadow: `0 0 15px ${activeColor}`,
          }}
        />
      </motion.div>
    </section>
  );
}
