import { useEffect, useState } from 'react';

const lines = [
  // Top-Left (Orange)
  { color: '#e05c3a', path: 'M0,0 L15,0 L15,30 L40,30 L40,48 L50,50' }, 
  // Top-Right (Green)
  { color: '#10b981', path: 'M100,0 L85,0 L85,25 L60,25 L60,45 L50,50' }, 
  // Bottom-Left (Red)
  { color: '#ef4444', path: 'M0,100 L20,100 L20,70 L40,70 L40,55 L50,50' }, 
  // Bottom-Right (Blue)
  { color: '#3b82f6', path: 'M100,100 L75,100 L75,80 L55,80 L55,55 L50,50' }, 
];

export function Splash() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);   // Draw lines & show dim text
    const t2 = setTimeout(() => setPhase(2), 2200);  // Hit center -> Shake
    const t3 = setTimeout(() => setPhase(3), 2700);  // End shake -> Zoom out FREY
    const t4 = setTimeout(() => setPhase(4), 4000);  // Curtains open

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div
      id="frey-splash-screen"
      style={{
        backgroundColor: 'transparent',
        opacity: phase >= 5 ? 0 : 1,
        transition: 'opacity 800ms ease-in-out',
        pointerEvents: phase >= 4 ? 'none' : 'auto',
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center select-none overflow-hidden text-white"
    >
      <style>{`
        @keyframes rgb-shake {
          0% { transform: translate(0, 0) scale(3); text-shadow: 4px 4px 0px #ef4444, -4px -4px 0px #3b82f6; }
          20% { transform: translate(-6px, 4px) scale(3); text-shadow: -4px 4px 0px #10b981, 4px -4px 0px #e05c3a; }
          40% { transform: translate(6px, -4px) scale(3); text-shadow: 4px -4px 0px #ef4444, -4px 4px 0px #3b82f6; }
          60% { transform: translate(-4px, -6px) scale(3); text-shadow: -4px -4px 0px #10b981, 4px 4px 0px #e05c3a; }
          80% { transform: translate(4px, 6px) scale(3); text-shadow: 4px 4px 0px #ef4444, -4px -4px 0px #3b82f6; }
          100% { transform: translate(0, 0) scale(3); text-shadow: 0px 0px 0px transparent; }
        }
        .shake-active {
          animation: rgb-shake 400ms cubic-bezier(0.36, 0, 0.66, -0.56) forwards;
        }
      `}</style>

      {/* SVG Circuit Lines */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-10" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        style={{
          opacity: phase >= 4 ? 0 : 1,
          transition: 'opacity 400ms ease',
        }}
      >
        {lines.map((l, i) => (
          <path
            key={i}
            d={l.path}
            stroke={l.color}
            strokeWidth="0.3"
            fill="none"
            pathLength="100"
            style={{
              strokeDasharray: 100,
              strokeDashoffset: phase >= 1 ? 0 : 100,
              transition: 'stroke-dashoffset 2000ms cubic-bezier(0.5, 0, 0.2, 1)',
              filter: `drop-shadow(0 0 4px ${l.color})`
            }}
          />
        ))}
      </svg>

      {/* Top tech curtain */}
      <div 
        className="absolute left-0 right-0 top-0 bg-[#070709] z-0 flex items-end justify-center overflow-hidden"
        style={{ 
          height: '50vh',
          transform: phase >= 4 ? 'translateY(-100%)' : 'translateY(0)', 
          transition: 'transform 1000ms cubic-bezier(0.7, 0, 0.3, 1)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
         {/* Top curtain colors */}
         <div className="absolute bottom-0 left-0 w-1/2 h-[2px] bg-[#e05c3a]" 
           style={{ opacity: phase >= 2 ? 1 : 0, transition: 'opacity 300ms', boxShadow: '0 0 15px #e05c3a' }} />
         <div className="absolute bottom-0 right-0 w-1/2 h-[2px] bg-[#10b981]" 
           style={{ opacity: phase >= 2 ? 1 : 0, transition: 'opacity 300ms', boxShadow: '0 0 15px #10b981' }} />
      </div>

      {/* Bottom tech curtain */}
      <div 
        className="absolute left-0 right-0 bottom-0 bg-[#070709] z-0 flex items-start justify-center overflow-hidden"
        style={{ 
          height: '50vh',
          transform: phase >= 4 ? 'translateY(100%)' : 'translateY(0)', 
          transition: 'transform 1000ms cubic-bezier(0.7, 0, 0.3, 1)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
         {/* Bottom curtain colors */}
         <div className="absolute top-0 left-0 w-1/2 h-[2px] bg-[#ef4444]" 
           style={{ opacity: phase >= 2 ? 1 : 0, transition: 'opacity 300ms', boxShadow: '0 0 15px #ef4444' }} />
         <div className="absolute top-0 right-0 w-1/2 h-[2px] bg-[#3b82f6]" 
           style={{ opacity: phase >= 2 ? 1 : 0, transition: 'opacity 300ms', boxShadow: '0 0 15px #3b82f6' }} />
      </div>

      {/* Grain overlay */}
      <div
        id="splash-grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.08,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
        }}
        className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay"
      />

      {/* Central Brand Typography Block */}
      <div className="relative z-20 flex flex-col items-center text-center px-6">
        <h1
          style={{
            fontFamily: "'Anton', sans-serif",
            letterSpacing: phase >= 3 ? '0.04em' : '-0.02em',
            transform: phase >= 3 ? 'scale(1)' : 'scale(3)',
            opacity: phase >= 1 ? 1 : 0,
            transition: phase >= 3 
              ? 'transform 1200ms cubic-bezier(0.2, 0.8, 0.2, 1), letter-spacing 1200ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 800ms ease-out'
              : 'opacity 400ms ease-out',
            color: phase >= 2 ? '#ffffff' : 'rgba(255,255,255,0.08)',
          }}
          className={`text-7xl sm:text-9xl md:text-[11rem] leading-none uppercase tracking-tight relative mb-3 font-bold ${phase === 2 ? 'shake-active' : ''}`}
        >
          FREY
        </h1>

        <div style={{ overflow: 'hidden' }}>
          <p 
            style={{
              opacity: phase >= 3 ? 1 : 0,
              transform: phase >= 3 ? 'translateY(0)' : 'translateY(100%)',
              transition: 'opacity 800ms ease-out 600ms, transform 800ms cubic-bezier(0.2, 0.8, 0.2, 1) 600ms',
            }}
            className="text-white/60 text-xs sm:text-sm font-medium tracking-[0.3em] uppercase max-w-xs sm:max-w-md mb-12"
          >
            PREMIUM SOFTWARE ENGINEERING
          </p>
        </div>
      </div>

      {/* Minimal Footer Credits */}
      <div 
        style={{
          opacity: phase >= 3 ? 1 : 0,
          transition: 'opacity 800ms ease-out 800ms',
        }}
        className="absolute bottom-8 left-0 right-0 text-center z-20"
      >
        <span className="text-white/20 text-[9px] tracking-[0.25em] uppercase">
          © 2026 FREY. ALL RIGHTS RESERVED.
        </span>
      </div>
    </div>
  );
}
