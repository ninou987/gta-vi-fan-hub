import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, Bot, Zap, RefreshCw, Play, Settings, ShieldCheck, 
  Activity, Rss, Clock, ChevronDown, ChevronUp, BarChart2, CheckCircle2,
  AlertTriangle, HelpCircle, FileText, ArrowRight, Sparkles, Send, Globe, Database
} from 'lucide-react';
import { timelineEventsData } from '../data/gtaData';
import { TimelineEvent, TrustBadgeType } from '../types';
import TrustBadge from './TrustBadge';

interface AINewsViewProps {
  setView: (view: any) => void;
}

export default function AINewsView({ setView }: AINewsViewProps) {
  // Filters & State
  const [selectedBadgeFilter, setSelectedBadgeFilter] = useState<string>('all');
  const [expandedEventId, setExpandedEventId] = useState<string | null>('t1');
  const [isSimulationRunning, setIsSimulationRunning] = useState<boolean>(false);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);
  const [simulationStep, setSimulationStep] = useState<number>(0);
  
  // Custom Scanner state
  const [scanInput, setScanInput] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [scanResult, setScanResult] = useState<TimelineEvent | null>(null);

  // Auto-publishing simulator state
  const [isAutoPublishOn, setIsAutoPublishOn] = useState<boolean>(true);
  const [autoPublishMinScore, setAutoPublishMinScore] = useState<number>(85);
  const [activeCrawlers, setActiveCrawlers] = useState({
    newswire: true,
    social: true,
    forums: false
  });

  const filteredEvents = timelineEventsData.filter((event) => {
    if (selectedBadgeFilter === 'all') return true;
    return event.trustBadge === selectedBadgeFilter;
  });

  const getScoreColor = (badge: TrustBadgeType) => {
    switch (badge) {
      case 'official': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5';
      case 'trusted': return 'text-blue-400 border-blue-500/30 bg-blue-500/5';
      case 'likely': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/5';
      case 'rumor': return 'text-orange-400 border-orange-500/30 bg-orange-500/5';
      case 'fake': return 'text-red-400 border-red-500/30 bg-red-500/5';
    }
  };

  const getConfidenceLabel = (level?: 'low' | 'medium' | 'high' | 'absolute') => {
    switch (level) {
      case 'absolute': return { text: 'Absolute Consensus', style: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' };
      case 'high': return { text: 'High Confidence', style: 'text-blue-400 border-blue-500/20 bg-blue-500/5' };
      case 'medium': return { text: 'Moderate Confidence', style: 'text-yellow-400 border-yellow-500/20 bg-yellow-500/5' };
      case 'low': return { text: 'Low Credibility Check', style: 'text-red-400 border-red-500/20 bg-red-500/5' };
      default: return { text: 'Unrated', style: 'text-zinc-500 border-white/5' };
    }
  };

  const getStatusLabel = (status?: 'verified' | 'refuted' | 'unconfirmed' | 'disputed') => {
    switch (status) {
      case 'verified': return { text: 'Verifiable Fact', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
      case 'refuted': return { text: 'Proven Fabricated', color: 'text-red-400 bg-red-500/10 border-red-500/20' };
      case 'disputed': return { text: 'Highly Disputed', color: 'text-orange-400 bg-orange-500/10 border-orange-500/20' };
      case 'unconfirmed': return { text: 'Unconfirmed Speculation', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' };
      default: return { text: 'Unknown', color: 'text-zinc-400 bg-zinc-950 border-white/10' };
    }
  };

  // Run automatic publishing pipeline mock
  const handleTriggerPipelineSimulation = () => {
    setIsSimulationRunning(true);
    setSimulationStep(1);
    setSimulationLog(['[PIPELINE] Initializing scraper protocols...']);

    const steps = [
      { log: '[CRAWLER] Querying Rockstar Newswire API endpoints...', delay: 600 },
      { log: '[CRAWLER] Crawling Reddit r/GTA6 speculative listings...', delay: 1200 },
      { log: '[NLP_PARSER] Scanning X/Twitter for keyword bursts (#GTAVI, #Lucia, #TakeTwo)...', delay: 1800 },
      { log: '[SIGNATURE_CHECK] Checking domain records & game build signatures...', delay: 2400 },
      { log: '[AGGREGATOR] Cross-corroborating results with historical database...', delay: 3000 },
      { log: '[DECISION_ENGINE] Filtering through Auto-Publish criteria (Min score: 85%)...', delay: 3600 },
      { log: '[COMPLETED] Pipeline run success. 0 new official alerts, 1 unconfirmed rumor queued for moderation.', delay: 4200 }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSimulationLog(prev => [...prev, step.log]);
        setSimulationStep(idx + 2);
        if (idx === steps.length - 1) {
          setIsSimulationRunning(false);
        }
      }, step.delay);
    });
  };

  // Run Custom Verification Scan Simulator
  const handleRunScanner = () => {
    if (!scanInput.trim()) return;
    setIsScanning(true);
    setScanResult(null);

    const scanSteps = [
      'Extracting entities and core claims...',
      'Scraping Rockstar Games servers for matching metadata...',
      'Cross-referencing legal registry database and domain holdings...',
      'Analyzing file metadata and Photoshop color layers for forensics...',
      'Synthesizing consensus ratings across 5 separate investigative agencies...'
    ];

    scanSteps.forEach((stepText, idx) => {
      setTimeout(() => {
        setScanStep(stepText);
        if (idx === scanSteps.length - 1) {
          // Process smart outcome based on keywords
          const textLower = scanInput.toLowerCase();
          let result: TimelineEvent;

          if (textLower.includes('rockstar') || textLower.includes('trailer 2') || textLower.includes('newswire') || textLower.includes('official')) {
            result = {
              id: 'sim-official',
              date: 'July 2026',
              title: 'Analyzed: Rockstar Trailer 2 Announcement Assets',
              category: 'official',
              summary: 'Official metadata corroborations support an upcoming media deployment.',
              details: 'The user query references authentic server directory logs suggesting a staging layout ready for Trailer 2 videos.',
              trustBadge: 'official',
              trustScore: 100,
              sources: ['Rockstar Assets Server IP', 'Content Delivery Network Edge Logs'],
              lastVerified: 'Just now',
              aiSummary: 'Cryptographic staging signatures match Rockstar distribution certificates perfectly.',
              confidenceLevel: 'absolute',
              verificationStatus: 'verified',
              aiReasoning: 'Scans indicate the referenced server hashes represent genuine production endpoints registered under Rockstar Games corporate credentials. The claim is classified as absolute verified fact.',
              scoreTimeline: [
                { date: '12 min ago', score: 50, event: 'Rumor submitted on social handle' },
                { date: 'Just now', score: 100, event: 'Rockstar SSL digital certificate confirmed' }
              ]
            };
          } else if (textLower.includes('leak') || textLower.includes('code') || textLower.includes('jason') || textLower.includes('lucia')) {
            result = {
              id: 'sim-leak',
              date: 'July 2026',
              title: 'Analyzed: Internal Development Code Snippets',
              category: 'leak',
              summary: 'Corroborated code snippets showing physics and rendering loops.',
              details: 'User pasted a raw snippet containing structural reference nodes like "CPhysical__ViceCity_Leonida_WaterSimulation".',
              trustBadge: 'trusted',
              trustScore: 94,
              sources: ['RAGE Engine Documentation Leaks', 'Developer Git Repositories'],
              lastVerified: 'Just now',
              aiSummary: 'Source code syntax aligns identically with known RAGE framework libraries and physics variables.',
              confidenceLevel: 'high',
              verificationStatus: 'verified',
              aiReasoning: 'The variable syntax, memory allocation offsets, and structure definitions are structurally identical to core Rockstar Advanced Game Engine (RAGE) builds leaked in 2022. It is highly trusted with a 94% index score.',
              scoreTimeline: [
                { date: '1 hour ago', score: 70, event: 'Source file shared on private message board' },
                { date: 'Just now', score: 94, event: 'RAGE structural parsing and syntax checking complete' }
              ]
            };
          } else if (textLower.includes('map') || textLower.includes('island') || textLower.includes('cuba') || textLower.includes('size')) {
            result = {
              id: 'sim-likely',
              date: 'July 2026',
              title: 'Analyzed: Speculated Supplemental Map Expansions',
              category: 'speculation',
              summary: 'Dynamic island assets under research pipeline.',
              details: 'Analyzed theories claim extra map regions will expand the Leonida footprint into surrounding Caribbean coordinate points.',
              trustBadge: 'likely',
              trustScore: 78,
              sources: ['Supplemental Asset Patents', 'Flight Corridor Coordinate Mapping'],
              lastVerified: 'Just now',
              aiSummary: 'Supported by Rockstar flight path coordinate databases and aircraft simulation patterns.',
              confidenceLevel: 'medium',
              verificationStatus: 'unconfirmed',
              aiReasoning: 'Flight paths modeled in early engine builds contain boundary points specifically set around the Florida Strait direction. This strongly implies plans for external map cells, though final inclusion targets are unconfirmed.',
              scoreTimeline: [
                { date: 'June 2025', score: 40, event: 'First flight coordinates tracked in build files' },
                { date: 'Just now', score: 78, event: 'Correlating USPTO interactive mapping patent discovered' }
              ]
            };
          } else if (textLower.includes('release') || textLower.includes('delay') || textLower.includes('2027') || textLower.includes('date')) {
            result = {
              id: 'sim-rumor',
              date: 'July 2026',
              title: 'Analyzed: Speculated 2027 Internal Delay Rumor',
              category: 'speculation',
              summary: 'Anonymous forum claims developer burnout will slip target into 2027.',
              details: 'An unverified claim circulated on Discord suggesting developmental issues are pushing release back.',
              trustBadge: 'rumor',
              trustScore: 35,
              sources: ['Anonymous Discord Posts', 'Shareholder Guidance Corroboration'],
              lastVerified: 'Just now',
              aiSummary: 'No matching records in SEC regulatory guidance. Parent publisher strictly maintains FY2026 targets.',
              confidenceLevel: 'low',
              verificationStatus: 'unconfirmed',
              aiReasoning: 'This claim originates from a newly registered account with zero historical leak credentials. Shareholder briefings released on May 16 explicitly reinforce the active release target. Classified as low-credibility rumor.',
              scoreTimeline: [
                { date: '2 days ago', score: 50, event: 'Burner account publishes delay thread on Reddit' },
                { date: 'Just now', score: 35, event: 'Formal financial target alignment checks complete' }
              ]
            };
          } else {
            result = {
              id: 'sim-fake',
              date: 'July 2026',
              title: 'Analyzed: Paste Claim & Video Forensics',
              category: 'speculation',
              summary: 'The submitted document exhibits high digital distortion and formatting anomalies.',
              details: 'Analysis of files, text templates, and claims showing inconsistent parameters, incorrect developer logos, and lack of real source verification.',
              trustBadge: 'fake',
              trustScore: 12,
              sources: ['Retail API Registry Scans', 'Reverse Image Search Database'],
              lastVerified: 'Just now',
              aiSummary: 'High levels of structural tampering detected. Contains text syntax matching general GPT mockup templates.',
              confidenceLevel: 'low',
              verificationStatus: 'refuted',
              aiReasoning: 'The text uses general promotional keywords and mock specifications. Reverse image search of associated assets connects directly to fan art galleries published in early 2024. Heavily debunked.',
              scoreTimeline: [
                { date: '3 hours ago', score: 65, event: 'Claim uploaded online' },
                { date: 'Just now', score: 12, event: 'Visual forensics and image template matching complete' }
              ]
            };
          }

          setScanResult(result);
          setIsScanning(false);
        }
      }, (idx + 1) * 600);
    });
  };

  return (
    <div className="space-y-8 pb-12" id="ai-news-center-root">
      
      {/* Page Header block */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6" id="ai-news-header">
        <div>
          <div className="flex items-center space-x-2 text-pink-500 font-mono text-[10px] tracking-widest uppercase font-black mb-1">
            <Brain className="h-4 w-4 text-pink-500 shrink-0" />
            <span>AI NEWS INTELLIGENCE FRAMEWORK</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tighter uppercase leading-none">
            AI News Center
          </h1>
          <p className="text-zinc-400 text-sm mt-2 max-w-3xl font-sans">
            Our autonomous AI intelligence agent scans Rockstar servers, legal filings, and community databases to verify claims, generate trust score timelines, and expose fake assets instantly.
          </p>
        </div>

        {/* Legend link */}
        <button
          onClick={() => setView('trust-legend')}
          className="flex items-center space-x-2.5 bg-pink-500/10 border border-pink-500/30 hover:border-pink-500 px-4 py-2.5 text-xs font-mono font-bold text-pink-400 transition-colors uppercase select-none rounded-none shrink-0"
          id="ai-news-to-legend-btn"
        >
          <ShieldCheck className="h-4 w-4 shrink-0 text-pink-500" />
          <span>Trust Index Standards</span>
        </button>
      </div>

      {/* AUTOMATIC AI PUBLISHING INTERACTIVE PIPELINE (Requirement: Architecture for future automated AI publishing) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="ai-publishing-panel-grid">
        
        {/* Scraper / Pipeline Control Dashboard */}
        <div className="lg:col-span-2 bg-black border border-white/10 p-5 sm:p-6 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-orange-400 animate-pulse" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-pink-500/10 border border-pink-500/20 text-pink-500 rounded-none">
                <Bot className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-display font-black text-sm uppercase tracking-wider text-white">AI Publishing & Ingestion Pipeline</h3>
                <p className="text-zinc-500 text-[10px] font-mono uppercase">Status: <span className="text-emerald-400 animate-pulse">● Auto-Scan Online</span></p>
              </div>
            </div>

            {/* Simulated Live Feed Stats */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <span className="text-[9px] font-mono text-zinc-500 block uppercase">Ingestion Queue</span>
                <span className="text-white text-xs font-mono font-black">2 Claims Pending</span>
              </div>
              <div className="text-right border-l border-white/10 pl-4">
                <span className="text-[9px] font-mono text-zinc-500 block uppercase">Last Global Crawl</span>
                <span className="text-white text-xs font-mono font-black">4m ago</span>
              </div>
            </div>
          </div>

          {/* Quick Config Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-b border-white/5 py-4">
            
            {/* Auto Publish Trigger Rule Toggle */}
            <div className="space-y-1 bg-zinc-950 p-3 border border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-400 uppercase font-black">Auto-Publish Mode</span>
                <button 
                  onClick={() => setIsAutoPublishOn(!isAutoPublishOn)}
                  className={`px-2 py-0.5 text-[9px] font-mono font-bold border rounded-none uppercase transition-colors ${
                    isAutoPublishOn ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                  }`}
                >
                  {isAutoPublishOn ? 'Active' : 'Disabled'}
                </button>
              </div>
              <p className="text-[10px] text-zinc-500">Instantly post timeline alerts when confidence thresholds are achieved.</p>
            </div>

            {/* Threshold Slider */}
            <div className="space-y-1.5 bg-zinc-950 p-3 border border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-zinc-400 uppercase font-black">Publish Threshold</span>
                <span className="text-xs text-pink-500 font-mono font-black">{autoPublishMinScore}%</span>
              </div>
              <input 
                type="range" 
                min="60" 
                max="95" 
                value={autoPublishMinScore} 
                onChange={(e) => setAutoPublishMinScore(Number(e.target.value))}
                className="w-full accent-pink-500 bg-zinc-850 h-1 rounded-none appearance-none cursor-pointer"
              />
            </div>

            {/* Crawler Targets configuration */}
            <div className="space-y-1 bg-zinc-950 p-3 border border-white/5 text-[10px] font-mono">
              <span className="text-zinc-400 uppercase font-black block">Active Scrapers</span>
              <div className="flex flex-wrap gap-2 pt-1">
                <button 
                  onClick={() => setActiveCrawlers(prev => ({ ...prev, newswire: !prev.newswire }))}
                  className={`px-1.5 py-0.5 border ${activeCrawlers.newswire ? 'border-pink-500/30 text-pink-400 bg-pink-500/5' : 'border-zinc-800 text-zinc-600'}`}
                >
                  Newswire
                </button>
                <button 
                  onClick={() => setActiveCrawlers(prev => ({ ...prev, social: !prev.social }))}
                  className={`px-1.5 py-0.5 border ${activeCrawlers.social ? 'border-pink-500/30 text-pink-400 bg-pink-500/5' : 'border-zinc-800 text-zinc-600'}`}
                >
                  X Socials
                </button>
                <button 
                  onClick={() => setActiveCrawlers(prev => ({ ...prev, forums: !prev.forums }))}
                  className={`px-1.5 py-0.5 border ${activeCrawlers.forums ? 'border-pink-500/30 text-pink-400 bg-pink-500/5' : 'border-zinc-800 text-zinc-600'}`}
                >
                  GTA Forums
                </button>
              </div>
            </div>

          </div>

          {/* Interactive Trigger Button */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-1">
            <div className="text-zinc-500 text-[11px] font-sans flex items-center space-x-2">
              <Activity className="h-4 w-4 text-pink-500 animate-pulse shrink-0" />
              <span>Simulated feeds sync every hour. Force an instantaneous scan to check.</span>
            </div>

            <button
              onClick={handleTriggerPipelineSimulation}
              disabled={isSimulationRunning}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-orange-400 text-black px-6 py-2.5 font-display font-black uppercase text-xs tracking-wider hover:brightness-110 transition-all select-none disabled:opacity-50"
              id="simulate-pipeline-btn"
            >
              {isSimulationRunning ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Processing Nodes...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-black" />
                  <span>Execute AI Crawler Pipeline</span>
                </>
              )}
            </button>
          </div>

          {/* Simulated Logs Panel */}
          <AnimatePresence>
            {(isSimulationRunning || simulationLog.length > 0) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-[#09090b] border border-white/15 p-4 font-mono text-[10px] text-zinc-400 space-y-1 rounded-none max-h-48 overflow-y-auto"
              >
                <div className="text-pink-500 font-bold mb-1 border-b border-white/5 pb-1 flex justify-between">
                  <span>LIVE CONSOLE STREAM</span>
                  <span className="animate-pulse">● ONLINE</span>
                </div>
                {simulationLog.map((log, idx) => (
                  <div key={idx} className="leading-relaxed">
                    <span className="text-zinc-600">[{new Date().toLocaleTimeString()}]</span> {log}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Real-time Custom AI Verification Sandbox (Paste claims to verify them instantly) */}
        <div className="bg-[#09090b] border border-white/10 p-5 sm:p-6 space-y-4 flex flex-col justify-between relative">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400">
              <Sparkles className="h-4 w-4 shrink-0" />
              <h3 className="font-display font-black text-xs uppercase tracking-widest">AI Scanner Sandbox</h3>
            </div>
            <p className="text-zinc-500 text-[11px] leading-relaxed">
              Have you found a speculative screenshot, leak file, or pricing detail online? Paste the text or claim here to trigger a direct AI verification scan.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <textarea
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              placeholder="Example: 'Rockstar will release Trailer 2 on July 15 with preorders showing a Deluxe $150 package...'"
              rows={3}
              className="w-full bg-black border border-white/10 p-3 text-xs text-white placeholder-zinc-600 font-sans focus:outline-none focus:border-pink-500 resize-none rounded-none"
              id="sandbox-scanner-textarea"
            />

            <button
              onClick={handleRunScanner}
              disabled={isScanning || !scanInput.trim()}
              className="w-full flex items-center justify-center space-x-2 bg-zinc-900 border border-white/10 hover:border-pink-500 text-white px-4 py-2 text-xs font-mono font-black uppercase tracking-wider transition-colors disabled:opacity-40 select-none"
              id="sandbox-run-scan-btn"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin text-pink-500" />
                  <span>Running Forensics...</span>
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5 text-pink-500" />
                  <span>Verify Custom Claim</span>
                </>
              )}
            </button>
          </div>

          {/* Instant Scanner State/Results Output */}
          <AnimatePresence>
            {isScanning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center p-6 text-center space-y-3 z-20 border border-pink-500/20"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border border-pink-500/20 flex items-center justify-center">
                    <Brain className="h-6 w-6 text-pink-500 animate-spin" />
                  </div>
                  <div className="absolute inset-0 w-12 h-12 rounded-full border-t border-b border-pink-500 animate-ping opacity-30" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-mono uppercase font-bold text-white tracking-widest">Scanning Intel Shard</p>
                  <p className="text-[10px] font-mono text-pink-400 animate-pulse">{scanStep}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

      {/* Sandbox custom result output report card */}
      <AnimatePresence>
        {scanResult && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="border-2 border-pink-500/30 bg-[#09090b] p-5 sm:p-6 space-y-4 relative"
            id="scanner-sandbox-report-card"
          >
            {/* Close result button */}
            <button 
              onClick={() => setScanResult(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white font-mono text-xs uppercase"
            >
              ✕ Clear Sandbox Report
            </button>

            <div className="flex items-center space-x-2 text-pink-500 font-mono text-[10px] tracking-widest uppercase font-black">
              <Sparkles className="h-3.5 w-3.5" />
              <span>LIVE SCANNED SANDBOX BRIEFING</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
              <div>
                <h3 className="text-lg font-display font-black uppercase text-white tracking-tight">{scanResult.title}</h3>
                <p className="text-zinc-500 text-xs mt-0.5">Submitted via community Sandbox scraper node.</p>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <TrustBadge badge={scanResult.trustBadge} size="md" />
                <span className="px-2 py-1.5 border border-white/10 bg-white/5 text-[10px] font-mono text-zinc-400 uppercase font-bold">Sandbox Scan</span>
              </div>
            </div>

            {/* AI verification panel inside report card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-white/5">
              
              <div className="lg:col-span-8 space-y-5">
                {/* Reasoning logs */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-black block">AI Scanner Reasoning Log</span>
                  <p className="text-zinc-300 text-xs leading-relaxed font-sans bg-black p-4 border border-white/5">
                    {scanResult.aiReasoning}
                  </p>
                </div>

                {/* Sources Scraped */}
                <div className="space-y-2">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-black block">Consensus Channels Checked</span>
                  <div className="flex flex-wrap gap-2">
                    {scanResult.sources.map((src, sIdx) => (
                      <span key={sIdx} className="px-3 py-1 bg-black border border-white/5 text-[10px] font-mono text-zinc-400">
                        🔗 {src}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 bg-black border border-white/15 p-4 space-y-4 flex flex-col justify-between">
                
                {/* Score and metrics */}
                <div className="space-y-3 text-xs font-mono">
                  
                  {/* Trust index score bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between font-black uppercase text-[10px]">
                      <span className="text-zinc-500">Scanned Index</span>
                      <span className={getScoreColor(scanResult.trustBadge).split(' ')[0]}>{scanResult.trustScore}%</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-900 overflow-hidden relative border border-white/5">
                      <div 
                        className={`absolute top-0 left-0 h-full ${
                          scanResult.trustBadge === 'official' ? 'bg-emerald-500' :
                          scanResult.trustBadge === 'trusted' ? 'bg-blue-500' :
                          scanResult.trustBadge === 'likely' ? 'bg-yellow-500' :
                          scanResult.trustBadge === 'rumor' ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${scanResult.trustScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Trust status */}
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-zinc-500 text-[10px] uppercase font-bold">AI Status:</span>
                    <span className={`px-2 py-0.5 border text-[9px] font-black uppercase tracking-wider ${getStatusLabel(scanResult.verificationStatus).color}`}>
                      {getStatusLabel(scanResult.verificationStatus).text}
                    </span>
                  </div>

                  {/* Confidence consensus */}
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-zinc-500 text-[10px] uppercase font-bold">Confidence:</span>
                    <span className={`px-2 py-0.5 border text-[9px] font-black uppercase tracking-wider ${getConfidenceLabel(scanResult.confidenceLevel).style}`}>
                      {getConfidenceLabel(scanResult.confidenceLevel).text}
                    </span>
                  </div>

                  {/* Last updated timestamp */}
                  <div className="flex justify-between items-center py-1">
                    <span className="text-zinc-500 text-[10px] uppercase font-bold">Last Scanned:</span>
                    <span className="text-zinc-400 text-[10px]">{scanResult.lastVerified}</span>
                  </div>

                </div>

                {/* Score Timeline (Mini-visualization of Trust Score changes over time) */}
                <div className="space-y-2 border-t border-white/5 pt-3">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-black block">Trust Score progression</span>
                  <div className="relative pl-4 border-l border-zinc-800 space-y-2 text-[10px] font-mono">
                    {scanResult.scoreTimeline?.map((t, tIdx) => (
                      <div key={tIdx} className="relative">
                        <span className="absolute -left-[20.5px] top-1.5 h-2 w-2 bg-pink-500 rounded-none border border-black" />
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-zinc-500 text-[9px] block leading-none">{t.date}</span>
                            <span className="text-zinc-300 font-sans block leading-tight mt-0.5">{t.event}</span>
                          </div>
                          <span className="text-pink-500 font-bold shrink-0 pl-2">{t.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FILTER CONTROLS FOR ARCHIVE LIST */}
      <div className="bg-black border border-white/10 p-5 space-y-3" id="ai-archive-filters">
        <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">
          Filter Scanned Timeline Archive
        </span>
        <div className="flex flex-wrap gap-2 text-xs font-mono uppercase tracking-wider">
          <button
            onClick={() => setSelectedBadgeFilter('all')}
            className={`px-4 py-2 border rounded-none transition-colors select-none ${
              selectedBadgeFilter === 'all'
                ? 'bg-pink-600 border-pink-500 text-black font-black'
                : 'bg-zinc-950 border-white/10 text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
            id="filter-ai-all"
          >
            All Verified Items
          </button>

          {(['official', 'trusted', 'likely', 'rumor', 'fake'] as TrustBadgeType[]).map((badge) => (
            <button
              key={badge}
              onClick={() => setSelectedBadgeFilter(badge)}
              className={`px-4 py-2 border rounded-none transition-colors select-none flex items-center space-x-2 ${
                selectedBadgeFilter === badge
                  ? 'bg-pink-600 border-pink-500 text-black font-black'
                  : 'bg-zinc-950 border-white/10 text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
              id={`filter-ai-${badge}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${
                badge === 'official' ? 'bg-emerald-400' :
                badge === 'trusted' ? 'bg-blue-400' :
                badge === 'likely' ? 'bg-yellow-400' :
                badge === 'rumor' ? 'bg-orange-400' : 'bg-red-400'
              }`} />
              <span className="capitalize">{badge === 'trusted' ? 'Trusted Source' : badge}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TIMELINE OF ARTICLES WITH INTEGRATED AI VERIFICATION PANELS */}
      <div className="space-y-6" id="ai-intelligence-catalog-timeline">
        
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-white/10 p-8" id="no-ai-events">
            <h3 className="font-display font-black text-sm uppercase tracking-wider text-white">No items found</h3>
            <p className="text-zinc-500 text-xs mt-1">Wide your filter options to view other verification databases.</p>
          </div>
        ) : (
          filteredEvents.map((event, idx) => {
            const isExpanded = expandedEventId === event.id;
            return (
              <div 
                key={event.id}
                className="bg-black border border-white/10 p-5 sm:p-6 space-y-4 hover:border-pink-500/40 transition-colors relative"
                id={`ai-timeline-card-${event.id}`}
              >
                {/* Absolute status indicator top ribbons for highly verified vs dangerous fakes */}
                {event.trustBadge === 'official' && (
                  <div className="absolute left-0 top-0 h-full w-[3px] bg-emerald-500" />
                )}
                {event.trustBadge === 'fake' && (
                  <div className="absolute left-0 top-0 h-full w-[3px] bg-red-500 animate-pulse" />
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-zinc-500 font-mono text-[10px] uppercase">
                      <Clock className="h-3.5 w-3.5 text-pink-500 shrink-0" />
                      <span>Release Ref: {event.date}</span>
                    </div>

                    <h3 className="text-xl font-display font-black uppercase text-white tracking-tight">{event.title}</h3>
                  </div>

                  <div className="flex items-center space-x-2 select-none self-start sm:self-auto">
                    <TrustBadge badge={event.trustBadge} size="sm" />
                    <span className="px-2 py-1 bg-white/5 border border-white/10 text-[9px] font-mono text-zinc-400 uppercase font-bold">{event.category}</span>
                  </div>
                </div>

                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-4xl">
                  {event.summary}
                </p>

                {/* EXPANDED AI VERIFICATION PANEL (Requirements Checklist complete) */}
                <div className="border-t border-white/10 pt-4 mt-2">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setExpandedEventId(isExpanded ? null : event.id)}
                      className="flex items-center space-x-2 text-xs font-mono font-bold text-pink-500 hover:text-pink-400 focus:outline-none uppercase"
                      id={`ai-verify-panel-toggle-${event.id}`}
                    >
                      <Brain className="h-4 w-4 shrink-0 text-pink-500" />
                      <span>{isExpanded ? 'Hide AI Verification Panel' : 'Inspect AI Verification Panel'}</span>
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>

                    <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline-block">
                      Last Check: {event.lastVerified}
                    </span>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden space-y-6 pt-5"
                      >
                        
                        {/* High-tech grid splitting Reasoning and metrics */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-5 bg-zinc-950/80 border border-white/5">
                          
                          {/* Core AI summary & Reasoning logs (8 columns) */}
                          <div className="lg:col-span-8 space-y-4">
                            
                            <div className="space-y-1.5">
                              <span className="text-[9px] font-mono text-pink-500 uppercase tracking-widest font-black block">AI Synthesis Summary</span>
                              <p className="text-white text-xs sm:text-sm font-sans leading-relaxed">
                                {event.aiSummary || 'Automated validation metrics support this event entry as officially certified platform release assets.'}
                              </p>
                            </div>

                            <div className="space-y-1.5 pt-2">
                              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-black block">AI Score Reasoning Logs</span>
                              <p className="text-zinc-400 text-xs sm:text-xs leading-relaxed font-sans bg-black p-4 border border-white/5">
                                {event.aiReasoning || 'Consistent alignment detected between social feeds, network infrastructure changes, and core developer logs. Risk parameters calculate at < 1% error margins.'}
                              </p>
                            </div>

                            {/* Verified Sources compared */}
                            <div className="space-y-2 pt-2">
                              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-black block">Verification Sources compared ({event.sources.length})</span>
                              <div className="flex flex-wrap gap-2">
                                {event.sources.map((src, sIdx) => (
                                  <span key={sIdx} className="px-2.5 py-1.5 bg-black border border-white/5 text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                                    <FileText className="h-3 w-3 text-pink-500" />
                                    <span>{src}</span>
                                  </span>
                                ))}
                              </div>
                            </div>

                          </div>

                          {/* Multi-metrics column (4 columns) */}
                          <div className="lg:col-span-4 space-y-4 font-mono text-xs border-l border-white/5 pl-0 lg:pl-6 pt-6 lg:pt-0">
                            
                            {/* Score indicator */}
                            <div className="space-y-1.5">
                              <div className="flex justify-between items-end">
                                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-black">Trust Index Score</span>
                                <span className={`text-sm font-black ${getScoreColor(event.trustBadge).split(' ')[0]}`}>{event.trustScore}%</span>
                              </div>
                              <div className="w-full h-2 bg-zinc-900 overflow-hidden relative border border-white/5">
                                <div 
                                  className={`absolute top-0 left-0 h-full ${
                                    event.trustBadge === 'official' ? 'bg-emerald-500' :
                                    event.trustBadge === 'trusted' ? 'bg-blue-500' :
                                    event.trustBadge === 'likely' ? 'bg-yellow-500' :
                                    event.trustBadge === 'rumor' ? 'bg-orange-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${event.trustScore}%` }}
                                />
                              </div>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                              <span className="text-zinc-500 text-[10px] uppercase font-black">AI Verification:</span>
                              <span className={`px-2 py-0.5 border text-[9px] font-black uppercase tracking-wider ${getStatusLabel(event.verificationStatus).color}`}>
                                {getStatusLabel(event.verificationStatus).text}
                              </span>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                              <span className="text-zinc-500 text-[10px] uppercase font-black">Confidence Factor:</span>
                              <span className={`px-2 py-0.5 border text-[9px] font-black uppercase tracking-wider ${getConfidenceLabel(event.confidenceLevel).style}`}>
                                {getConfidenceLabel(event.confidenceLevel).text}
                              </span>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                              <span className="text-zinc-500 text-[10px] uppercase font-black">Last Scanned:</span>
                              <span className="text-zinc-400 text-[10px]">{event.lastVerified}</span>
                            </div>

                            {/* Trust score progression timeline */}
                            <div className="space-y-2.5 pt-2">
                              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-black">Score History over time</span>
                              <div className="relative pl-3 border-l border-zinc-800 space-y-2 text-[10px]">
                                {event.scoreTimeline ? (
                                  event.scoreTimeline.map((history, hIdx) => (
                                    <div key={hIdx} className="relative">
                                      <span className="absolute -left-[19.5px] top-1.5 h-2 w-2 bg-pink-500 rounded-none border border-black" />
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <span className="text-zinc-500 text-[9px] block leading-none">{history.date}</span>
                                          <span className="text-zinc-400 font-sans block leading-tight mt-0.5">{history.event}</span>
                                        </div>
                                        <span className="text-pink-500 font-bold shrink-0 pl-2">{history.score}%</span>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className="relative">
                                    <span className="absolute -left-[19.5px] top-1.5 h-2 w-2 bg-pink-500 rounded-none border border-black" />
                                    <div className="flex justify-between">
                                      <div>
                                        <span className="text-zinc-500 text-[9px] block leading-none">{event.date}</span>
                                        <span className="text-zinc-400 font-sans block leading-tight mt-0.5">Official Direct Broadcast Release</span>
                                      </div>
                                      <span className="text-pink-500 font-bold pl-2">{event.trustScore}%</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                          </div>

                        </div>

                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            );
          })
        )}

      </div>

    </div>
  );
}
