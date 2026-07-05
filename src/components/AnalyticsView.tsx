import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart2, TrendingUp, Eye, Compass, Trophy, Share2, 
  Clock, ShieldCheck, Flame, Laptop, Tablet, Smartphone
} from 'lucide-react';

export default function AnalyticsView() {
  const [activeRange, setActiveRange] = useState<'7d' | '30d' | 'all'>('7d');

  // Most Viewed News
  const viewedNews = [
    { title: "Rockstar Trailer 2 Video Assets Staged", views: "142,492", trend: "+24% today", percent: 94 },
    { title: "Florida Keys Geological Overlay Map 1:1", views: "118,504", trend: "+12% today", percent: 81 },
    { title: "RAGE 9 Physics Engine Variable Leaks", views: "92,100", trend: "+8% today", percent: 68 },
    { title: "NPC Reaction Weather Tan-line Shaders", views: "74,212", trend: "+34% today", percent: 54 }
  ];

  // Trending searches
  const trendingSearches = [
    { tag: "Trailer 2", count: "42,492", momentum: "98% spike", hot: true },
    { tag: "Lucia Actor", count: "21,142", momentum: "12% increase", hot: false },
    { tag: "Vice City Map", count: "18,940", momentum: "42% increase", hot: true },
    { tag: "Preorder Price", count: "12,110", momentum: "5% decrease", hot: false },
    { tag: "Jason Face Mesh", count: "8,924", momentum: "68% spike", hot: true }
  ];

  // Most Trusted Sources (Consensus leaderboards)
  const trustedSources = [
    { name: "Tez2 (@TezFunz2)", score: 96, category: "Game Files & CDNs", badge: "TIER 1 ELITE" },
    { name: "Leonida Mapping Project", score: 92, category: "Coordinate Mapping", badge: "COMMUNITY HUB" },
    { name: "Legacy Forums Admin", score: 88, category: "Developer Comments", badge: "VERIFIED MOD" },
    { name: "Take-Two Investor Portal", score: 99, category: "Official Shareholder Reports", badge: "GOVERNMENT REGISTRY" }
  ];

  // Visitor statistics
  const visitorMetrics = {
    weeklyUnique: "1,249,492",
    avgSession: "8m 42s",
    desktop: 62,
    mobile: 32,
    tablet: 6
  };

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto" id="analytics-observatory-root">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <span className="text-pink-500 font-mono text-[10px] tracking-widest uppercase font-black block mb-1">
            TERMINAL DATA MONITORING DECK
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tighter uppercase leading-none">
            Analytics Observatory
          </h1>
          <p className="text-zinc-400 text-sm mt-2 max-w-3xl font-sans text-left">
            Observe real-time traffic statistics, trending search terms, most viewed dossier folders, and top-tier consensus ratings compiled on our active nodes.
          </p>
        </div>

        {/* Filters */}
        <div className="flex bg-[#050505] border border-white/10 p-1 font-mono text-[10px] uppercase select-none shrink-0 self-start sm:self-auto">
          {[
            { id: '7d', label: '7 Days' },
            { id: '30d', label: '30 Days' },
            { id: 'all', label: 'Max' }
          ].map((range) => (
            <button
              key={range.id}
              onClick={() => setActiveRange(range.id as any)}
              className={`px-3 py-1.5 transition-colors ${
                activeRange === range.id 
                  ? 'bg-pink-500 text-black font-black' 
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Visitor Stats & Daily Activity Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Daily Activity Chart (8 Columns) */}
        <div className="lg:col-span-8 bg-black/60 border border-white/10 p-6 space-y-4 text-left">
          <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
            <h3 className="font-display font-black text-xs uppercase tracking-widest text-white flex items-center gap-2">
              <TrendingUp className="h-4.5 w-4.5 text-pink-500" />
              <span>Activity & Search Density Progression</span>
            </h3>
            <span className="text-[9px] font-mono text-zinc-500">CONCURRENT PEAK: 4,192 CCU</span>
          </div>

          {/* SVG Animated Chart representing weekly density */}
          <div className="h-64 pt-6 relative flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 600 200">
              <path
                d="M 10,170 Q 100,100 200,110 T 400,40 T 590,10"
                fill="none"
                stroke="#ec4899"
                strokeWidth="3"
                className="drop-shadow-[0_0_10px_#ec4899]"
              />
              <path
                d="M 10,170 Q 100,100 200,110 T 400,40 T 590,10 L 590,200 L 10,200 Z"
                fill="url(#densityGrad)"
                opacity="0.12"
              />
              <defs>
                <linearGradient id="densityGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <circle cx="590" cy="10" r="5" fill="#f97316" className="animate-pulse" />
              <text x="590" y="25" fill="#ffffff" fontSize="9" textAnchor="end" fontFamily="monospace">LIVE SPIKE ON CRAWLERS</text>
            </svg>
          </div>
        </div>

        {/* Visitor Device & Volume Split (4 Columns) */}
        <div className="lg:col-span-4 bg-[#09090b] border border-white/10 p-6 space-y-5 text-left">
          <h3 className="font-display font-black text-xs uppercase tracking-widest text-white border-b border-white/5 pb-2.5">
            Visitor Demographics
          </h3>

          <div className="space-y-4 font-mono text-xs">
            <div className="space-y-1">
              <span className="text-zinc-500 uppercase text-[9px]">Weekly Active Visitors</span>
              <h2 className="text-2xl font-display font-black text-white">{visitorMetrics.weeklyUnique}</h2>
              <p className="text-[10px] text-zinc-400 leading-tight">Average Session Length: {visitorMetrics.avgSession}</p>
            </div>

            <div className="border-t border-white/5 pt-4 space-y-3.5">
              <span className="text-zinc-500 uppercase text-[9px] block">Device Allocation Matrix</span>
              
              <div className="space-y-2">
                {[
                  { device: 'Desktop / Console Web', percent: visitorMetrics.desktop, icon: Laptop },
                  { device: 'Mobile Web Interface', percent: visitorMetrics.mobile, icon: Smartphone },
                  { device: 'Tablet Terminal', percent: visitorMetrics.tablet, icon: Tablet }
                ].map((d, dIdx) => {
                  const Icon = d.icon;
                  return (
                    <div key={dIdx} className="space-y-1">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-zinc-400 flex items-center gap-1.5 uppercase font-bold">
                          <Icon className="h-3.5 w-3.5 text-pink-500" />
                          <span>{d.device}</span>
                        </span>
                        <span className="text-white font-black">{d.percent}%</span>
                      </div>
                      <div className="w-full h-1 bg-zinc-950 border border-white/5">
                        <div className="h-full bg-pink-500" style={{ width: `${d.percent}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Grid: Most Viewed, Trending Searches, Most Trusted */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        
        {/* Most Viewed News */}
        <div className="bg-black border border-white/10 p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
            <h3 className="font-display font-black text-xs uppercase tracking-widest text-white flex items-center gap-2">
              <Eye className="h-4 w-4 text-pink-500" />
              <span>Most Viewed Dossiers</span>
            </h3>
            <span className="text-[9px] font-mono text-zinc-500 uppercase">VIEWS</span>
          </div>

          <div className="space-y-4">
            {viewedNews.map((news, idx) => (
              <div key={idx} className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between items-start">
                  <span className="text-white font-bold leading-tight line-clamp-1">{news.title}</span>
                  <span className="text-pink-500 font-black shrink-0 pl-2">{news.views}</span>
                </div>
                <div className="w-full h-1 bg-zinc-950 relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-pink-500" style={{ width: `${news.percent}%` }} />
                </div>
                <span className="text-[9px] text-zinc-500 block">{news.trend}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Searches */}
        <div className="bg-black border border-white/10 p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
            <h3 className="font-display font-black text-xs uppercase tracking-widest text-white flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500" />
              <span>Trending Queries</span>
            </h3>
            <span className="text-[9px] font-mono text-zinc-500 uppercase">MOMENTUM</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {trendingSearches.map((search, idx) => (
              <div key={idx} className="p-3 bg-[#050505] border border-white/5 hover:border-pink-500/20 transition-colors flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-white font-bold block uppercase">{search.tag}</span>
                  <span className="text-[9px] text-zinc-500 block">Searches: {search.count}</span>
                </div>

                <div className="text-right">
                  <span className={`text-[8px] font-black px-1.5 py-0.5 border uppercase ${
                    search.hot ? 'border-orange-500/20 text-orange-400 bg-orange-500/5' : 'border-zinc-800 text-zinc-500 bg-zinc-950'
                  }`}>
                    {search.momentum}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Trusted Sources */}
        <div className="bg-black border border-white/10 p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
            <h3 className="font-display font-black text-xs uppercase tracking-widest text-white flex items-center gap-2">
              <Trophy className="h-4 w-4 text-emerald-400" />
              <span>Consensus Registry</span>
            </h3>
            <span className="text-[9px] font-mono text-zinc-500 uppercase">SCORE</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {trustedSources.map((source, idx) => (
              <div key={idx} className="p-3 bg-[#050505] border border-white/5 flex flex-col justify-between gap-2.5">
                <div className="space-y-0.5">
                  <span className="text-white font-bold block">{source.name}</span>
                  <span className="text-[9px] text-zinc-500 block">{source.category}</span>
                </div>

                <div className="flex justify-between items-center border-t border-white/5 pt-2">
                  <span className="text-[8px] text-zinc-500 uppercase font-black tracking-widest">{source.badge}</span>
                  <span className="text-emerald-400 font-black">{source.score}% accuracy</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
