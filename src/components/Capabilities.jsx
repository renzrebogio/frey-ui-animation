import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';

/* ── Animated Counter ── */
function AnimatedCounter({ value, inView }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) { setCount(0); return; }
    const end = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(end)) return;
    const duration = 2000;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      setCount(end * ease);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);
  const suffix = value.replace(/[0-9.]/g, '');
  const display = count < 10 && count % 1 !== 0 ? count.toFixed(1) : Math.floor(count);
  return <>{display}{suffix}</>;
}

/* ── Capability Card with scroll-linked reversible "power-on" animation ── */
function CapabilityCard({ icon, id, label, title, desc, activeColor, index, containerRef }) {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  // Each card sweeps in from alternating sides with a diagonal slide
  const isEven = index % 2 === 0;
  const xOffset = isEven ? -80 : 80;
  const rotateOffset = isEven ? -6 : 6;

  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.7], [0, 0.3, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5, 0.8], [xOffset, xOffset * 0.3, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 0.8], [60, 20, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.6, 0.9], [rotateOffset, rotateOffset * 0.2, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 0.8], [0.92, 0.96, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.4, 0.7], [3, 1, 0]);
  const borderGlow = useTransform(scrollYProgress, [0.6, 0.9], [0, 0.6]);
  const filterStyle = useTransform(blur, v => `blur(${v}px)`);

  return (
    <motion.div
      ref={cardRef}
      style={{
        opacity,
        x,
        y,
        rotate,
        scale,
        filter: filterStyle,
        willChange: 'transform, opacity, filter',
      }}
      className="relative bg-[#050508]/80 backdrop-blur-md border border-white/5 rounded-3xl p-8 sm:p-10 transition-colors duration-500 hover:bg-[#08080a]/90 hover:border-white/10 group text-left overflow-hidden shadow-2xl"
    >
      {/* Animated border glow on power-on */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          opacity: borderGlow,
          boxShadow: `inset 0 0 30px ${activeColor}15, 0 0 20px ${activeColor}10`,
          borderRadius: 'inherit'
        }}
      />
      <div className="flex justify-between items-start mb-12 relative z-10">
        <div
          style={{
            color: activeColor,
            backgroundColor: `${activeColor}15`,
            transition: 'all 650ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          className="p-4 rounded-2xl transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {icon}
          </svg>
        </div>
        <span
          style={{ color: activeColor, transition: 'color 650ms cubic-bezier(0.4, 0, 0.2, 1)' }}
          className="font-mono text-xs tracking-widest opacity-40 group-hover:opacity-100 transition-opacity"
        >
          {id} / {label}
        </span>
      </div>
      <h3 className="text-white text-2xl font-bold tracking-tight mb-4 group-hover:translate-x-1 transition-transform duration-300 relative z-10">
        {title}
      </h3>
      <p className="text-white/60 text-sm leading-relaxed text-left relative z-10">
        {desc}
      </p>
    </motion.div>
  );
}

/* ── Main Section ── */
export function Capabilities({ activeColor, activePanelColor }) {
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Header scroll-linked animation: slides up from below with a slight rotation
  const { scrollYProgress: headerScroll } = useScroll({
    target: headerRef,
    offset: ["start end", "center center"],
  });

  const headerOpacity = useTransform(headerScroll, [0, 0.4, 0.7], [0, 0.5, 1]);
  const headerY = useTransform(headerScroll, [0, 0.5, 0.8], [100, 30, 0]);
  const headerScale = useTransform(headerScroll, [0, 0.6, 0.9], [0.95, 0.98, 1]);

  // Stats bar scroll-linked animation
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { margin: "-100px" });

  const { scrollYProgress: statsScroll } = useScroll({
    target: statsRef,
    offset: ["start end", "center center"],
  });

  const statsOpacity = useTransform(statsScroll, [0, 0.4, 0.7], [0, 0.4, 1]);
  const statsY = useTransform(statsScroll, [0, 0.5, 0.8], [80, 20, 0]);
  const statsScale = useTransform(statsScroll, [0, 0.5, 0.8], [0.9, 0.96, 1]);

  // Phase 5 (0.8–1.0): Stats power-on glow
  const statsGlow = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  const CARDS = [
    { id: '01', label: 'DISCOVERY', title: 'Front-End Layout Engineering', desc: 'We build interactive, lightning-fast UI systems. Our frontend architecture establishes solid typographic scales, fluid layout patterns, and robust state-driven React flows.', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.303.197-1.591 1.591M21.75 12h-2.25m-.197 5.303-1.591-1.591M12 21.75V19.5m-5.303-.197 1.591-1.591M2.25 12h2.25m-.197-5.303 1.591 1.591" /> },
    { id: '02', label: 'EMBEDDED & IOT', title: 'IoT Systems & Embedded Hardware', desc: 'We engineer specialized microcontroller nodes, sensors, and embedded systems interfaces. From real-time telemetry streaming to firmware integration, we build robust physical computing layers.', icon: <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /> },
    { id: '03', label: 'STABILITY', title: 'Quantitative UX Research & Planning', desc: 'Every digital asset needs rigorous validation. We map user testing parameters, optimize friction points, and manage operational planning documentation to satisfy rigorous product specs.', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v12m0 0H9m3 0h3m-3-12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /> },
    { id: '04', label: 'WEBSITES', title: 'Interactive Websites & Web Apps', desc: 'We design and develop high-speed, interactive web platforms using modern web technologies. Our websites feature responsive visual hierarchy, fluid page motion, and optimized performance.', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /> },
  ];

  // Pre-compute derived motion values for stats (avoids creating new MotionValues in JSX)
  const statsBoxShadow = useTransform(statsGlow, (v) => `0 0 ${v * 60}px ${activeColor}${Math.round(v * 60).toString(16).padStart(2, '0')}`);
  const statsBorderColor = useTransform(statsGlow, (v) => {
    const a = Math.round(v * 128).toString(16).padStart(2, '0');
    return v > 0.05 ? `${activeColor}${a}` : 'rgba(255,255,255,0.1)';
  });
  const statsBgColor = useTransform(statsGlow, (v) => `${activeColor}${Math.round(v * 8).toString(16).padStart(2, '0')}`);

  return (
    <section
      ref={containerRef}
      id="discover"
      className="relative w-full bg-transparent text-white py-24 sm:py-32 select-text transition-colors duration-700 overflow-hidden"
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundImage: `radial-gradient(circle at 80% 20%, ${activeColor}08, transparent 40%), radial-gradient(circle at 10% 80%, ${activePanelColor}05, transparent 50%)`,
      }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.05,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Ambient glow blobs */}
      <div
        style={{ backgroundColor: activeColor, transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)' }}
        className="absolute top-10 right-10 w-[500px] h-[500px] rounded-full opacity-[0.012] blur-3xl pointer-events-none"
      />
      <div
        style={{ backgroundColor: activePanelColor, transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)' }}
        className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full opacity-[0.01] blur-3xl pointer-events-none"
      />

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-20">

        {/* Header — slides up with scale, reverses on scroll-back */}
        <motion.div
          ref={headerRef}
          style={{
            opacity: headerOpacity,
            y: headerY,
            scale: headerScale,
            willChange: 'transform, opacity',
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-20 bg-[#020203]/60 backdrop-blur-sm p-6 sm:p-12 rounded-3xl border border-white/5"
        >
          <div className="lg:col-span-5">
            <span
              style={{ color: activeColor, transition: 'color 650ms cubic-bezier(0.4, 0, 0.2, 1)' }}
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
              style={{ backgroundColor: activeColor, transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)' }}
              className="w-20 h-[1px]"
            />
          </div>
        </motion.div>

        {/* Cards — each has independent scroll-linked reversible animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-24">
          {CARDS.map((card, i) => (
            <CapabilityCard
              key={card.id}
              {...card}
              activeColor={activeColor}
              index={i}
              containerRef={containerRef}
            />
          ))}
        </div>

        {/* Stats — Power On with scroll-linked slide-up */}
        <motion.div
          ref={statsRef}
          className="bg-[#050508]/80 backdrop-blur-md border border-white/10 py-12 px-6 rounded-2xl grid grid-cols-2 lg:grid-cols-4 gap-8 relative shadow-2xl"
          style={{
            opacity: statsOpacity,
            y: statsY,
            scale: statsScale,
            willChange: 'transform, opacity',
            boxShadow: statsBoxShadow,
            borderColor: statsBorderColor,
            backgroundColor: statsBgColor
          }}
        >
          {[
            { label: 'SYSTEMS DEPLOYED', val: '240+' },
            { label: 'DAILY COMPILATIONS', val: '1.2K' },
            { label: 'LINES OF ROBUST CODE', val: '18M+' },
            { label: 'COMPLEX BUILDS', val: '40+' }
          ].map((stat, i) => (
            <div key={i} className="text-center lg:text-left relative z-10">
              <span className="block font-mono text-white/40 text-xs tracking-wider mb-2">{stat.label}</span>
              <span
                style={{
                  fontFamily: "'Anton', sans-serif",
                  color: activeColor,
                  transition: 'color 650ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                className="text-4xl sm:text-5xl tracking-wide font-black block"
              >
                <AnimatedCounter value={stat.val} inView={statsInView} />
              </span>
            </div>
          ))}
        </motion.div>



      </div>
    </section>
  );
}
