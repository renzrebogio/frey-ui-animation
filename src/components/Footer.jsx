import { Github, Linkedin, ExternalLink, Cpu } from 'lucide-react';

export function Footer({ activeColor }) {
  const members = [
    {
      name: 'RANDEL',
      role: 'Frontend Developer',
      portfolio: '#',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'GRAZIELLE',
      role: 'Researcher & Operations',
      portfolio: '#',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'RENZ MARTIN',
      role: 'Frontend Developer',
      portfolio: '#',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'ELIJAH BOON',
      role: 'Backend Developer',
      portfolio: '#',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  ];

  return (
    <footer className="relative w-full bg-[#020203] pt-16 pb-12 select-text text-white">
      {/* Structural subtle glow matching active color */}
      <div 
        style={{
          backgroundColor: activeColor,
          transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] rounded-full opacity-[0.03] blur-3xl pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/5">
          {/* Column 1: Team intro */}
          <div className="md:col-span-4 text-left">
            <h4 className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase mb-4 text-white/40">
              THE FREY ENGINE
            </h4>
            <p className="text-white/60 text-sm leading-relaxed mb-6 font-sans">
              We are a close-knit group of computer engineering classmates driven by a shared vision. We combine hardware discipline, embedded wisdom, and web standard excellence to engineer original high-scale software systems.
            </p>
            <div className="flex items-center gap-2 text-white/30 text-[9px] font-mono tracking-wider uppercase">
              <Cpu size={12} style={{ color: activeColor, transition: 'color 650ms' }} />
              <span>Co-engineered since 2026</span>
            </div>
          </div>

          {/* Column 2: Classmates personal portfolios */}
          <div className="md:col-span-8 text-left">
            <h4 className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase mb-6 text-white/40">
              PERSONAL PORTFOLIOS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {members.map((member) => (
                <div 
                  key={member.name}
                  className="bg-white/[0.01] border border-white/[0.03] rounded-2xl p-5 hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="mb-4">
                    <div className="flex justify-between items-start">
                      <span className="font-sans font-bold text-sm tracking-wide text-white/90 group-hover:text-white transition-colors">
                        {member.name}
                      </span>
                      <span 
                        style={{
                          color: activeColor,
                          transition: 'color 650ms'
                        }}
                        className="font-mono text-[9px] tracking-wider uppercase bg-white/[0.03] px-2 py-0.5 rounded-full border border-white/5"
                      >
                        {member.role.split(' ')[0]} {/* shortened */}
                      </span>
                    </div>
                    <span className="block font-mono text-[10px] text-white/30 mt-1 uppercase tracking-wider">{member.role}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={member.portfolio}
                      className="text-[10px] font-mono tracking-widest uppercase font-bold text-white/40 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <span className="group-hover:underline decoration-1">PORTFOLIO</span>
                      <ExternalLink size={10} style={{ color: activeColor, transition: 'color 650ms' }} />
                    </a>
                    
                    <span className="text-white/10 text-xs">|</span>

                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono tracking-widest uppercase text-white/40 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <Github size={10} />
                      <span>GH</span>
                    </a>

                    <span className="text-white/10 text-xs">|</span>

                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono tracking-widest uppercase text-white/40 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <Linkedin size={10} />
                      <span>LN</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Global copyright footer part */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center select-none text-white/30 text-[9px] tracking-[0.25em] uppercase">
          <span>© 2026 FREY. DESIGNED FOR PERFORMANCE-DRIVEN PRODUCT TEAMS.</span>
          <span style={{ color: activeColor, transition: 'color 650ms' }} className="font-mono font-bold">COMPUTER ENGINEERING CLASS</span>
        </div>
      </div>
    </footer>
  );
}
