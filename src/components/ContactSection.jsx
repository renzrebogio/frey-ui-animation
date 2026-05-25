import { useState } from 'react';
import { Mail, CheckCircle, Terminal, Send, Building2, Server, HelpCircle } from 'lucide-react';

export function ContactSection({ activeColor, activePanelColor }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('scale');
  const [budget, setBudget] = useState('mid');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [terminalPayload, setTerminalPayload] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    
    // Simulate high-tech encryption and ingestion pipeline
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTerminalPayload({
        status: "INGESTION_SUCCESSFUL",
        timestamp: new Date().toISOString(),
        routingNode: `US-EAST-SHARD-${Math.floor(Math.random() * 899) + 100}`,
        inquiryPayload: {
          clientName: name,
          clientEmail: email,
          class: projectType === 'scale' ? 'HIGH_CONCURRENCY_BACKEND' : projectType === 'frontend' ? 'FLUID_INTERFACE' : 'COMPLIANCE_AUDIT',
          financialTier: budget === 'high' ? 'TIER_1_ENTERPRISE' : budget === 'mid' ? 'TIER_2_GROWTH' : 'TIER_3_COMPACT',
          messageLength: message.length,
          validationChecksum: Math.random().toString(36).substring(3, 11).toUpperCase()
        }
      });
    }, 1500);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setProjectType('scale');
    setBudget('mid');
    setMessage('');
    setSubmitSuccess(false);
    setTerminalPayload(null);
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#08080a] text-white py-24 sm:py-32 select-text border-t border-white/5 overflow-hidden transition-colors duration-700"
      style={{ 
        fontFamily: "'Inter', sans-serif",
        backgroundImage: `radial-gradient(circle at 90% 20%, ${activeColor}08, transparent 40%), radial-gradient(circle at 10% 80%, ${activePanelColor}05, transparent 50%)`,
        transition: 'background-image 650ms cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Dynamic light grids & ambient lines */}
      <div
        id="contact-grid"
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '35px 35px',
        }}
      />
      <div 
        style={{
          backgroundColor: activeColor,
          transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.015] blur-3xl pointer-events-none" 
      />
      <div 
        style={{
          backgroundColor: activePanelColor,
          transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        className="absolute bottom-[20%] left-[-10%] w-[450px] h-[450px] rounded-full opacity-[0.01] blur-3xl pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Premium Pitch & Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <span 
                style={{
                  color: activeColor,
                  transition: 'color 650ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                className="text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase block mb-4"
              >
                SECURE COMMUNICATIONS CHANNEL
              </span>
              <h2
                style={{ fontFamily: "'Anton', sans-serif" }}
                className="text-white text-5xl sm:text-7xl lg:text-8xl leading-none uppercase tracking-normal mb-8"
              >
                INITIATE<br />CONTACT
              </h2>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-10 text-left">
                Ready to commission a system, design token compilers, or audit check a legacy cluster? Fill out the interactive ledger inquiry or deploy an encrypted packet directly to our email matrix. Our core developers respond within one business day cycle.
              </p>
            </div>

            {/* Quick stats / Channels */}
            <div className="space-y-6 pt-6 border-t border-white/5">
              
              {/* Channel 1 */}
              <div className="flex gap-4 items-start text-left">
                <div 
                  style={{
                    borderColor: `${activeColor}20`,
                    color: activeColor,
                    backgroundColor: `${activeColor}05`,
                    transition: 'all 650ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  className="p-3 bg-white/[0.02] border rounded-xl text-white/70"
                >
                  <Mail size={16} />
                </div>
                <div>
                  <span className="block font-mono text-[10px] text-white/30 tracking-wider">SECURE INBOX</span>
                  <a
                    href="mailto:contact@frey.io?subject=Inquiry%20to%20FREY"
                    className="text-sm font-semibold text-white/90 hover:text-white transition-all hover:underline"
                  >
                    contact@frey.io
                  </a>
                </div>
              </div>

              {/* Channel 2 */}
              <div className="flex gap-4 items-start text-left">
                <div 
                  style={{
                    borderColor: `${activeColor}20`,
                    color: activeColor,
                    backgroundColor: `${activeColor}05`,
                    transition: 'all 650ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  className="p-3 bg-white/[0.02] border rounded-xl text-white/70"
                >
                  <Building2 size={16} />
                </div>
                <div>
                  <span className="block font-mono text-[10px] text-white/30 tracking-wider">REGISTRY HQ</span>
                  <span className="text-sm text-white/70">
                    Singapore, Financial District Complex VII
                  </span>
                </div>
              </div>

              {/* Channel 3 */}
              <div className="flex gap-4 items-start text-left">
                <div 
                  style={{
                    borderColor: `${activeColor}20`,
                    color: activeColor,
                    backgroundColor: `${activeColor}05`,
                    transition: 'all 650ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  className="p-3 bg-white/[0.02] border rounded-xl text-white/70"
                >
                  <Server size={16} />
                </div>
                <div>
                  <span className="block font-mono text-[10px] text-white/30 tracking-wider">CLUSTER ENCRYPTION</span>
                  <span className="text-xs font-mono text-white/40">
                    ECDH Prime-256 PGP Key: <span style={{ color: activeColor, transition: 'color 650ms' }} className="font-bold font-mono">0x7F2B...C2E1</span>
                  </span>
                </div>
              </div>

            </div>

            {/* Custom Brand Quote */}
            <div className="hidden lg:block mt-12 bg-white/[0.01] border border-white/[0.04] p-5 rounded-2xl text-left">
              <span 
                style={{
                  color: activeColor,
                  transition: 'color 650ms'
                }}
                className="font-mono text-[9px] uppercase tracking-widest block mb-2"
              >
                ● COMPLIANCE STANDARDS
              </span>
              <p className="text-[11px] font-mono leading-relaxed text-white/50">
                All communications sent to FREY are encrypted in transit and archived on zero-trust off-grid optical backplanes to adhere strictly to premium regulatory isolation criteria.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Submission Form / Sandbox Console */}
          <div className="lg:col-span-7">
            <div className="w-full bg-[#111114] border border-white/10 rounded-[32px] p-6 sm:p-10 relative overflow-hidden">
              
              {/* Shine backplate */}
              <div className="absolute top-0 right-0 w-[250px] h-[250px] rounded-full bg-white/[0.01] blur-2xl pointer-events-none" />
              
              {!submitSuccess ? (
                <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                  
                  {/* Fields Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col text-left">
                      <label htmlFor="client-name-input" className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2 block">
                        Commission Client Name*
                      </label>
                      <input
                        id="client-name-input"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Director of Architecture"
                        className="w-full bg-white/[0.02] border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all focus:bg-white/[0.04]"
                      />
                    </div>
                    
                    <div className="flex flex-col text-left">
                      <label htmlFor="client-email-input" className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2 block">
                        Communication Node Address (Email)*
                      </label>
                      <input
                        id="client-email-input"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. architect@firm.com"
                        className="w-full bg-white/[0.02] border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all focus:bg-white/[0.04]"
                      />
                    </div>
                  </div>

                  {/* Project Type selector chip-set */}
                  <div className="flex flex-col text-left">
                    <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-3 block">
                      Target Software Classification Engine
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'scale', label: 'Backend Memory Scale', sub: 'gRPC & Clustered Cache' },
                        { id: 'frontend', label: 'Adaptive Interface', sub: 'WebGL, Fluent React Componentry' },
                        { id: 'audit', label: 'Audit & Compliance', sub: 'NIST, SEC Audit Protocols' },
                      ].map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setProjectType(type.id)}
                          style={{
                            backgroundColor: projectType === type.id ? `${activeColor}15` : 'rgba(255, 255, 255, 0.01)',
                            borderColor: projectType === type.id ? activeColor : 'rgba(255, 255, 255, 0.05)',
                            color: projectType === type.id ? '#ffffff' : 'rgba(255,255,255,0.5)',
                            transition: 'all 650ms cubic-bezier(0.4, 0, 0.2, 1)',
                          }}
                          className="p-4 rounded-xl border text-left transition-all duration-300 outline-none cursor-pointer flex flex-col justify-between"
                        >
                          <span className="text-[11px] font-bold tracking-wider block mb-1 uppercase font-mono">
                            {type.label}
                          </span>
                          <span className="text-[9px] text-white/40 leading-none">
                            {type.sub}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget Selector Tier */}
                  <div className="flex flex-col text-left">
                    <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-3 block">
                      Bespoke Engineering Allocation Scale
                    </span>
                    <div className="grid grid-cols-3 bg-white/[0.02] border border-white/5 rounded-xl p-1 items-center">
                      {[
                        { id: 'low', range: '$10K – $25K', label: 'COMPACT STACK' },
                        { id: 'mid', range: '$25K – $100K', label: 'GROWTH ENGINE' },
                        { id: 'high', range: '$100K +', label: 'ENTERPRISE METRICS' },
                      ].map((bTier) => (
                        <button
                          key={bTier.id}
                          type="button"
                          onClick={() => setBudget(bTier.id)}
                          style={{
                            backgroundColor: budget === bTier.id ? activeColor : 'transparent',
                            color: budget === bTier.id ? '#000000' : 'rgba(255, 255, 255, 0.5)',
                            transition: 'all 300ms ease',
                          }}
                          className="text-center py-2.5 rounded-lg transition-all duration-300 outline-none cursor-pointer flex flex-col items-center"
                        >
                          <span className="font-mono text-[10px] tracking-wider uppercase font-bold">{bTier.range}</span>
                          <span 
                            style={{
                              color: budget === bTier.id ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.3)',
                              transition: 'color 300ms'
                            }}
                            className="text-[8px] tracking-tight"
                          >
                            {bTier.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="flex flex-col text-left">
                    <label htmlFor="client-statement-input" className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2 block">
                      System Requirements & Objective Specification Document*
                    </label>
                    <textarea
                      id="client-statement-input"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Outline core functionalities, high-throughput endpoints, caching metrics, or regulatory expectations..."
                      className="w-full bg-white/[0.02] border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all focus:bg-white/[0.04] resize-none"
                    />
                  </div>

                  {/* Submit Trigger Button */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HelpCircle size={14} className="text-white/30" />
                      <span className="text-[10px] font-mono text-white/30">
                        * Required node variables.
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !name || !email || !message}
                      style={{
                        backgroundColor: (isSubmitting || !name || !email || !message) ? 'rgba(255, 255, 255, 0.2)' : activeColor,
                        color: (isSubmitting || !name || !email || !message) ? 'rgba(255, 255, 255, 0.4)' : '#000000',
                        transition: 'all 650ms cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      className="px-6 py-3 text-xs font-mono tracking-widest uppercase font-bold rounded-full transition-all duration-200 flex items-center gap-2 hover:scale-103 active:scale-97 cursor-pointer disabled:hover:scale-100 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          COMMITTING...
                        </>
                      ) : (
                        <>
                          <span>DISPATCH INQUIRY</span>
                          <Send size={12} />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              ) : (
                /* Success Animated Ingestion Console */
                <div className="relative z-10 flex flex-col justify-between min-h-[380px]">
                  <div className="text-left mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        style={{
                          backgroundColor: `${activeColor}15`,
                          borderColor: `${activeColor}30`,
                          color: activeColor,
                          transition: 'all 650ms'
                        }}
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                      >
                        <CheckCircle size={20} />
                      </div>
                      <div>
                        <h4 className="text-white text-lg font-bold tracking-tight">INQUIRY INGESTED SUCCESSFULLY</h4>
                        <span className="text-[10px] font-mono text-white/40 tracking-wider uppercase block">
                          CHANNEL ROTATION VERIFIED
                        </span>
                      </div>
                    </div>
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                      Thank you. Your inquiry payload has bypassed filter pools and successfully completed the encryption process. Our engineering committee will re-compile this inquiry inside our internal planning workflow soon.
                    </p>
                  </div>

                  {/* Active JSON Terminal View */}
                  <div className="bg-[#08080a] border border-white/5 rounded-2xl p-5 font-mono text-xs text-left mb-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                      <div className="flex items-center gap-2">
                        <Terminal size={14} className="text-white/50" />
                        <span className="text-white/60 text-[11px] font-bold font-mono">packet-receipt-audit</span>
                      </div>
                      <span 
                        style={{
                          color: activeColor,
                          transition: 'color 650ms'
                        }}
                        className="font-mono text-[10px] tracking-wide"
                      >
                        [INGESTION_COMPILED]
                      </span>
                    </div>
                    <pre className="text-[11px] leading-tight text-white/50 overflow-x-auto max-h-[160px] font-mono select-text whitespace-pre-wrap">
                      {JSON.stringify(terminalPayload, null, 2)}
                    </pre>
                  </div>

                  {/* Action row */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-white/30 text-[9px] font-mono tracking-widest uppercase">
                      REF ID: {terminalPayload?.inquiryPayload?.validationChecksum || 'N/A'}
                    </span>
                    <button
                      type="button"
                      onClick={resetForm}
                      style={{
                        borderColor: `${activeColor}30`,
                        backgroundColor: `${activeColor}08`,
                        color: activeColor,
                        transition: 'all 650ms'
                      }}
                      className="px-5 py-2.5 hover:bg-white/[0.04] hover:border-white/30 rounded-full font-mono text-[10px] tracking-widest uppercase font-bold cursor-pointer"
                    >
                      [ INITIATE NEW PACKET ]
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
