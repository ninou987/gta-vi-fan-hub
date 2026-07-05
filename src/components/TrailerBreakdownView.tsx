import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Eye, Flame, Film, ListChecks, ArrowLeft, ArrowRight, Gauge, HelpCircle } from 'lucide-react';
import { trailerFramesData } from '../data/gtaData';
import { TrailerFrame } from '../types';

export default function TrailerBreakdownView() {
  const [selectedFrameId, setSelectedFrameId] = useState<number>(1);

  const selectedFrame = trailerFramesData.find((f) => f.id === selectedFrameId) || trailerFramesData[0];

  const handlePrevFrame = () => {
    if (selectedFrameId > 1) {
      setSelectedFrameId(selectedFrameId - 1);
    }
  };

  const handleNextFrame = () => {
    if (selectedFrameId < trailerFramesData.length) {
      setSelectedFrameId(selectedFrameId + 1);
    }
  };

  return (
    <div className="space-y-8 pb-12" id="breakdown-view-root">
      
      {/* Title */}
      <div>
        <span className="text-pink-500 font-mono text-[10px] tracking-widest uppercase font-black block mb-1">CINEMATIC FRAME SCRUBBER</span>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tighter uppercase leading-none">Trailer 1 Frame Analyzer</h1>
        <p className="text-zinc-400 text-sm mt-2 max-w-2xl font-sans">
          Scrub through verified cinematic frames from Grand Theft Auto VI Trailer 1. Discover hidden Easter eggs, game engine insights, and lore secrets.
        </p>
      </div>

      {/* Main Breakdown Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COMPONENT - Video Frame Player & Controller (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-none border border-white/10 bg-black p-4 relative overflow-hidden shadow-2xl space-y-4">
            
            {/* Ambient hud coordinates */}
            <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-widest text-zinc-500">
              <span>SCANNER_FRAME: {selectedFrame.timestamp}</span>
              <span>LORE_LEVEL: VERIFIED</span>
            </div>

            {/* Simulated cinematic viewport screen */}
            <div className="aspect-video w-full rounded-none overflow-hidden bg-[#09090b] border border-white/10 relative group">
              <img 
                src={selectedFrame.imageUrl} 
                alt={selectedFrame.title}
                className="w-full h-full object-cover filter saturate-[1.05] brightness-[0.85]"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

              {/* Title label overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] bg-pink-600 text-black font-black px-2 py-1 rounded-none tracking-widest uppercase inline-block">
                    Timestamp: {selectedFrame.timestamp}
                  </span>
                  <h3 className="text-white text-base font-display font-black uppercase tracking-tight">
                    {selectedFrame.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Custom media player controls bar */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4" id="media-deck-controls">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handlePrevFrame}
                  disabled={selectedFrameId === 1}
                  className="rounded-none p-2.5 bg-[#09090b] border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-900 disabled:opacity-40 transition-colors"
                  id="media-btn-prev"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <button 
                  onClick={handleNextFrame}
                  disabled={selectedFrameId === trailerFramesData.length}
                  className="rounded-none p-2.5 bg-[#09090b] border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-900 disabled:opacity-40 transition-colors"
                  id="media-btn-next"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Slider timeline scrubber */}
              <div className="flex-1 mx-6 flex items-center space-x-2">
                <Film className="h-4 w-4 text-zinc-500 shrink-0" />
                <div className="h-3 flex-1 bg-zinc-950 rounded-none overflow-hidden relative border border-white/5">
                  <div 
                    style={{ width: `${(selectedFrameId / trailerFramesData.length) * 100}%` }}
                    className="h-full bg-pink-600"
                  />
                </div>
                <span className="text-[10px] text-zinc-400 font-mono shrink-0">
                  {selectedFrameId}/{trailerFramesData.length}
                </span>
              </div>
            </div>

          </div>

          {/* Interactive Frame strip thumbnail row */}
          <div className="rounded-none bg-black border border-white/10 p-5 space-y-3">
            <h4 className="text-zinc-500 font-mono text-[9px] uppercase tracking-widest font-black">Cinematic Chronological Roll</h4>
            
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {trailerFramesData.map((frame) => {
                const isSelected = selectedFrameId === frame.id;
                return (
                  <button
                    key={frame.id}
                    onClick={() => setSelectedFrameId(frame.id)}
                    className={`aspect-video w-full rounded-none overflow-hidden relative border transition-all ${
                      isSelected 
                        ? 'border-pink-500 border-2 z-10' 
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <img 
                      src={frame.imageUrl} 
                      alt={frame.title} 
                      className="w-full h-full object-cover filter saturate-[0.8] brightness-[0.7]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-[9px] text-white font-mono font-black bg-black/90 px-1.5 py-0.5 rounded-none border border-white/10">
                        {frame.timestamp}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT COMPONENT - Frame details, easter eggs list, impact matrix (5 Cols) */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFrame.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="rounded-none bg-black border border-white/10 p-6 space-y-6"
              id={`breakdown-panel-${selectedFrame.id}`}
            >
              
              {/* Heading */}
              <div className="space-y-3">
                <span className="bg-[#09090b] border border-white/10 px-2.5 py-1 text-[9px] uppercase font-mono tracking-widest text-zinc-400">
                  Verified Scene Analysis
                </span>
                <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight">
                  {selectedFrame.title}
                </h3>
              </div>

              {/* Scene description */}
              <div className="space-y-1">
                <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Scene Synopsis</h4>
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans">
                  {selectedFrame.description}
                </p>
              </div>

              {/* Narrative / Engine Impact gauge */}
              <div className="rounded-none bg-[#09090b] p-4 border border-white/10 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1.5 text-[9px] font-mono text-zinc-400 uppercase tracking-wider font-black">
                    <Gauge className="h-4 w-4 text-pink-500" />
                    <span>Lore & Visual Impact Score</span>
                  </div>
                  <span className="text-pink-500 font-mono text-sm font-black">{selectedFrame.impactRating}/10</span>
                </div>
                
                <div className="h-3 w-full bg-zinc-950 rounded-none overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedFrame.impactRating * 10}%` }}
                    className="h-full bg-pink-600"
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Easter eggs checklist */}
              <div className="space-y-3">
                <div className="flex items-center space-x-1.5 text-[10px] text-zinc-400 font-mono uppercase tracking-widest font-black">
                  <ListChecks className="h-4 w-4 text-pink-500" />
                  <span>Hidden Secrets Spotted</span>
                </div>
                
                <div className="space-y-2">
                  {selectedFrame.easterEggs.map((egg, eggIdx) => (
                    <div 
                      key={eggIdx} 
                      className="rounded-none bg-[#09090b] border border-white/5 p-4 flex items-start space-x-3 text-xs text-zinc-300 transition-colors"
                    >
                      <span className="h-2 w-2 bg-pink-500 shrink-0 mt-1.5 animate-pulse" />
                      <p className="leading-relaxed font-sans">{egg}</p>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
