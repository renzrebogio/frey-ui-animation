import { useEffect } from 'react';

export function Splash({ progressWidth, splashFade, onEnter }) {
  return (
    <div
      id="frey-splash-screen"
      style={{
        backgroundColor: '#0a0a0a',
        transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)',
        transform: splashFade ? 'scale(1.04)' : 'scale(1)',
        opacity: splashFade ? 0 : 1,
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center select-none pointer-events-auto overflow-hidden text-white"
    >
      {/* Grain overlay for consistent visual design */}
      <div
        id="splash-grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.08,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
        }}
        className="absolute inset-0 pointer-events-none z-10"
      />

      {/* Dynamic Abstract Glowing Orbs in the Background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-white/[0.02] blur-3xl pointer-events-none animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-white/[0.015] blur-3xl pointer-events-none animate-pulse duration-[8000ms]" />

      {/* Central Brand Typography Block */}
      <div className="relative z-20 flex flex-col items-center text-center px-6">
        {/* Accent Mini-Header */}
        <span 
          className="text-white/40 text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase mb-4"
        >
          PROJECT PRESENTATION
        </span>

        {/* Master Company Name Heading */}
        <h1
          style={{
            fontFamily: "'Anton', sans-serif",
            letterSpacing: splashFade ? '0.22em' : '0.04em',
            transition: 'letter-spacing 2500ms cubic-bezier(0.1, 0.8, 0.2, 1)',
          }}
          className="text-white text-7xl sm:text-9xl md:text-[11rem] leading-none uppercase tracking-tight relative mb-3 font-bold"
        >
          FREY
        </h1>

        {/* Custom Elegant Subtitle */}
        <p className="text-white/60 text-xs sm:text-sm font-medium tracking-[0.3em] uppercase max-w-xs sm:max-w-md mb-12">
          PREMIUM SOFTWARE ENGINEERING
        </p>

        {/* Premium Loading Progress Bar */}
        <div className="w-40 sm:w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative mb-12">
          <div 
            style={{
              transition: 'width 2400ms cubic-bezier(0.1, 0.85, 0.25, 1)',
              width: progressWidth,
            }}
            className="absolute left-0 top-0 h-full bg-white opacity-80"
            id="splash-loader-progress"
          />
        </div>

        {/* Prompt / Bypass Button */}
        <button
          id="splash-skip-btn"
          type="button"
          onClick={onEnter}
          className="px-6 py-2 border border-white/20 hover:border-white/60 rounded-full text-white/50 hover:text-white text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white/5 active:scale-95 cursor-pointer"
        >
          ENTER EXPERIENCE
        </button>
      </div>

      {/* Minimal Footer Credits */}
      <div className="absolute bottom-8 left-0 right-0 text-center z-20">
        <span className="text-white/20 text-[9px] tracking-[0.25em] uppercase">
          © 2026 FREY. ALL RIGHTS RESERVED.
        </span>
      </div>
    </div>
  );
}
