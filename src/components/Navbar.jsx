import { Menu, X } from 'lucide-react';

export function Navbar({ isScrolled, mobileMenuOpen, setMobileMenuOpen }) {
  const handleScrollTo = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      id="global-navbar"
      style={{
        transition: 'all 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`fixed top-0 inset-x-0 z-40 px-6 py-4 sm:px-10 sm:py-5 flex items-center justify-between transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#060608]/90 backdrop-blur-md border-b border-white/5 py-3 sm:py-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)]' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="flex items-center gap-3">
        <span 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ fontFamily: "'Anton', sans-serif" }}
          className="text-white text-lg tracking-[0.2em] uppercase font-black cursor-pointer select-none"
        >
          FREY
        </span>
        <div className="hidden sm:flex h-3 w-[1px] bg-white/20" />
        <span className="hidden sm:inline text-white/40 font-mono text-[9px] tracking-widest uppercase">
          SOFTWARE ENGINEERING
        </span>
      </div>

      {/* Desktop navigation links */}
      <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
        <button
          type="button"
          onClick={() => handleScrollTo('frey-hero-section')}
          className="text-[10px] font-mono font-bold tracking-[0.25em] text-white/60 hover:text-white transition-colors duration-200 uppercase cursor-pointer"
        >
          Team
        </button>
        <button
          type="button"
          onClick={() => handleScrollTo('discover')}
          className="text-[10px] font-mono font-bold tracking-[0.25em] text-white/60 hover:text-white transition-colors duration-200 uppercase cursor-pointer"
        >
          Capabilities
        </button>
        <button
          type="button"
          onClick={() => handleScrollTo('projects')}
          className="text-[10px] font-mono font-bold tracking-[0.25em] text-white/60 hover:text-white transition-colors duration-200 uppercase cursor-pointer"
        >
          Projects
        </button>
      </div>

      {/* Action Button & Mobile Menu Toggle */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-white/10 rounded-full select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] font-mono text-white/50 tracking-wider">LIVE NODE</span>
        </div>

        <button
          onClick={() => handleScrollTo('contact')}
          className="hidden md:inline-flex px-4 py-1.5 rounded-full bg-white text-black text-[10px] font-mono tracking-widest font-bold uppercase transition-all duration-200 hover:bg-white/95 hover:scale-103 active:scale-97 cursor-pointer"
        >
          Contact
        </button>

        {/* Mobile menu toggle button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden text-white hover:text-white/80 p-1 cursor-pointer"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown Overlay */}
      <div
        style={{
          transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="fixed inset-x-0 top-0 h-screen bg-[#070709]/98 z-[-1] border-b border-white/10 md:hidden flex flex-col justify-center px-10 space-y-8 select-text"
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '30px 30px',
          }}
        />

        <span className="text-white/20 font-mono text-[9px] tracking-[0.25em] uppercase border-b border-white/5 pb-4 text-left">
          Navigation Index
        </span>

        <button
          type="button"
          onClick={() => handleScrollTo('frey-hero-section')}
          className="text-left text-3xl font-bold uppercase text-white hover:text-white/80 transition-colors cursor-pointer"
        >
          Team Registry
        </button>

        <button
          type="button"
          onClick={() => handleScrollTo('discover')}
          className="text-left text-3xl font-bold uppercase text-white hover:text-white/80 transition-colors cursor-pointer"
        >
          Capabilities
        </button>

        <button
          type="button"
          onClick={() => handleScrollTo('projects')}
          className="text-left text-3xl font-bold uppercase text-white hover:text-white/80 transition-colors cursor-pointer"
        >
          Selected Projects
        </button>

        <button
          type="button"
          onClick={() => handleScrollTo('contact')}
          className="text-left text-3xl font-bold uppercase text-white hover:text-white/80 transition-colors cursor-pointer"
        >
          Contact Matrix
        </button>

        <div className="pt-8 border-t border-white/5 flex flex-col gap-4">
          <button
            onClick={() => handleScrollTo('contact')}
            className="w-full text-center py-3 bg-white text-black font-mono font-bold text-xs uppercase rounded-full hover:bg-white/90 cursor-pointer"
          >
            Initiate Contact
          </button>
          <div className="text-center text-white/30 text-[9px] font-mono tracking-widest pt-2">
            © 2026 FREY. ESTABLISHED STANDARDS.
          </div>
        </div>
      </div>
    </nav>
  );
}
