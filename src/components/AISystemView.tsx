import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, Cpu, Database, Activity, RefreshCw, FileText, CheckCircle2, AlertTriangle, 
  Clock, ShieldCheck, ChevronRight, BarChart2, Radio, Server, Network, Layers, 
  ExternalLink, Search, Flame, Sparkles
} from 'lucide-react';

// Shared Interface or Mock Data
interface AIClaim {
  id: string;
  source: string;
  sourceType: 'social' | 'forum' | 'newswire';
  content: string;
  timestamp: string;
  rawConfidence: number;
  status: 'pending' | 'review' | 'published' | 'rejected';
  topic: string;
  modelOutput?: string;
  reliabilityScore: number;
}

export default function AISystemView() {
  const [activeSubTab, setActiveSubTab] = useState<'dashboard' | 'queue' | 'source-monitor' | 'history' | 'analytics' | 'publishing' | 'review' | 'timeline'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'social' | 'forum' | 'newswire'>('all');
  const [claims, setClaims] = useState<AIClaim[]>([
    {
      id: "claim-101",
      source: "@ViceCityLover",
      sourceType: "social",
      content: "Exclusive leaked map coordinate shows Hamlet/Keys boundaries stretching an extra 15 miles south compared to 2022 leaks.",
      timestamp: "3 mins ago",
      rawConfidence: 89,
      status: "published",
      topic: "Map Coordinate",
      modelOutput: "Mapping coordinate verification matches USPTO patent logs filed by Take-Two Interactive on dynamic cell loading. Auto-published.",
      reliabilityScore: 85
    },
    {
      id: "claim-102",
      source: "Reddit u/GamerX6",
      sourceType: "forum",
      content: "My cousin works at a Florida retail store and says marketing boxes are arriving on October 12, 2026, with a release date sticker for early November.",
      timestamp: "12 mins ago",
      rawConfidence: 24,
      status: "rejected",
      topic: "Release Date",
      modelOutput: "Source reputation index is 12% (unregistered burner account). Claims of early physical box arrival in October violate traditional distribution schedules. Flagged as fabricated.",
      reliabilityScore: 12
    },
    {
      id: "claim-103",
      source: "GTAForums - LeonidaSpeculator",
      sourceType: "forum",
      content: "Trailer 2 soundtrack leak: 'Midnight City' is being replaced or remixed by a legendary Florida synth-wave artist.",
      timestamp: "45 mins ago",
      rawConfidence: 72,
      status: "review",
      topic: "Soundtrack",
      modelOutput: "Audio fingerprinting matches trademark logs, but artist has denied involvement. Divergent consensus. Manual override recommended.",
      reliabilityScore: 68
    },
    {
      id: "claim-104",
      source: "Rockstar Corporate Asset Feed",
      sourceType: "newswire",
      content: "Staging subdomain assets refreshed with v1.2 video player scripts and updated CDN cache-busting headers.",
      timestamp: "1 hour ago",
      rawConfidence: 98,
      status: "published",
      topic: "Official Staging",
      modelOutput: "Cryptographic handshakes on Take-Two domain structures confirm authentic production build. Auto-published.",
      reliabilityScore: 99
    },
    {
      id: "claim-105",
      source: "@LeonidaLeaks",
      sourceType: "social",
      content: "New dynamic crowd pathing details: Beach pedestrians will have unique tan-line mapping and reactive sunscreen applications depending on weather index.",
      timestamp: "2 hours ago",
      rawConfidence: 81,
      status: "pending",
      topic: "NPC Physics",
      modelOutput: "Matches Rockstar AI Patent US10928236B2 on pedestrian reactive shaders. Running procedural validation pipeline.",
      reliabilityScore: 78
    },
    {
      id: "claim-106",
      source: "Rockstar Careers Registry",
      sourceType: "newswire",
      content: "Take-Two hired 3 Senior Level Designers in Miami and Fort Lauderdale for regional asset verification.",
      timestamp: "4 hours ago",
      rawConfidence: 95,
      status: "published",
      topic: "Corporate Hiring",
      modelOutput: "Verified via authentic business registry entries. Re-confirmed by LinkedIn API hooks.",
      reliabilityScore: 94
    },
    {
      id: "claim-107",
      source: "Reddit u/MapMaster99",
      sourceType: "forum",
      content: "The dynamic water physics rendering uses a dual-grid Fourier transform on the GPU. Allows real-time speedboat wake deformation.",
      timestamp: "6 hours ago",
      rawConfidence: 87,
      status: "review",
      topic: "Water Shader",
      modelOutput: "Highly plausible based on 2022 leaked physics headers, but exact dual-grid model cannot be authenticated without active build execution. Queued for developer review.",
      reliabilityScore: 84
    },
  ]);

  // Console log entries for Activity Timeline
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "CRON: [05:00:00] Ingestion routine completed. 14 crawlers reporting operational.",
    "PARSER: [05:04:12] Tokenized 18 claims from Reddit r/GTA6.",
    "MODEL: [05:04:15] Running credibility weights on claim-101. Match rating: 89%.",
    "PIPELINE: [05:04:16] [AUTO-PUBLISH] claim-101 approved. Pushed to client timeline.",
    "CRAWLER: [05:15:00] Twitter API stream pinged. 42 tweets matched key query sequence.",
    "MODEL: [05:15:22] Run forensics on image attachment for claim-102. High alteration score.",
    "PIPELINE: [05:15:23] [REJECTED] claim-102 dropped. Reason: FORENSICS_ALT_HIGH.",
    "CRON: [05:30:00] Initializing database validation of known Rockstar domains...",
    "DB_PING: [05:30:02] rockstargames.com subdomain status: 200 OK. Certificates up to date."
  ]);

  useEffect(() => {
    // Simulated live updates
    const interval = setInterval(() => {
      const topics = ["Physics Engine", "Weapon Reload", "Vehicle Suspension", "Lucia Voice Clip", "Take-Two Shareholder Report"];
      const sources = ["@ViceCityReport", "Reddit u/GTAInsider", "Take-Two Investor Portal", "GTAForums - ViceGuy", "@FloridaGamer"];
      const sourceTypes: ('social' | 'forum' | 'newswire')[] = ["social", "forum", "newswire"];
      
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      const randomSource = sources[Math.floor(Math.random() * sources.length)];
      const randomType = sourceTypes[Math.floor(Math.random() * sourceTypes.length)];
      const confidence = Math.floor(Math.random() * 60) + 35;
      const id = `claim-${Math.floor(Math.random() * 900) + 200}`;
      
      const newClaim: AIClaim = {
        id,
        source: randomSource,
        sourceType: randomType,
        content: `Speculative leak regarding ${randomTopic.toLowerCase()}: Community reports a new RAGE build signature is live.`,
        timestamp: "Just now",
        rawConfidence: confidence,
        status: confidence > 85 ? "published" : confidence < 40 ? "rejected" : "review",
        topic: randomTopic,
        modelOutput: `Model evaluated claims for ${randomTopic}. Confidence calculated at ${confidence}%. Target classified as ${confidence > 80 ? 'HIGHLY_PLAUSIBLE' : confidence < 50 ? 'SUSPICIOUS' : 'AMBIGUOUS'}.`,
        reliabilityScore: Math.floor(confidence * 0.9 + Math.random() * 10)
      };

      setClaims(prev => [newClaim, ...prev.slice(0, 15)]);

      // Add log
      const timeStr = new Date().toLocaleTimeString();
      const statusText = confidence > 85 ? `AUTO-PUBLISHED` : confidence < 40 ? `REJECTED` : `QUEUED_FOR_REVIEW`;
      setConsoleLogs(prev => [
        `MODEL: [${timeStr}] Scanned new raw node from ${randomSource}. Confidence: ${confidence}%.`,
        `PIPELINE: [${timeStr}] Claim ${id} evaluated. Status: ${statusText}.`,
        ...prev.slice(0, 15)
      ]);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const handleManualAction = (id: string, action: 'publish' | 'reject') => {
    setClaims(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: action === 'publish' ? 'published' : 'rejected',
          modelOutput: `Manual override executed by Lead Administrator. Status updated to ${action.toUpperCase()}.`
        };
      }
      return c;
    }));
  };

  const getSourceTypeColor = (type: string) => {
    switch (type) {
      case 'newswire': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5';
      case 'social': return 'text-sky-400 border-sky-500/30 bg-sky-500/5';
      case 'forum': return 'text-orange-400 border-orange-500/30 bg-orange-500/5';
      default: return 'text-zinc-400 border-white/10';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published': return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'rejected': return 'bg-red-500/15 text-red-400 border-red-500/30';
      case 'review': return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'pending': return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      default: return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto" id="ai-system-view">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="text-pink-500 font-mono text-[10px] tracking-widest uppercase font-black block mb-1">
            CORE COGNITIVE LAYER — VERSION 1.1 AI READY
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tighter uppercase leading-none">
            AI Core & Operations
          </h1>
          <p className="text-zinc-400 text-sm mt-2 max-w-3xl font-sans text-left">
            Observe, audit, and fine-tune our background AI pipeline. Review automated claims, map ingestion vectors, and control publishing queues in real-time.
          </p>
        </div>

        {/* Neural Network Status Badge */}
        <div className="bg-[#09090b]/90 border border-white/10 px-4 py-2.5 flex items-center gap-3 shrink-0">
          <div className="relative">
            <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
          </div>
          <div className="text-left font-mono">
            <span className="text-[9px] text-zinc-500 block uppercase font-bold">RAGE Engine Neural-V</span>
            <span className="text-xs text-white font-black">97.4% SYNTAX ACCURACY</span>
          </div>
        </div>
      </div>

      {/* SUB-TABS NAVIGATION */}
      <div className="border-b border-white/10 flex flex-wrap gap-1 bg-[#050505]/40 p-1">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: Brain },
          { id: 'queue', label: 'Ingestion Queue', icon: Cpu },
          { id: 'source-monitor', label: 'Source Monitor', icon: Radio },
          { id: 'history', label: 'Verification History', icon: ShieldCheck },
          { id: 'analytics', label: 'AI Analytics', icon: BarChart2 },
          { id: 'publishing', label: 'Publishing Queue', icon: FileText },
          { id: 'review', label: 'Review Queue', icon: AlertTriangle },
          { id: 'timeline', label: 'Activity Timeline', icon: Clock }
        ].map((subTab) => {
          const Icon = subTab.icon;
          return (
            <button
              key={subTab.id}
              onClick={() => setActiveSubTab(subTab.id as any)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors select-none ${
                activeSubTab === subTab.id 
                  ? 'border-b-2 border-pink-500 text-pink-500 bg-pink-500/5 font-black' 
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="h-4.5 w-4.5" />
              <span className="hidden sm:inline">{subTab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-TAB CONTENTS */}
      <div className="min-h-[450px]">
        
        {/* 1. DASHBOARD OVERVIEW */}
        {activeSubTab === 'dashboard' && (
          <div className="space-y-6" id="ai-sub-dashboard">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Claims Parsed (24h)", value: "1,494", change: "+14.2% overnight", icon: Database, color: "text-pink-500" },
                { title: "Auto-Published", value: "324 alerts", change: "No manual overrides needed", icon: CheckCircle2, color: "text-emerald-400" },
                { title: "Flagged for Review", value: "12 cases", change: "Requires admin action", icon: AlertTriangle, color: "text-amber-500" },
                { title: "Active Crawling Nodes", value: "14 / 14 OK", change: "Rockstar, SEC, Reddit, Twitter", icon: Server, color: "text-cyan-400" }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-black/40 border border-white/10 p-5 space-y-3 relative overflow-hidden text-left">
                    <div className="absolute top-0 right-0 p-3 opacity-15">
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">{stat.title}</span>
                    <h2 className="text-2xl sm:text-3xl font-display font-black text-white">{stat.value}</h2>
                    <p className="text-[10px] text-zinc-400 font-mono leading-tight">{stat.change}</p>
                  </div>
                );
              })}
            </div>

            {/* Neural System Overview & Sandbox Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-8 bg-black/60 border border-white/10 p-6 space-y-5 text-left">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <h3 className="font-display font-black text-sm uppercase tracking-wider text-white flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-pink-500" />
                    <span>Background Machine Intelligence Pipeline</span>
                  </h3>
                  <span className="text-[9px] font-mono px-2 py-0.5 border border-emerald-500/20 text-emerald-400 uppercase bg-emerald-500/5 font-black">
                    FULLY OPERATIONAL
                  </span>
                </div>

                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  The automated ingestion framework runs full natural language parsing over global gaming registries, SEC documents, Take-Two Interactive investor schedules, and major social vectors. Using dynamic coordinate triangulation and asset hash analysis, it assigns a reliability rating to prevent community overhype and debunk fake promotional reels instantly.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="border border-white/5 bg-[#030303] p-4 space-y-2">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase">Textual NLP Analysis</span>
                    <h4 className="text-white text-xs font-mono font-black uppercase">Active (v1.2R)</h4>
                    <p className="text-[10px] text-zinc-400">Processes grammar patterns, context timelines, and author credentials.</p>
                  </div>
                  <div className="border border-white/5 bg-[#030303] p-4 space-y-2">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase">Image Forensics</span>
                    <h4 className="text-white text-xs font-mono font-black uppercase">Active (v2.0F)</h4>
                    <p className="text-[10px] text-zinc-400">Checks EXIF data, ELA compression grids, and pixel manipulation anomalies.</p>
                  </div>
                  <div className="border border-white/5 bg-[#030303] p-4 space-y-2">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase">Audio Fingerprinting</span>
                    <h4 className="text-white text-xs font-mono font-black uppercase">Staged (v0.8A)</h4>
                    <p className="text-[10px] text-zinc-400">Matches soundscapes in gameplay leaks to known audio libraries.</p>
                  </div>
                </div>
              </div>

              {/* Quick Pipeline Settings Status */}
              <div className="lg:col-span-4 bg-[#09090b] border border-white/10 p-5 space-y-4 text-left">
                <h3 className="font-display font-black text-sm uppercase tracking-wider text-white border-b border-white/5 pb-3">
                  Calibration Metrics
                </h3>
                
                <div className="space-y-4 text-xs font-mono">
                  <div className="space-y-1">
                    <div className="flex justify-between font-bold uppercase text-[9px] text-zinc-400">
                      <span>Auto-Publish Threshold</span>
                      <span className="text-pink-500">85% Confidence</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-900 border border-white/5">
                      <div className="h-full bg-pink-500" style={{ width: '85%' }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between font-bold uppercase text-[9px] text-zinc-400">
                      <span>Forensic Demotion Weight</span>
                      <span className="text-pink-500">75% Weight</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-900 border border-white/5">
                      <div className="h-full bg-pink-500" style={{ width: '75%' }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between font-bold uppercase text-[9px] text-zinc-400">
                      <span>Known-Source Rep Index</span>
                      <span className="text-emerald-400">92% Average</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-900 border border-white/5">
                      <div className="h-full bg-emerald-400" style={{ width: '92%' }} />
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <button
                    onClick={() => setActiveSubTab('analytics')}
                    className="w-full py-2.5 border border-pink-500/30 hover:border-pink-500 text-pink-400 bg-pink-500/5 font-mono text-[10px] uppercase font-bold tracking-widest transition-colors select-none text-center block"
                  >
                    View Network Charts
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. INGESTION QUEUE */}
        {activeSubTab === 'queue' && (
          <div className="space-y-6" id="ai-sub-queue">
            <div className="bg-black/60 border border-white/10 p-5 flex flex-col md:flex-row justify-between items-center gap-4 text-left">
              <div>
                <h3 className="text-sm font-mono font-black text-white uppercase tracking-wider">Active Ingestion Ledger</h3>
                <p className="text-zinc-500 text-[11px] font-sans mt-0.5">Live-scanned items currently being processed by NLP parsing pipelines.</p>
              </div>

              <div className="flex gap-2 w-full md:w-auto shrink-0 font-mono text-xs">
                <div className="relative flex-1 md:w-64">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search raw claims..."
                    className="w-full bg-black border border-white/10 pl-8 pr-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-pink-500 text-xs rounded-none"
                  />
                  <Search className="h-3.5 w-3.5 absolute left-2.5 top-3 text-zinc-600" />
                </div>

                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="bg-black border border-white/10 px-3 py-2 text-zinc-400 focus:outline-none text-xs rounded-none"
                >
                  <option value="all">All Sources</option>
                  <option value="social">X / Social</option>
                  <option value="forum">Forums</option>
                  <option value="newswire">Official Feed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {claims
                .filter(c => filterType === 'all' || c.sourceType === filterType)
                .filter(c => c.content.toLowerCase().includes(searchTerm.toLowerCase()) || c.topic.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((claim) => (
                  <div key={claim.id} className="bg-[#050505] border border-white/15 p-5 flex flex-col justify-between relative text-left hover:border-pink-500/30 transition-all">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] text-zinc-500 font-mono">{claim.timestamp}</span>
                        <span className={`text-[8px] px-1.5 py-0.5 border font-mono font-black uppercase ${getSourceTypeColor(claim.sourceType)}`}>
                          {claim.sourceType}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-pink-500 uppercase font-black">[{claim.topic}]</span>
                        <h4 className="text-white text-sm font-sans font-semibold">{claim.source}</h4>
                      </div>

                      <p className="text-zinc-400 text-xs leading-relaxed font-sans bg-black p-3 border border-white/5">
                        "{claim.content}"
                      </p>
                    </div>

                    <div className="border-t border-white/5 pt-4 mt-4 space-y-3">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-zinc-500 uppercase text-[9px]">Calculated confidence</span>
                        <span className={`${claim.rawConfidence > 80 ? 'text-emerald-400' : claim.rawConfidence > 50 ? 'text-amber-400' : 'text-red-400'} font-black`}>
                          {claim.rawConfidence}%
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleManualAction(claim.id, 'publish')}
                          className="flex-1 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold uppercase transition-colors"
                        >
                          Manual Approve
                        </button>
                        <button
                          onClick={() => handleManualAction(claim.id, 'reject')}
                          className="flex-1 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-mono font-bold uppercase transition-colors"
                        >
                          Manual Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* 3. SOURCE MONITOR */}
        {activeSubTab === 'source-monitor' && (
          <div className="space-y-6" id="ai-sub-source-monitor">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                { name: "Take-Two Investor API Feed", type: "newswire", delay: "30s", count: 41, status: "OK", speed: "14ms", error: "0.0%" },
                { name: "Reddit Ingestion Scraper", type: "forum", delay: "5m", count: 1840, status: "OK", speed: "125ms", error: "0.4%" },
                { name: "X Twitter Stream Handler", type: "social", delay: "Realtime", count: 14092, status: "OK", speed: "84ms", error: "1.1%" },
                { name: "Rockstar Staging Subdomains", type: "newswire", delay: "1m", count: 22, status: "OK", speed: "19ms", error: "0.0%" },
                { name: "GTAForums Thread Poller", type: "forum", delay: "10m", count: 914, status: "OK", speed: "210ms", error: "2.1%" },
                { name: "Florida Judicial Records scraper", type: "newswire", delay: "1h", count: 12, status: "IDLE", speed: "N/A", error: "0.0%" }
              ].map((node, idx) => (
                <div key={idx} className="bg-black border border-white/10 p-5 space-y-4 relative overflow-hidden">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">{node.type}</span>
                    <span className="flex h-2 w-2 relative">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${node.status === 'OK' ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${node.status === 'OK' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-white text-sm font-display font-black uppercase tracking-tight">{node.name}</h4>
                    <p className="text-[10px] text-zinc-500 font-mono">Interval: {node.delay} • Latency: {node.speed}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] font-mono border-t border-white/5">
                    <div>
                      <span className="text-zinc-500 uppercase">Records Parsed</span>
                      <span className="text-white font-bold block">{node.count}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 uppercase">Error Rate</span>
                      <span className={`${node.error === '0.0%' ? 'text-zinc-500' : 'text-orange-400'} font-bold block`}>{node.error}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. VERIFICATION HISTORY */}
        {activeSubTab === 'history' && (
          <div className="space-y-6" id="ai-sub-history">
            <div className="bg-black/40 border border-white/10 p-5 text-left space-y-4">
              <h3 className="text-sm font-mono font-black text-white uppercase tracking-wider">Archived Verification Logs</h3>
              <p className="text-zinc-400 text-xs">Search and filter through historical assessments run by RAGE core algorithms.</p>
            </div>

            <div className="overflow-x-auto border border-white/10 bg-black">
              <table className="w-full text-left font-mono text-xs text-zinc-400">
                <thead>
                  <tr className="bg-zinc-950 text-zinc-500 border-b border-white/10 text-[10px] uppercase font-black">
                    <th className="p-4">Reference ID</th>
                    <th className="p-4">Topic</th>
                    <th className="p-4">Target Source</th>
                    <th className="p-4">AI Score</th>
                    <th className="p-4">Evaluation Outcome</th>
                    <th className="p-4 text-right">Scanned</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {claims.map((claim) => (
                    <tr key={claim.id} className="hover:bg-white/[0.01] transition-colors">
                      <td className="p-4 text-white font-bold">{claim.id}</td>
                      <td className="p-4 text-pink-500 uppercase font-black text-[10px]">{claim.topic}</td>
                      <td className="p-4">{claim.source}</td>
                      <td className="p-4 font-black text-white">{claim.rawConfidence}%</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 border text-[9px] uppercase font-black tracking-wider ${getStatusBadge(claim.status)}`}>
                          {claim.status}
                        </span>
                      </td>
                      <td className="p-4 text-right text-zinc-500">{claim.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. AI ANALYTICS */}
        {activeSubTab === 'analytics' && (
          <div className="space-y-6" id="ai-sub-analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              
              {/* Daily scan volume chart */}
              <div className="bg-[#050505] border border-white/10 p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <h4 className="text-xs font-mono font-black text-white uppercase tracking-wider">Daily Scan Volumes (Past 7 Days)</h4>
                  <span className="text-[9px] font-mono text-zinc-500">14,942 TOTAL RECORDS</span>
                </div>

                {/* SVG Area Chart */}
                <div className="h-48 flex items-end justify-between gap-1.5 pt-4 relative">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
                    <div className="border-b border-white w-full h-0" />
                    <div className="border-b border-white w-full h-0" />
                    <div className="border-b border-white w-full h-0" />
                    <div className="border-b border-white w-full h-0" />
                  </div>

                  {[120, 180, 240, 210, 290, 310, 380].map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer z-10">
                      <div className="w-full bg-pink-500/20 hover:bg-pink-500/40 border-t-2 border-pink-500 transition-all flex items-end justify-center" style={{ height: `${(val / 400) * 100}%` }}>
                        <span className="text-[8px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity mb-2">{val}</span>
                      </div>
                      <span className="text-[9px] font-mono text-zinc-500">Day {i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confidence interval distribution */}
              <div className="bg-[#050505] border border-white/10 p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <h4 className="text-xs font-mono font-black text-white uppercase tracking-wider">Accuracy Variance Index</h4>
                  <span className="text-[9px] font-mono text-zinc-500">STDEV: 0.04%</span>
                </div>

                {/* Simple SVG Line/Curve representing accuracy variance */}
                <div className="h-48 pt-4 flex items-center justify-center relative">
                  <svg className="w-full h-full" viewBox="0 0 400 150">
                    <path
                      d="M 10,130 C 50,130 90,110 130,80 C 170,50 210,10 250,10 C 290,10 330,80 390,130"
                      fill="none"
                      stroke="#ec4899"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M 10,130 C 50,130 90,110 130,80 C 170,50 210,10 250,10 C 290,10 330,80 390,130 L 390,150 L 10,150 Z"
                      fill="url(#grad)"
                      opacity="0.1"
                    />
                    <defs>
                      <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                    <circle cx="250" cy="10" r="4" fill="#ec4899" />
                    <text x="250" y="25" fill="#ffffff" fontSize="9" textAnchor="middle" fontFamily="monospace">97.4% Consensus Peak</text>
                  </svg>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 6. PUBLISHING QUEUE */}
        {activeSubTab === 'publishing' && (
          <div className="space-y-6" id="ai-sub-publishing">
            <div className="bg-black/60 border border-white/10 p-5 text-left space-y-2">
              <h3 className="text-sm font-mono font-black text-white uppercase tracking-wider">Automated News Pipeline Queue</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Items marked with confidence weights exceeding the 85% thresholds are posted autonomously on client streams. Below represents execution feedback.
              </p>
            </div>

            <div className="space-y-4">
              {claims
                .filter(c => c.status === 'published')
                .map((claim) => (
                  <div key={claim.id} className="bg-black border border-white/10 p-5 sm:p-6 space-y-3 relative text-left">
                    <div className="absolute left-0 top-0 h-full w-[3px] bg-emerald-500" />
                    <div className="flex justify-between items-start">
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase">{claim.timestamp} • RUN ID: {claim.id}</span>
                        <h4 className="text-white text-base font-display font-black uppercase tracking-tight">{claim.topic}</h4>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-[8px] font-mono text-emerald-400 uppercase font-black">
                        AUTO-PUBLISHED APPROVED
                      </span>
                    </div>

                    <p className="text-zinc-400 text-xs font-sans leading-relaxed">
                      "{claim.content}"
                    </p>

                    <div className="bg-zinc-950 border border-white/5 p-3 text-[10px] font-mono text-zinc-400 leading-relaxed">
                      <span className="text-pink-500 uppercase font-black block mb-0.5">Automated RAGE Ingestion Feedback:</span>
                      {claim.modelOutput}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* 7. REVIEW QUEUE */}
        {activeSubTab === 'review' && (
          <div className="space-y-6" id="ai-sub-review">
            <div className="bg-black/60 border border-white/10 p-5 text-left space-y-2">
              <h3 className="text-sm font-mono font-black text-white uppercase tracking-wider">Manual Review Incidents</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Claims within grey-area confidence margins (50%-85%) require supervisor review and manual overrides before they can be displayed publicly.
              </p>
            </div>

            <div className="space-y-4">
              {claims
                .filter(c => c.status === 'review')
                .map((claim) => (
                  <div key={claim.id} className="bg-black border border-white/10 p-5 sm:p-6 space-y-4 relative text-left">
                    <div className="absolute left-0 top-0 h-full w-[3px] bg-amber-500" />
                    <div className="flex justify-between items-start">
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase">{claim.timestamp} • CASE REF: {claim.id}</span>
                        <h4 className="text-white text-base font-display font-black uppercase tracking-tight">{claim.topic}</h4>
                      </div>
                      <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-[8px] font-mono text-amber-400 uppercase font-black">
                        PENDING MANUAL OVERRIDE
                      </span>
                    </div>

                    <p className="text-zinc-400 text-xs font-sans leading-relaxed">
                      "{claim.content}"
                    </p>

                    <div className="bg-zinc-950 border border-white/5 p-3 text-[10px] font-mono text-zinc-400 leading-relaxed">
                      <span className="text-pink-500 uppercase font-black block mb-0.5">AI Engine Ingestion Assessment:</span>
                      {claim.modelOutput}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleManualAction(claim.id, 'publish')}
                        className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-black font-display font-black text-[10px] uppercase tracking-wider transition-colors"
                      >
                        Approve & Post to Feed
                      </button>
                      <button
                        onClick={() => handleManualAction(claim.id, 'reject')}
                        className="px-4 py-2 border border-white/15 hover:border-red-500 hover:text-red-400 text-zinc-400 font-mono text-[10px] uppercase tracking-wider transition-colors"
                      >
                        Reject & Drop
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* 8. ACTIVITY TIMELINE */}
        {activeSubTab === 'timeline' && (
          <div className="space-y-6" id="ai-sub-timeline">
            <div className="bg-black/40 border border-white/10 p-5 text-left space-y-4">
              <h3 className="text-sm font-mono font-black text-white uppercase tracking-wider">Live System Logs & Chronology</h3>
              <p className="text-zinc-400 text-xs">Observe live scheduler tasks, background scraper triggers, and database calibrations in chronological sequence.</p>
            </div>

            <div className="bg-black border border-white/10 p-5 font-mono text-xs text-zinc-400 space-y-2.5 rounded-none h-96 overflow-y-auto text-left">
              {consoleLogs.map((log, idx) => {
                let colorClass = "text-zinc-400";
                if (log.includes("[AUTO-PUBLISH]") || log.includes("approved")) colorClass = "text-emerald-400";
                else if (log.includes("[REJECTED]")) colorClass = "text-red-400";
                else if (log.includes("QUEUED_FOR_REVIEW")) colorClass = "text-amber-400";
                else if (log.includes("CRON:")) colorClass = "text-cyan-400";
                else if (log.includes("MODEL:")) colorClass = "text-pink-400";
                return (
                  <div key={idx} className={`leading-relaxed border-b border-white/5 pb-1 ${colorClass}`}>
                    {log}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
