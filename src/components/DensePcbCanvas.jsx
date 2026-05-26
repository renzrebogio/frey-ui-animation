import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

// Generates highly structured, realistic PCB traces (45-degree chamfers, parallel buses)
function generatePcbPattern(width, height, grid = 20) {
  const traces = [];
  const vias = [];
  const smds = [];
  const ics = [];
  const silkscreens = [];

  // Generate ICs (Integrated Circuits)
  for (let i = 0; i < 18; i++) {
    const wGrid = 3 + Math.floor(Math.random() * 6);
    const hGrid = 3 + Math.floor(Math.random() * 6);
    const w = wGrid * grid;
    const h = hGrid * grid;
    const x = Math.floor((Math.random() * (width - w)) / grid) * grid;
    const y = Math.floor((Math.random() * (height - h)) / grid) * grid;
    const isRotated = Math.random() > 0.5;
    
    const finalW = isRotated ? h : w;
    const finalH = isRotated ? w : h;
    
    ics.push({
      x, y, w: finalW, h: finalH,
      pinsX: Math.floor(finalW / 10),
      pinsY: Math.floor(finalH / 10),
      label: `U${Math.floor(Math.random()*200)}`
    });
    
    silkscreens.push({ x: x, y: y - 6, text: `U${Math.floor(Math.random()*200)}` });
  }

  // Generate SMDs (Resistors/Capacitors)
  for (let i = 0; i < 60; i++) {
    const isResistor = Math.random() > 0.5;
    const x = Math.floor(Math.random() * width / grid) * grid;
    const y = Math.floor(Math.random() * height / grid) * grid;
    const isVertical = Math.random() > 0.5;
    
    smds.push({
      x, y,
      vertical: isVertical,
      type: isResistor ? 'R' : 'C'
    });
    
    silkscreens.push({ 
      x: x + (isVertical ? 10 : 0), 
      y: y + (isVertical ? 0 : -6), 
      text: `${isResistor ? 'R' : 'C'}${Math.floor(Math.random()*999)}` 
    });
  }

  // Generate Trace Buses
  const generateBus = (startX, startY, numLines) => {
    let currentDir = Math.floor(Math.random() * 4); // 0: N, 1: E, 2: S, 3: W
    const initialDir = currentDir;
    
    let cx = 0, cy = 0;
    const instructions = [{x: 0, y: 0}];
    
    const steps = 2 + Math.floor(Math.random() * 5);
    for (let s = 0; s < steps; s++) {
      const dist = (2 + Math.floor(Math.random() * 8)) * grid;
      
      if (currentDir === 0) cy -= dist;
      else if (currentDir === 1) cx += dist;
      else if (currentDir === 2) cy += dist;
      else cx -= dist;
      
      instructions.push({x: cx, y: cy});
      
      // 45-degree chamfer turn (skip on last step)
      if (s < steps - 1) {
        const turnRight = Math.random() > 0.5;
        const chamferSize = (1 + Math.floor(Math.random() * 2)) * grid;
        
        let nx = cx; let ny = cy;
        
        if (currentDir === 0) {
          nx += turnRight ? chamferSize : -chamferSize; ny -= chamferSize;
          currentDir = turnRight ? 1 : 3;
        } else if (currentDir === 1) {
          nx += chamferSize; ny += turnRight ? chamferSize : -chamferSize;
          currentDir = turnRight ? 2 : 0;
        } else if (currentDir === 2) {
          nx += turnRight ? -chamferSize : chamferSize; ny += chamferSize;
          currentDir = turnRight ? 3 : 1;
        } else {
          nx -= chamferSize; ny += turnRight ? -chamferSize : chamferSize;
          currentDir = turnRight ? 0 : 2;
        }
        
        cx = nx; cy = ny;
        instructions.push({x: cx, y: cy});
      }
    }

    // Determine offset vector for parallel lines
    const offsetX = (initialDir === 0 || initialDir === 2) ? 6 : 0;
    const offsetY = (initialDir === 1 || initialDir === 3) ? 6 : 0;
    const spacing = 8; // distance between parallel traces

    for (let l = 0; l < numLines; l++) {
      const offsetAmt = (l - (numLines - 1) / 2) * spacing;
      const dx = (offsetX !== 0) ? offsetAmt : 0;
      const dy = (offsetY !== 0) ? offsetAmt : 0;
      
      const path = instructions.map(p => ({
        x: startX + p.x + dx,
        y: startY + p.y + dy
      }));
      
      traces.push(path);
      
      // Add vias at terminals
      if (Math.random() > 0.2) vias.push({ x: path[0].x, y: path[0].y });
      if (Math.random() > 0.2) vias.push({ x: path[path.length-1].x, y: path[path.length-1].y });
    }
  };

  // Generate individual traces and thick buses
  for (let i = 0; i < 70; i++) {
    const startX = Math.floor((Math.random() * width) / grid) * grid;
    const startY = Math.floor((Math.random() * height) / grid) * grid;
    
    const isBus = Math.random() > 0.65;
    const numLines = isBus ? (2 + Math.floor(Math.random() * 4)) : 1;
    generateBus(startX, startY, numLines);
  }

  // Add random standalone vias
  for (let i = 0; i < 100; i++) {
    vias.push({
      x: Math.floor(Math.random() * width / grid) * grid,
      y: Math.floor(Math.random() * height / grid) * grid
    });
  }

  return { traces, vias, smds, ics, silkscreens };
}

export function DensePcbCanvas({ activeColor = '#e05c3a' }) {
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Camera tilt effect applied to the fixed background
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [30, 0, -20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.3]);
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    
    // Create offscreen canvas for caching static elements
    const offscreenCanvas = document.createElement('canvas');
    const offscreenCtx = offscreenCanvas.getContext('2d', { alpha: false });
    
    let animationFrameId;
    let width, height;
    let pcbData = null;
    
    let lastScrollY = -1;
    let lastColor = '';

    const initPattern = () => {
      width = window.innerWidth;
      height = window.innerHeight * 1.5;
      
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      offscreenCanvas.width = width * window.devicePixelRatio;
      offscreenCanvas.height = height * window.devicePixelRatio;
      offscreenCtx.scale(window.devicePixelRatio, window.devicePixelRatio);

      pcbData = generatePcbPattern(width, height, 20);
      
      // Render static PCB onto the cached offscreen canvas once
      renderStaticPcb(offscreenCtx);
      
      // Force initial redraw
      lastScrollY = -1;
      requestDraw();
    };

    const renderStaticPcb = (cCtx) => {
      // Substrate base background
      cCtx.fillStyle = '#030304';
      cCtx.fillRect(0, 0, width, height);

      // Traces (Static dark paths)
      cCtx.strokeStyle = 'rgba(30, 38, 48, 0.4)';
      cCtx.lineCap = 'round';
      cCtx.lineJoin = 'round';
      pcbData.traces.forEach(t => {
        cCtx.lineWidth = 1.5;
        cCtx.beginPath();
        cCtx.moveTo(t[0].x, t[0].y);
        for(let i=1; i<t.length; i++) {
          cCtx.lineTo(t[i].x, t[i].y);
        }
        cCtx.stroke();
      });

      // Vias (Copper rings with dark centers)
      pcbData.vias.forEach(v => {
        cCtx.fillStyle = 'rgba(60, 70, 85, 0.6)';
        cCtx.beginPath();
        cCtx.arc(v.x, v.y, 3.5, 0, Math.PI*2);
        cCtx.fill();
        
        cCtx.fillStyle = '#020203';
        cCtx.beginPath();
        cCtx.arc(v.x, v.y, 1.5, 0, Math.PI*2);
        cCtx.fill();
      });

      // ICs
      pcbData.ics.forEach(c => {
        cCtx.fillStyle = '#0a0a0c';
        cCtx.strokeStyle = 'rgba(40, 50, 60, 0.5)';
        cCtx.lineWidth = 1;
        cCtx.fillRect(c.x, c.y, c.w, c.h);
        cCtx.strokeRect(c.x, c.y, c.w, c.h);
        
        // Silver pins
        cCtx.fillStyle = 'rgba(120, 130, 140, 0.7)';
        for(let p=0; p<c.pinsX; p++){
          const pX = c.x + (c.w / c.pinsX) * p + (c.w / c.pinsX) / 2 - 1.5;
          cCtx.fillRect(pX, c.y - 4, 3, 4);
          cCtx.fillRect(pX, c.y + c.h, 3, 4);
        }
        for(let p=0; p<c.pinsY; p++){
          const pY = c.y + (c.h / c.pinsY) * p + (c.h / c.pinsY) / 2 - 1.5;
          cCtx.fillRect(c.x - 4, pY, 4, 3);
          cCtx.fillRect(c.x + c.w, pY, 4, 3);
        }
        
        // Pin 1 indicator dot
        cCtx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        cCtx.beginPath();
        cCtx.arc(c.x + 8, c.y + 8, 2, 0, Math.PI*2);
        cCtx.fill();
      });

      // SMDs
      pcbData.smds.forEach(s => {
        cCtx.save();
        cCtx.translate(s.x, s.y);
        if (s.vertical) cCtx.rotate(Math.PI / 2);
        
        cCtx.fillStyle = s.type === 'R' ? '#111' : '#644';
        cCtx.fillRect(-4, -2.5, 8, 5);
        cCtx.fillStyle = 'rgba(150, 160, 170, 0.8)';
        cCtx.fillRect(-5, -3, 2, 6);
        cCtx.fillRect(3, -3, 2, 6);
        cCtx.restore();
      });

      // Silkscreen white text
      cCtx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      cCtx.font = '8px "Courier New", monospace';
      cCtx.textAlign = 'left';
      cCtx.textBaseline = 'middle';
      pcbData.silkscreens.forEach(s => {
        cCtx.fillText(s.text, s.x, s.y);
      });
    };

    const requestDraw = () => {
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(() => {
          draw();
          animationFrameId = null;
        });
      }
    };

    const draw = () => {
      const scrollY = window.scrollY;
      
      lastScrollY = scrollY;
      lastColor = activeColor;

      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const scrollFrac = scrollY / maxScroll;
      const panY = -scrollFrac * (height * 0.3);
      
      // Clear main canvas
      ctx.clearRect(0, 0, width, height);
      
      ctx.save();
      ctx.translate(0, panY);

      // Render pre-rendered base layout (1 draw call instead of hundreds)
      ctx.drawImage(offscreenCanvas, 0, 0, width, height);

      // Draw Glowing Power Layer overlays (Only what is active on screen)
      const powerY = scrollFrac * (height * 1.3) - panY;
      
      pcbData.traces.forEach(t => {
        const startY = t[0].y;
        const dist = powerY - startY;
        
        if (dist > 0 && dist < 500) {
          const intensity = 1 - (dist / 500);
          // Outer glow (fast alternative to shadowBlur)
          ctx.strokeStyle = activeColor;
          ctx.lineWidth = 4.5;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.globalAlpha = intensity * 0.25;
          ctx.beginPath();
          ctx.moveTo(t[0].x, t[0].y);
          for(let i=1; i<t.length; i++) {
            ctx.lineTo(t[i].x, t[i].y);
          }
          ctx.stroke();
          
          // Core bright line
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = intensity * 0.9;
          ctx.stroke();
        }
      });
      ctx.globalAlpha = 1.0;

      // Glow on ICs
      pcbData.ics.forEach(c => {
        const dist = powerY - c.y;
        if (dist > 0 && dist < 400) {
          const intensity = 1 - (dist / 400);
          
          ctx.fillStyle = activeColor;
          ctx.globalAlpha = intensity * 0.15;
          ctx.fillRect(c.x, c.y, c.w, c.h);
          
          ctx.strokeStyle = activeColor;
          ctx.globalAlpha = intensity * 0.8;
          ctx.strokeRect(c.x, c.y, c.w, c.h);
        }
      });

      ctx.restore();
      ctx.globalAlpha = 1.0;
    };

    initPattern();

    const handleScroll = () => {
      requestDraw();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', initPattern);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', initPattern);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [activeColor]);

  return (
    <div className="fixed z-0 pointer-events-none" style={{ perspective: '1200px', top: '-10vh', left: '-10vw', width: '120vw', height: '120vh', background: '#020203' }}>
      <motion.canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{ 
          rotateX,
          scale,
          y,
          transformOrigin: 'center center'
        }} 
      />
    </div>
  );
}
