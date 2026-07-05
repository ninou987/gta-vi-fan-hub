import { ViewType } from '../types';
import { ShieldAlert, Globe, Github, Twitter, Youtube } from 'lucide-react';

interface FooterProps {
  setView: (view: ViewType) => void;
}

export default function Footer({ setView }: FooterProps) {
  return (
    <footer className="w-full border-t border-white/5 bg-[#050505] py-12 text-zinc-400" id="footer-main">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-white/5">
          
          {/* Brand block */}
          <div className="space-y-3">
            <span className="font-display font-black tracking-tighter text-2xl text-white uppercase block">
              GTA <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">VI</span> HUB
            </span>
            <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
              The premier interactive companion database, map speculation tracker, and news catalog for Rockstar Games' upcoming masterpiece.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3 col-span-1 md:col-span-1">
            <h4 className="text-white font-display font-black text-xs tracking-widest uppercase">Explore Sections</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-sm text-zinc-500">
              <button onClick={() => setView('home')} className="text-left font-semibold hover:text-pink-500 transition-colors">Home Dashboard</button>
              <button onClick={() => setView('characters')} className="text-left font-semibold hover:text-pink-500 transition-colors">Protagonists</button>
              <button onClick={() => setView('map')} className="text-left font-semibold hover:text-pink-500 transition-colors">Leonida Map</button>
              <button onClick={() => setView('database')} className="text-left font-semibold hover:text-pink-500 transition-colors">Database Info</button>
              <button onClick={() => setView('news')} className="text-left font-semibold hover:text-pink-500 transition-colors">News Feed</button>
              <button onClick={() => setView('ai-news')} className="text-left font-semibold hover:text-pink-500 transition-colors text-pink-500 font-bold">AI News Intel</button>
              <button onClick={() => setView('leaks')} className="text-left font-semibold hover:text-pink-500 transition-colors">Leaks & Patents</button>
              <button onClick={() => setView('gallery')} className="text-left font-semibold hover:text-pink-500 transition-colors">Photo Gallery</button>
              <button onClick={() => setView('videos')} className="text-left font-semibold hover:text-pink-500 transition-colors">Videos & Clips</button>
              <button onClick={() => setView('faq')} className="text-left font-semibold hover:text-pink-500 transition-colors">FAQ Desk</button>
              <button onClick={() => setView('search')} className="text-left font-semibold hover:text-pink-500 transition-colors">Global Search</button>
              <button onClick={() => setView('about')} className="text-left font-semibold hover:text-pink-500 transition-colors">About Hub</button>
              <button onClick={() => setView('trust-legend')} className="text-left font-semibold hover:text-pink-500 transition-colors">Trust Registry</button>
              <button onClick={() => setView('profile')} className="text-left font-semibold hover:text-pink-500 transition-colors">My Profile</button>
              <button onClick={() => setView('leaderboard')} className="text-left font-semibold hover:text-pink-500 transition-colors">Fact-Check Leaderboard</button>
            </div>
          </div>

          {/* Social connections */}
          <div className="space-y-4">
            <h4 className="text-white font-display font-black text-xs tracking-widest uppercase">Community Hub</h4>
            <div className="flex space-x-2">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="border border-white/10 p-2.5 text-zinc-400 hover:border-pink-500 hover:text-pink-500 hover:bg-pink-500/5 transition-colors">
                <Twitter className="h-4.5 w-4.5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="border border-white/10 p-2.5 text-zinc-400 hover:border-pink-500 hover:text-pink-500 hover:bg-pink-500/5 transition-colors">
                <Youtube className="h-4.5 w-4.5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="border border-white/10 p-2.5 text-zinc-400 hover:border-pink-500 hover:text-pink-500 hover:bg-pink-500/5 transition-colors">
                <Github className="h-4.5 w-4.5" />
              </a>
              <a href="https://google.com" target="_blank" rel="noreferrer" className="border border-white/10 p-2.5 text-zinc-400 hover:border-pink-500 hover:text-pink-500 hover:bg-pink-500/5 transition-colors">
                <Globe className="h-4.5 w-4.5" />
              </a>
            </div>
            <p className="text-xs text-zinc-600 font-medium">
              Join millions of fans keeping the flame alive. #GTAVI
            </p>
          </div>
        </div>

        {/* Disclaimer section */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-zinc-600">
          <div className="flex items-start md:items-center space-x-2">
            <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5 md:mt-0" />
            <p className="max-w-2xl leading-relaxed">
              <span className="font-semibold text-zinc-500">Legal Disclaimer:</span> This website is a 100% unofficial, non-profit, fan-made application. All game names, character concepts, brand names, and trailers belong to their respective creators (<a href="https://www.rockstargames.com" className="hover:underline text-zinc-500">Rockstar Games</a> and <a href="https://www.take2games.com" className="hover:underline text-zinc-500">Take-Two Interactive</a>). No copyright infringement intended.
            </p>
          </div>
          <span className="shrink-0 font-mono text-[10px] tracking-wider uppercase text-zinc-600">
            © {new Date().getFullYear()} GTA VI Fan Hub.
          </span>
        </div>
      </div>
    </footer>
  );
}
