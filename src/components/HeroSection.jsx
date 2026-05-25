import { ArrowLeft, ArrowRight } from 'lucide-react';
import { IMAGES } from '../data';

export function HeroSection({
  activeIndex,
  isAnimating,
  isMobile,
  navigate,
  getRole,
  getRoleStyles,
}) {
  return (
    <div
      id="frey-hero-section"
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: "'Inter', sans-serif",
      }}
      className="relative w-full overflow-x-hidden select-none"
    >
      <div className="relative w-full h-screen overflow-hidden">
        {/* Grain overlay */}
        <div
          id="grain-layer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.12,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
            zIndex: 50,
          }}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Giant ghost text */}
        <div
          id="giant-background-text"
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-2"
        >
          {IMAGES.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <h1
                key={idx}
                style={{
                  fontFamily: "'Anton', sans-serif",
                  transform: isMobile ? 'translateY(-40px)' : 'translateY(-80px)',
                  opacity: isActive ? 0.25 : 0,
                  transition: 'opacity 650ms cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'absolute',
                }}
                className="text-white text-[24vw] leading-none uppercase tracking-[-0.04em] whitespace-nowrap"
              >
                {item.name}
              </h1>
            );
          })}
        </div>

        {/* Carousel cards */}
        <div id="carousel-viewport" className="absolute inset-0 z-3">
          {IMAGES.map((item, idx) => {
            const role = getRole(idx);
            const roleStyles = getRoleStyles(role);

            return (
              <div
                key={idx}
                id={`carousel-item-${idx}`}
                style={{
                  position: 'absolute',
                  aspectRatio: '0.6 / 1',
                  transition:
                    'transform 650ms cubic-bezier(0.4, 0, 0.2, 1), filter 650ms cubic-bezier(0.4, 0, 0.2, 1), opacity 650ms cubic-bezier(0.4, 0, 0.2, 1), left 650ms cubic-bezier(0.4, 0, 0.2, 1), bottom 650ms cubic-bezier(0.4, 0, 0.2, 1), height 650ms cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'transform, filter, opacity',
                  ...roleStyles,
                }}
                className="group/item"
              >
                {/* Pedestal highlight overlay */}
                <div
                  id={`pedestal-${idx}`}
                  style={{
                    backgroundColor: item.panel,
                    transform: 'translate(-50%, 50%) rotateX(65deg)',
                    transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)',
                  }}
                  className="absolute bottom-[-1%] left-1/2 w-[100%] h-[18%] rounded-full -z-10 border border-white/20 opacity-80 overflow-hidden"
                >
                  <div className="absolute inset-[10%] rounded-full bg-white/20 blur-[1px]" />
                </div>

                <img
                  id={`figurine-img-${idx}`}
                  src={item.src}
                  alt={`Frey team member ${item.name}`}
                  referrerPolicy="no-referrer"
                  draggable={false}
                  className="w-full h-full object-contain object-bottom select-none pointer-events-none"
                />
              </div>
            );
          })}
        </div>

        {/* Bottom-left controls panel */}
        <div
          id="controls-panel"
          style={{ zIndex: 50, maxWidth: '340px' }}
          className="absolute bottom-6 left-6 sm:bottom-16 sm:left-16 flex flex-col items-start"
        >
          <h2
            id="controls-title"
            className="text-white text-base sm:text-2xl font-bold tracking-wider uppercase mb-1"
          >
            {IMAGES[activeIndex].name}
          </h2>
          <span className="text-white/60 text-xs tracking-widest uppercase font-semibold mb-3 sm:mb-4 block font-mono">
            {IMAGES[activeIndex].role}
          </span>
          <p
            id="controls-desc"
            className="hidden sm:block text-white/90 text-sm leading-relaxed mb-6 sm:mb-8 text-left"
          >
            "{IMAGES[activeIndex].statement}"
          </p>

          <div id="nav-buttons-list" className="flex space-x-4">
            <button
              id="nav-btn-prev"
              type="button"
              onClick={() => navigate('prev')}
              disabled={isAnimating}
              aria-label="Previous team member"
              className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-white rounded-full flex items-center justify-center text-white cursor-pointer select-none transition-all duration-150 active:scale-95 hover:scale-108 hover:bg-white/10 disabled:opacity-50"
            >
              <ArrowLeft size={24} strokeWidth={2.5} />
            </button>
            <button
              id="nav-btn-next"
              type="button"
              onClick={() => navigate('next')}
              disabled={isAnimating}
              aria-label="Next team member"
              className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-white rounded-full flex items-center justify-center text-white cursor-pointer select-none transition-all duration-150 active:scale-95 hover:scale-108 hover:bg-white/10 disabled:opacity-50"
            >
              <ArrowRight size={24} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Bottom-right link */}
        <div className="absolute bottom-6 right-6 sm:bottom-16 sm:right-12 z-50 flex items-center">
          <a
            id="discover-link"
            href="#discover"
            style={{
              fontFamily: "'Anton', sans-serif",
            }}
            className="text-white text-3xl sm:text-6xl leading-none uppercase tracking-tighter transition-opacity duration-200 hover:opacity-85 flex items-center gap-4 no-underline group cursor-pointer"
          >
            <span>DISCOVER IT</span>
            <ArrowRight
              className="w-8 h-8 sm:w-12 sm:h-12 translate-y-0.5 transition-transform duration-200 group-hover:translate-x-2"
              strokeWidth={2.5}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
