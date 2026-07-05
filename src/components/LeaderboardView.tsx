import { motion } from 'motion/react';
import { useCommunity } from '../context/CommunityContext';
import { ViewType } from '../types';
import { 
  Trophy, Award, ShieldCheck, User, Users, Search, Sparkles, Flame, CheckCircle2 
} from 'lucide-react';

interface LeaderboardViewProps {
  setView: (view: ViewType) => void;
}

export default function LeaderboardView({ setView }: LeaderboardViewProps) {
  const { leaderboard, userProfile } = useCommunity();

  // Find user's position in leaderboard
  const userRankEntry = leaderboard.find(e => e.isCurrentUser);

  return (
    <div className="space-y-8 pb-12" id="leaderboard-view-root">
      
      {/* Header text block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center space-x-2 text-pink-500 font-mono text-[10px] tracking-widest uppercase font-black mb-1">
            <Trophy className="h-4 w-4 text-pink-500 shrink-0 animate-bounce" />
            <span>COMMUNITY FACT-CHECK SYSTEM</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tighter uppercase leading-none">
            Fact-Check Leaderboard
          </h1>
          <p className="text-zinc-400 text-sm mt-2 max-w-2xl font-sans">
            Recognizing top intelligence analysts and myth-busters in the GTA VI community. Build reputation by commenting, rating claims, and reporting fabricated leaks.
          </p>
        </div>

        {/* Back to profile quick portal button */}
        <button
          onClick={() => setView('profile')}
          className="flex items-center space-x-2 bg-pink-500/10 border border-pink-500/30 hover:border-pink-500 px-4 py-2.5 text-xs font-mono font-bold text-pink-400 transition-colors uppercase select-none rounded-none shrink-0"
          id="leaderboard-to-profile-btn"
        >
          <User className="h-4 w-4 shrink-0 text-pink-500" />
          <span>My Profile & Badges</span>
        </button>
      </div>

      {/* Top 3 Analysts Highlight Podium (Bento styled grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="leaderboard-podium">
        {leaderboard.slice(0, 3).map((entry, idx) => {
          const isGold = entry.rank === 1;
          const isSilver = entry.rank === 2;
          const isBronze = entry.rank === 3;
          
          return (
            <div 
              key={entry.username}
              className={`p-6 border relative flex flex-col justify-between overflow-hidden ${
                isGold ? 'bg-gradient-to-b from-amber-500/5 to-black border-amber-500/30 shadow-[0_4px_30px_rgba(245,158,11,0.05)]' :
                isSilver ? 'bg-gradient-to-b from-cyan-500/5 to-black border-cyan-500/20' :
                'bg-zinc-950/40 border-white/10'
              }`}
              id={`leaderboard-podium-${entry.rank}`}
            >
              {/* Giant Rank Watermark */}
              <div className="absolute right-4 bottom-2 font-display font-black text-6xl opacity-[0.03] text-white">
                #{entry.rank}
              </div>

              {/* Status Ribbon */}
              {isGold && (
                <span className="absolute top-3 right-3 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
              )}

              <div className="space-y-4">
                
                {/* Ranking Emblem */}
                <div className="flex items-center space-x-3">
                  <div className={`p-2.5 border rounded-none shrink-0 ${
                    isGold ? 'border-amber-500/40 text-amber-500 bg-amber-500/10' :
                    isSilver ? 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10' :
                    'border-zinc-700 text-zinc-400 bg-zinc-800'
                  }`}>
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black block">Podium Rank</span>
                    <span className={`text-xs font-mono uppercase font-black ${
                      isGold ? 'text-amber-500' : isSilver ? 'text-cyan-400' : 'text-zinc-400'
                    }`}>
                      {isGold ? 'Gold Elite Analyst' : isSilver ? 'Silver Spotter' : 'Bronze Contributor'}
                    </span>
                  </div>
                </div>

                {/* Username */}
                <div className="space-y-1">
                  <h3 className="text-lg font-display font-black text-white uppercase tracking-tight flex items-center space-x-1.5">
                    <span>{entry.username}</span>
                    {entry.isCurrentUser && (
                      <span className="text-[9px] font-mono font-bold text-pink-500 border border-pink-500/30 bg-pink-500/5 px-1 py-0.5">YOU</span>
                    )}
                  </h3>
                  <p className="text-[10px] text-zinc-500 font-mono uppercase">
                    Badge: <span className="text-zinc-300">{entry.badge}</span>
                  </p>
                </div>

              </div>

              {/* Stats Footer */}
              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 mt-6 font-mono text-xs">
                <div>
                  <span className="text-zinc-500 text-[9px] uppercase block">Reputation</span>
                  <span className="text-white font-bold text-sm">{entry.reputation} XP</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[9px] uppercase block">Fact Checks</span>
                  <span className="text-emerald-400 font-bold text-sm flex items-center space-x-1">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>{entry.verifiedClaims}</span>
                  </span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Main Leaderboard Rankings Table */}
      <div className="bg-black border border-white/10 overflow-hidden" id="leaderboard-rankings-table">
        
        {/* Table Title Block */}
        <div className="p-5 border-b border-white/10 bg-zinc-950/40 flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-pink-500" />
            <h3 className="font-display font-black text-xs uppercase tracking-widest text-zinc-300">
              Complete Fact-Checking Rankings
            </h3>
          </div>

          {/* Quick User stats snippet */}
          {userRankEntry && (
            <div className="text-xs font-mono text-zinc-500 flex items-center space-x-3">
              <span>Your Rank: <strong className="text-pink-500">#{userRankEntry.rank} of {leaderboard.length}</strong></span>
              <span className="text-zinc-700">|</span>
              <span>Your Rep: <strong className="text-pink-500">{userProfile.reputation} Points</strong></span>
            </div>
          )}
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/5 font-mono text-[10px] text-zinc-500 uppercase font-black">
          <div className="col-span-2 sm:col-span-1">Rank</div>
          <div className="col-span-6 sm:col-span-5">Analyst</div>
          <div className="col-span-4 sm:col-span-3 text-right sm:text-left">Reputation Score</div>
          <div className="hidden sm:block col-span-2">Verified Claims</div>
          <div className="hidden sm:block col-span-1 text-right">Badge</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-white/5">
          {leaderboard.map((entry) => {
            const isCurrentUser = entry.isCurrentUser;
            return (
              <div 
                key={entry.username}
                className={`grid grid-cols-12 gap-4 px-6 py-4 items-center font-mono text-xs transition-colors ${
                  isCurrentUser 
                    ? 'bg-pink-500/[0.03] border-l-2 border-l-pink-500 text-white' 
                    : 'text-zinc-400 hover:bg-zinc-950/50'
                }`}
                id={`leaderboard-row-${entry.rank}`}
              >
                
                {/* Rank number */}
                <div className="col-span-2 sm:col-span-1 flex items-center space-x-2">
                  <span className={`font-black text-sm ${
                    entry.rank === 1 ? 'text-amber-500' :
                    entry.rank === 2 ? 'text-cyan-400' :
                    entry.rank === 3 ? 'text-orange-400' : 'text-zinc-500'
                  }`}>
                    #{entry.rank}
                  </span>
                </div>

                {/* Username + current user indicator */}
                <div className="col-span-6 sm:col-span-5 font-sans font-bold flex items-center space-x-2.5">
                  <div className="w-7 h-7 bg-zinc-900 border border-white/10 flex items-center justify-center rounded-none shrink-0 text-zinc-500">
                    <User className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className={`text-sm tracking-tight ${isCurrentUser ? 'text-pink-500 font-extrabold' : 'text-zinc-300'}`}>
                      {entry.username}
                    </span>
                    {isCurrentUser && (
                      <span className="text-[8px] font-mono font-bold bg-pink-500/10 text-pink-400 border border-pink-500/20 px-1 py-0.5 rounded-none ml-2">YOU</span>
                    )}
                  </div>
                </div>

                {/* Reputation Score */}
                <div className="col-span-4 sm:col-span-3 text-right sm:text-left font-black text-zinc-300">
                  {entry.reputation} XP
                </div>

                {/* Verified Claims */}
                <div className="hidden sm:block col-span-2 text-emerald-400 font-bold">
                  {entry.verifiedClaims} Claims
                </div>

                {/* Reputation badge label */}
                <div className="hidden sm:block col-span-1 text-right text-[10px] uppercase font-black text-zinc-500">
                  {entry.badge.split(' ')[0]}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Dynamic bottom call to action card */}
      <div className="bg-[#09090b] border border-white/10 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-pink-500 text-xs font-mono font-black uppercase">
            <Flame className="h-4 w-4 shrink-0 text-orange-500" />
            <span>WANT TO CLIMB THE RANKINGS?</span>
          </div>
          <p className="text-zinc-400 text-xs sm:text-sm font-sans max-w-xl">
            Read timeline intelligence alerts, leave insightful check reviews on speculated rumors, and vote or report misinformation to boost your Rank.
          </p>
        </div>

        <button
          onClick={() => setView('news')}
          className="w-full md:w-auto bg-gradient-to-r from-pink-500 to-orange-400 text-black font-display font-black uppercase px-6 py-3 text-xs tracking-wider hover:brightness-110 transition-all select-none rounded-none"
          id="leaderboard-cta-news"
        >
          Check Latest News Rumors
        </button>
      </div>

    </div>
  );
}
