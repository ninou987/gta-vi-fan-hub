import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, MessageSquare, Search, Sparkles, BookOpen } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  category: 'general' | 'gameplay' | 'engine' | 'technical';
  answer: string;
  verified: boolean;
  communityNote: string;
}

const faqList: FAQItem[] = [
  {
    id: 'release-date',
    question: 'When is the official release date for Grand Theft Auto VI?',
    category: 'general',
    answer: 'Rockstar Games officially announced in late 2023 that Grand Theft Auto VI is scheduled for release in Fall 2025. Our community tracker currently monitors high-probability window projections around late 2025.',
    verified: true,
    communityNote: 'Take-Two Interactive has reiterated the Fall 2025 launch window in multiple financial earnings reports.'
  },
  {
    id: 'supported-platforms',
    question: 'Which platforms will GTA VI support at launch?',
    category: 'technical',
    answer: 'At launch, Grand Theft Auto VI will be available exclusively on PlayStation 5 and Xbox Series X|S. A PC release is anticipated to follow 12 to 18 months post-console launch, aligning with Rockstar\'s historical release strategies for Grand Theft Auto V and Red Dead Redemption 2.',
    verified: true,
    communityNote: 'No official word on PC scheduling has been issued, but Rockstar\'s standard pattern suggests a staggered PC launch.'
  },
  {
    id: 'map-size-comparison',
    question: 'How large is the state of Leonida compared to GTA V\'s San Andreas?',
    category: 'general',
    answer: 'Speculative community mapping teams, analyzing leak coordinates and trailer sights, estimate Leonida is roughly 2.3 times larger than GTA V\'s San Andreas map. It is predicted to feature three major cities (Vice City, Port Gellhorn, and Hamlet) surrounded by sprawling Keys, swamp everglades, and complex lake systems.',
    verified: false,
    communityNote: 'Based entirely on coordinates spotted in pre-alpha developmental debug lines.'
  },
  {
    id: 'dual-protagonists',
    question: 'How does the dual-character system work with Lucia and Jason?',
    category: 'gameplay',
    answer: 'GTA VI features two playable protagonists: Lucia (the first female lead since the original 2D games) and Jason. They operate as a Bonnie & Clyde-style romantic crime duo. Players will be able to swap between them dynamically during sandbox free-roam and coordinated tactical heist sequences.',
    verified: true,
    communityNote: 'Confirmed by the official Trailer 1 and pre-alpha footage showing synchronized item trading and active camera-swapping.'
  },
  {
    id: 'rage-9-features',
    question: 'What technical advancements does the RAGE 9 engine introduce?',
    category: 'engine',
    answer: 'The Rockstar Advanced Game Engine (RAGE 9) introduces groundbreaking physical simulation systems, including: real-time Navier-Stokes volumetric water and foam physics, dynamic athletic weight-shifting (pose synthesis based on exhaust levels), physical weapon-slings replacing invisible pockets, and advanced NPC schedules where background pedestrians commute to dedicated residences.',
    verified: false,
    communityNote: 'Discovered through patent filings registered by Take-Two Interactive and Rockstar developers in 2023.'
  },
  {
    id: 'enterable-buildings',
    question: 'Will there be more enterable building interiors?',
    category: 'gameplay',
    answer: 'Yes. Reports suggest Rockstar is focusing heavily on structural interior density over flat surface size. The speculatory counts propose that over 30-40% of standard urban buildings, laundromats, motels, bar lounges, and supermarkets in Vice City will have fully detailed interactive interiors.',
    verified: false,
    communityNote: 'Spotted in leak clips showing functional robberies of multiple distinct local Leonida convenience stores.'
  }
];

export default function FAQView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'gameplay' | 'engine' | 'technical'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('release-date');

  const filteredFAQs = faqList.filter(faq => {
    const matchesCategory = activeCategory === 'all' ? true : faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    // Sound beep click
    try {
      const audioCtx = typeof window !== 'undefined' ? (window.AudioContext || (window as any).webkitAudioContext) : null;
      if (audioCtx) {
        const ctx = new audioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1000, ctx.currentTime);
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch(e){}
  };

  return (
    <div className="space-y-8 pb-12" id="faq-view-root">
      
      {/* Page Title */}
      <div>
        <span className="text-pink-500 font-mono text-[10px] tracking-widest uppercase font-black block mb-1">INTERACTIVE KNOWLEDGE DESK</span>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tighter uppercase leading-none">Frequently Asked Questions</h1>
        <p className="text-zinc-400 text-sm mt-2 max-w-3xl font-sans">
          Your source of truth for Grand Theft Auto VI. Get instant, verified responses regarding gameplay loops, launch projections, mechanics, and engine specs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Accordion & Filter Controls (8 columns) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row gap-3 bg-[#09090b] border border-white/10 p-3">
            
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="FILTER KNOWLEDGE INDEX..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black border border-white/5 pl-9 pr-4 py-2 text-xs text-white font-mono focus:outline-none focus:border-pink-500"
              />
            </div>

            {/* Category selection */}
            <div className="flex flex-wrap gap-1">
              {(['all', 'general', 'gameplay', 'engine', 'technical'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-[9px] font-mono uppercase tracking-wider select-none ${
                    activeCategory === cat 
                      ? 'bg-pink-600 text-black font-black' 
                      : 'bg-black text-zinc-400 border border-white/5 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>

          {/* FAQ Accordions stack */}
          <div className="space-y-3">
            {filteredFAQs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className={`bg-black border transition-all rounded-none overflow-hidden ${
                    isExpanded ? 'border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.05)]' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Accordion Trigger header */}
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 select-none"
                  >
                    <div className="flex items-center space-x-3">
                      <HelpCircle className={`h-4 w-4 shrink-0 ${isExpanded ? 'text-pink-500' : 'text-zinc-500'}`} />
                      <h3 className={`font-display font-black text-sm uppercase tracking-tight transition-colors ${
                        isExpanded ? 'text-pink-500' : 'text-white hover:text-pink-400'
                      }`}>
                        {faq.question}
                      </h3>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <span className={`text-[8px] font-mono tracking-widest uppercase px-1.5 py-0.5 font-bold ${
                        faq.verified 
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/30' 
                          : 'bg-pink-950 text-pink-400 border border-pink-800/30'
                      }`}>
                        {faq.verified ? 'Verified' : 'Community Spec'}
                      </span>
                      <ChevronDown className={`h-4 w-4 text-zinc-500 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-pink-500' : ''
                      }`} />
                    </div>
                  </button>

                  {/* Accordion Expandable body */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 border-t border-white/5 space-y-4">
                          
                          {/* Answer text */}
                          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans">
                            {faq.answer}
                          </p>

                          {/* Community contextual logs box */}
                          <div className="bg-[#09090b] border border-white/5 p-4 flex items-start space-x-3">
                            <MessageSquare className="h-4 w-4 text-pink-500 shrink-0 mt-0.5" />
                            <div className="space-y-1">
                              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-black block">Intelligence Source Note:</span>
                              <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">{faq.communityNote}</p>
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })}

            {filteredFAQs.length === 0 && (
              <div className="text-center py-12 bg-black border border-white/10">
                <p className="text-zinc-500 font-mono text-xs">NO RESULTS MATCHING SEARCH KEYWORD.</p>
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Fast FAQ Side-docket (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-black border border-white/10 p-5 space-y-4 rounded-none">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-black border-b border-white/10 pb-2">
              <Sparkles className="h-4 w-4 text-pink-500 animate-pulse" />
              <span>General Launch Platform Status</span>
            </div>
            
            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <span className="text-zinc-500 font-mono text-[9px] block uppercase">Sony PlayStation 5</span>
                <div className="flex justify-between items-center text-emerald-400 font-mono font-bold">
                  <span>CONFIRMED LAUNCH</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-emerald-950 border border-emerald-800/20">FALL 2025</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-zinc-500 font-mono text-[9px] block uppercase">Microsoft Xbox Series X|S</span>
                <div className="flex justify-between items-center text-emerald-400 font-mono font-bold">
                  <span>CONFIRMED LAUNCH</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-emerald-950 border border-emerald-800/20">FALL 2025</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-zinc-500 font-mono text-[9px] block uppercase">PC (Windows / Steam)</span>
                <div className="flex justify-between items-center text-pink-500 font-mono font-black">
                  <span>POST-LAUNCH ESTIMATE</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-pink-950 border border-pink-800/20">SPECULATIVE 2026/2027</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black border border-white/10 p-5 space-y-4 rounded-none">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-black border-b border-white/10 pb-2">
              <BookOpen className="h-4 w-4 text-pink-500" />
              <span>Leonida Geography Specs</span>
            </div>
            
            <div className="space-y-3 text-xs font-mono text-zinc-400">
              <div className="flex justify-between">
                <span>Total Map Area:</span>
                <span className="text-white">~145 km² (Estimated)</span>
              </div>
              <div className="flex justify-between">
                <span>Enterable Interiors:</span>
                <span className="text-white">400+ Buildings (Estimated)</span>
              </div>
              <div className="flex justify-between">
                <span>Unique Pedestrian Skins:</span>
                <span className="text-white">1200+ Variants (Estimated)</span>
              </div>
              <div className="flex justify-between">
                <span>Wildlife Species:</span>
                <span className="text-white">50+ Verified</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
