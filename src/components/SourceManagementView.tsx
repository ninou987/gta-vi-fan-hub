import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Award, TrendingUp, AlertTriangle, ShieldAlert, CheckCircle, 
  Clock, Heart, ShieldCheck, UserCheck, MessageSquare, ArrowRight, ExternalLink
} from 'lucide-react';

interface Source {
  id: string;
  name: string;
  handle: string;
  avatarSeed: string;
  platform: 'Twitter' | 'Reddit' | 'GTA Forums' | 'YouTube' | 'Official';
  description: string;
  reliabilityScore: number;
  tier: 'tier-1' | 'tier-2' | 'tier-3' | 'discredited';
  stats: {
    totalClaims: number;
    correctClaims: number;
    falseClaims: number;
    unconfirmed: number;
    totalViews: string;
  };
  history: {
    date: string;
    claim: string;
    status: 'correct' | 'false' | 'unconfirmed';
    trustScore: number;
  }[];
}

export default function SourceManagementView() {
  const [selectedSourceId, setSelectedSourceId] = useState<string>('src-1');

  const sources: Source[] = [
    {
      id: 'src-1',
      name: 'Tez2',
      handle: '@TezFunz2',
      avatarSeed: 'tez',
      platform: 'Twitter',
      description: 'Prominent Rockstar Games community insider. Highly respected with a long-standing track record of parsing server assets, game code configurations, and shareholder updates since GTA V.',
      reliabilityScore: 96,
      tier: 'tier-1',
      stats: {
        totalClaims: 142,
        correctClaims: 135,
        falseClaims: 2,
        unconfirmed: 5,
        totalViews: '3.4M'
      },
      history: [
        { date: 'Dec 2023', claim: 'Accurately leaked trailer duration and launch parameters days before official drop.', status: 'correct', trustScore: 99 },
        { date: 'May 2025', claim: 'Stated FY2026 scheduling remains solid in Take-Two internal targets.', status: 'correct', trustScore: 94 },
        { date: 'Jan 2026', claim: 'Reported staging assets update on Rockstar CDN servers.', status: 'correct', trustScore: 98 },
        { date: 'June 2026', claim: 'Predicted minor delay of private QA build. Still awaiting general corroboration.', status: 'unconfirmed', trustScore: 82 }
      ]
    },
    {
      id: 'src-2',
      name: 'Leonida Mapping Project',
      handle: 'r/GTA6 Coordinates',
      avatarSeed: 'map',
      platform: 'Reddit',
      description: 'A collective of cartographers and geography enthusiasts cross-correlating road shapes, landmass grids, and flight vectors seen in trailers with real-world Florida mapping surveys.',
      reliabilityScore: 92,
      tier: 'tier-1',
      stats: {
        totalClaims: 88,
        correctClaims: 81,
        falseClaims: 1,
        unconfirmed: 6,
        totalViews: '1.2M'
      },
      history: [
        { date: 'Feb 2024', claim: 'Calculated simulated landmass size to be roughly 140 square kilometers.', status: 'correct', trustScore: 90 },
        { date: 'July 2025', claim: 'Traced Hamlet/Keys highway intersections to direct coordinates matching real Bahia Honda.', status: 'correct', trustScore: 95 },
        { date: 'Apr 2026', claim: 'Asserted that Port Gellhorn uses a container terminal layout identical to Port Everglade.', status: 'correct', trustScore: 92 }
      ]
    },
    {
      id: 'src-3',
      name: 'Rockstar Insider Speculator',
      handle: 'u/ViceCityLeaks',
      avatarSeed: 'insider',
      platform: 'Reddit',
      description: 'Anonymous poster sharing general structural game engine details. Claims connections to junior developers. High volatility but occasionally shares accurate terminology.',
      reliabilityScore: 54,
      tier: 'tier-2',
      stats: {
        totalClaims: 45,
        correctClaims: 18,
        falseClaims: 19,
        unconfirmed: 8,
        totalViews: '420K'
      },
      history: [
        { date: 'Mar 2025', claim: 'Claimed Lucia will have access to a custom pink stunt motorcycle with dynamic underglow in intro sequence.', status: 'unconfirmed', trustScore: 50 },
        { date: 'Nov 2025', claim: 'Stated pre-orders would begin in February 2026 with 3 custom digital stickers.', status: 'false', trustScore: 12 },
        { date: 'May 2026', claim: 'Exposed internal database references containing exact weapon model names (Combat Pistol v2).', status: 'correct', trustScore: 88 }
      ]
    },
    {
      id: 'src-4',
      name: 'GTA6_Gamer_99',
      handle: '@GTAVIFanatic',
      avatarSeed: 'fan',
      platform: 'Twitter',
      description: 'General community aggregator that reposts anonymous Discord claims. Frequently posts highly photoshopped or AI-generated promotional cards as leaked official marketing materials.',
      reliabilityScore: 15,
      tier: 'discredited',
      stats: {
        totalClaims: 62,
        correctClaims: 2,
        falseClaims: 54,
        unconfirmed: 6,
        totalViews: '850K'
      },
      history: [
        { date: 'Jan 2026', claim: 'Posted a fake retail promotional poster showing an April 2026 launch window.', status: 'false', trustScore: 8 },
        { date: 'Mar 2026', claim: 'Shared AI-generated screenshots of Lucia walking inside a fictitious luxury mansion.', status: 'false', trustScore: 5 },
        { date: 'June 2026', claim: 'Claimed Rockstar Games is partnering with major fast-food chains for branded billboard assets.', status: 'unconfirmed', trustScore: 22 }
      ]
    },
    {
      id: 'src-5',
      name: 'Legacy Forums Admin',
      handle: 'ForumMod_Keys',
      avatarSeed: 'admin',
      platform: 'GTA Forums',
      description: 'Administrator of historic Rockstar forums. Has access to private threads where developers occasionally comment. Maintains strict validation standards.',
      reliabilityScore: 88,
      tier: 'tier-1',
      stats: {
        totalClaims: 34,
        correctClaims: 30,
        falseClaims: 0,
        unconfirmed: 4,
        totalViews: '240K'
      },
      history: [
        { date: 'Oct 2024', claim: 'Confirmed that early build file references containing water physics grids are genuine.', status: 'correct', trustScore: 92 },
        { date: 'Jan 2026', claim: 'Asserted that Rockstar Advanced Game Engine (RAGE v9) uses real-time sound refraction indices.', status: 'correct', trustScore: 94 }
      ]
    }
  ];

  const activeSource = sources.find(s => s.id === selectedSourceId) || sources[0];

  const getTierDetails = (tier: string) => {
    switch (tier) {
      case 'tier-1': return { text: 'Tier 1 Prime Source', style: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5', icon: ShieldCheck };
      case 'tier-2': return { text: 'Tier 2 Volatile Insider', style: 'text-yellow-400 border-yellow-500/20 bg-yellow-500/5', icon: UserCheck };
      case 'tier-3': return { text: 'Tier 3 Speculative Fan', style: 'text-orange-400 border-orange-500/20 bg-orange-500/5', icon: Clock };
      case 'discredited': return { text: 'Discredited Node', style: 'text-red-400 border-red-500/20 bg-red-500/5', icon: ShieldAlert };
      default: return { text: 'Unknown', style: 'text-zinc-500 border-white/5', icon: Users };
    }
  };

  const getClaimStatusColor = (status: string) => {
    switch (status) {
      case 'correct': return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
      case 'false': return 'text-red-400 border-red-500/20 bg-red-500/5';
      case 'unconfirmed': return 'text-amber-400 border-amber-500/20 bg-amber-500/5';
      default: return 'text-zinc-400 border-white/10';
    }
  };

  const getReliabilityColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400';
    if (score >= 70) return 'text-blue-400';
    if (score >= 50) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto" id="source-management-root">
      
      {/* Title Header */}
      <div>
        <span className="text-pink-500 font-mono text-[10px] tracking-widest uppercase font-black block mb-1">
          SOURCE CREDIBILITY COGNITION MODULE
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tighter uppercase leading-none">
          Source Registry
        </h1>
        <p className="text-zinc-400 text-sm mt-2 max-w-3xl font-sans text-left">
          Analyze community channels, mapping enthusiasts, and leak nodes. Our systems continuously parse historic claims against developer announcements to calculate precision accuracy profiles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Sources List Grid (5 Columns) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-black border border-white/10 p-5 text-left">
            <h3 className="font-display font-black text-xs uppercase tracking-widest text-white mb-4">
              Investigative Source Nodes
            </h3>

            <div className="space-y-2.5">
              {sources.map((src) => {
                const isSelected = src.id === selectedSourceId;
                const accuracy = Math.round((src.stats.correctClaims / src.stats.totalClaims) * 100);
                return (
                  <button
                    key={src.id}
                    onClick={() => setSelectedSourceId(src.id)}
                    className={`w-full p-4 border rounded-none text-left transition-all relative flex items-center justify-between ${
                      isSelected 
                        ? 'border-pink-500 bg-pink-500/[0.01]' 
                        : 'border-white/10 bg-[#050505] hover:border-white/20'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-mono font-bold ${getReliabilityColor(src.reliabilityScore)}`}>
                          ★ {src.reliabilityScore}%
                        </span>
                        <h4 className="text-white text-xs font-mono font-black uppercase tracking-tight">{src.name}</h4>
                      </div>
                      <p className="text-[10px] text-zinc-500 font-sans">{src.handle} • {src.platform}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] font-mono text-zinc-500 block uppercase">Accuracy</span>
                      <span className={`text-xs font-mono font-black ${getReliabilityColor(accuracy)}`}>
                        {accuracy}%
                      </span>
                    </div>

                    {isSelected && (
                      <div className="absolute top-0 right-0 h-full w-[2px] bg-pink-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column: Selected Source Deep-Dive Profile (7 Columns) */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSource.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="space-y-6 text-left"
              id="source-profile-card"
            >
              
              {/* Profile Card Header */}
              <div className="bg-black border border-white/10 p-6 space-y-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-orange-400" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                        {activeSource.name}
                      </h2>
                      <span className="text-xs text-zinc-500 font-mono">({activeSource.handle})</span>
                    </div>
                    <p className="text-[10px] font-mono text-pink-500 uppercase tracking-widest mt-1">
                      Active Vector: {activeSource.platform}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 self-start sm:self-auto">
                    {(() => {
                      const TierIcon = getTierDetails(activeSource.tier).icon;
                      return (
                        <div className={`px-3 py-1.5 border text-[9px] font-mono font-black uppercase tracking-wider flex items-center gap-1.5 ${getTierDetails(activeSource.tier).style}`}>
                          <TierIcon className="h-3.5 w-3.5" />
                          <span>{getTierDetails(activeSource.tier).text}</span>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans pt-1">
                  {activeSource.description}
                </p>
              </div>

              {/* Source Reliability Meter & Statistics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Gauge Meter */}
                <div className="bg-black border border-white/10 p-5 space-y-3.5 flex flex-col justify-between">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-black">
                    Reliability Rating Index
                  </span>

                  <div className="flex items-end justify-between gap-4">
                    <div className="space-y-0.5">
                      <h3 className={`text-4xl font-display font-black ${getReliabilityColor(activeSource.reliabilityScore)}`}>
                        {activeSource.reliabilityScore}%
                      </h3>
                      <p className="text-[10px] text-zinc-400 font-mono uppercase">System Consensus Rank</p>
                    </div>

                    <div className="w-24 h-12 relative overflow-hidden">
                      {/* Interactive SVG Half-Donut Gauge */}
                      <svg className="w-full h-full" viewBox="0 0 100 50">
                        <path
                          d="M 10 50 A 40 40 0 0 1 90 50"
                          fill="none"
                          stroke="#18181b"
                          strokeWidth="10"
                        />
                        <path
                          d="M 10 50 A 40 40 0 0 1 90 50"
                          fill="none"
                          stroke={activeSource.reliabilityScore >= 80 ? '#10b981' : activeSource.reliabilityScore >= 50 ? '#f59e0b' : '#ef4444'}
                          strokeWidth="10"
                          strokeDasharray="125"
                          strokeDashoffset={125 - (activeSource.reliabilityScore / 100) * 125}
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Accuracy Stats Grid */}
                <div className="bg-[#050505] border border-white/10 p-5">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-black mb-3">
                    Ingested Claim Performance
                  </span>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-black/50 p-2.5 border border-white/5 space-y-0.5">
                      <span className="text-[8px] font-mono text-zinc-500 uppercase">Correct</span>
                      <span className="text-emerald-400 text-sm font-mono font-black block">{activeSource.stats.correctClaims}</span>
                    </div>
                    <div className="bg-black/50 p-2.5 border border-white/5 space-y-0.5">
                      <span className="text-[8px] font-mono text-zinc-500 uppercase">False</span>
                      <span className="text-red-400 text-sm font-mono font-black block">{activeSource.stats.falseClaims}</span>
                    </div>
                    <div className="bg-black/50 p-2.5 border border-white/5 space-y-0.5">
                      <span className="text-[8px] font-mono text-zinc-500 uppercase">Pending</span>
                      <span className="text-amber-400 text-sm font-mono font-black block">{activeSource.stats.unconfirmed}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Source History Timeline */}
              <div className="bg-black border border-white/10 p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                  <h3 className="font-display font-black text-xs uppercase tracking-widest text-white flex items-center gap-2">
                    <Clock className="h-4 w-4 text-pink-500" />
                    <span>Historical Intel Submissions</span>
                  </h3>
                  <span className="text-[9px] font-mono text-zinc-500">{activeSource.stats.totalClaims} TOTAL CLAIMS</span>
                </div>

                <div className="relative pl-4 border-l border-white/5 space-y-5 text-xs">
                  {activeSource.history.map((hist, idx) => (
                    <div key={idx} className="relative space-y-1.5">
                      {/* Bullet node */}
                      <span className="absolute -left-[20.5px] top-1.5 h-2 w-2 bg-pink-500 rounded-none border border-black" />
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono text-zinc-500">{hist.date}</span>
                          <span className={`px-1.5 py-0.5 text-[8px] font-mono font-black border uppercase tracking-wider ${getClaimStatusColor(hist.status)}`}>
                            {hist.status}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-500 uppercase">Assessment Confidence: {hist.trustScore}%</span>
                      </div>

                      <p className="text-zinc-300 font-sans leading-relaxed">
                        {hist.claim}
                      </p>
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
