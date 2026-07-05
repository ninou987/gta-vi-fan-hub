import { motion } from 'motion/react';
import { ShieldCheck, ArrowLeft, CheckCircle2, HelpCircle, AlertTriangle, ShieldAlert, Award, FileSpreadsheet, Lock, CheckCircle, Info } from 'lucide-react';
import TrustBadge from './TrustBadge';

interface TrustLegendViewProps {
  setView: (view: any) => void;
}

export default function TrustLegendView({ setView }: TrustLegendViewProps) {
  const categories = [
    {
      badge: 'official' as const,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/5',
      borderColor: 'border-emerald-500/20',
      scoreRange: '100%',
      criteria: 'Released directly by Rockstar Games or parent company Take-Two Interactive.',
      examples: 'Official trailer releases, financial earnings statements, Rockstar Newswire articles, SEC regulatory filings.',
      implication: 'Treated as absolute, uncompromised factual data. Fully verified and confirmed.',
    },
    {
      badge: 'trusted' as const,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/5',
      borderColor: 'border-blue-500/20',
      scoreRange: '90% - 99%',
      criteria: 'Reported by certified investigative journalists, reputable trade publications, or historically accurate industry insiders.',
      examples: 'Bloomberg investigative reports, reputable developer interviews, officially published USPTO patent registrations.',
      implication: 'Highly reliable with robust secondary verification. Exceptionally low margin of error.',
    },
    {
      badge: 'likely' as const,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/5',
      borderColor: 'border-yellow-500/20',
      scoreRange: '70% - 89%',
      criteria: 'Plausible and strongly supported by correlated technical data, community code audits, or structural game engine assets.',
      examples: 'Cross-referenced coordinate maps from early leaks, domain registry renewals, actor portfolio updates.',
      implication: 'Credible reports showing high probability of inclusion in the final game, but awaiting final confirmation.',
    },
    {
      badge: 'rumor' as const,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/5',
      borderColor: 'border-orange-500/20',
      scoreRange: '30% - 69%',
      criteria: 'Speculative talk, unconfirmed insider claims, or anonymous details posted to social media or gaming forums.',
      examples: 'Anonymous Reddit insider leaks, speculated soundtrack lists, unverified developer forum posts.',
      implication: 'Treat with high caution. Often based on early draft concepts or fan wishlist wishful-thinking.',
    },
    {
      badge: 'fake' as const,
      color: 'text-red-400',
      bgColor: 'bg-red-500/5',
      borderColor: 'border-red-500/20',
      scoreRange: '0% - 29%',
      criteria: 'Proven fabrications, debunked screenshots, fake trailers, or intentionally misleading marketing templates.',
      examples: 'AI-generated voice/screenshot concepts, Photoshopped retailer preorder pages, fanmade "beta access" sites.',
      implication: 'Formally debunked and quarantined. Cataloged solely to keep the community protected from misinformation.',
    },
  ];

  return (
    <div className="space-y-8 pb-12" id="trust-legend-view">
      
      {/* Back button and title */}
      <div className="space-y-4">
        <button
          onClick={() => setView('news')}
          className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-pink-500 hover:text-pink-400 transition-colors uppercase"
          id="back-to-news-btn"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to News Feed</span>
        </button>

        <div>
          <span className="text-pink-500 font-mono text-[10px] tracking-widest uppercase font-black block mb-1">DATA VERIFICATION FRAMEWORK</span>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tighter uppercase leading-none">Trust Badge Registry</h1>
          <p className="text-zinc-400 text-sm mt-2 max-w-3xl font-sans">
            Our proprietary scoring protocols help Vice City intelligence officers separate official developer assets, reliable insider reporting, and community rumors from deceptive online fabrications.
          </p>
        </div>
      </div>

      {/* Grid of badges and details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Badge breakdown cards (8 columns) */}
        <div className="lg:col-span-8 space-y-4">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.badge}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`border ${cat.borderColor} ${cat.bgColor} p-6 relative overflow-hidden group`}
              id={`legend-card-${cat.badge}`}
            >
              {/* Score Range Stamp in top right corner */}
              <div className="absolute top-4 right-4 text-right">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Score Range</span>
                <span className={`text-sm font-mono font-black ${cat.color}`}>{cat.scoreRange}</span>
              </div>

              {/* Title & Badge */}
              <div className="flex items-center space-x-4 mb-4">
                <TrustBadge badge={cat.badge} size="md" />
              </div>

              {/* Grid detail metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs mt-4 pt-4 border-t border-white/5">
                <div>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-black block mb-1">Verification Criteria</span>
                  <p className="text-zinc-300 font-sans leading-relaxed">{cat.criteria}</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-black block mb-1">Common Examples</span>
                  <p className="text-zinc-400 font-sans leading-relaxed">{cat.examples}</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-black block mb-1">Strategic Implication</span>
                  <p className="text-zinc-400 font-sans leading-relaxed">{cat.implication}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right column: Verification System FAQ / Methodology (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Methodology Card */}
          <div className="bg-black border border-white/10 p-6 space-y-4 rounded-none relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-orange-400" />
            <div className="flex items-center space-x-2 text-white">
              <ShieldCheck className="h-5 w-5 text-pink-500 shrink-0" />
              <h3 className="font-display font-black text-sm uppercase tracking-widest">Methodology</h3>
            </div>
            
            <p className="text-zinc-400 text-xs leading-relaxed font-sans">
              Our Trust Verification System processes news reports using three primary dimensions: direct asset access, source historical reliability, and community verification density.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-3">
                <div className="h-6 w-6 rounded-none bg-white/5 border border-white/10 flex items-center justify-center font-mono text-xs text-pink-500 font-bold shrink-0">1</div>
                <div>
                  <h4 className="text-white text-xs font-mono uppercase font-bold">Source Provenance</h4>
                  <p className="text-zinc-500 text-[11px] mt-0.5 leading-normal">Tracing the origin points back to Rockstar Game servers, regulatory filing entries, or known investigative reporters.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-6 w-6 rounded-none bg-white/5 border border-white/10 flex items-center justify-center font-mono text-xs text-pink-500 font-bold shrink-0">2</div>
                <div>
                  <h4 className="text-white text-xs font-mono uppercase font-bold">Cross-Reference Corroboration</h4>
                  <p className="text-zinc-500 text-[11px] mt-0.5 leading-normal">Scanning public software patents, domain updates, actor rosters, and trailer timestamps to find matching file logs.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-6 w-6 rounded-none bg-white/5 border border-white/10 flex items-center justify-center font-mono text-xs text-pink-500 font-bold shrink-0">3</div>
                <div>
                  <h4 className="text-white text-xs font-mono uppercase font-bold">Score Aggregation</h4>
                  <p className="text-zinc-500 text-[11px] mt-0.5 leading-normal">Assigning weighted index scores. Official data gets an absolute 100%, vetted insider details peak at 98%, while internet claims decay rapidly.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ info panel */}
          <div className="bg-[#09090b] border border-white/5 p-6 space-y-3 rounded-none">
            <div className="flex items-center space-x-2 text-zinc-400">
              <Info className="h-4 w-4 text-cyan-400" />
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Why trust matters</span>
            </div>
            <p className="text-zinc-500 text-[11px] leading-relaxed font-sans">
              With over a decade of anticipation, GTA VI is a prime target for internet clickbait, fake leak compilations, and deepfakes. This system acts as a reliable filter so you only read confirmed information.
            </p>
          </div>

          {/* Locked telemetry terminal logs */}
          <div className="border border-white/10 p-4 font-mono text-[9px] text-zinc-600 space-y-1 bg-black rounded-none">
            <div>[INTEL_SYSTEM_REVISION: SECURE_V1.1]</div>
            <div>[KEY_SHARDS: SYNCED]</div>
            <div>[VERIFIER_NODES_ACTIVE: 12]</div>
            <div>[STATUS: VERIFICATION_ENGINE_ONLINE]</div>
          </div>

        </div>

      </div>

    </div>
  );
}
