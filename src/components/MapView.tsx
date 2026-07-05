import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Map, Compass, Navigation, Eye, AlertTriangle, ShieldCheck, Waves, Trees, Building, MapPin } from 'lucide-react';
import { mapPointsData } from '../data/gtaData';
import { MapPoint } from '../types';

export default function MapView() {
  const [selectedPointId, setSelectedPointId] = useState<string>('vice-beach');

  const selectedPoint = mapPointsData.find((p) => p.id === selectedPointId) || mapPointsData[0];

  const getHazardStyles = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20';
      case 'Medium': return 'bg-amber-500/15 text-amber-400 border-amber-500/20';
      case 'High': return 'bg-orange-500/15 text-orange-400 border-orange-500/20';
      case 'Extreme': return 'bg-red-500/20 text-red-500 border-red-500/30';
      default: return 'bg-zinc-800 text-zinc-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'coastal': return Waves;
      case 'nature': return Trees;
      case 'urban': return Building;
      default: return Compass;
    }
  };

  return (
    <div className="space-y-8 pb-12" id="map-view-root">
      
      {/* Page header */}
      <div>
        <span className="text-pink-500 font-mono text-[10px] font-black tracking-widest uppercase block mb-1">GPS SPECTRAL TRACKING</span>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tighter uppercase leading-none">Leonida Tactical Radar</h1>
        <p className="text-zinc-400 text-sm mt-2 max-w-3xl font-sans">
          Speculated map coordinates and district hazard grids synthesized from the 2022 leaks, Trailer 1 landmarks, and real-life Florida geometry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COMPONENT - The Interactive Map Plotter (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] w-full rounded-none border border-white/10 bg-black overflow-hidden shadow-2xl p-2" id="radar-map-board">
            
            {/* Ambient tech overlays */}
            <div className="absolute top-4 left-4 z-10 bg-black/90 border border-white/10 p-3 rounded-none text-[10px] font-mono text-zinc-400 space-y-1">
              <div className="flex items-center space-x-1.5">
                <span className="h-2 w-2 rounded-full bg-pink-500 animate-ping" />
                <span className="text-white font-black tracking-widest">STATE RADAR ACTIVE</span>
              </div>
              <div>SAT_GPS: ACTIVE_BAND_5</div>
            </div>

            {/* Radar swept background */}
            <div className="absolute inset-0 bg-black bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black pointer-events-none" />
            
            {/* Abstract geographical shapes */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Coastlines */}
              <path d="M 0,25 Q 25,20 40,30 T 70,20 T 100,35 L 100,100 L 0,100 Z" fill="#1e1b4b" />
              {/* Wetlands */}
              <path d="M 25,50 Q 40,40 55,60 T 80,70 L 65,95 Z" fill="#064e3b" />
              {/* Keys islands */}
              <circle cx="20" cy="85" r="4" fill="#0c4a6e" />
              <circle cx="35" cy="88" r="3" fill="#0c4a6e" />
              <circle cx="50" cy="92" r="4.5" fill="#0c4a6e" />
              <circle cx="65" cy="90" r="3.5" fill="#0c4a6e" />
              {/* Ocean currents */}
              <path d="M10,80 Q 50,75 90,85" stroke="#0891b2" strokeWidth="0.2" fill="none" />
              <path d="M10,15 Q 50,10 90,20" stroke="#0891b2" strokeWidth="0.2" fill="none" />
            </svg>

            {/* Grid coordinates overlay */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-5 pointer-events-none border-t border-l border-white">
              {Array.from({ length: 36 }).map((_, gridIdx) => (
                <div key={gridIdx} className="border-r border-b border-white" />
              ))}
            </div>

            {/* Radar sweeper circle beam */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] origin-center bg-gradient-to-tr from-pink-500/0 via-pink-500/0 to-pink-500/5"
              />
            </div>

            {/* Map Plot Markers */}
            {mapPointsData.map((point) => {
              const isSelected = selectedPointId === point.id;
              const Icon = getCategoryIcon(point.category);
              return (
                <button
                  key={point.id}
                  onClick={() => setSelectedPointId(point.id)}
                  style={{ left: `${point.coordinates.x}%`, top: `${point.coordinates.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 focus:outline-none group"
                  id={`map-node-${point.id}`}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing glow for selected/hover states */}
                    {isSelected && (
                      <motion.span 
                        layoutId="marker-glow"
                        className="absolute h-10 w-10 bg-pink-500/30 border border-pink-500/20"
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ repeat: Infinity, duration: 1.8 }}
                      />
                    )}
                    
                    {/* Point Dot */}
                    <div className={`p-2.5 shadow-lg border transition-all ${
                      isSelected 
                        ? 'bg-pink-600 border-black text-black scale-110 z-30' 
                        : 'bg-zinc-900 border-zinc-700 text-zinc-300 group-hover:bg-zinc-800 group-hover:text-pink-500 group-hover:scale-105'
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>

                    {/* Popover text */}
                    <span className={`absolute top-8 whitespace-nowrap bg-black border border-white/10 text-[10px] font-mono font-bold px-2 py-0.5 rounded-none shadow transition-all ${
                      isSelected ? 'opacity-100 text-pink-500 scale-100' : 'opacity-0 group-hover:opacity-100 group-hover:scale-95 text-zinc-300'
                    }`}>
                      {point.name}
                    </span>
                  </div>
                </button>
              );
            })}

          </div>

          {/* Quick-select navigation buttons below */}
          <div className="flex flex-wrap gap-2 justify-center" id="map-quick-switches">
            {mapPointsData.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPointId(p.id)}
                className={`text-xs px-3 py-1.5 rounded-none border font-mono tracking-wider transition-all ${
                  selectedPointId === p.id
                    ? 'bg-pink-600 border-pink-500 text-black font-bold'
                    : 'bg-[#09090b] border-white/10 text-zinc-400 hover:bg-zinc-900 hover:text-white hover:border-white/20'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

        </div>

        {/* RIGHT COMPONENT - Detailed Intel Output (5 Cols) */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPoint.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="rounded-none bg-black border border-white/10 p-6 space-y-6"
              id={`map-intel-panel-${selectedPoint.id}`}
            >
              
              {/* Title Block */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-[#09090b] px-2.5 py-1 text-[9px] uppercase font-mono tracking-widest text-zinc-400 border border-white/5">
                    {selectedPoint.category}
                  </span>

                  <span className={`border px-2.5 py-1 text-[9px] font-mono font-black tracking-widest uppercase rounded-none ${getHazardStyles(selectedPoint.hazardLevel)}`}>
                    Hazard: {selectedPoint.hazardLevel}
                  </span>
                </div>

                <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-pink-500 shrink-0" />
                  <span>{selectedPoint.name}</span>
                </h2>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">District Overview</h4>
                <p className="text-zinc-300 text-sm leading-relaxed font-sans">{selectedPoint.description}</p>
              </div>

              {/* Geographic anchor details */}
              <div className="grid grid-cols-2 gap-4 border-t border-b border-white/10 py-4">
                <div className="space-y-1">
                  <span className="text-zinc-500 text-[9px] font-mono uppercase block">Counterpart</span>
                  <span className="text-white text-xs font-bold leading-tight font-display">{selectedPoint.realLifeCounterpart}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-zinc-500 text-[9px] font-mono uppercase block">Radar Pin</span>
                  <span className="text-white text-xs font-mono font-bold">X: {selectedPoint.coordinates.x}% | Y: {selectedPoint.coordinates.y}%</span>
                </div>
              </div>

              {/* Sights to see */}
              <div className="space-y-2.5">
                <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Recognized Landmarks</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedPoint.keySights.map((sight, idx) => (
                    <div key={idx} className="flex items-center space-x-2 rounded-none bg-[#09090b] p-2.5 border border-white/5 text-zinc-300">
                      <span className="h-1.5 w-1.5 bg-pink-500 block shrink-0" />
                      <span>{sight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Speculated Activities */}
              <div className="space-y-2.5">
                <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Crime / Activity Speculation</h4>
                <ul className="space-y-1.5 text-xs text-zinc-400 font-mono">
                  {selectedPoint.speculatedActivities.map((act, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-pink-500 shrink-0">↳</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trailer 1 Verification Screenshot description */}
              <div className="rounded-none bg-[#09090b] p-4 border border-white/10 space-y-1">
                <div className="flex items-center space-x-1.5 text-[9px] text-cyan-400 font-mono font-black uppercase tracking-wider">
                  <Eye className="h-3.5 w-3.5" />
                  <span>TRAILER_1 CONFIRMED</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed italic font-sans">
                  "{selectedPoint.screenshotDescription}"
                </p>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
