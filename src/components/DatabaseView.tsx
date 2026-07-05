import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Car, Skull, Clock, Eye, SlidersHorizontal, AlertCircle } from 'lucide-react';
import { databaseItemsData } from '../data/gtaData';
import { DatabaseItem } from '../types';

interface DatabaseViewProps {
  initialTab?: 'vehicle' | 'weapon';
}

export default function DatabaseView({ initialTab }: DatabaseViewProps) {
  const [activeTab, setActiveTab] = useState<'vehicle' | 'weapon'>(initialTab || 'vehicle');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSimId, setActiveSimId] = useState<string | null>(null);
  const [simValue, setSimValue] = useState(0);

  const playSound = (type: 'vehicle' | 'weapon') => {
    if (typeof window === 'undefined') return;
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    try {
      const ctx = new AudioCtx();
      
      if (type === 'vehicle') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(60, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.3);
        osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.6);
        osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 1.0);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 1.5);
        
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 1.1);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 1.5);
      } else {
        const osc = ctx.createOscillator();
        const subGain = ctx.createGain();
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.15);
        subGain.gain.setValueAtTime(0.25, ctx.currentTime);
        subGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);
        osc.connect(subGain);
        subGain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);

        const bufferSize = ctx.sampleRate * 0.25;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.2, ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1000, ctx.currentTime);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        
        noise.start();
        noise.stop(ctx.currentTime + 0.25);
      }
    } catch (e) {
      console.warn("AudioContext block/error: ", e);
    }
  };

  const handleSimulate = (itemId: string, type: 'vehicle' | 'weapon') => {
    setActiveSimId(itemId);
    playSound(type);
    setSimValue(0);

    if (type === 'vehicle') {
      let start = 0;
      const interval = setInterval(() => {
        start += 15;
        if (start >= 100) {
          start = 100;
          clearInterval(interval);
          setTimeout(() => setActiveSimId(null), 500);
        }
        setSimValue(start);
      }, 100);
    } else {
      setSimValue(100);
      setTimeout(() => {
        setSimValue(20);
        setTimeout(() => {
          setActiveSimId(null);
        }, 400);
      }, 120);
    }
  };

  const items = databaseItemsData.filter((item) => item.type === activeTab);

  // Derive available categories for the active type
  const categories = ['All', ...Array.from(new Set(items.map((i) => i.category)))];

  // Filter items based on search and selected category
  const filteredItems = items.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.realLifeInspiration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getStatColor = (type: 'vehicle' | 'weapon') => {
    return type === 'vehicle' ? 'bg-cyan-500' : 'bg-pink-500';
  };

  return (
    <div className="space-y-8 pb-12" id="database-view-root">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4" id="db-header-block">
        <div>
          <span className="text-pink-500 font-mono text-[10px] tracking-widest uppercase font-black block mb-1">STATE ASSET REGISTER</span>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tighter uppercase leading-none">Confirmed Intel Database</h1>
          <p className="text-zinc-400 text-sm mt-2 font-sans max-w-2xl">
            Search and analyze the specs of motor vehicles, sports cycles, military gear, and firearms officially spotted in the game files.
          </p>
        </div>

        {/* Database Mode Switch */}
        <div className="flex bg-black border border-white/10 p-1 w-full md:w-auto" id="db-category-selector">
          <button
            onClick={() => {
              setActiveTab('vehicle');
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className={`flex-1 md:flex-initial px-6 py-2.5 transition-colors font-display font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 ${
              activeTab === 'vehicle'
                ? 'bg-pink-600 text-black'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Car className="h-4 w-4" />
            <span>Vehicles</span>
          </button>
          
          <button
            onClick={() => {
              setActiveTab('weapon');
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className={`flex-1 md:flex-initial px-6 py-2.5 transition-colors font-display font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 ${
              activeTab === 'weapon'
                ? 'bg-pink-600 text-black'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Skull className="h-4 w-4" />
            <span>Weapons</span>
          </button>
        </div>
      </div>

      {/* Query Bar & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center" id="db-filters-container">
        {/* Search Input */}
        <div className="md:col-span-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder={activeTab === 'vehicle' ? "Search cheetahs, sports coupes, dirtbikes, muscle cars..." : "Search standard pistols, combat rifles, tactical shotgun gauges..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black border border-white/10 rounded-none pl-11 pr-4 py-3.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500 transition-colors font-mono uppercase tracking-wider"
            id="db-search-input"
          />
        </div>

        {/* Categories indicator info */}
        <div className="md:col-span-4 flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-zinc-500 justify-end">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span>Refined Records: {filteredItems.length} found</span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 pb-2" id="db-pills-row">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`text-xs px-3.5 py-1.5 rounded-none border font-mono tracking-wider uppercase transition-all ${
              selectedCategory === category
                ? 'bg-pink-600 border-pink-500 text-black font-bold'
                : 'bg-[#09090b] border-white/10 text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid List */}
      <AnimatePresence mode="wait">
        {filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-none border border-dashed border-white/10 p-12 text-center"
            id="db-no-results"
          >
            <AlertCircle className="mx-auto h-12 w-12 text-zinc-500 mb-4 animate-bounce" />
            <h3 className="text-white font-display font-black text-sm uppercase tracking-wider">Intel Record Absent</h3>
            <p className="text-zinc-500 text-xs font-sans max-w-sm mx-auto mt-2">
              We couldn't locate any confirmed record matching your query. Try refining your keywords or toggling categories.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
            id="db-assets-grid"
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="rounded-none bg-black border border-white/10 p-6 space-y-5 hover:border-pink-500/50 transition-colors relative overflow-hidden group"
                id={`db-card-${item.id}`}
              >
                {/* Header indicators */}
                <div className="flex items-center justify-between">
                  <span className="bg-[#09090b] border border-white/10 px-2.5 py-1.5 text-[9px] uppercase font-mono tracking-widest text-zinc-400 font-semibold">
                    {item.category}
                  </span>

                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 text-[9px] font-mono font-black tracking-widest uppercase rounded-none">
                    {item.status}
                  </span>
                </div>

                {/* Info Block */}
                <div className="space-y-1">
                  <h3 className="text-xl font-display font-black text-white uppercase tracking-tight group-hover:text-pink-500 transition-colors">
                    {item.name}
                  </h3>
                  <div className="text-xs font-mono text-zinc-500 uppercase tracking-wide">
                    Inspiration: <span className="text-zinc-300 italic">{item.realLifeInspiration}</span>
                  </div>
                </div>

                <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                  {item.description}
                </p>

                {/* Specs progress */}
                <div className="space-y-3.5 border-t border-white/10 pt-4">
                  <h4 className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Performance Matrix</h4>
                  
                  <div className="space-y-3">
                    {[
                      { label: item.specs.stat1Name, val: item.specs.stat1Value },
                      { label: item.specs.stat2Name, val: item.specs.stat2Value },
                      { label: item.specs.stat3Name, val: item.specs.stat3Value },
                    ].map((stat, sIdx) => (
                      <div key={sIdx} className="space-y-1">
                        <div className="flex justify-between text-[11px] font-mono">
                          <span className="text-zinc-500 font-bold">{stat.label}</span>
                          <span className="text-zinc-200 font-black">{stat.val}/100</span>
                        </div>
                        <div className="h-3 w-full bg-zinc-950 rounded-none overflow-hidden border border-white/5">
                          <div
                            style={{ width: `${stat.val}%` }}
                            className={`h-full ${getStatColor(item.type)}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Simulation Deck */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5 gap-2">
                  <div className="flex items-center space-x-2 text-[10px] text-zinc-500 font-mono">
                    <Eye className="h-3.5 w-3.5 text-pink-500 shrink-0" />
                    <span>Spotted: <span className="text-white font-bold">{item.trailerSceneTime}</span></span>
                  </div>

                  <button
                    onClick={() => handleSimulate(item.id, item.type)}
                    className={`px-3 py-1.5 text-[9px] font-mono uppercase tracking-wider transition-colors select-none ${
                      activeSimId === item.id 
                        ? 'bg-pink-600 text-black font-black animate-pulse' 
                        : 'bg-white/5 border border-white/10 text-zinc-300 hover:bg-pink-600 hover:text-black hover:border-pink-500'
                    }`}
                  >
                    {activeSimId === item.id 
                      ? (item.type === 'vehicle' ? `REV_RPM: ${simValue}%` : 'FIRING!')
                      : (item.type === 'vehicle' ? 'Ignite Engine' : 'Testfire weapon')
                    }
                  </button>
                </div>

                {/* Simulated Telemetry HUD overlay when active */}
                <AnimatePresence>
                  {activeSimId === item.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-pink-500/5 pointer-events-none flex flex-col justify-between p-4 z-20 border border-pink-500"
                    >
                      {/* Grid line scanning HUD effect */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.12)_1px,transparent_1px)] bg-[size:100%_4px] animate-pulse pointer-events-none" />
                      <div className="flex justify-between items-center text-[8px] font-mono text-pink-500 tracking-widest font-black uppercase">
                        <span>SYS_SIM_ACTIVE</span>
                        <span>TELEMETRY_SECURE</span>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center h-full">
                        {item.type === 'vehicle' ? (
                          <div className="text-center space-y-1 bg-black/90 px-4 py-2 border border-pink-500/30">
                            <span className="text-[9px] font-mono text-zinc-400 block uppercase tracking-widest">DIAGNOSTIC_RPM_BURST</span>
                            <span className="text-lg font-display font-black text-white">{Math.min(7200, 1000 + simValue * 62)} RPM</span>
                          </div>
                        ) : (
                          <div className="text-center space-y-1 bg-black/90 px-4 py-2 border border-pink-500/30">
                            <span className="text-[9px] font-mono text-zinc-400 block uppercase tracking-widest">BARREL_RECOIL_FORCE</span>
                            <span className="text-lg font-display font-black text-pink-500">+{simValue}N IMPACT</span>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center text-[8px] font-mono text-pink-500 tracking-widest uppercase">
                        <span>DEPT: LEONIDA_TECH</span>
                        <span>STATUS: OK</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
