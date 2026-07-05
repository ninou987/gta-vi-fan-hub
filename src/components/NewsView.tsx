import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Newspaper, ChevronDown, ChevronUp, Calendar, Info, Bookmark, 
  ExternalLink, ShieldCheck, Clock, Layers, ThumbsUp, ThumbsDown, 
  AlertTriangle, Share2, MessageSquare, Send, Check, Search,
  SlidersHorizontal, Trash2, Eye, Tag
} from 'lucide-react';
import { timelineEventsData } from '../data/gtaData';
import { TimelineEvent, TrustBadgeType, ViewType } from '../types';
import TrustBadge from './TrustBadge';
import { useCommunity } from '../context/CommunityContext';

interface NewsViewProps {
  setView: (view: any) => void;
}

export default function NewsView({ setView }: NewsViewProps) {
  const { 
    comments, 
    metrics, 
    bookmarks, 
    voteArticle, 
    reportArticle, 
    toggleBookmark, 
    addComment, 
    likeComment,
    userProfile
  } = useCommunity();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeTrustBadge, setActiveTrustBadge] = useState<string>('all');
  const [activeSort, setActiveSort] = useState<'chrono' | 'trending' | 'trusted' | 'discussed'>('chrono');
  const [expandedId, setExpandedId] = useState<string | null>('t3'); // Keep Trailer 1 expanded by default
  const [commentInput, setCommentInput] = useState<Record<string, string>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Advanced Search & Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [minTrustScore, setMinTrustScore] = useState<number>(0);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Scroll Progress Listener
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.pageYOffset / totalScroll) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleCommentSubmit = (articleId: string, e: React.FormEvent) => {
    e.preventDefault();
    const content = commentInput[articleId] || '';
    if (!content.trim()) return;
    addComment(articleId, content);
    setCommentInput(prev => ({ ...prev, [articleId]: '' }));
  };

  const handleShareClick = (article: TimelineEvent) => {
    const fakeUrl = `https://gta6hub.net/intel/${article.id}`;
    navigator.clipboard.writeText(`[GTA 6 Hub] ${article.title} - ${fakeUrl}`);
    setCopiedId(article.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const getScoreColor = (badge: TrustBadgeType) => {
    switch (badge) {
      case 'official': return 'text-emerald-400';
      case 'trusted': return 'text-blue-400';
      case 'likely': return 'text-yellow-400';
      case 'rumor': return 'text-orange-400';
      case 'fake': return 'text-red-400';
    }
  };

  const getScoreBgColor = (badge: TrustBadgeType) => {
    switch (badge) {
      case 'official': return 'bg-emerald-500';
      case 'trusted': return 'bg-blue-500';
      case 'likely': return 'bg-yellow-500';
      case 'rumor': return 'bg-orange-500';
      case 'fake': return 'bg-red-500';
    }
  };

  const getTimelineDotColor = (badge: TrustBadgeType) => {
    switch (badge) {
      case 'official': return 'bg-emerald-500 border-emerald-400 ring-emerald-500/15';
      case 'trusted': return 'bg-blue-500 border-blue-400 ring-blue-500/15';
      case 'likely': return 'bg-yellow-500 border-yellow-400 ring-yellow-500/15';
      case 'rumor': return 'bg-orange-500 border-orange-400 ring-orange-500/15';
      case 'fake': return 'bg-red-500 border-red-400 ring-red-500/15';
    }
  };

  const getConfidenceBadgeColor = (level?: 'low' | 'medium' | 'high' | 'absolute') => {
    switch (level) {
      case 'absolute': return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
      case 'high': return 'text-blue-400 border-blue-500/20 bg-blue-500/5';
      case 'medium': return 'text-yellow-400 border-yellow-500/20 bg-yellow-500/5';
      case 'low': return 'text-red-400 border-red-500/20 bg-red-500/5';
      default: return 'text-zinc-500 border-white/5 bg-zinc-950';
    }
  };

  const getVerificationStatusColor = (status?: 'verified' | 'refuted' | 'unconfirmed' | 'disputed') => {
    switch (status) {
      case 'verified': return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
      case 'refuted': return 'text-red-400 border-red-500/20 bg-red-500/5';
      case 'disputed': return 'text-orange-400 border-orange-500/20 bg-orange-500/5';
      case 'unconfirmed': return 'text-yellow-400 border-yellow-500/20 bg-yellow-500/5';
      default: return 'text-zinc-500 border-white/5 bg-zinc-950';
    }
  };

  // 1. FILTERING
  const filteredEvents = timelineEventsData.filter((event) => {
    const matchesCategory = activeCategory === 'all' || event.category === activeCategory;
    const matchesTrustBadge = activeTrustBadge === 'all' || event.trustBadge === activeTrustBadge;
    const matchesMinScore = event.trustScore >= minTrustScore;
    
    const matchesSearch = searchQuery.trim() === '' || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.tags && event.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
      
    const matchesTag = selectedTag === 'all' || (event.tags && event.tags.includes(selectedTag));
    
    return matchesCategory && matchesTrustBadge && matchesMinScore && matchesSearch && matchesTag;
  });

  // Extract all available tags across all articles for advanced filtering
  const allTags = Array.from(
    new Set(timelineEventsData.flatMap(e => e.tags || []))
  );

  // 2. SORTING (Trending news section, Most trusted news section, Most discussed news section)
  const sortedAndFilteredEvents = [...filteredEvents].sort((a, b) => {
    if (activeSort === 'trending') {
      const likesA = metrics[a.id]?.likes ?? 0;
      const likesB = metrics[b.id]?.likes ?? 0;
      return likesB - likesA;
    }
    if (activeSort === 'trusted') {
      return b.trustScore - a.trustScore;
    }
    if (activeSort === 'discussed') {
      const commentsA = comments[a.id]?.length ?? 0;
      const commentsB = comments[b.id]?.length ?? 0;
      return commentsB - commentsA;
    }
    return 0; // Default: Keep data order (Chronological)
  });

  // Calculate 2 related articles based on category or shared tags
  const getRelatedArticles = (currentEvent: TimelineEvent) => {
    return timelineEventsData
      .filter(e => e.id !== currentEvent.id)
      .filter(e => e.category === currentEvent.category || (e.tags && currentEvent.tags && e.tags.some(t => currentEvent.tags!.includes(t))))
      .slice(0, 2);
  };

  return (
    <div className="space-y-8 pb-12" id="news-view-root">
      
      {/* Title block */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6" id="news-header-block">
        <div>
          <span className="text-pink-500 font-mono text-[10px] tracking-widest uppercase font-black block mb-1">STATE PRESS INTELLIGENCE</span>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tighter uppercase leading-none">News & Speculation Timeline</h1>
          <p className="text-zinc-400 text-sm mt-2 max-w-2xl font-sans">
            Chronological documentation of major developmental milestones, trailer rollouts, financial briefings, and historical catalog records verified by our community verification index.
          </p>
        </div>

        {/* Legend & AI Portals */}
        <div className="flex flex-wrap gap-3 shrink-0">
          <button
            onClick={() => setView('ai-news')}
            className="flex items-center space-x-2.5 bg-gradient-to-r from-pink-500 to-orange-400 hover:brightness-110 px-4 py-2.5 text-xs font-mono font-black text-black transition-all select-none rounded-none shrink-0"
            id="news-to-ai-banner"
          >
            <span>AI News Intelligence Center</span>
          </button>

          <button
            onClick={() => setView('trust-legend')}
            className="flex items-center space-x-2.5 bg-zinc-900 border border-white/10 hover:border-pink-500 px-4 py-2.5 text-xs font-mono font-bold text-zinc-400 transition-colors uppercase select-none rounded-none shrink-0"
            id="news-to-legend-banner"
          >
            <ShieldCheck className="h-4 w-4 shrink-0 text-pink-500" />
            <span>Inspect Trust Protocol Legend</span>
          </button>
        </div>
      </div>

      {/* Sticky Neon Reading Progress Bar */}
      <div className="sticky top-0 left-0 right-0 h-[3px] bg-zinc-950/80 z-30 overflow-hidden">
        <div 
          style={{ width: `${scrollProgress}%` }}
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 shadow-[0_0_10px_#ec4899] transition-all duration-75"
        />
      </div>

      {/* ADVANCED SEARCH & FILTER DASHBOARD */}
      <div className="bg-black border border-white/10 p-5 md:p-6 space-y-6" id="news-filter-control-panel">
        
        {/* Row 1: Search Input and Reset Action */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between border-b border-white/5 pb-4">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
              <Search className="h-4 w-4" />
            </span>
            <input 
              type="text" 
              placeholder="Search intelligence dossiers, tags, or statements..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-white/10 pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-pink-500 transition-colors font-sans rounded-none"
            />
          </div>

          <div className="flex items-center gap-2">
            {(searchQuery || activeCategory !== 'all' || activeTrustBadge !== 'all' || minTrustScore > 0 || selectedTag !== 'all') && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                  setActiveTrustBadge('all');
                  setMinTrustScore(0);
                  setSelectedTag('all');
                }}
                className="px-3.5 py-2.5 bg-red-950/20 hover:bg-red-900/30 border border-red-900/35 text-red-400 font-mono text-[10px] uppercase font-bold flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Reset Controls
              </button>
            )}

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-[#09090b] border border-white/5 font-mono text-[9px] text-zinc-500 uppercase">
              <SlidersHorizontal className="h-3 w-3" />
              <span>Multi-Index Active</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Column (8 cols): Filters Grid */}
          <div className="md:col-span-8 space-y-4">
            
            {/* Category Filter */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">Intelligence Category</span>
              <div className="flex flex-wrap gap-1.5 text-xs font-mono uppercase">
                {[
                  { id: 'all', label: 'All Updates' },
                  { id: 'official', label: 'Official' },
                  { id: 'speculation', label: 'Speculation' },
                  { id: 'leak', label: 'Leak Archives' },
                ].map((chip) => (
                  <button
                    key={chip.id}
                    onClick={() => setActiveCategory(chip.id)}
                    className={`px-3 py-1.5 rounded-none border text-[10px] tracking-tight transition-all select-none ${
                      activeCategory === chip.id
                        ? 'bg-pink-600 text-black font-black border-pink-500'
                        : 'bg-[#09090b] border-white/10 text-zinc-400 hover:bg-zinc-900 hover:text-white'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust badge Filter */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">Filter Trust Rating</span>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-mono uppercase">
                <button
                  onClick={() => setActiveTrustBadge('all')}
                  className={`px-3 py-1.5 rounded-none border transition-all select-none ${
                    activeTrustBadge === 'all'
                      ? 'bg-white text-black font-black border-white'
                      : 'bg-[#09090b] border-white/10 text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  All Badges
                </button>
                
                {(['official', 'trusted', 'likely', 'rumor', 'fake'] as TrustBadgeType[]).map((badge) => (
                  <button
                    key={badge}
                    onClick={() => setActiveTrustBadge(badge)}
                    className={`px-3 py-1.5 rounded-none border transition-all select-none flex items-center space-x-1.5 ${
                      activeTrustBadge === badge
                        ? 'bg-pink-600 text-black font-black border-pink-500'
                        : 'bg-[#09090b] border-white/10 text-zinc-400 hover:bg-zinc-900'
                    }`}
                  >
                    <span className={`h-1 w-1 rounded-full ${
                      badge === 'official' ? 'bg-emerald-400' :
                      badge === 'trusted' ? 'bg-blue-400' :
                      badge === 'likely' ? 'bg-yellow-400' :
                      badge === 'rumor' ? 'bg-orange-400' : 'bg-red-400'
                    }`} />
                    <span>{badge}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tags quick-scroller */}
            {allTags.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">Topic Tags</span>
                <div className="flex flex-wrap gap-1">
                  <button
                    onClick={() => setSelectedTag('all')}
                    className={`text-[9px] font-mono px-2 py-0.5 border uppercase select-none transition-all ${
                      selectedTag === 'all' 
                        ? 'bg-pink-500/15 border-pink-500 text-pink-500 font-bold' 
                        : 'bg-[#09090b] border-white/5 text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    All Tags
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`text-[9px] font-mono px-2 py-0.5 border uppercase select-none transition-all flex items-center gap-1 ${
                        selectedTag === tag 
                          ? 'bg-pink-500/15 border-pink-500 text-pink-500 font-bold' 
                          : 'bg-[#09090b] border-white/5 text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      <Tag className="h-2 w-2" />
                      <span>#{tag}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column (4 cols): Trust Index Slider and Sort */}
          <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 space-y-4">
            
            {/* Minimum Trust Score Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="font-bold text-zinc-500 uppercase tracking-widest">Min Trust Index</span>
                <span className="text-pink-500 font-black">{minTrustScore}%</span>
              </div>
              <input 
                type="range"
                min="0"
                max="100"
                step="5"
                value={minTrustScore}
                onChange={(e) => setMinTrustScore(Number(e.target.value))}
                className="w-full accent-pink-600 bg-zinc-950 h-1 cursor-pointer"
              />
              <span className="text-[9px] font-sans text-zinc-600 block leading-tight">
                Hiding intelligence records rated below {minTrustScore}% Trust Score.
              </span>
            </div>

            {/* Sorting */}
            <div className="space-y-1.5 pt-2 border-t border-white/5">
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">Sort Core Index</span>
              <div className="grid grid-cols-2 gap-1.5 text-[9px] font-mono uppercase">
                {[
                  { id: 'chrono', label: 'Timeline' },
                  { id: 'trending', label: 'Trending' },
                  { id: 'trusted', label: 'Most Trusted' },
                  { id: 'discussed', label: 'Most Discussed' },
                ].map((sortOption) => (
                  <button
                    key={sortOption.id}
                    onClick={() => setActiveSort(sortOption.id as any)}
                    className={`px-2 py-1.5 border transition-all text-center select-none ${
                      activeSort === sortOption.id
                        ? 'bg-gradient-to-r from-pink-500 to-orange-400 text-black font-black border-pink-500'
                        : 'bg-[#09090b] border-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {sortOption.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Timeline flow */}
      <div className="relative border-l-2 border-white/10 ml-4 md:ml-32 pl-6 md:pl-8 space-y-8" id="news-timeline-tree">
        
        {sortedAndFilteredEvents.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-white/10 p-8" id="no-news-found">
            <Layers className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
            <h3 className="font-display font-black text-sm uppercase tracking-wider text-white">No intelligence assets match query</h3>
            <p className="text-zinc-500 text-xs mt-1 font-sans">Try widening your category filters or verifying other Trust badge layers.</p>
          </div>
        ) : (
          sortedAndFilteredEvents.map((event, idx) => {
            const isExpanded = expandedId === event.id;
            const articleComments = comments[event.id] || [];
            const articleMetrics = metrics[event.id] || { likes: 0, dislikes: 0, userVote: null, reported: false, reportsCount: 0 };
            const isBookmarked = bookmarks.includes(event.id);

            return (
              <div key={event.id} className="relative group" id={`news-timeline-item-${event.id}`}>
                
                {/* Timeline dot / glowing node based on Trust Badge */}
                <div className="absolute -left-[31px] md:-left-[39px] top-1.5 z-10 flex items-center justify-center">
                  <span className={`h-4 w-4 rounded-none border-4 border-[#050505] transition-transform group-hover:scale-125 ring-4 ${getTimelineDotColor(event.trustBadge)}`} />
                </div>

                {/* Sidebar date representation for desktop width */}
                <div className="hidden md:block absolute -left-40 top-1.5 w-28 text-right pr-4 text-xs font-mono font-black text-zinc-500">
                  {event.date}
                </div>

                {/* Event card details */}
                <div className={`rounded-none bg-black p-5 md:p-6 space-y-4 transition-colors relative overflow-hidden ${
                  event.isMilestone 
                    ? 'border border-amber-500/40 hover:border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.05)]' 
                    : 'border border-white/10 hover:border-pink-500/50'
                }`}>
                  
                  {/* Trust indicator highlight ribbon for fakes to draw attention */}
                  {event.trustBadge === 'fake' && (
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-red-500" />
                  )}
                  {event.isMilestone && (
                    <div className="absolute top-0 inset-x-0 h-[2.5px] bg-amber-500 shadow-[0_0_12px_#f59e0b]" />
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1 flex-1">
                      {/* Mobile date shown instead inside the card body */}
                      <div className="md:hidden flex items-center space-x-1.5 text-xs text-zinc-500 font-mono mb-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{event.date}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {event.isMilestone && (
                          <span className="inline-flex items-center gap-1 bg-amber-500 text-black text-[9px] font-mono font-black tracking-widest px-1.5 py-0.5 uppercase shrink-0">
                            ★ CRITICAL MILESTONE
                          </span>
                        )}
                        <h3 
                          onClick={() => handleToggleExpand(event.id)}
                          className="text-lg sm:text-xl font-display font-black text-white uppercase tracking-tight hover:text-pink-500 transition-colors cursor-pointer"
                        >
                          {event.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 select-none shrink-0 self-start sm:self-auto">
                      {/* REUSABLE TRUST BADGE COMPONENT */}
                      <TrustBadge badge={event.trustBadge} size="sm" />
                      
                      <span className="rounded-none border border-white/10 bg-white/5 text-zinc-400 px-2 py-1 text-[9px] font-mono font-black tracking-widest uppercase">
                        {event.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                    {event.summary}
                  </p>

                  {/* Views, Reading Time & Tags metadata */}
                  <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-zinc-500 border-t border-white/5 pt-3">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-zinc-600" />
                      <span>{event.readingTime ?? 2} MIN READ</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye className="h-3.5 w-3.5 text-zinc-600" />
                      <span>{event.views ? event.views.toLocaleString() : '1,200'} VIEWS</span>
                    </div>

                    {event.tags && event.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 sm:ml-auto">
                        {event.tags.map(tag => (
                          <button
                            key={tag}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTag(tag);
                              const panel = document.getElementById('news-filter-control-panel');
                              if (panel) {
                                panel.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                            className={`px-2 py-0.5 border text-[8px] font-mono uppercase transition-all select-none ${
                              selectedTag === tag
                                ? 'bg-pink-600/25 border-pink-500 text-pink-400'
                                : 'bg-[#09090b] border-white/5 text-zinc-500 hover:text-zinc-300 hover:border-white/15'
                            }`}
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Trust Score & Interactive Community Panel */}
                  <div className="border-t border-b border-white/5 py-3 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                    
                    {/* Left: Trust Score bar */}
                    <div className="flex items-center space-x-2.5">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Trust Index:</span>
                      <span className={`font-black ${getScoreColor(event.trustBadge)}`}>{event.trustScore}%</span>
                      <div className="w-16 sm:w-20 h-1.5 bg-zinc-900 rounded-none overflow-hidden relative border border-white/5">
                        <div
                          className={`absolute top-0 left-0 h-full ${getScoreBgColor(event.trustBadge)}`}
                          style={{ width: `${event.trustScore}%` }}
                        />
                      </div>
                    </div>

                    {/* Right: Community Liking & Sharing system */}
                    <div className="flex items-center space-x-3.5 text-zinc-400">
                      
                      {/* Like button */}
                      <button 
                        onClick={() => voteArticle(event.id, 'like')}
                        className={`flex items-center space-x-1.5 hover:text-white transition-colors py-1 ${
                          articleMetrics.userVote === 'like' ? 'text-pink-500 font-bold' : ''
                        }`}
                        title="Upvote verified fact"
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />
                        <span>{articleMetrics.likes}</span>
                      </button>

                      {/* Dislike button */}
                      <button 
                        onClick={() => voteArticle(event.id, 'dislike')}
                        className={`flex items-center space-x-1.5 hover:text-white transition-colors py-1 ${
                          articleMetrics.userVote === 'dislike' ? 'text-red-400 font-bold' : ''
                        }`}
                        title="Downvote rumor/fake"
                      >
                        <ThumbsDown className="h-3.5 w-3.5" />
                        <span>{articleMetrics.dislikes}</span>
                      </button>

                      {/* Comment count trigger */}
                      <button 
                        onClick={() => handleToggleExpand(event.id)}
                        className="flex items-center space-x-1.5 hover:text-white transition-colors py-1"
                      >
                        <MessageSquare className="h-3.5 w-3.5 text-pink-500" />
                        <span>{articleComments.length}</span>
                      </button>

                      {/* Bookmark toggle */}
                      <button 
                        onClick={() => toggleBookmark(event.id)}
                        className={`p-1 hover:text-white transition-colors ${
                          isBookmarked ? 'text-amber-400' : 'text-zinc-500'
                        }`}
                        title={isBookmarked ? "Bookmarked" : "Bookmark dossier"}
                      >
                        <Bookmark className="h-3.5 w-3.5 fill-current" />
                      </button>

                      {/* Share button */}
                      <button 
                        onClick={() => handleShareClick(event)}
                        className="p-1 hover:text-white transition-colors text-zinc-500"
                        title="Copy share link"
                      >
                        {copiedId === event.id ? (
                          <Check className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                        ) : (
                          <Share2 className="h-3.5 w-3.5 text-pink-400" />
                        )}
                      </button>

                      {/* Report button */}
                      <button 
                        onClick={() => reportArticle(event.id)}
                        disabled={articleMetrics.reported}
                        className={`p-1 transition-all ${
                          articleMetrics.reported 
                            ? 'text-red-500 bg-red-500/10 cursor-not-allowed border border-red-500/20 px-1 text-[9px] font-black' 
                            : 'text-zinc-500 hover:text-red-500'
                        }`}
                        title="Report misinformation"
                      >
                        {articleMetrics.reported ? (
                          <span>REPORTED</span>
                        ) : (
                          <AlertTriangle className="h-3.5 w-3.5" />
                        )}
                      </button>

                    </div>

                  </div>

                  {/* Toggle details trigger */}
                  <div className="flex justify-between items-center pt-1">
                    <button
                      onClick={() => handleToggleExpand(event.id)}
                      className="flex items-center space-x-1.5 text-xs text-pink-500 hover:text-pink-400 font-mono font-bold focus:outline-none"
                      id={`toggle-expand-btn-${event.id}`}
                    >
                      <span>{isExpanded ? 'Hide Intel Dossier' : 'Inspect Intel Dossier & Comments'}</span>
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                    
                    <button
                      onClick={() => setView('trust-legend')}
                      className="text-[10px] text-zinc-500 hover:text-zinc-400 font-mono underline cursor-pointer"
                    >
                      How are scores computed?
                    </button>
                  </div>

                  {/* Expandable detailed brief panel */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden border-t border-white/10 pt-4 mt-4 text-xs text-zinc-400 leading-relaxed space-y-4 font-sans"
                      >
                        
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                          
                          {/* Left 7 cols: Article details and Verification Sources */}
                          <div className="lg:col-span-7 space-y-4">
                            <div className="flex items-start space-x-2 text-[9px] text-cyan-400 font-mono font-black uppercase tracking-wider mb-1">
                              <Info className="h-4 w-4 shrink-0 mt-0.5" />
                              <span>INTELLIGENCE LOGS SYNTHESIZED</span>
                            </div>
                            
                            <p className="text-zinc-300 text-sm">{event.details}</p>

                            {/* Display Sources with icons */}
                            <div className="space-y-2 pt-2">
                              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-black block">Verification Sources</span>
                              <div className="flex flex-wrap gap-2">
                                {event.sources.map((source, sIdx) => (
                                  <div 
                                    key={sIdx} 
                                    className="flex items-center space-x-1.5 rounded-none bg-[#09090b] px-3 py-1.5 border border-white/10 text-[10px] font-mono text-zinc-400 hover:text-white hover:border-white/20 transition-all select-none"
                                  >
                                    <Bookmark className="h-3 w-3 text-pink-500 shrink-0" />
                                    <span>{source}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Related Intelligence Dossiers */}
                            <div className="border-t border-white/5 pt-4 space-y-3">
                              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-black block">Related Intelligence Dossiers</span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {getRelatedArticles(event).map((related) => (
                                  <div 
                                    key={related.id}
                                    onClick={() => {
                                      handleToggleExpand(related.id);
                                      setTimeout(() => {
                                        const el = document.getElementById(`news-timeline-item-${related.id}`);
                                        if (el) {
                                          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        }
                                      }, 150);
                                    }}
                                    className="bg-[#050505] border border-white/10 p-3 hover:border-pink-500/40 transition-colors cursor-pointer group/related text-left"
                                  >
                                    <div className="flex justify-between items-center text-[8px] font-mono mb-1 text-zinc-500">
                                      <span className="uppercase text-pink-500">{related.category}</span>
                                      <span>{related.date}</span>
                                    </div>
                                    <h4 className="font-display font-black text-xs text-white group-hover/related:text-pink-400 uppercase tracking-tight line-clamp-1">{related.title}</h4>
                                    <div className="flex items-center justify-between mt-2 text-[9px] font-mono">
                                      <span className="text-zinc-500">Consensus: {related.trustScore}%</span>
                                      <span className="text-pink-500 group-hover/related:translate-x-1 transition-transform">Inspect →</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Right 5 cols: AI Verification Panel (From requirement 2) */}
                          <div className="lg:col-span-5 bg-[#09090b]/80 border border-white/5 p-4 space-y-3 font-mono">
                            <div className="flex items-center space-x-2 text-pink-500 text-[10px] font-black uppercase tracking-wider border-b border-white/5 pb-2">
                              <ShieldCheck className="h-4 w-4" />
                              <span>AI Verification Panel</span>
                            </div>

                            {/* Verification Stats */}
                            <div className="grid grid-cols-2 gap-2 text-[10px] uppercase">
                              <div className="bg-black/50 p-2 border border-white/5 space-y-0.5">
                                <span className="text-zinc-500 block">Confidence Level</span>
                                <span className={`font-bold px-1 py-0.5 border inline-block text-[9px] mt-0.5 ${getConfidenceBadgeColor(event.confidenceLevel)}`}>
                                  {event.confidenceLevel ?? 'Moderate'}
                                </span>
                              </div>
                              <div className="bg-black/50 p-2 border border-white/5 space-y-0.5">
                                <span className="text-zinc-500 block">AI Status</span>
                                <span className={`font-bold px-1 py-0.5 border inline-block text-[9px] mt-0.5 ${getVerificationStatusColor(event.verificationStatus)}`}>
                                  {event.verificationStatus ?? 'Unconfirmed'}
                                </span>
                              </div>
                            </div>

                            {/* AI Summary */}
                            <div className="text-[11px] leading-normal font-sans text-zinc-400 bg-black/40 p-2 border border-white/5">
                              <span className="font-mono text-[9px] font-black uppercase text-zinc-500 block mb-1">AI Abstract Summary</span>
                              {event.aiSummary ?? 'No secondary verification summary. Consensus indices matches community trust metrics.'}
                            </div>

                            {/* AI Reasoning */}
                            {event.aiReasoning && (
                              <div className="text-[10px] font-sans text-zinc-500 italic bg-black/20 p-2 border border-white/5 leading-relaxed">
                                <span className="font-mono text-[9px] font-black uppercase text-zinc-500 block not-italic mb-0.5">Scoring Rationale</span>
                                {event.aiReasoning}
                              </div>
                            )}

                            {/* Last Checked */}
                            <div className="flex items-center justify-between text-[9px] text-zinc-600 border-t border-white/5 pt-2">
                              <span>Last Checked:</span>
                              <span className="text-zinc-500">{event.lastVerified}</span>
                            </div>
                          </div>

                        </div>

                        {/* COMMENTS STREAM SECTION (Requirements: Comments under every article + user reputation synchronization) */}
                        <div className="border-t border-white/5 pt-5 space-y-4 font-sans">
                          <div className="flex items-center space-x-2 text-zinc-400 font-mono text-[10px] font-black uppercase tracking-widest">
                            <MessageSquare className="h-4 w-4 text-pink-500" />
                            <span>Community Fact-Checking Comments ({articleComments.length})</span>
                          </div>

                          {/* Post comment input box */}
                          <form onSubmit={(e) => handleCommentSubmit(event.id, e)} className="flex gap-2">
                            <input 
                              type="text"
                              placeholder="Add an analyst comment or fact-check review..."
                              value={commentInput[event.id] || ''}
                              onChange={(e) => setCommentInput(prev => ({ ...prev, [event.id]: e.target.value }))}
                              className="flex-1 bg-zinc-950 border border-white/10 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-pink-500/50 rounded-none font-sans"
                            />
                            <button
                              type="submit"
                              className="bg-pink-600 hover:bg-pink-500 text-black px-4 py-2.5 text-xs font-mono font-black uppercase rounded-none transition-colors flex items-center space-x-1"
                            >
                              <Send className="h-3.5 w-3.5 text-black shrink-0" />
                              <span className="hidden sm:inline">Submit</span>
                            </button>
                          </form>

                          {/* List of comments */}
                          {articleComments.length === 0 ? (
                            <div className="text-center py-4 text-zinc-600 text-xs italic">
                              No comment reviews submitted. Add your input to help build community consensus!
                            </div>
                          ) : (
                            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                              {articleComments.map((c) => (
                                <div key={c.id} className="bg-zinc-950/40 border border-white/5 p-3 flex items-start space-x-3 text-xs">
                                  {/* Comment Avatar Icon */}
                                  <div className="w-8 h-8 bg-zinc-900 border border-white/10 flex items-center justify-center rounded-none text-zinc-500 shrink-0">
                                    <span className="font-mono text-[10px] uppercase font-black">{c.username.substring(0, 2)}</span>
                                  </div>
                                  
                                  {/* Comment core */}
                                  <div className="space-y-1 flex-1">
                                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                                      <span className="text-zinc-300 font-bold">{c.username}</span>
                                      
                                      {/* User badge */}
                                      {c.badge && (
                                        <span className={`px-1 py-0.5 text-[8px] font-mono font-bold uppercase border ${
                                          c.badge === 'Moderator' ? 'text-amber-400 bg-amber-400/5 border-amber-400/20' :
                                          c.badge === 'Contributor' || c.badge === 'Elite Debunker' ? 'text-cyan-400 bg-cyan-400/5 border-cyan-400/20' :
                                          'text-zinc-500 bg-zinc-900 border-white/5'
                                        }`}>
                                          {c.badge}
                                        </span>
                                      )}

                                      <span className="text-zinc-600 font-mono text-[9px]">{c.timestamp}</span>
                                    </div>
                                    <p className="text-zinc-400 leading-normal text-xs font-sans">
                                      {c.content}
                                    </p>
                                  </div>

                                  {/* Comment Like button */}
                                  <button 
                                    onClick={() => likeComment(event.id, c.id)}
                                    className={`flex items-center space-x-1 font-mono text-[10px] text-zinc-500 hover:text-white transition-colors self-start mt-0.5 ${
                                      c.userLiked ? 'text-pink-500 hover:text-pink-400' : ''
                                    }`}
                                  >
                                    <ThumbsUp className="h-3 w-3" />
                                    <span>{c.likes}</span>
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
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
