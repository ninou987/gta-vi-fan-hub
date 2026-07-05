import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Volume2, UserCheck, AlertTriangle, Target, Compass, Award } from 'lucide-react';
import { charactersData } from '../data/gtaData';
import { Character } from '../types';

interface CharactersViewProps {
  initialId?: 'lucia' | 'jason';
}

export default function CharactersView({ initialId }: CharactersViewProps) {
  const [selectedId, setSelectedId] = useState<'lucia' | 'jason'>(initialId || 'lucia');

  useEffect(() => {
    if (initialId) {
      setSelectedId(initialId);
    }
  }, [initialId]);
  const [playingVoiceIdx, setPlayingVoiceIdx] = useState<number | null>(null);

  const character = charactersData.find((c) => c.id === selectedId) || charactersData[0];

  const handlePlayVoice = (idx: number) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any currently playing speech

      if (playingVoiceIdx === idx) {
        setPlayingVoiceIdx(null);
        return;
      }

      setPlayingVoiceIdx(idx);
      const utterance = new SpeechSynthesisUtterance(character.voiceLines[idx]);
      
      // Select appropriate voice if available
      const voices = window.speechSynthesis.getVoices();
      if (character.id === 'lucia') {
        const femaleVoice = voices.find(v => 
          v.name.toLowerCase().includes('female') || 
          v.name.toLowerCase().includes('zira') || 
          v.name.toLowerCase().includes('samantha') || 
          v.name.toLowerCase().includes('google us english') || 
          v.name.toLowerCase().includes('hazel') ||
          v.lang.startsWith('es') // Spanish/Latina hint for Lucia
        );
        if (femaleVoice) utterance.voice = femaleVoice;
        utterance.pitch = 1.05;
        utterance.rate = 0.95;
      } else {
        const maleVoice = voices.find(v => 
          v.name.toLowerCase().includes('male') || 
          v.name.toLowerCase().includes('david') || 
          v.name.toLowerCase().includes('google uk english male') || 
          v.name.toLowerCase().includes('microsoft mark') ||
          v.lang.startsWith('en')
        );
        if (maleVoice) utterance.voice = maleVoice;
        utterance.pitch = 0.85;
        utterance.rate = 0.95;
      }

      utterance.onend = () => {
        setPlayingVoiceIdx(null);
      };

      utterance.onerror = () => {
        setPlayingVoiceIdx(null);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback when Web Speech API is absent or locked
      setPlayingVoiceIdx(idx);
      setTimeout(() => {
        setPlayingVoiceIdx((prev) => (prev === idx ? null : prev));
      }, 3200);
    }
  };

  // Stop vocal logs on profile change or component unmount
  useState(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  });

  return (
    <div className="space-y-8 pb-12" id="characters-view-root">
      
      {/* Dossier Heading */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4" id="dossier-header-bar">
        <div>
          <span className="text-pink-500 font-mono text-[10px] tracking-widest uppercase font-black block mb-1">Target Profiles</span>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tighter uppercase leading-none">Confidential Lead Dossiers</h1>
        </div>

        {/* Co-Star Selector */}
        <div className="flex bg-black border border-white/10 p-1 w-full md:w-auto" id="character-tab-triggers">
          {charactersData.map((char) => (
            <button
              key={char.id}
              onClick={() => {
                if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                }
                setSelectedId(char.id);
                setPlayingVoiceIdx(null);
              }}
              className={`flex-1 md:flex-initial px-6 py-2.5 transition-colors font-display font-black text-xs uppercase tracking-widest ${
                selectedId === char.id
                  ? 'bg-pink-600 text-black'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
              id={`tab-btn-${char.id}`}
            >
              {char.name}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedId}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          id={`dossier-card-${selectedId}`}
        >
          
          {/* LEFT PANEL - Interactive mugshot and visual specs (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="rounded-none bg-black border border-white/10 p-5 relative overflow-hidden group">
              <div className="absolute top-3 left-3 text-[9px] text-zinc-500 font-mono tracking-widest uppercase">SYS.LOC: VC_903</div>
              <div className="absolute top-3 right-3 text-[9px] text-zinc-500 font-mono tracking-widest uppercase">REVISION: A</div>
              
              <div className="aspect-[3/4] w-full rounded-none overflow-hidden bg-[#09090b] border border-white/10 relative mt-6">
                <img 
                  src={character.imageUrl} 
                  alt={character.name}
                  className="w-full h-full object-cover filter saturate-[1.1] brightness-[0.85] contrast-[1.05]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                {/* Status sticker */}
                <div className="absolute bottom-4 left-4 bg-red-600 text-black font-display font-black text-[10px] tracking-widest px-3 py-1.5 shadow-xl uppercase flex items-center space-x-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-black" />
                  <span>{character.status}</span>
                </div>
              </div>

              {/* Tagline */}
              <p className="mt-4 text-center font-display italic text-pink-500 text-sm font-black uppercase tracking-wide">
                "{character.tagline}"
              </p>
            </div>

            {/* Suspected key equipment */}
            <div className="rounded-none bg-black border border-white/10 p-5 space-y-3">
              <h3 className="text-zinc-500 font-mono text-[9px] uppercase tracking-wider font-bold">Suspected Gear / Assets</h3>
              <div className="flex flex-wrap gap-2">
                {character.keyEquip.map((equip, idx) => (
                  <span 
                    key={idx} 
                    className="bg-[#09090b] px-3 py-1.5 text-xs text-zinc-300 font-mono border border-white/5"
                  >
                    {equip}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT PANEL - Crime stats, background, and voice logs (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Core biographical details */}
            <div className="rounded-none bg-black border border-white/10 p-6 space-y-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-pink-500" />
                <h3 className="text-xs font-display font-black text-white uppercase tracking-wider">Criminal Registry Details</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono py-3 border-y border-white/10">
                <div>
                  <span className="text-zinc-500 block uppercase text-[10px] font-bold">Identified Alias</span>
                  <span className="text-white text-sm font-bold block mt-0.5">{character.name}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block uppercase text-[10px] font-bold">Role Classification</span>
                  <span className="text-white text-sm font-bold block mt-0.5">{character.role}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block uppercase text-[10px] font-bold">Suspected Actor</span>
                  <span className="text-white text-sm font-bold block mt-0.5">{character.actor}</span>
                </div>
                <div className="mt-2">
                  <span className="text-zinc-500 block uppercase text-[10px] font-bold">Origin / Territory</span>
                  <span className="text-white text-sm font-bold block mt-0.5">{character.origin}</span>
                </div>
                <div className="mt-2">
                  <span className="text-zinc-500 block uppercase text-[10px] font-bold">Target Affiliates</span>
                  <span className="text-white text-sm font-bold block mt-0.5">{character.associates[0]}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-zinc-300 text-sm leading-relaxed font-sans">{character.description}</p>
                <p className="text-zinc-400 text-xs leading-relaxed font-sans">{character.bio}</p>
              </div>
            </div>

            {/* Special Ability Card */}
            <div className="rounded-none bg-black border-2 border-pink-500/30 p-5 space-y-2">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-pink-500" />
                <h4 className="text-white font-display font-black text-xs uppercase tracking-wider">Special Ability: <span className="text-pink-500">{character.specialAbility.name}</span></h4>
              </div>
              <p className="text-zinc-300 text-xs leading-relaxed font-sans">{character.specialAbility.description}</p>
            </div>

            {/* Core suspect attributes (Progress meters) */}
            <div className="rounded-none bg-black border border-white/10 p-6 space-y-4">
              <h3 className="text-white font-display font-black text-xs uppercase tracking-widest">Estimated Suspect Attributes</h3>
              <div className="space-y-4">
                {[
                  { name: 'Driving & Vehicle Handling', val: character.stats.driving, color: 'bg-cyan-500' },
                  { name: 'Stealth & Infiltration', val: character.stats.stealth, color: 'bg-pink-500' },
                  { name: 'Firearm & Shooting Accuracy', val: character.stats.shooting, color: 'bg-orange-400' },
                  { name: 'Athletic Stamina & Endurance', val: character.stats.stamina, color: 'bg-purple-500' },
                  { name: 'Strength & Close Combat', val: character.stats.strength, color: 'bg-white' },
                ].map((stat, idx) => (
                  <div key={idx} className="space-y-1" id={`stat-${selectedId}-${idx}`}>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-zinc-400 font-bold">{stat.name}</span>
                      <span className="text-white font-black">{stat.val}/100</span>
                    </div>
                    <div className="h-3 w-full bg-zinc-950 rounded-none overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.val}%` }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className={`h-full ${stat.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Intercepted Audio Logs */}
            <div className="rounded-none bg-black border border-white/10 p-5 space-y-4">
              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4 text-pink-500 animate-pulse" />
                <h3 className="text-white font-display font-black text-xs uppercase tracking-widest">Intercepted Vocal Logs</h3>
              </div>
              
              <div className="space-y-3">
                {character.voiceLines.map((line, idx) => {
                  const isPlaying = playingVoiceIdx === idx;
                  return (
                    <div 
                      key={idx}
                      onClick={() => handlePlayVoice(idx)}
                      className={`rounded-none border p-4 flex items-center justify-between gap-4 cursor-pointer transition-all ${
                        isPlaying 
                          ? 'bg-pink-500/10 border-pink-500' 
                          : 'bg-[#09090b] hover:bg-zinc-900 border-white/5'
                      }`}
                      id={`voice-line-${selectedId}-${idx}`}
                    >
                      <div className="space-y-1 flex-1">
                        <p className="text-zinc-200 text-xs italic font-sans">"{line}"</p>
                        {isPlaying && (
                          <div className="flex items-center space-x-1 h-3 mt-2" id="audio-wave-simulator">
                            {Array.from({ length: 18 }).map((_, waveIdx) => (
                              <motion.span 
                                key={waveIdx}
                                animate={{ height: [4, 12, 4] }}
                                transition={{ 
                                  repeat: Infinity, 
                                  duration: 0.6 + (waveIdx % 3) * 0.2,
                                  ease: 'easeInOut'
                                }}
                                className="w-[2px] bg-pink-500 block"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <button className={`p-2 rounded-none ${isPlaying ? 'bg-pink-500 text-black' : 'bg-white/5 text-zinc-400'}`}>
                        <Volume2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </motion.div>
      </AnimatePresence>

    </div>
  );
}
