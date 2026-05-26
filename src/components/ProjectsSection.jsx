import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { PROJECTS } from '../data';

/* ─── SVG Thumbnail Components ─── */

function ChronoLedgerSVG({ activeColor = '#e05c3a' }) {
  return (
    <svg viewBox="0 0 480 120" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="480" height="120" fill="#0a0a0a" />
      {/* Grid lines */}
      {[20, 40, 60, 80, 100].map((y) => (
        <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="#1a1a1a" strokeWidth="0.5" />
      ))}
      {/* Waveform lines */}
      <polyline
        points="0,80 30,75 60,60 90,65 120,40 150,55 180,35 210,50 240,30 270,45 300,25 330,40 360,35 390,50 420,30 450,45 480,40"
        fill="none" stroke={activeColor} strokeWidth="1.5" opacity="0.7"
      />
      <polyline
        points="0,90 40,85 80,70 120,78 160,55 200,68 240,50 280,62 320,45 360,58 400,42 440,55 480,48"
        fill="none" stroke={activeColor} strokeWidth="1" opacity="0.35"
      />
      {/* Data points */}
      {[
        [120, 40], [180, 35], [240, 30], [300, 25], [360, 35], [420, 30],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill={activeColor} opacity="0.8" />
      ))}
      {/* Label */}
      <text x="10" y="115" fill="#1c1c1c" fontFamily="'Courier New', monospace" fontSize="8" fontWeight="bold">
        WAL_ENGINE / IoT_TIMESERIES
      </text>
    </svg>
  );
}

function CipherGuardianSVG({ activeColor = '#e05c3a' }) {
  return (
    <svg viewBox="0 0 240 120" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="240" height="120" fill="#0a0a0a" />
      {/* Concentric circles */}
      <circle cx="120" cy="55" r="35" fill="none" stroke={activeColor} strokeWidth="1.2" opacity="0.5" />
      <circle cx="120" cy="55" r="22" fill="none" stroke={activeColor} strokeWidth="1.5" opacity="0.7" />
      {/* Checkmark */}
      <polyline
        points="108,55 117,64 134,44"
        fill="none" stroke={activeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Label */}
      <text x="10" y="112" fill="#1c1c1c" fontFamily="'Courier New', monospace" fontSize="8" fontWeight="bold">
        FIPS_140-3 / KEY_ROTATION
      </text>
    </svg>
  );
}

function VesperaWebGlowSVG({ activeColor = '#e05c3a' }) {
  return (
    <svg viewBox="0 0 240 120" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="240" height="120" fill="#0a0a0a" />
      {/* Left side — code block mockup */}
      <rect x="10" y="12" width="100" height="90" fill="#111" rx="2" />
      {[18, 30, 42, 54, 66, 78].map((y, i) => (
        <rect key={i} x="18" y={y} width={40 + (i % 3) * 15} height="4" rx="1"
          fill={i === 2 ? activeColor : i === 4 ? '#333' : '#1e1e1e'} opacity={i === 2 ? 0.7 : 0.5} />
      ))}
      {/* Right side — WebGL viewport */}
      <rect x="130" y="12" width="100" height="90" fill="#0d0d0d" rx="2" stroke="#1a1a1a" strokeWidth="0.5" />
      {/* Glowing central circle */}
      <circle cx="180" cy="57" r="20" fill="none" stroke={activeColor} strokeWidth="1" opacity="0.3" />
      <circle cx="180" cy="57" r="12" fill="none" stroke={activeColor} strokeWidth="1.5" opacity="0.5" />
      <circle cx="180" cy="57" r="5" fill={activeColor} opacity="0.4" />
      {/* Label */}
      <text x="10" y="115" fill="#1c1c1c" fontFamily="'Courier New', monospace" fontSize="8" fontWeight="bold">
        WEBGL / SHADER_PIPELINE
      </text>
    </svg>
  );
}

function NexusWorkflowSVG({ activeColor = '#e05c3a' }) {
  return (
    <svg viewBox="0 0 240 120" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="240" height="120" fill="#0a0a0a" />
      {/* Card UI mockup */}
      <rect x="30" y="15" width="180" height="85" fill="#111" rx="3" />
      {/* Rows */}
      <rect x="40" y="25" width="160" height="16" rx="2" fill="#161616" />
      <rect x="40" y="47" width="160" height="16" rx="2" fill={activeColor} opacity="0.15" stroke={activeColor} strokeWidth="0.5" />
      <rect x="40" y="69" width="160" height="16" rx="2" fill="#161616" />
      {/* Arrow/play icon in highlighted row */}
      <polygon points="180,51 180,59 188,55" fill={activeColor} opacity="0.8" />
      {/* Text placeholders */}
      <rect x="48" y="30" width="50" height="4" rx="1" fill="#222" />
      <rect x="48" y="52" width="60" height="4" rx="1" fill={activeColor} opacity="0.5" />
      <rect x="48" y="74" width="45" height="4" rx="1" fill="#222" />
      {/* Label */}
      <text x="10" y="112" fill="#1c1c1c" fontFamily="'Courier New', monospace" fontSize="8" fontWeight="bold">
        AI / ORCHESTRATION
      </text>
    </svg>
  );
}

function PulseGridSVG({ activeColor = '#e05c3a' }) {
  return (
    <svg viewBox="0 0 240 120" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="240" height="120" fill="#0a0a0a" />
      {/* Grid lines */}
      {[30, 50, 70, 90].map((y) => (
        <line key={y} x1="20" y1={y} x2="220" y2={y} stroke="#1a1a1a" strokeWidth="0.5" />
      ))}
      {/* Rising polyline */}
      <polyline
        points="30,90 60,82 90,75 120,60 150,50 180,35 210,25"
        fill="none" stroke={activeColor} strokeWidth="1.5" opacity="0.7"
      />
      {/* Data points */}
      {[
        [30, 90], [60, 82], [90, 75], [120, 60], [150, 50], [180, 35], [210, 25],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill={activeColor} opacity="0.8" />
      ))}
      {/* Label */}
      <text x="10" y="112" fill="#1c1c1c" fontFamily="'Courier New', monospace" fontSize="8" fontWeight="bold">
        ESP32 / SENSOR_MESH
      </text>
    </svg>
  );
}

const SVG_MAP = {
  0: ChronoLedgerSVG,
  1: CipherGuardianSVG,
  2: VesperaWebGlowSVG,
  3: NexusWorkflowSVG,
  4: PulseGridSVG,
};

/* ─── Status indicator ─── */
function StatusDot({ status, activeColor = '#e05c3a' }) {
  const config = {
    live: { color: '#22c55e', pulse: true, label: 'Live' },
    certified: { color: activeColor, pulse: false, label: 'Certified' },
    active: { color: activeColor, pulse: false, label: 'Active' },
    research: { color: '#444', pulse: false, label: 'Research' },
  };
  const c = config[status] || config.active;
  return (
    <span style={{ fontFamily: "'Courier New', monospace", fontSize: '8px', color: '#555', display: 'flex', alignItems: 'center', gap: '5px' }}>
      <span style={{
        width: '6px', height: '6px', borderRadius: '50%', backgroundColor: c.color,
        display: 'inline-block',
        animation: c.pulse ? 'pulse-status 2s ease-in-out infinite' : 'none',
        boxShadow: c.pulse ? `0 0 6px ${c.color}` : 'none',
      }} />
      {c.label}
    </span>
  );
}

/* ─── Expand Panel ─── */
function ExpandPanel({ project, onClose, activeColor = '#e05c3a' }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (panelRef.current) {
      // Trigger reflow then animate
      panelRef.current.offsetHeight;
      panelRef.current.style.opacity = '1';
      panelRef.current.style.transform = 'translateY(0)';
    }
  }, []);

  return (
    <div
      ref={panelRef}
      style={{
        gridColumn: '1 / -1',
        background: '#0c0c0c',
        borderTop: '1px solid #1a1a1a',
        borderBottom: '1px solid #1a1a1a',
        padding: '32px 28px',
        opacity: 0,
        transform: 'translateY(-6px)',
        transition: 'opacity 0.25s ease, transform 0.25s ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#e8e8e8', marginBottom: '10px', fontFamily: "'Inter', sans-serif" }}>
            {project.title}
          </h3>
          <p style={{ fontSize: '12px', color: '#555', lineHeight: 1.7, maxWidth: '600px', fontFamily: "'Courier New', monospace" }}>
            {project.expandDesc}
          </p>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none', border: '1px solid #222', color: '#555', cursor: 'pointer',
            fontFamily: "'Courier New', monospace", fontSize: '10px', padding: '6px 12px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { e.target.style.borderColor = activeColor; e.target.style.color = activeColor; }}
          onMouseLeave={(e) => { e.target.style.borderColor = '#222'; e.target.style.color = '#555'; }}
        >
          ✕ Close
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {project.metrics.map((m, i) => (
          <div key={i} style={{
            background: '#111', border: '1px solid #1a1a1a', padding: '16px 14px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '22px', fontWeight: 700, color: activeColor, fontFamily: "'Courier New', monospace", marginBottom: '4px' }}>
              {m.value}
            </div>
            <div style={{ fontSize: '8px', color: '#444', fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Project Card ─── */
function ProjectCard({ project, isExpanded, onToggle, index, activeColor = '#e05c3a' }) {
  const [hovered, setHovered] = useState(false);
  const ThumbSVG = SVG_MAP[project.id];
  const cardRef = useRef(null);

  // Scroll-linked reversible animation
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, 0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5, 0.8], [80, 20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 0.8], [0.9, 0.95, 1]);
  const filter = useTransform(scrollYProgress, [0, 0.3, 0.6], ['blur(4px)', 'blur(1px)', 'blur(0px)']);

  return (
    <motion.div
      ref={cardRef}
      style={{
        opacity,
        y,
        scale,
        filter,
        willChange: 'transform, opacity',
        gridColumn: project.featured ? 'span 2' : 'span 1',
        background: hovered ? '#0d0d0d' : '#080808',
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.3s ease',
        zIndex: 10,
      }}
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Dynamic top-edge bar on hover */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: activeColor,
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }} />

      {/* Scan-line effect on hover */}
      <div style={{
        position: 'absolute', left: 0, right: 0, height: '1px',
        background: `${activeColor}26`,
        top: hovered ? '100%' : '0%',
        transition: hovered ? 'top 0.6s linear' : 'none',
        opacity: hovered ? 1 : 0,
        pointerEvents: 'none',
      }} />

      {/* Meta row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '14px',
      }}>
        <span style={{
          fontFamily: "'Courier New', monospace", fontSize: '8px',
          color: '#555', textTransform: 'uppercase', letterSpacing: '0.15em',
        }}>
          {project.tag}
        </span>
        <StatusDot status={project.status} activeColor={activeColor} />
      </div>

      {/* Thumbnail */}
      <div style={{
        width: '100%', height: '120px', borderRadius: '2px',
        overflow: 'hidden', marginBottom: '14px', background: '#0a0a0a',
      }}>
        {ThumbSVG && <ThumbSVG activeColor={activeColor} />}
      </div>

      {/* System number label */}
      <div style={{
        fontFamily: "'Courier New', monospace", fontSize: '8px',
        color: '#222', marginBottom: '6px',
      }}>
        {project.num} / {project.category.toUpperCase()}
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: '17px', fontWeight: 700, color: '#e8e8e8',
        marginBottom: '8px', fontFamily: "'Inter', sans-serif",
      }}>
        {project.title}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: '11px', color: '#444', lineHeight: 1.6,
        marginBottom: '16px', fontFamily: "'Courier New', monospace",
        flexGrow: 1,
      }}>
        {project.desc}
      </p>

      {/* Footer row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderTop: '1px solid #141414', paddingTop: '12px',
      }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {project.tech.map((t, i) => (
            <span key={i} style={{
              fontFamily: "'Courier New', monospace", fontSize: '8px',
              color: '#333', border: '1px solid #1a1a1a', padding: '3px 7px',
              display: 'inline-block',
            }}>
              {t}
            </span>
          ))}
        </div>
        <span style={{
          fontSize: '16px',
          color: hovered ? activeColor : '#333',
          transition: 'all 0.3s ease',
          transform: hovered ? 'translate(3px, -3px)' : 'translate(0, 0)',
          display: 'inline-block',
        }}>
          ↗
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Main Projects Section ─── */

const TABS = [
  { key: 'all', label: 'All Systems' },
  { key: 'backend', label: 'Backend & Memory' },
  { key: 'frontend', label: 'Frontend & Visuals' },
  { key: 'compliance', label: 'Audit & Compliance' },
];

export function ProjectsSection({
  activeProjectTab,
  setActiveProjectTab,
  setCurrentSelectedProject,
  activeColor = '#e05c3a',
}) {
  const [expandedId, setExpandedId] = useState(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Camera shift into section
  const sectionX = useTransform(scrollYProgress, [0, 0.15], ['10vw', '0vw']);
  const sectionScale = useTransform(scrollYProgress, [0, 0.15], [0.95, 1]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const scannerTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const filtered = PROJECTS.filter(
    (p) => activeProjectTab === 'all' || p.category === activeProjectTab
  );

  const count = String(filtered.length).padStart(2, '0');

  const handleTabChange = (key) => {
    setActiveProjectTab(key);
    setExpandedId(null);
    setCurrentSelectedProject(0);
  };

  const handleToggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // Group cards into rows of: featured row (if featured card present) + regular rows of 3
  // We need to insert expand panels after the row containing the clicked card
  const buildGrid = () => {
    const elements = [];
    let currentRow = [];
    let currentRowSpan = 0;

    const flushRow = (rowIndex) => {
      currentRow.forEach((project, i) => {
        elements.push(
          <ProjectCard
            key={`card-${project.id}`}
            project={project}
            index={i}
            isExpanded={expandedId === project.id}
            onToggle={() => handleToggle(project.id)}
            activeColor={activeColor}
          />
        );
      });

      // If any card in this row is expanded, insert panel after row
      const expandedInRow = currentRow.find((p) => p.id === expandedId);
      if (expandedInRow) {
        elements.push(
          <ExpandPanel
            key={`expand-${expandedInRow.id}`}
            project={expandedInRow}
            onClose={() => setExpandedId(null)}
            activeColor={activeColor}
          />
        );
      }

      currentRow = [];
      currentRowSpan = 0;
    };

    filtered.forEach((project, idx) => {
      const span = project.featured ? 2 : 1;

      if (currentRowSpan + span > 3) {
        flushRow(idx);
      }

      currentRow.push(project);
      currentRowSpan += span;

      if (currentRowSpan >= 3) {
        flushRow(idx);
      }
    });

    // Flush remaining
    if (currentRow.length > 0) {
      flushRow(-1);
    }

    return elements;
  };

  return (
    <section
      ref={containerRef}
      id="projects"
      style={{
        width: '100%',
        background: 'transparent',
        color: '#fff',
        padding: '96px 0',
        fontFamily: "'Inter', sans-serif",
        borderTop: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {/* Background Matrix/Memory Bank Grid Lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Memory Bank Scanner Laser */}
      <motion.div
        style={{
          position: 'absolute',
          top: scannerTop,
          left: 0,
          right: 0,
          height: '2px',
          background: activeColor,
          boxShadow: `0 0 30px 10px ${activeColor}4d, 0 0 10px 2px ${activeColor}`,
          zIndex: 5,
          pointerEvents: 'none'
        }}
      />

      {/* Content wrapper with Camera Shift */}
      <motion.div
        style={{
          x: sectionX,
          scale: sectionScale,
          opacity: sectionOpacity,
          width: '100%',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        {/* Header Row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          marginBottom: '32px', flexWrap: 'wrap', gap: '16px',
        }}>
          <div>
            <span style={{
              fontFamily: "'Courier New', monospace", fontSize: '10px',
              fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase',
              color: activeColor, display: 'block', marginBottom: '12px',
            }}>
              PROVEN METRICS & SYSTEMS
            </span>
            <h2 style={{
              fontFamily: "'Anton', sans-serif", fontSize: 'clamp(40px, 7vw, 80px)',
              lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.01em',
              color: '#fff', margin: 0,
            }}>
              SELECTED WORK
            </h2>
          </div>
          <span style={{
            fontFamily: "'Courier New', monospace", fontSize: '10px',
            color: '#444', letterSpacing: '0.1em',
          }}>
            {TABS.find((t) => t.key === activeProjectTab)?.label || 'All Systems'} / {count}
          </span>
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '8px',
          marginBottom: '32px', paddingBottom: '24px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}>
          {TABS.map((tab) => {
            const isActive = activeProjectTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleTabChange(tab.key)}
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '8px 18px',
                  borderRadius: '100px',
                  border: `1px solid ${isActive ? activeColor : '#1a1a1a'}`,
                  background: isActive ? activeColor : 'transparent',
                  color: isActive ? '#000' : '#555',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) { e.target.style.borderColor = '#333'; e.target.style.color = '#888'; }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) { e.target.style.borderColor = '#1a1a1a'; e.target.style.color = '#555'; }
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        <div className="frey-project-grid" style={{
          display: 'grid',
          gap: '1px',
          background: '#111',
        }}>
          {buildGrid()}
        </div>

      </div>

      {/* Inject keyframes and responsive grid styles */}
      <style>{`
        @keyframes pulse-status {
          0%, 100% { opacity: 1; box-shadow: 0 0 4px #22c55e; }
          50% { opacity: 0.5; box-shadow: 0 0 8px #22c55e; }
        }
        .frey-project-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 1024px) {
          .frey-project-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .frey-project-grid {
            grid-template-columns: 1fr;
          }
          .frey-project-grid > div[style*="grid-column: span 2"] {
            grid-column: span 1 !important;
          }
        }
      `}</style>
      </motion.div>
    </section>
  );
}
