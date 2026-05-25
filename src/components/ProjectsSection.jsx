import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PROJECTS } from '../data';

export function ProjectsSection({
  activeColor,
  activePanelColor,
  activeProjectTab,
  setActiveProjectTab,
  currentSelectedProject,
  setCurrentSelectedProject,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  const filteredProjects = PROJECTS.filter(
    (project) => activeProjectTab === 'all' || project.category === activeProjectTab
  );

  // Reset pagination to page 1 whenever user switches tabs
  useEffect(() => {
    setCurrentPage(1);
  }, [activeProjectTab]);

  // Sync selected project on page or tab change to prevent showing out-of-context assets
  useEffect(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginated = filteredProjects.slice(startIdx, startIdx + ITEMS_PER_PAGE);
    if (paginated.length > 0) {
      const activeProjId = PROJECTS[currentSelectedProject]?.id;
      const isStillAvailable = paginated.some((p) => p.id === activeProjId);
      if (!isStillAvailable) {
        const firstProjOriginalIndex = PROJECTS.findIndex((p) => p.id === paginated[0].id);
        if (firstProjOriginalIndex !== -1) {
          setCurrentSelectedProject(firstProjOriginalIndex);
        }
      }
    }
  }, [currentPage, activeProjectTab, currentSelectedProject, setCurrentSelectedProject]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section
      id="projects"
      className="relative w-full bg-[#0a0a0c] text-white py-24 sm:py-32 select-text border-t border-white/5 transition-colors duration-700"
      style={{ 
        fontFamily: "'Inter', sans-serif",
        backgroundImage: `radial-gradient(circle at 10% 20%, ${activePanelColor}05, transparent 45%), radial-gradient(circle at 90% 80%, ${activeColor}05, transparent 50%)`,
        transition: 'background-image 650ms cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Decorative background grid and ambient lighting */}
      <div
        id="projects-grid"
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Floating high-tech ambient glows */}
      <div 
        style={{
          backgroundColor: activeColor,
          transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full opacity-[0.015] blur-3xl pointer-events-none" 
      />
      <div 
        style={{
          backgroundColor: activePanelColor,
          transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.012] blur-3xl pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        
        {/* Editorial Heading Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16 sm:mb-20">
          <div className="lg:col-span-6">
            <span 
              style={{
                color: activeColor,
                transition: 'color 650ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              className="text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase block mb-4"
            >
              PROVEN METRICS & SYSTEMS
            </span>
            <h2 
              style={{ fontFamily: "'Anton', sans-serif" }}
              className="text-white text-5xl sm:text-7xl lg:text-8xl leading-none uppercase tracking-normal"
            >
              SELECTED WORK
            </h2>
          </div>
          
          <div className="lg:col-span-6 lg:pt-8">
            <p className="text-white/70 text-lg sm:text-xl font-normal leading-relaxed tracking-wide mb-6">
              A curated selection of our high-performance infrastructure builds, design frameworks, and audit applications. Fully interactive sandbox environments are available below.
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

        {/* Categories Filtering tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 border-b border-white/10 pb-6">
          <button
            type="button"
            onClick={() => { setActiveProjectTab('all'); }}
            style={{
              backgroundColor: activeProjectTab === 'all' ? activeColor : 'rgba(255, 255, 255, 0.01)',
              borderColor: activeProjectTab === 'all' ? activeColor : 'rgba(255, 255, 255, 0.05)',
              color: activeProjectTab === 'all' ? '#000000' : 'rgba(255, 255, 255, 0.5)',
              transition: 'all 650ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase border hover:bg-white/[0.05] cursor-pointer"
          >
            All Systems ({PROJECTS.length})
          </button>
          <button
            type="button"
            onClick={() => { setActiveProjectTab('backend'); }}
            style={{
              backgroundColor: activeProjectTab === 'backend' ? activeColor : 'rgba(255, 255, 255, 0.01)',
              borderColor: activeProjectTab === 'backend' ? activeColor : 'rgba(255, 255, 255, 0.05)',
              color: activeProjectTab === 'backend' ? '#000000' : 'rgba(255, 255, 255, 0.5)',
              transition: 'all 650ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase border hover:bg-white/[0.05] cursor-pointer"
          >
            Backend & Memory
          </button>
          <button
            type="button"
            onClick={() => { setActiveProjectTab('frontend'); }}
            style={{
              backgroundColor: activeProjectTab === 'frontend' ? activeColor : 'rgba(255, 255, 255, 0.01)',
              borderColor: activeProjectTab === 'frontend' ? activeColor : 'rgba(255, 255, 255, 0.05)',
              color: activeProjectTab === 'frontend' ? '#000000' : 'rgba(255, 255, 255, 0.5)',
              transition: 'all 650ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase border hover:bg-white/[0.05] cursor-pointer"
          >
            Frontend & Visuals
          </button>
          <button
            type="button"
            onClick={() => { setActiveProjectTab('compliance'); }}
            style={{
              backgroundColor: activeProjectTab === 'compliance' ? activeColor : 'rgba(255, 255, 255, 0.01)',
              borderColor: activeProjectTab === 'compliance' ? activeColor : 'rgba(255, 255, 255, 0.05)',
              color: activeProjectTab === 'compliance' ? '#000000' : 'rgba(255, 255, 255, 0.5)',
              transition: 'all 650ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase border hover:bg-white/[0.05] cursor-pointer"
          >
            Audit & Compliance
          </button>
        </div>

        {/* Master Project Layout Grid */}
        <div className="w-full">
          
          {/* Projects Full-Width Showcase Grid */}
          <div className="lg:col-span-12 flex flex-col space-y-8 justify-between w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
              {paginatedProjects.map((project) => {
                const originalIndex = PROJECTS.findIndex(p => p.id === project.id);
                const isSelected = currentSelectedProject === originalIndex;
                
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setCurrentSelectedProject(originalIndex)}
                    style={{
                      borderColor: isSelected ? `${activeColor}40` : 'rgba(255, 255, 255, 0.05)',
                      backgroundColor: isSelected ? `${activeColor}06` : 'rgba(255, 255, 255, 0.01)',
                      boxShadow: isSelected ? `0 10px 40px -15px ${activeColor}20` : 'none',
                      transition: 'all 650ms cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    className="w-full text-left p-6 sm:p-8 rounded-3xl border flex flex-col justify-between items-start select-none outline-none group cursor-pointer min-h-[360px] h-full"
                  >
                    <div className="w-full">
                      <div className="w-full flex justify-between items-center mb-4">
                        <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                          {project.category} // {project.status}
                        </span>
                        <span 
                          style={{
                            backgroundColor: isSelected ? activeColor : 'rgba(255,255,255,0.1)'
                          }}
                          className={`w-2 h-2 rounded-full ${isSelected ? 'animate-pulse' : ''}`} 
                        />
                      </div>

                      {project.image && (
                        <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden mb-5 border border-white/5 relative bg-white/[0.01] transition-all duration-500">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            referrerPolicy="no-referrer"
                            className={`w-full h-full object-cover transition-all duration-700 ${
                              isSelected 
                                ? 'grayscale-0 opacity-80 scale-102' 
                                : 'grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-65 group-hover:scale-105'
                            }`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-90" />
                        </div>
                      )}
                      
                      <h3 className={`text-xl font-bold tracking-tight mb-2 transition-colors ${
                        isSelected ? 'text-white' : 'text-white/70 group-hover:text-white'
                      }`}>
                        {project.title}
                      </h3>
                      
                      <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 text-left">
                        {project.desc}
                      </p>
                    </div>
                    
                    <div className="w-full flex justify-between items-center text-[10px] font-mono text-white/30 uppercase mt-auto pt-4 border-t border-white/5">
                      <span>{project.tech.slice(0, 2).join(' • ')}</span>
                      <span 
                        style={{
                          color: isSelected ? activeColor : 'rgba(255, 255, 255, 0.6)',
                          transition: 'color 650ms'
                        }}
                        className="font-semibold tracking-wider font-mono"
                      >
                        {project.metrics.value}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-4">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  Page {currentPage} of {totalPages}
                </span>
                
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/60 hover:text-white disabled:opacity-30 disabled:hover:text-white/60 transition-all duration-200 bg-white/[0.02] hover:bg-white/[0.05] active:scale-95 cursor-pointer"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  
                  <div className="flex items-center gap-1 px-1 font-mono text-xs">
                    {Array.from({ length: totalPages }).map((_, pIdx) => {
                      const pNum = pIdx + 1;
                      return (
                        <button
                          key={pNum}
                          type="button"
                          onClick={() => setCurrentPage(pNum)}
                          style={{
                            backgroundColor: currentPage === pNum ? activeColor : 'transparent',
                            color: currentPage === pNum ? '#000000' : 'rgba(255, 255, 255, 0.4)',
                            transition: 'all 300ms ease'
                          }}
                          className="w-6 h-6 rounded-md text-[10px] font-bold font-mono flex items-center justify-center cursor-pointer"
                        >
                          {pNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/60 hover:text-white disabled:opacity-30 disabled:hover:text-white/60 transition-all duration-200 bg-white/[0.02] hover:bg-white/[0.05] active:scale-95 cursor-pointer"
                    aria-label="Next page"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
