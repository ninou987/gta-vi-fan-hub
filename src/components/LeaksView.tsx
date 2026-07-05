import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, ShieldAlert, Cpu, Layers, HardDrive, FileCode, CheckCircle2, ChevronRight, Lock } from 'lucide-react';

interface LeakRecord {
  id: string;
  title: string;
  category: 'system' | 'patents' | 'locomotion' | 'ai';
  date: string;
  impact: 'High' | 'Critical' | 'Medium';
  summary: string;
  details: string;
  technicalBits: string[];
}

const leakRecords: LeakRecord[] = [
  {
    id: 'sept-2022',
    title: 'The Great September 2022 Pre-Alpha Leak',
    category: 'system',
    date: 'Sept 18, 2022',
    impact: 'Critical',
    summary: 'A massive dump of 90 developmental clips showcasing early sandbox animations, Lucia and Jason camera pivots, debug prompts, and physical weapon-draw mechanics.',
    details: 'This historic leak confirmed two lead playable protagonists (Lucia and Jason) operating in a modern-day state of Leonida. It showcased real-time developer panels, Havok physical ragdoll debug graphics, and standard inventory weapon slings replacing the magical bottomless pocket system.',
    technicalBits: ['Build Level: Pre-Alpha (2021-2022)', 'Debug Overlay: RAGE 9 Renderer active', 'Confirmed Area: Port Gellhorn, Vice City Beach']
  },
  {
    id: 'loco-patent',
    title: 'Highly Dynamic Locomotion Patent',
    category: 'locomotion',
    date: 'Nov 04, 2023',
    impact: 'High',
    summary: 'A patent describing a sophisticated animation engine capable of blending poses based on weather, health, exhaustion, and surrounding terrain elements in real-time.',
    details: 'This patented technology allows the game engine to dynamically generate movement transitions rather than relying on pre-baked motion curves. Characters will shift weight depending on slope elevation, wind friction, or trauma levels, creating unprecedented athletic immersion.',
    technicalBits: ['Patent ID: US20230356102A1', 'System Name: Dynamic Pose Synthesizer', 'Impact: Weight distribution & physical context']
  },
  {
    id: 'npc-scheduling',
    title: 'Smart City Daily Routine AI Patent',
    category: 'ai',
    date: 'Dec 15, 2023',
    impact: 'High',
    summary: 'Rockstar patented scheduling logic where background NPCs possess individual memories, jobs, commute fatigue, and dynamically changing attitudes.',
    details: 'Instead of spawning randomly and walking in a loop, NPCs in Leonida have simulated "lives". A pedestrian spotted in Vice City Downtown during the day might be seen returning to their apartment in the Keys by evening, reacting uniquely to player reputation levels.',
    technicalBits: ['System Engine: Virtual Node Scheduler', 'Features: Resident memory, commute tracking', 'Complexity: Multi-tiered pedestrian nodes']
  },
  {
    id: 'water-physics',
    title: 'Advanced Volumetric Water Shader Leak',
    category: 'system',
    date: 'Feb 10, 2024',
    impact: 'Medium',
    summary: 'Technical leaks describing Rockstar San Diego\'s custom volumetric wave simulations, underwater refraction maps, and realistic beach foam tides.',
    details: 'Leonida is surrounded by massive coastal waters, reefs, and everglades. The custom water shader incorporates ocean current drag, boat hull foam physics, and dynamic wave height based on localized storm conditions. Dynamic wind speeds create realistic whitecaps.',
    technicalBits: ['Physics Engine: Real-time Navier-Stokes approximations', 'Features: Hydrodynamic boat drag, volumetric beach spray', 'Renderer: GPU-based wave height solver']
  }
];

export default function LeaksView() {
  const [selectedLeakId, setSelectedLeakId] = useState<string>(leakRecords[0].id);
  const [terminalSearch, setTerminalSearch] = useState('');
  const [decryptionActive, setDecryptionActive] = useState<string | null>(null);

  const selectedLeak = leakRecords.find(l => l.id === selectedLeakId) || leakRecords[0];

  const filteredLeaks = leakRecords.filter(leak => 
    leak.title.toLowerCase().includes(terminalSearch.toLowerCase()) ||
    leak.summary.toLowerCase().includes(terminalSearch.toLowerCase())
  );

  const triggerDecryptMock = (id: string) => {
    setDecryptionActive(id);
    const audioCtx = typeof window !== 'undefined' ? (window.AudioContext || (window as any).webkitAudioContext) : null;
    if (audioCtx) {
      try {
        const ctx = new audioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(1600, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } catch (e) {
        // Safe bypass
      }
    }
    setTimeout(() => {
      setDecryptionActive(null);
      setSelectedLeakId(id);
    }, 600);
  };

  return (
    <div className="space-y-8 pb-12" id="leaks-view-root">
      
      {/* Title block */}
      <div>
        <span className="text-pink-500 font-mono text-[10px] tracking-widest uppercase font-black block mb-1">DECRYPTED DEV INTELLIGENCE</span>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tighter uppercase leading-none">Developmental Leaks & Patents</h1>
        <p className="text-zinc-400 text-sm mt-2 max-w-3xl font-sans">
          Curated archive of early RAGE engine structural leaks, technical patent filings, and developmental milestones compiled by the research community.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Decrypted Files List (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-black border border-white/10 p-4 space-y-3 rounded-none">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-bold">Terminal Filter</span>
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            </div>
            <input 
              type="text" 
              placeholder="SEARCH REGISTER..." 
              value={terminalSearch}
              onChange={(e) => setTerminalSearch(e.target.value)}
              className="w-full bg-[#09090b] border border-white/10 p-2.5 text-xs text-green-500 font-mono focus:outline-none focus:border-green-500"
            />
          </div>

          <div className="space-y-2">
            {filteredLeaks.map((leak) => {
              const isSelected = selectedLeakId === leak.id;
              const isDecrypting = decryptionActive === leak.id;
              
              return (
                <button
                  key={leak.id}
                  onClick={() => triggerDecryptMock(leak.id)}
                  className={`w-full text-left p-4 rounded-none border transition-all relative overflow-hidden flex items-center justify-between ${
                    isSelected 
                      ? 'bg-green-500/5 border-green-500 text-green-400' 
                      : 'bg-black border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  {isDecrypting && (
                    <div className="absolute inset-0 bg-green-500/10 backdrop-blur-sm flex items-center justify-center font-mono text-[10px] text-green-400 tracking-widest uppercase">
                      Decryption key syncing...
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      {leak.category === 'system' && <HardDrive className="h-3.5 w-3.5" />}
                      {leak.category === 'patents' && <Cpu className="h-3.5 w-3.5" />}
                      {leak.category === 'locomotion' && <Layers className="h-3.5 w-3.5" />}
                      {leak.category === 'ai' && <Terminal className="h-3.5 w-3.5" />}
                      <span className="text-[9px] font-mono uppercase tracking-wider bg-white/5 px-2 py-0.5 text-zinc-500 border border-white/5">
                        {leak.category}
                      </span>
                      <span className={`text-[8px] font-mono uppercase tracking-widest px-1.5 py-0.5 font-bold ${
                        leak.impact === 'Critical' ? 'bg-red-950 text-red-400 border border-red-800/30' : 'bg-orange-950 text-orange-400 border border-orange-800/30'
                      }`}>
                        {leak.impact}
                      </span>
                    </div>
                    <h3 className="font-display font-black text-sm uppercase tracking-tight mt-1">
                      {leak.title}
                    </h3>
                    <div className="text-[10px] font-mono text-zinc-500">{leak.date}</div>
                  </div>
                  
                  <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${isSelected ? 'translate-x-1 text-green-400' : 'text-zinc-600'}`} />
                </button>
              );
            })}
          </div>

          <div className="bg-black border border-white/10 p-4 rounded-none">
            <div className="flex items-center space-x-2 text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
              <ShieldAlert className="h-4 w-4 text-pink-500 shrink-0" />
              <span>DISCLAIMER REGISTRY</span>
            </div>
            <p className="text-[10px] text-zinc-500 font-sans mt-2 leading-relaxed">
              We host no media content, source code links, or copy-protected downloadable archives. All reports are descriptive analyses sourced from public articles.
            </p>
          </div>

        </div>

        {/* Right Side: Decrypted Dossier Output (7 Cols) */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedLeak.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-black border border-white/10 p-6 md:p-8 space-y-6 rounded-none relative overflow-hidden"
              id="leaks-terminal-output"
            >
              {/* Matrix digital grid bg */}
              <div className="absolute top-0 right-0 p-3 text-[8px] font-mono text-zinc-700 tracking-widest uppercase">
                NODE_SECURE: RAGE_0x2A
              </div>

              <div className="space-y-2 border-b border-white/10 pb-4">
                <span className="text-[10px] font-mono text-green-500 uppercase tracking-wider block">Decrypted File Stream</span>
                <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight">
                  {selectedLeak.title}
                </h2>
                <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-500 pt-1">
                  <div>REGISTRY_DATE: <span className="text-white">{selectedLeak.date}</span></div>
                  <div>SECURITY_LEAK: <span className="text-pink-500 uppercase font-black">{selectedLeak.impact}</span></div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Executive Summary</h4>
                <p className="text-zinc-300 text-sm leading-relaxed font-sans">
                  {selectedLeak.summary}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Detailed Synthesis</h4>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                  {selectedLeak.details}
                </p>
              </div>

              {/* Technical indicators bullet lists */}
              <div className="space-y-3 bg-[#09090b] border border-white/5 p-4 rounded-none">
                <div className="flex items-center space-x-2 text-[10px] text-green-400 font-mono uppercase tracking-widest font-black">
                  <FileCode className="h-4 w-4" />
                  <span>Technical Specifications Log</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-zinc-400 mt-2">
                  {selectedLeak.technicalBits.map((bit, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                      <span>{bit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simulated diagnostic trace */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500">
                  <Lock className="h-3 w-3 text-zinc-600" />
                  <span>DECRYPTION_HASH_KEY: SHA256_F981C09E...</span>
                </div>
                <span className="text-[10px] font-mono text-green-500 uppercase tracking-widest font-black block">
                  ● NODE INTEGRITY SECURE
                </span>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
