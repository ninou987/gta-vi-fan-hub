import { motion } from 'motion/react';
import { Award, ShieldAlert, Cpu, Heart, CheckCircle2, Globe, Users, Database } from 'lucide-react';

export default function AboutView() {
  return (
    <div className="space-y-8 pb-12" id="about-view-root">
      
      {/* Page Title */}
      <div>
        <span className="text-pink-500 font-mono text-[10px] tracking-widest uppercase font-black block mb-1">INTEL CREDITS & DISCLAIMERS</span>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tighter uppercase leading-none">About Fan Hub Project</h1>
        <p className="text-zinc-400 text-sm mt-2 max-w-2xl font-sans">
          Welcome to the ultimate interactive fan project dedicated to archiving Grand Theft Auto VI. Discover the technology, mission, and community groups driving the compilation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Mission & Specs (8 columns) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Main Card */}
          <div className="bg-black border border-white/10 p-6 sm:p-8 space-y-6 rounded-none relative">
            <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight border-b border-white/10 pb-3">
              Encyclopedic Mission
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
              This fan hub is a comprehensive, community-led project designed to provide players with a clean, high-fidelity interactive dashboard. We track public developmental milestones, analyze trailer frames, catalog confirmed items, and map speculated landmarks. 
            </p>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
              Our absolute priority is respecting user intent, clean information hierarchy, and professional UI guidelines. No intrusive telemetry, simulated spam, or unrequested secondary databases. Just raw, polished Grand Theft Auto VI information.
            </p>
          </div>

          {/* Grid stack of tech specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="bg-black border border-white/10 p-5 space-y-3">
              <div className="flex items-center space-x-2 text-pink-500">
                <Cpu className="h-5 w-5" />
                <h3 className="font-display font-black text-white uppercase tracking-tight text-sm">System Framework Stack</h3>
              </div>
              <p className="text-zinc-400 text-xs font-sans leading-relaxed">
                Engineered cleanly using React 18+ with Vite for fast static-delivery, styled with high-density utility classes from Tailwind CSS.
              </p>
              <div className="space-y-1.5 pt-2 text-[10px] font-mono text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                  <span>Vite Static Compilation Assets</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                  <span>Framer Motion Component Layers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                  <span>Lucide Unified Vector Glyphs</span>
                </div>
              </div>
            </div>

            <div className="bg-black border border-white/10 p-5 space-y-3">
              <div className="flex items-center space-x-2 text-pink-500">
                <Heart className="h-5 w-5 animate-pulse" />
                <h3 className="font-display font-black text-white uppercase tracking-tight text-sm">Community Contributors</h3>
              </div>
              <p className="text-zinc-400 text-xs font-sans leading-relaxed">
                Credits to multiple brilliant community groups whose public coordinates analysis made this interactive encyclopedia possible:
              </p>
              <div className="space-y-1.5 pt-2 text-[10px] font-mono text-zinc-400 font-sans">
                <div>● <strong className="text-white">GTA VI Mapping Group</strong> - Sights and scales speculation.</div>
                <div>● <strong className="text-white">RAGE Engine Patents Analysts</strong> - Developmental system discovery.</div>
                <div>● <strong className="text-white">Vice City Fans community</strong> - Chronology compilations.</div>
              </div>
            </div>

          </div>

          {/* Trademark and copyright disclaimers (Crucial for a fan hub to establish authenticity) */}
          <div className="bg-pink-950/10 border border-pink-500/20 p-6 space-y-3 rounded-none">
            <div className="flex items-center space-x-2 text-[10px] text-pink-500 font-mono tracking-widest font-black uppercase">
              <ShieldAlert className="h-5 w-5 shrink-0" />
              <span>LEGAL DISCLAIMER MEMORANDUM</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
              This interactive platform is an unofficial, 100% non-commercial, fan-made educational encyclopedia. 
              <strong> Rockstar Games, Rockstar North, Take-Two Interactive, Grand Theft Auto, GTA VI, GTA 6</strong>, and associated logos, titles, and media clips are registered trademarks, copyrights, and intellectual properties of Rockstar Games and Take-Two Interactive. 
            </p>
            <p className="text-[11px] text-zinc-500 font-sans">
              No copyright infringement is intended. We host no download archives, crack tools, or physical source codes. This hub operates purely as a central visual board compiling publicly disseminated details and community analysis.
            </p>
          </div>

        </div>

        {/* Right Side: Site Stats Side-bar (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Live System Counter */}
          <div className="bg-black border border-white/10 p-5 space-y-4 rounded-none">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black border-b border-white/10 pb-2">
              <Globe className="h-4 w-4 text-pink-500" />
              <span>Live Hub Synchronization</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-400 font-sans">Community Visitors Online:</span>
                <span className="text-xs font-mono font-bold text-green-400 animate-pulse">● 246 ACTIVE</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-400 font-sans">Articles Cataloged:</span>
                <span className="text-xs font-mono font-bold text-white">42 Entries</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-400 font-sans">Vehicles / Weapons cataloged:</span>
                <span className="text-xs font-mono font-bold text-white">18 Confirmed</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-400 font-sans">Radar Sights plotted:</span>
                <span className="text-xs font-mono font-bold text-white">10 Sights</span>
              </div>
            </div>
          </div>

          {/* Safe play rules card */}
          <div className="bg-black border border-white/10 p-5 space-y-3 rounded-none">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-black">
              <Users className="h-4 w-4 text-pink-500" />
              <span>Safe Play Guidelines</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
              Our site remains fully accessible to players of all backgrounds. We adhere to high visual contrast standards, support keyboard navigations, and provide synthesized voice previews of protagonist voice-logs for auditory convenience.
            </p>
          </div>

          {/* Quick link */}
          <div className="bg-[#09090b] border border-white/5 p-4 text-center rounded-none">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block tracking-wider mb-2">Developed with Passion by Fans</span>
            <div className="text-xs text-pink-500 font-mono font-bold flex items-center justify-center gap-1">
              <Award className="h-4 w-4" />
              <span>EST. 2024 VICE CITY DIRECTORY</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
