import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Compass, Users, Database, Newspaper, Film, ArrowRight, CornerDownRight, Volume2 } from 'lucide-react';
import { charactersData, mapPointsData, databaseItemsData, timelineEventsData, trailerFramesData } from '../data/gtaData';
import { ViewType } from '../types';

interface SearchViewProps {
  setView: (view: ViewType) => void;
  setSelectedCharacterId?: (id: any) => void;
  setSelectedDatabaseTab?: (tab: any) => void;
}

export default function SearchView({ setView, setSelectedCharacterId, setSelectedDatabaseTab }: SearchViewProps) {
  const [query, setQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setIsScanning(false);
      return;
    }
    setIsScanning(true);
    const timer = setTimeout(() => {
      setIsScanning(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [query]);

  const playScanBeep = () => {
    try {
      const audioCtx = typeof window !== 'undefined' ? (window.AudioContext || (window as any).webkitAudioContext) : null;
      if (audioCtx) {
        const ctx = new audioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1400, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(1900, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      }
    } catch(e){}
  };

  const handlePillClick = (term: string) => {
    setQuery(term);
    playScanBeep();
  };

  // Memoize searched results across datasets
  const results = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();

    const matchedCharacters = charactersData.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.description.toLowerCase().includes(q) ||
      c.role.toLowerCase().includes(q)
    );

    const matchedItems = databaseItemsData.filter(item => 
      item.name.toLowerCase().includes(q) || 
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.realLifeInspiration.toLowerCase().includes(q)
    );

    const matchedMapPoints = mapPointsData.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.realLifeCounterpart.toLowerCase().includes(q)
    );

    const matchedTimeline = timelineEventsData.filter(evt => 
      evt.title.toLowerCase().includes(q) || 
      evt.summary.toLowerCase().includes(q) ||
      evt.details.toLowerCase().includes(q)
    );

    const matchedFrames = trailerFramesData.filter(f => 
      f.title.toLowerCase().includes(q) || 
      f.description.toLowerCase().includes(q) ||
      f.easterEggs.some(egg => egg.toLowerCase().includes(q))
    );

    return {
      characters: matchedCharacters,
      database: matchedItems,
      map: matchedMapPoints,
      news: matchedTimeline,
      frames: matchedFrames,
      totalCount: matchedCharacters.length + matchedItems.length + matchedMapPoints.length + matchedTimeline.length + matchedFrames.length
    };
  }, [query]);

  const navigateToResult = (targetView: ViewType, subId?: string, extra?: string) => {
    // Sound beep
    playScanBeep();

    if (targetView === 'characters' && subId && setSelectedCharacterId) {
      setSelectedCharacterId(subId);
    } else if (targetView === 'database' && setSelectedDatabaseTab && extra) {
      setSelectedDatabaseTab(extra as any);
    }
    setView(targetView);
  };

  const suggestedPills = ['Lucia', 'Pegassi', 'Vice Beach', 'Pistol', 'Everglades', 'September 2022', 'Grotti', 'Glock'];

  return (
    <div className="space-y-8 pb-12" id="search-view-root">
      
      {/* Page Title */}
      <div>
        <span className="text-pink-500 font-mono text-[10px] tracking-widest uppercase font-black block mb-1">GLOBAL SURVEILLANCE DIRECTORY</span>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tighter uppercase leading-none">Catalog Intelligence Search</h1>
        <p className="text-zinc-400 text-sm mt-2 max-w-2xl font-sans">
          Cross-reference search coordinates, vehicle registrations, news archives, protagonists bios, and frame scanning indices on a unified index.
        </p>
      </div>

      {/* Main Search Input deck */}
      <div className="bg-black border border-white/10 p-6 md:p-8 space-y-4 rounded-none">
        
        <div className="relative">
          <Search className="absolute left-4 top-4.5 h-5 w-5 text-pink-500 animate-pulse" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.length % 3 === 0) playScanBeep();
            }}
            placeholder="SCAN DATABASES (e.g., Lucia, Grotti, Everglades, Weapon, September)..."
            className="w-full bg-[#09090b] border border-white/10 p-4 pl-12 text-sm sm:text-base text-white font-mono placeholder-zinc-600 focus:outline-none focus:border-pink-500 focus:shadow-[0_0_15px_rgba(236,72,153,0.1)]"
            autoFocus
          />
        </div>

        {/* Hot Suggestions */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest flex items-center gap-1">
            <Volume2 className="h-3 w-3" />
            Suggested Scans:
          </span>
          {suggestedPills.map((pill) => (
            <button
              key={pill}
              onClick={() => handlePillClick(pill)}
              className="px-2.5 py-1 text-[10px] font-mono bg-white/5 border border-white/5 text-zinc-400 hover:text-white hover:border-pink-500 hover:bg-pink-600/5 transition-all select-none rounded-none"
            >
              {pill}
            </button>
          ))}
        </div>

      </div>

      {/* Results Deck */}
      <div className="space-y-6">
        
        {isScanning ? (
          <div className="space-y-4" id="search-scanning-skeletons">
            <div className="text-[10px] font-mono text-pink-500 uppercase tracking-widest animate-pulse flex items-center gap-2 text-left">
              <span className="h-1.5 w-1.5 bg-pink-500" />
              <span>[SYSTEM_DECK] SCANNING LEONIDA INTEL DATABASE... PLEASE WAIT</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border border-white/5 bg-[#030303] p-5 space-y-4 relative overflow-hidden text-left">
                  <div className="flex items-center gap-2">
                    <div className="h-3.5 bg-zinc-900 w-16 animate-pulse" />
                    <div className="h-3.5 bg-zinc-900 w-12 animate-pulse" />
                  </div>
                  <div className="h-5 bg-zinc-800 w-1/2 animate-pulse" />
                  <div className="space-y-1.5 pt-2">
                    <div className="h-2.5 bg-zinc-900 w-full animate-pulse" />
                    <div className="h-2.5 bg-zinc-900 w-5/6 animate-pulse" />
                  </div>
                  <div className="h-3 bg-pink-500/10 w-24 animate-pulse mt-2" />
                </div>
              ))}
            </div>
          </div>
        ) : results === null ? (
          <div className="text-center py-16 bg-black border border-white/10">
            <Search className="h-8 w-8 text-zinc-700 mx-auto mb-3" />
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Enter keyword parameters to trace systemic data nodes.</p>
          </div>
        ) : results.totalCount === 0 ? (
          <div className="text-center py-16 bg-black border border-white/10">
            <p className="text-pink-500 font-mono text-xs uppercase tracking-widest">NO MATCHING DATA NODES IDENTIFIED IN LEONIDA ARCHIVES.</p>
            <p className="text-zinc-600 text-xs mt-2">Try scanning for "Pegassi", "Glock", "Lucia" or "Beach".</p>
          </div>
        ) : (
          <div className="space-y-6">
            
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest flex items-center justify-between border-b border-white/10 pb-2">
              <span>SCANNER OUTPUT SUMMARY</span>
              <span>IDENTIFIED RECORD MATCHES: <span className="text-pink-500 font-black">{results.totalCount}</span></span>
            </div>

            {/* Section: Characters */}
            {results.characters.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">
                  <Users className="h-4 w-4 text-pink-500" />
                  <span>Protagonists Dossiers ({results.characters.length})</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.characters.map(c => (
                    <div key={c.id} className="bg-black border border-white/10 p-5 flex flex-col justify-between space-y-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-zinc-500 block">ROLE: {c.role.toUpperCase()}</span>
                        <h3 className="text-lg font-display font-black text-white uppercase tracking-tight">{c.name}</h3>
                        <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">{c.description}</p>
                      </div>

                      <button
                        onClick={() => navigateToResult('characters', c.id)}
                        className="text-[10px] font-mono text-pink-500 uppercase tracking-wider hover:text-white flex items-center gap-1 select-none self-start"
                      >
                        <CornerDownRight className="h-3.5 w-3.5" />
                        Access Dossier profile
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section: Vehicles & Weapons */}
            {results.database.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">
                  <Database className="h-4 w-4 text-pink-500" />
                  <span>Weapons & Vehicles Index ({results.database.length})</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.database.map(item => (
                    <div key={item.id} className="bg-black border border-white/10 p-5 flex flex-col justify-between space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase bg-white/5 px-2 py-0.5 border border-white/5">
                            {item.type}
                          </span>
                          <span className="text-[9px] font-mono text-zinc-500 uppercase">
                            {item.category}
                          </span>
                        </div>
                        <h3 className="text-base font-display font-black text-white uppercase tracking-tight mt-1">{item.name}</h3>
                        <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">{item.description}</p>
                      </div>

                      <button
                        onClick={() => navigateToResult('database', undefined, item.type)}
                        className="text-[10px] font-mono text-pink-500 uppercase tracking-wider hover:text-white flex items-center gap-1 select-none self-start"
                      >
                        <CornerDownRight className="h-3.5 w-3.5" />
                        Scan {item.type} database
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section: Locations */}
            {results.map.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">
                  <Compass className="h-4 w-4 text-pink-500" />
                  <span>Speculated Map Sights ({results.map.length})</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.map.map(point => (
                    <div key={point.id} className="bg-black border border-white/10 p-5 flex flex-col justify-between space-y-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-zinc-500 block">HAZARD_LEVEL: <span className="text-pink-500 font-bold">{point.hazardLevel.toUpperCase()}</span></span>
                        <h3 className="text-base font-display font-black text-white uppercase tracking-tight">{point.name}</h3>
                        <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">{point.description}</p>
                      </div>

                      <button
                        onClick={() => navigateToResult('map')}
                        className="text-[10px] font-mono text-pink-500 uppercase tracking-wider hover:text-white flex items-center gap-1 select-none self-start"
                      >
                        <CornerDownRight className="h-3.5 w-3.5" />
                        Plot on radar map
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section: Timeline & Leaks */}
            {results.news.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">
                  <Newspaper className="h-4 w-4 text-pink-500" />
                  <span>Timeline & Leaks Registry ({results.news.length})</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.news.map(evt => (
                    <div key={evt.id} className="bg-black border border-white/10 p-5 flex flex-col justify-between space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-500">
                          <span>DATE: {evt.date}</span>
                          <span className={`uppercase font-bold ${evt.category === 'leak' ? 'text-red-400' : 'text-cyan-400'}`}>
                            {evt.category}
                          </span>
                        </div>
                        <h3 className="text-base font-display font-black text-white uppercase tracking-tight mt-1">{evt.title}</h3>
                        <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">{evt.summary}</p>
                      </div>

                      <button
                        onClick={() => navigateToResult(evt.category === 'leak' ? 'leaks' : 'news')}
                        className="text-[10px] font-mono text-pink-500 uppercase tracking-wider hover:text-white flex items-center gap-1 select-none self-start"
                      >
                        <CornerDownRight className="h-3.5 w-3.5" />
                        Inspect {evt.category === 'leak' ? 'leaks ledger' : 'news line'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section: Trailer Frames */}
            {results.frames.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">
                  <Film className="h-4 w-4 text-pink-500" />
                  <span>Trailer Scrubber Frames ({results.frames.length})</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.frames.map(frame => (
                    <div key={frame.id} className="bg-black border border-white/10 p-5 flex flex-col justify-between space-y-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-zinc-500 block">TIMESTAMP: {frame.timestamp}</span>
                        <h3 className="text-base font-display font-black text-white uppercase tracking-tight">{frame.title}</h3>
                        <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">{frame.description}</p>
                      </div>

                      <button
                        onClick={() => navigateToResult('breakdown')}
                        className="text-[10px] font-mono text-pink-500 uppercase tracking-wider hover:text-white flex items-center gap-1 select-none self-start"
                      >
                        <CornerDownRight className="h-3.5 w-3.5" />
                        Scrub frame details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
