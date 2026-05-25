export function Capabilities({ activeColor, activePanelColor }) {
  return (
    <section
      id="discover"
      className="relative w-full bg-[#080809] text-white py-24 sm:py-32 select-text transition-colors duration-700"
      style={{ 
        fontFamily: "'Inter', sans-serif",
        backgroundImage: `radial-gradient(circle at 80% 20%, ${activeColor}08, transparent 40%), radial-gradient(circle at 10% 80%, ${activePanelColor}05, transparent 50%)`,
        transition: 'background-image 650ms cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Grain overlay */}
      <div
        id="discover-grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.05,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
        }}
        className="absolute inset-0 pointer-events-none z-10"
      />

      {/* Abstract structural glow elements */}
      <div 
        style={{
          backgroundColor: activeColor,
          transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        className="absolute top-10 right-10 w-[500px] h-[500px] rounded-full opacity-[0.012] blur-3xl pointer-events-none" 
      />
      <div 
        style={{
          backgroundColor: activePanelColor,
          transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full opacity-[0.01] blur-3xl pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-20">
        
        {/* Editorial Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-20">
          <div className="lg:col-span-5">
            <span 
              style={{
                color: activeColor,
                transition: 'color 650ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              className="text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase block mb-4"
            >
              FREY CREATIVE ENGINEERING
            </span>
            <h2 
              style={{ fontFamily: "'Anton', sans-serif" }}
              className="text-white text-5xl sm:text-7xl lg:text-8xl leading-none uppercase tracking-normal"
            >
              WHAT WE DO
            </h2>
          </div>
          
          <div className="lg:col-span-7 lg:pt-8">
            <p className="text-white/70 text-lg sm:text-xl font-normal leading-relaxed tracking-wide mb-6">
              We are a group of computer engineering classmates united by the same vision of producing innovative, high-performance software solutions, specializing in Internet of Things (IoT) systems, embedded hardware, and modern, pixel-perfect interactive websites.
            </p>
            <div 
              style={{
                backgroundColor: activeColor,
                transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              className="w-20 h-[1px]" 
            />
          </div>
        </div>

        {/* Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-24">
          
          {/* Column 1 */}
          <div 
            id="pillar-concept"
            className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 sm:p-10 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10 group text-left"
          >
            <div className="flex justify-between items-start mb-12">
              <div 
                style={{
                  color: activeColor,
                  backgroundColor: `${activeColor}15`,
                  transition: 'all 650ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                className="p-4 rounded-2xl transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.303.197-1.591 1.591M21.75 12h-2.25m-.197 5.303-1.591-1.591M12 21.75V19.5m-5.303-.197 1.591-1.591M2.25 12h2.25m-.197-5.303 1.591 1.591" />
                </svg>
              </div>
              <span 
                style={{
                  color: activeColor,
                  transition: 'color 650ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                className="font-mono text-xs tracking-widest opacity-40 group-hover:opacity-100 transition-opacity"
              >
                01 / DISCOVERY
              </span>
            </div>
            <h3 
              className="text-white text-2xl font-bold tracking-tight mb-4 group-hover:translate-x-1 transition-transform duration-300"
            >
              Front-End Layout Engineering
            </h3>
            <p className="text-white/60 text-sm leading-relaxed text-left">
              We build interactive, lightning-fast UI systems. Our frontend architecture establishes solid typographic scales, fluid layout patterns, and robust state-driven React flows.
            </p>
          </div>

          {/* Column 2 */}
          <div 
            id="pillar-modelling"
            className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 sm:p-10 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10 group text-left"
          >
            <div className="flex justify-between items-start mb-12">
              <div 
                style={{
                  color: activeColor,
                  backgroundColor: `${activeColor}15`,
                  transition: 'all 650ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                className="p-4 rounded-2xl transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
              </div>
              <span 
                style={{
                  color: activeColor,
                  transition: 'color 650ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                className="font-mono text-xs tracking-widest opacity-40 group-hover:opacity-100 transition-opacity"
              >
                02 / EMBEDDED & IOT
              </span>
            </div>
            <h3 
              className="text-white text-2xl font-bold tracking-tight mb-4 group-hover:translate-x-1 transition-transform duration-300"
            >
              IoT Systems & Embedded Hardware
            </h3>
            <p className="text-white/60 text-sm leading-relaxed text-left">
              We engineer specialized microcontroller nodes, sensors, and embedded systems interfaces. From real-time telemetry streaming to firmware integration, we build robust, high-performance physical computing layers.
            </p>
          </div>

          {/* Column 3 */}
          <div 
            id="pillar-pedestal"
            className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 sm:p-10 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10 group text-left"
          >
            <div className="flex justify-between items-start mb-12">
              <div 
                style={{
                  color: activeColor,
                  backgroundColor: `${activeColor}15`,
                  transition: 'all 650ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                className="p-4 rounded-2xl transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v12m0 0H9m3 0h3m-3-12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                </svg>
              </div>
              <span 
                style={{
                  color: activeColor,
                  transition: 'color 650ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                className="font-mono text-xs tracking-widest opacity-40 group-hover:opacity-100 transition-opacity"
              >
                03 / STABILITY
              </span>
            </div>
            <h3 
              className="text-white text-2xl font-bold tracking-tight mb-4 group-hover:translate-x-1 transition-transform duration-300"
            >
              Quantitative UX Research & Planning
            </h3>
            <p className="text-white/60 text-sm leading-relaxed text-left">
              Every digital asset needs rigorous validation. We map user testing parameters, optimize friction points, and manage operational planning documentation to satisfy rigorous product specifications.
            </p>
          </div>

          {/* Column 4 */}
          <div 
            id="pillar-production"
            className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 sm:p-10 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10 group text-left"
          >
            <div className="flex justify-between items-start mb-12">
              <div 
                style={{
                  color: activeColor,
                  backgroundColor: `${activeColor}15`,
                  transition: 'all 650ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                className="p-4 rounded-2xl transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
              </div>
              <span 
                style={{
                  color: activeColor,
                  transition: 'color 650ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                className="font-mono text-xs tracking-widest opacity-40 group-hover:opacity-100 transition-opacity"
              >
                04 / WEBSITES
              </span>
            </div>
            <h3 
              className="text-white text-2xl font-bold tracking-tight mb-4 group-hover:translate-x-1 transition-transform duration-300"
            >
              Interactive Websites & Web Apps
            </h3>
            <p className="text-white/60 text-sm leading-relaxed text-left">
              We design and develop high-speed, interactive web platforms using modern web technologies. Our websites feature responsive visual hierarchy, fluid page motion, and optimized performance benchmarks.
            </p>
          </div>

        </div>

        {/* Studio Stats */}
        <div className="border-t border-b border-white/10 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div id="stat1" className="text-center lg:text-left">
            <span className="block font-mono text-white/40 text-xs tracking-wider mb-2">SYSTEMS DEPLOYED</span>
            <span 
              style={{ 
                fontFamily: "'Anton', sans-serif",
                color: activeColor,
                transition: 'color 650ms cubic-bezier(0.4, 0, 0.2, 1)'
              }} 
              className="text-4xl sm:text-5xl tracking-wide font-black"
            >
              240+
            </span>
          </div>
          <div id="stat2" className="text-center lg:text-left">
            <span className="block font-mono text-white/40 text-xs tracking-wider mb-2">DAILY COMPILATIONS</span>
            <span 
              style={{ 
                fontFamily: "'Anton', sans-serif",
                color: activeColor,
                transition: 'color 650ms cubic-bezier(0.4, 0, 0.2, 1)'
              }} 
              className="text-4xl sm:text-5xl tracking-wide font-black"
            >
              1.2K
            </span>
          </div>
          <div id="stat3" className="text-center lg:text-left">
            <span className="block font-mono text-white/40 text-xs tracking-wider mb-2">LINES OF ROBUST CODE</span>
            <span 
              style={{ 
                fontFamily: "'Anton', sans-serif",
                color: activeColor,
                transition: 'color 650ms cubic-bezier(0.4, 0, 0.2, 1)'
              }} 
              className="text-4xl sm:text-5xl tracking-wide font-black"
            >
              18M+
            </span>
          </div>
          <div id="stat4" className="text-center lg:text-left">
            <span className="block font-mono text-white/40 text-xs tracking-wider mb-2">COMPLEX BUILDS</span>
            <span 
              style={{ 
                fontFamily: "'Anton', sans-serif",
                color: activeColor,
                transition: 'color 650ms cubic-bezier(0.4, 0, 0.2, 1)'
              }} 
              className="text-4xl sm:text-5xl tracking-wide font-black"
            >
              40+
            </span>
          </div>
        </div>

        {/* Typography Showcase */}
        <div className="mt-24 text-center">
          <h3 
            style={{ 
              fontFamily: "'Anton', sans-serif",
              color: `${activeColor}10`,
              transition: 'color 650ms cubic-bezier(0.4, 0, 0.2, 1)'
            }} 
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] uppercase tracking-[0.2em] select-none pointer-events-none leading-none"
          >
            FREY
          </h3>
          <p className="text-white/40 text-[10px] sm:text-xs tracking-[0.4em] uppercase font-bold mt-[-5px] sm:mt-[-15px]">
            ELEVATING SOFTWARE ENGINEERING STANDARDS SINCE 2026
          </p>
        </div>

      </div>
    </section>
  );
}
