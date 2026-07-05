import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCommunity } from '../context/CommunityContext';
import { timelineEventsData } from '../data/gtaData';
import { ViewType } from '../types';
import { 
  User, Award, Bookmark, Bell, ShieldCheck, Check, Trash2, 
  MessageSquare, ThumbsUp, AlertTriangle, Eye, Sparkles, ExternalLink
} from 'lucide-react';
import TrustBadge from './TrustBadge';

interface ProfileViewProps {
  setView: (view: ViewType) => void;
}

export default function ProfileView({ setView }: ProfileViewProps) {
  const { 
    userProfile, 
    bookmarks, 
    notifications, 
    markNotificationAsRead, 
    clearAllNotifications,
    toggleBookmark 
  } = useCommunity();

  const [activeTab, setActiveTab] = useState<'bookmarks' | 'notifications'>('bookmarks');

  // Find bookmarked articles
  const bookmarkedArticles = timelineEventsData.filter(event => bookmarks.includes(event.id));

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (id: string) => {
    markNotificationAsRead(id);
  };

  // Helper for badges UI
  const getBadgeIconColor = (badgeName: string) => {
    if (badgeName.includes('Gold') || badgeName.includes('Elite') || badgeName.includes('Admin')) {
      return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    }
    if (badgeName.includes('Trusted') || badgeName.includes('Silver')) {
      return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
    }
    return 'text-zinc-400 bg-zinc-800 border-zinc-700';
  };

  return (
    <div className="space-y-8 pb-12" id="profile-view-root">
      
      {/* Header section */}
      <div>
        <div className="flex items-center space-x-2 text-pink-500 font-mono text-[10px] tracking-widest uppercase font-black mb-1">
          <User className="h-4 w-4 text-pink-500 shrink-0" />
          <span>GTA VI COMMUNITY HQ</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tighter uppercase leading-none">
          My Analyst Profile
        </h1>
        <p className="text-zinc-400 text-sm mt-2 max-w-2xl font-sans">
          Manage your fact-checking notifications, view active badges, track your submission reputation rank, and review bookmarked intelligence dossiers.
        </p>
      </div>

      {/* Main Profile Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="profile-grid">
        
        {/* Left Side: Profile Card & Badges (5 cols) */}
        <div className="lg:col-span-5 space-y-6" id="profile-left-column">
          
          {/* Main User Card */}
          <div className="bg-black border border-white/10 p-6 relative overflow-hidden">
            {/* Glowing neon accent ribbon */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-pink-500 to-orange-400" />
            
            <div className="flex items-center space-x-5">
              {/* User Avatar */}
              <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-orange-500 rounded-none p-[2px] shrink-0">
                <div className="w-full h-full bg-[#050505] flex items-center justify-center">
                  <User className="h-8 w-8 text-pink-500" />
                </div>
              </div>

              {/* Username & Rating */}
              <div className="space-y-1">
                <h3 className="text-xl font-display font-black text-white uppercase tracking-tight">
                  {userProfile.username}
                </h3>
                <div className="flex items-center space-x-2 font-mono text-[11px] text-zinc-500">
                  <span>Reputation Rating:</span>
                  <span className="text-pink-500 font-black">{userProfile.reputation} Points</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-white/5 font-mono text-xs">
              <div className="bg-zinc-950 p-3 border border-white/5 space-y-1">
                <span className="text-zinc-500 text-[10px] block uppercase">Comments Made</span>
                <span className="text-white font-bold text-sm">{userProfile.stats.commentsCount}</span>
              </div>
              <div className="bg-zinc-950 p-3 border border-white/5 space-y-1">
                <span className="text-zinc-500 text-[10px] block uppercase">Votes Submitted</span>
                <span className="text-white font-bold text-sm">{userProfile.stats.votesCast}</span>
              </div>
              <div className="bg-zinc-950 p-3 border border-white/5 space-y-1">
                <span className="text-zinc-500 text-[10px] block uppercase">Claims Flagged</span>
                <span className="text-white font-bold text-sm">{userProfile.stats.reportsSubmitted}</span>
              </div>
              <div className="bg-zinc-950 p-3 border border-white/5 space-y-1">
                <span className="text-zinc-500 text-[10px] block uppercase">Bookmarks Saved</span>
                <span className="text-white font-bold text-sm">{userProfile.stats.bookmarksCount}</span>
              </div>
            </div>
          </div>

          {/* Badges and Accolades Panel (Requirements: User reputation badge + Contributor badge) */}
          <div className="bg-black border border-white/10 p-6 space-y-4 relative">
            <h4 className="font-display font-black text-xs uppercase text-zinc-400 tracking-wider">
              Earned Badges & Credentials
            </h4>

            <div className="space-y-4">
              
              {/* Contributor Badge */}
              <div className={`p-4 border flex items-start space-x-3.5 transition-all ${getBadgeIconColor(userProfile.contributorBadge)}`}>
                <div className="p-2 bg-black/40 border border-white/10 mt-0.5 rounded-none text-current shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block font-black">Contributor Credential</span>
                    <span className="px-1.5 py-0.5 bg-pink-500/10 text-pink-400 text-[8px] font-mono font-bold uppercase border border-pink-500/20">Active</span>
                  </div>
                  <h5 className="font-display font-black text-sm text-white uppercase tracking-tight">
                    {userProfile.contributorBadge}
                  </h5>
                  <p className="text-zinc-400 text-[11px] leading-relaxed font-sans">
                    Awarded based on direct engagement, analysis comments, and historical leaks review accuracy.
                  </p>
                </div>
              </div>

              {/* Reputation Badge */}
              <div className={`p-4 border flex items-start space-x-3.5 transition-all ${getBadgeIconColor(userProfile.reputationBadge)}`}>
                <div className="p-2 bg-black/40 border border-white/10 mt-0.5 rounded-none text-current shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block font-black">Reputation Badge</span>
                    <span className="px-1.5 py-0.5 bg-pink-500/10 text-pink-400 text-[8px] font-mono font-bold uppercase border border-pink-500/20">Rank {userProfile.reputation >= 600 ? 'Tier 1' : 'Tier 2'}</span>
                  </div>
                  <h5 className="font-display font-black text-sm text-white uppercase tracking-tight">
                    {userProfile.reputationBadge}
                  </h5>
                  <p className="text-zinc-400 text-[11px] leading-relaxed font-sans">
                    Your official fact-checking level. High reputation scores unlock superior pipeline priority and verification flags.
                  </p>
                </div>
              </div>

              {/* Information / Helper on how to level up */}
              <div className="bg-[#09090b] border border-white/5 p-4 flex items-start space-x-3">
                <Sparkles className="h-4 w-4 text-pink-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-zinc-500 font-sans leading-relaxed">
                  Tip: Build your reputation rating (+15 Points per review comment, +5 Points per report submitted) to level up your badges from silver to gold!
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Right Side: Interactive Tabs for Notifications vs Bookmarks (7 cols) */}
        <div className="lg:col-span-7 bg-black border border-white/10 p-6 flex flex-col justify-between" id="profile-right-column">
          
          <div className="space-y-6">
            
            {/* Custom Tabs Navigation */}
            <div className="flex border-b border-white/10" id="profile-tabs">
              <button
                onClick={() => setActiveTab('bookmarks')}
                className={`flex items-center space-x-2 px-5 py-3.5 text-xs font-display font-black uppercase tracking-wider border-b-2 transition-all ${
                  activeTab === 'bookmarks' 
                    ? 'border-pink-500 text-pink-500' 
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
                id="tab-bookmarks-btn"
              >
                <Bookmark className="h-4 w-4" />
                <span>Bookmarks ({bookmarks.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center space-x-2 px-5 py-3.5 text-xs font-display font-black uppercase tracking-wider border-b-2 transition-all relative ${
                  activeTab === 'notifications' 
                    ? 'border-pink-500 text-pink-500' 
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
                id="tab-notifications-btn"
              >
                <Bell className="h-4 w-4" />
                <span>Alert Inbox</span>
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                  </span>
                )}
              </button>
            </div>

            {/* Tab content container */}
            <div className="pt-2">
              
              {/* BOOKMARKS LIST */}
              {activeTab === 'bookmarks' && (
                <div className="space-y-4" id="bookmarks-tab-panel">
                  {bookmarkedArticles.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-white/10 p-8 text-zinc-500">
                      <Bookmark className="h-8 w-8 text-zinc-700 mx-auto mb-2" />
                      <p className="text-xs font-mono uppercase tracking-wide">No bookmarks saved yet</p>
                      <button 
                        onClick={() => setView('news')} 
                        className="text-pink-500 hover:underline text-xs mt-2 block mx-auto font-bold uppercase font-mono"
                      >
                        Explore News Timeline
                      </button>
                    </div>
                  ) : (
                    bookmarkedArticles.map(article => (
                      <div 
                        key={article.id}
                        className="bg-zinc-950/40 border border-white/5 p-4 hover:border-white/10 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        id={`bookmark-item-${article.id}`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <TrustBadge badge={article.trustBadge} size="sm" />
                            <span className="text-[10px] font-mono text-zinc-500 uppercase">{article.date}</span>
                          </div>
                          <h4 className="text-sm font-display font-black text-white uppercase tracking-wide">
                            {article.title}
                          </h4>
                          <p className="text-zinc-400 text-xs line-clamp-1 font-sans">
                            {article.summary}
                          </p>
                        </div>

                        <div className="flex items-center space-x-3 shrink-0 self-end sm:self-auto">
                          <button
                            onClick={() => setView('news')}
                            className="flex items-center space-x-1 px-2.5 py-1.5 bg-zinc-900 border border-white/5 text-[10px] font-mono text-zinc-300 hover:text-white hover:border-pink-500 transition-all uppercase"
                          >
                            <Eye className="h-3.5 w-3.5 text-pink-500" />
                            <span>Read</span>
                          </button>
                          
                          <button
                            onClick={() => toggleBookmark(article.id)}
                            className="p-1.5 text-zinc-500 hover:text-red-400 border border-transparent hover:border-white/5 transition-all"
                            title="Remove bookmark"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* NOTIFICATION CENTER (Requirement: Notification center (UI only)) */}
              {activeTab === 'notifications' && (
                <div className="space-y-4" id="notifications-tab-panel">
                  
                  {/* Notification header tools */}
                  <div className="flex justify-between items-center text-xs font-mono text-zinc-500 pb-2 border-b border-white/5">
                    <span>Community and Alert Stream</span>
                    {notifications.length > 0 && (
                      <button 
                        onClick={clearAllNotifications}
                        className="hover:text-white transition-colors flex items-center space-x-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Clear All</span>
                      </button>
                    )}
                  </div>

                  {notifications.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-white/10 p-8 text-zinc-500">
                      <Bell className="h-8 w-8 text-zinc-700 mx-auto mb-2" />
                      <p className="text-xs font-mono uppercase tracking-wide">Your inbox is completely clear</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                      {notifications.map(item => (
                        <div 
                          key={item.id}
                          onClick={() => handleNotificationClick(item.id)}
                          className={`p-3.5 border transition-all relative flex items-start space-x-3 cursor-pointer ${
                            item.read 
                              ? 'bg-zinc-950/20 border-white/5 text-zinc-400' 
                              : 'bg-pink-500/5 border-pink-500/20 text-white shadow-[inset_0_0_10px_rgba(236,72,153,0.05)]'
                          }`}
                          id={`notification-item-${item.id}`}
                        >
                          {/* Unread indicator dot */}
                          {!item.read && (
                            <span className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-pink-500" />
                          )}

                          <div className={`p-1.5 shrink-0 mt-0.5 border ${
                            item.type === 'badge' ? 'border-amber-500/30 text-amber-500 bg-amber-500/5' :
                            item.type === 'verify' ? 'border-cyan-500/30 text-cyan-400 bg-cyan-500/5' :
                            'border-pink-500/30 text-pink-500 bg-pink-500/5'
                          }`}>
                            {item.type === 'badge' && <Award className="h-3.5 w-3.5" />}
                            {item.type === 'verify' && <ShieldCheck className="h-3.5 w-3.5" />}
                            {item.type === 'like' && <ThumbsUp className="h-3.5 w-3.5" />}
                            {item.type === 'system' && <Sparkles className="h-3.5 w-3.5" />}
                          </div>

                          <div className="space-y-1 flex-1 pr-4">
                            <div className="flex justify-between items-baseline">
                              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                                {item.title}
                              </h5>
                              <span className="text-[9px] font-mono text-zinc-500">{item.timestamp}</span>
                            </div>
                            <p className="text-[11px] leading-relaxed font-sans text-zinc-400">
                              {item.message}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

            </div>

          </div>

          {/* Quick link button to leaderboard */}
          <div className="border-t border-white/5 pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-[10px] text-zinc-500 font-mono">
              Account Status: Verified Analyst Shard
            </span>

            <button
              onClick={() => setView('leaderboard')}
              className="flex items-center space-x-2 text-xs font-mono font-bold text-pink-500 hover:text-pink-400 uppercase"
              id="profile-to-leaderboard-btn"
            >
              <span>View Leaderboard</span>
              <ExternalLink className="h-4 w-4 text-pink-500 shrink-0" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
