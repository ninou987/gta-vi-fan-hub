import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Flame, ExternalLink, Calendar, Heart, MessageSquare, ShieldAlert, Sparkles, User, HelpCircle } from 'lucide-react';
import { socialFeedData } from '../data/gtaData';

interface HomeViewProps {
  setView: (view: string) => void;
}

const COUNTDOWN_TARGETS = [
  { id: 'release', label: 'Confirmed Fall 2026 Release', date: '2026-11-17T00:00:00', note: 'Based on Take-Two strategic shareholder projection logs.' },
  { id: 'preorder', label: 'Pre-order Distribution Campaign', date: '2026-08-25T10:00:00', note: 'Anticipated physical store catalog SKU deployment.' },
  { id: 'trailer2', label: 'Keynote Marketing Trailer 2', date: '2026-10-15T15:00:00', note: 'Historically aligned with Rockstar autumnal reveal rollouts.' },
  { id: 'pc', label: 'Speculated PC Port Release', date: '2027-11-20T00:00:00', note: 'Based on developer console-to-desktop timeline deltas.' }
];

export default function HomeView({ setView }: HomeViewProps) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [activeTargetId, setActiveTargetId] = useState<string>('release');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const selectedTarget = COUNTDOWN_TARGETS.find(t => t.id === activeTargetId) || COUNTDOWN_TARGETS[0];

  // Calculate live countdown to selected target date
  useEffect(() => {
    const targetDate = new Date(selectedTarget.date).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [activeTargetId, selectedTarget]);

  const quickFacts = [
    { label: 'Confirmed Location', value: 'State of Leonida (Vice City & counties)', desc: 'Heavily inspired by Florida, featuring deep wetlands, coastal keys, and neon cityscapes.' },
    { label: 'Lead Protagonists', value: 'Lucia & Jason (Dual Co-op)', desc: 'A Bonnie and Clyde-style duo navigating heist ventures, street gangs, and high-speed pursuits.' },
    { label: 'Target Launch', value: 'Fall 2025 / Early 2026', desc: 'Parent company Take-Two has locked Fall 2025 in recent financial forecasting conferences.' },
    { label: 'Engine Upgrade', value: 'RAGE Engine v9', desc: 'Next-generation physics, unprecedented ocean shader fidelity, and highly reactive AI systems.' },
    { label: 'Target Platforms', value: 'PlayStation 5 | Xbox Series X|S', desc: 'Designed natively from the ground up for current-gen ultra-high speed console storage architectures.' },
  ];

  return (
    <div className="space-y-12 pb-12" id="home-view-container">
      
      {/* 1. HERO TRAILER PANEL */}
      <section className="relative overflow-hidden rounded-none bg-black border border-white/10" id="hero-trailer-panel">
        <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-pink-500 to-orange-400" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-500/10 via-purple-500/5 to-transparent pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center">
          
          {/* Hero Pitch */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-pink-500 px-3 py-1 text-[10px] font-mono font-bold text-black tracking-widest uppercase">
              <Sparkles className="h-3 w-3 shrink-0" />
              <span>THE FIRST LOOK IN 10 YEARS</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tighter text-white uppercase leading-none">
              Welcome back to <br />
              <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent block">
                Vice City
              </span>
            </h1>
            
            <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
              Grand Theft Auto VI heads to the state of Leonida, home to the neon-soaked streets of Vice City and beyond, in the most immersive evolution of the Grand Theft Auto series yet.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button 
                onClick={() => setIsPlayingVideo(true)}
                className="flex items-center space-x-2 rounded-none bg-pink-600 px-6 py-3.5 text-xs font-display font-black uppercase tracking-wider text-black hover:bg-pink-500 transition-colors"
                id="watch-trailer-hero-btn"
              >
                <Play className="h-4 w-4 fill-current text-black" />
                <span>Watch Trailer 1</span>
              </button>
              
              <button 
                onClick={() => setView('breakdown')}
                className="flex items-center space-x-2 rounded-none bg-zinc-900 hover:bg-zinc-850 px-5 py-3.5 text-xs font-display font-black uppercase tracking-wider text-white border border-white/10 transition-colors"
                id="breakdown-tab-link-btn"
              >
                <span>Timestamps Analysis</span>
              </button>
            </div>
          </div>

          {/* Video / Interactive Poster Area */}
          <div className="lg:col-span-7" id="trailer-player-box">
            <div className="aspect-video w-full rounded-none overflow-hidden border border-white/10 bg-black shadow-2xl relative">
              {!isPlayingVideo ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="absolute inset-0 bg-cover bg-center opacity-40 filter brightness-50" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  
                  {/* Floating play badge */}
                  <button 
                    onClick={() => setIsPlayingVideo(true)}
                    className="relative z-10 bg-white p-5 text-black hover:bg-pink-500 transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    id="play-video-overlay-btn"
                  >
                    <Play className="h-8 w-8 fill-current translate-x-0.5 text-black" />
                  </button>
                  <span className="relative z-10 mt-5 text-white font-display font-black tracking-widest text-sm uppercase">Click to stream reveal trailer</span>
                  <span className="relative z-10 text-pink-500 text-[10px] font-mono tracking-widest uppercase mt-2">TOM PETTY - "LOVE IS A LONG ROAD"</span>
                </div>
              ) : (
                <iframe
                  title="GTA VI Trailer 1"
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/QdBZY2fkU-0?autoplay=1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
            </div>
          </div>

        </div>
      </section>

      {/* BREAKING NEWS MARQUEE TICKER */}
      <div className="bg-red-950/20 border-y border-red-500/30 py-2.5 overflow-hidden relative" id="breaking-ticker-marquee">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 35s linear infinite;
          }
        `}</style>
        <div className="absolute left-0 top-0 bottom-0 bg-red-600 text-black px-3.5 py-1 flex items-center font-display font-black text-[10px] tracking-widest uppercase z-10 border-r border-red-500">
          [ALERTS]
        </div>
        <div className="animate-marquee whitespace-nowrap gap-12 text-[10px] font-mono uppercase text-red-400 pl-24">
          <span>● STATE OF LEONIDA PUBLIC TRANSIT AUTOMATION SYSTEM COMPILING LIVE DRIVER METADATA...</span>
          <span>● RUMORED CO-OP MISSIONS DETECTED IN UNPUBLISHED ROCKSTAR CLOUD SERVERS...</span>
          <span>● VOLUMETRIC CLOUDS SHADER OVERHAUL CONFIRMED BY INTERNAL DEVELOPER GRAPHICS BLUEPRINTS...</span>
          <span>● MULTIPLAYER SERVER ENCRYPTED CORDS SPOTLIGHTING HAMLET RECREATION...</span>
          <span>● STATE OF LEONIDA PUBLIC TRANSIT AUTOMATION SYSTEM COMPILING LIVE DRIVER METADATA...</span>
          <span>● RUMORED CO-OP MISSIONS DETECTED IN UNPUBLISHED ROCKSTAR CLOUD SERVERS...</span>
          <span>● VOLUMETRIC CLOUDS SHADER OVERHAUL CONFIRMED BY INTERNAL DEVELOPER GRAPHICS BLUEPRINTS...</span>
          <span>● MULTIPLAYER SERVER ENCRYPTED CORDS SPOTLIGHTING HAMLET RECREATION...</span>
        </div>
      </div>

      {/* 2. DYNAMIC COUNTDOWN CARDS WITH ACTIVE EVENT SELECTOR */}
      <section className="space-y-4" id="countdown-timer-module">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-pink-500" />
            <h2 className="text-sm font-display font-black text-white tracking-widest uppercase">Leonida Countdown System</h2>
          </div>
          
          {/* Target Event Toggles */}
          <div className="flex flex-wrap gap-1 bg-zinc-950 p-1 border border-white/5">
            {COUNTDOWN_TARGETS.map((target) => (
              <button
                key={target.id}
                onClick={() => setActiveTargetId(target.id)}
                className={`px-2.5 py-1 text-[9px] font-mono uppercase font-black transition-all ${
                  activeTargetId === target.id
                    ? 'bg-pink-600 text-black'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {target.id}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#050505] border border-white/5 p-4 rounded-none space-y-4">
          <div className="text-[10px] font-mono text-zinc-400 flex items-center gap-2">
            <span className="text-pink-500 font-bold uppercase">Active Target:</span>
            <span className="text-white font-black">{selectedTarget.label}</span>
            <span className="text-zinc-600">({selectedTarget.date.split('T')[0]})</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Days', value: timeLeft.days, color: 'border-pink-500/20 text-pink-500 bg-pink-950/5' },
              { label: 'Hours', value: timeLeft.hours, color: 'border-orange-500/20 text-orange-400 bg-orange-950/5' },
              { label: 'Minutes', value: timeLeft.minutes, color: 'border-cyan-500/20 text-cyan-400 bg-cyan-950/5' },
              { label: 'Seconds', value: timeLeft.seconds, color: 'border-white/10 text-white bg-white/5' },
            ].map((card, idx) => (
              <div 
                key={idx}
                className={`rounded-none border ${card.color} p-5 text-center backdrop-blur-sm relative overflow-hidden`}
                id={`countdown-card-${card.label.toLowerCase()}`}
              >
                <div className="font-mono text-4xl sm:text-5xl font-black tracking-tighter mb-1 leading-none">
                  {card.value.toString().padStart(2, '0')}
                </div>
                <div className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest">{card.label}</div>
              </div>
            ))}
          </div>

          <p className="text-zinc-500 text-[10px] font-mono leading-relaxed text-left">
            <span className="text-zinc-400 font-bold">Consensus Note:</span> {selectedTarget.note}
          </p>
        </div>
      </section>

      {/* FEATURED NEWS INTEL LOG */}
      <section className="bg-gradient-to-br from-[#020202] to-zinc-950 border border-white/10 p-5 sm:p-6 space-y-4 relative overflow-hidden group">
        <div className="absolute top-0 right-0 bg-pink-600 text-black font-mono text-[9px] font-black uppercase tracking-widest px-3 py-1 border-b border-l border-white/10">
          ★ FEATURED INTEL ASSET
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          <div className="md:w-1/3 aspect-video bg-cover bg-center border border-white/10 relative" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600')` }}>
            <div className="absolute inset-0 bg-black/40 hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-2 left-2 bg-pink-600 text-black font-mono text-[8px] font-black px-2 py-0.5 uppercase">
              98.8% CONSENSUS
            </div>
          </div>
          
          <div className="flex-1 flex flex-col justify-between space-y-3 text-left">
            <div className="space-y-1.5">
              <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-500">
                <span>AUGUST 12, 2026</span>
                <span>•</span>
                <span>3 MIN READ</span>
                <span>•</span>
                <span className="text-pink-500 font-bold uppercase">OFFICIAL REVEAL</span>
              </div>
              <h3 className="text-xl font-display font-black text-white uppercase tracking-tight group-hover:text-pink-500 transition-colors">
                Trailer 1 Debuts Worldwide: The Vice City Era Begins
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans line-clamp-2">
                The record-breaking reveal introduces Lucia, Jason, and the stunningly redesigned neon state of Leonida. Breaking over 100M views in 24 hours, the trailer confirms our dual-protagonist crime scope.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-1.5 pt-1 items-center">
              {['trailer-1', 'lucia-intro', 'tom-petty', 'vice-city'].map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-zinc-900 border border-white/5 text-zinc-500 font-mono text-[8px] uppercase">
                  #{tag}
                </span>
              ))}
              
              <button
                onClick={() => setView('news')}
                className="ml-auto text-xs font-mono font-bold text-pink-500 hover:text-pink-400 hover:underline flex items-center gap-1.5"
              >
                Launch Intelligence File →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CO-STARRING SIDEBAR & SOCIAL MEDIA PARODY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="home-bento-split">
        
        {/* Leonida Social Feed (Phone mockup representation) - 5 Cols */}
        <section className="lg:col-span-5 space-y-4 lg:sticky lg:top-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <h2 className="text-sm font-display font-black text-white tracking-widest uppercase">Viral Leonida Feed</h2>
            </div>
            <span className="bg-red-500 px-2.5 py-1 font-mono text-[9px] font-black text-black tracking-widest animate-pulse">
              LIVE BROADCAST
            </span>
          </div>

          {/* Social Phone Mockup */}
          <div className="rounded-none border-2 border-white/10 bg-black p-4 shadow-2xl relative overflow-hidden h-[540px] flex flex-col" id="social-phone-container">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 z-20" />
            
            {/* Scrollable feed list */}
            <div className="flex-1 overflow-y-auto space-y-4 pt-2 pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
              {socialFeedData.map((post) => (
                <div 
                  key={post.id} 
                  className="rounded-none bg-[#09090b] border border-white/5 p-4 space-y-3 relative overflow-hidden"
                  id={`social-post-${post.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="h-8 w-8 bg-pink-600 flex items-center justify-center font-display font-black text-xs text-black uppercase">
                        {post.username[0]}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-zinc-100 flex items-center space-x-1.5">
                          <span>{post.username}</span>
                          {post.isLive && (
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
                          )}
                        </div>
                        <div className="text-[10px] text-zinc-500 font-mono">{post.handle}</div>
                      </div>
                    </div>
                    
                    <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded-none font-bold ${
                      post.isLive ? 'bg-red-500/25 text-red-400' : 'bg-white/5 text-zinc-500'
                    }`}>
                    {post.timestamp}
                    </span>
                  </div>

                  <p className="text-zinc-300 text-xs leading-relaxed font-sans">{post.content}</p>

                  <div className="flex items-center space-x-4 border-t border-white/5 pt-2.5 text-zinc-500 text-xs font-mono">
                    <button className="flex items-center space-x-1 hover:text-pink-500 transition-colors">
                      <Heart className="h-3.5 w-3.5" />
                      <span>{post.likes}</span>
                    </button>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mock phone navigation indicator */}
            <div className="w-20 h-1 bg-white/20 mx-auto mt-2" />
          </div>
        </section>

        {/* Quick Intel Bento Grid - 7 Cols */}
        <section className="lg:col-span-7 space-y-4" id="intel-bento-section">
          <div className="flex items-center space-x-2">
            <HelpCircle className="h-5 w-5 text-cyan-400" />
            <h2 className="text-sm font-display font-black text-white tracking-widest uppercase">Essential Game Intelligence</h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {quickFacts.map((fact, idx) => (
              <div 
                key={idx}
                className="rounded-none border border-white/10 bg-black p-5 hover:border-pink-500/50 transition-colors flex flex-col md:flex-row gap-4 items-start md:items-center relative overflow-hidden group"
                id={`intel-card-${idx}`}
              >
                {/* Visual Accent */}
                <div className="h-10 w-10 shrink-0 bg-white/5 border border-white/10 flex items-center justify-center text-pink-500 font-display font-black text-sm group-hover:bg-pink-500 group-hover:text-black transition-colors">
                  <span>{idx + 1}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-zinc-500 text-[9px] font-mono uppercase tracking-widest font-bold block">{fact.label}</span>
                  <h3 className="text-white text-base font-display font-bold tracking-tight">{fact.value}</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed font-sans">{fact.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Prompting link block to database */}
          <div className="rounded-none bg-black border-2 border-dashed border-pink-500/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-white font-display font-black text-sm uppercase tracking-wider">Want to inspect confirmed assets?</h4>
              <p className="text-zinc-400 text-xs font-sans">Dive deep into our interactive database of cars, weapons, and tools seen in Trailer 1.</p>
            </div>
            <button 
              onClick={() => setView('database')}
              className="rounded-none bg-white text-black font-display font-black text-xs uppercase tracking-wider px-5 py-3.5 hover:bg-pink-500 transition-colors shrink-0 flex items-center space-x-1.5"
              id="goto-database-btn"
            >
              <span>Explore Database</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>
        </section>

      </div>

      {/* 4. WEEKLY COMMUNITY HIGHLIGHTS */}
      <section className="space-y-4 pt-6 border-t border-white/5" id="weekly-highlights-module">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-pink-500" />
          <h2 className="text-sm font-display font-black text-white tracking-widest uppercase">Weekly Leonida Highlights</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Theorist of the Week",
              value: "@LeonidaMapper",
              desc: "Engineered a stunning 1:1 overlay of the Keys coastline utilizing real-world Florida geological surveys.",
              badge: "CONTRIBUTOR",
              color: "border-pink-500/20 text-pink-500",
            },
            {
              title: "Hottest Speculation",
              value: "AI Crowd Protocols",
              desc: "Deep analysis of Rockstar patent logs reveals a highly responsive dynamic heat system for beach crowds.",
              badge: "92% LIKELY",
              color: "border-cyan-500/20 text-cyan-400",
            },
            {
              title: "Top Community Asset",
              value: "Cheetah Classic",
              desc: "Confirmed spotting on Vice Neon Strip with real-time vector shader deformation physics.",
              badge: "VERIFIED",
              color: "border-emerald-500/20 text-emerald-400",
            },
            {
              title: "Mapping Progress",
              value: "94.2% Completeness",
              desc: "The collective coordinate database has mapped approximately 144sq km of simulated terrain.",
              badge: "94.2% CONSENSUS",
              color: "border-orange-500/20 text-orange-400",
            }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="bg-[#050505] border border-white/10 p-5 space-y-3 hover:border-pink-500/30 transition-colors relative"
            >
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">{item.title}</span>
                <span className={`text-[8px] font-mono px-1.5 py-0.5 border ${item.color} uppercase font-bold`}>
                  {item.badge}
                </span>
              </div>
              <h3 className="text-white text-base font-display font-black uppercase tracking-tight text-left">{item.value}</h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-sans text-left">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
