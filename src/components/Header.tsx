import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Clock, Compass, Users, Database, Newspaper, Film, Award, 
  ChevronDown, Lock, Image as ImageIcon, HelpCircle, Search, Info, Car, Skull, ShieldCheck, Brain,
  Bell, Trophy, User, Trash2, CheckSquare, Sliders, Cpu, Radio, BarChart2
} from 'lucide-react';
import { ViewType } from '../types';
import { useCommunity } from '../context/CommunityContext';

interface HeaderProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  setSelectedDatabaseTab?: (tab: 'vehicle' | 'weapon') => void;
}

export default function Header({ currentView, setView, setSelectedDatabaseTab }: HeaderProps) {
  const { notifications, markNotificationAsRead, clearAllNotifications } = useCommunity();
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Count unread alerts
  const unreadCount = notifications.filter(n => !n.read).length;

  // Calculate live countdown to speculated release: November 17, 2026
  useEffect(() => {
    const targetDate = new Date('2026-11-17T00:00:00').getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close notifications if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary top navigation items (highly visible)
  const primaryNavItems = [
    { id: 'home', label: 'Home', icon: Award },
    { id: 'characters', label: 'Protagonists', icon: Users },
    { id: 'map', label: 'Leonida Map', icon: Compass },
    { id: 'news', label: 'News Feed', icon: Newspaper },
    { id: 'ai-news', label: 'AI News Intel', icon: Brain },
  ] as const;

  // Dropdown "More Intel" items for remaining pages
  const moreNavItems = [
    { id: 'vehicles', label: 'Vehicles DB', icon: Car, action: () => { setSelectedDatabaseTab?.('vehicle'); setView('database'); } },
    { id: 'weapons', label: 'Weapons DB', icon: Skull, action: () => { setSelectedDatabaseTab?.('weapon'); setView('database'); } },
    { id: 'leaks', label: 'Leaks & Patents', icon: Lock, action: () => { setView('leaks'); } },
    { id: 'gallery', label: 'Photo Gallery', icon: ImageIcon, action: () => { setView('gallery'); } },
    { id: 'videos', label: 'Videos & Feed', icon: Film, action: () => { setView('videos'); } },
    { id: 'trust-legend', label: 'Trust Index Registry', icon: ShieldCheck, action: () => { setView('trust-legend'); } },
    { id: 'faq', label: 'FAQ Helpdesk', icon: HelpCircle, action: () => { setView('faq'); } },
    { id: 'search', label: 'Global Search', icon: Search, action: () => { setView('search'); } },
    { id: 'about', label: 'About Hub', icon: Info, action: () => { setView('about'); } },
    { id: 'profile', label: 'My Profile', icon: User, action: () => { setView('profile'); } },
    { id: 'leaderboard', label: 'Fact-Check Standings', icon: Trophy, action: () => { setView('leaderboard'); } },
    { id: 'settings', label: 'Hub Settings', icon: Sliders, action: () => { setView('settings'); } },
    { id: 'ai-system', label: 'AI System Controls', icon: Cpu, action: () => { setView('ai-system'); } },
    { id: 'sources', label: 'Source Registry', icon: Radio, action: () => { setView('sources'); } },
    { id: 'analytics', label: 'Analytics Observatory', icon: BarChart2, action: () => { setView('analytics'); } },
    { id: 'admin', label: 'Admin Console', icon: Sliders, action: () => { setView('admin'); } },
  ];

  const handleNavClick = (viewId: ViewType) => {
    setView(viewId);
    setIsOpen(false);
    setIsMoreOpen(false);
    setIsNotifOpen(false);
  };

  const handleMoreClick = (item: typeof moreNavItems[number]) => {
    item.action();
    setIsOpen(false);
    setIsMoreOpen(false);
    setIsNotifOpen(false);
  };

  const handleNotifClick = (id: string) => {
    markNotificationAsRead(id);
    setView('profile');
    setIsNotifOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#050505]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo Section */}
        <div 
          onClick={() => handleNavClick('home')} 
          className="flex cursor-pointer items-center space-x-2 select-none group"
          id="nav-logo"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-orange-400 rounded-none flex items-center justify-center font-display font-black text-lg text-black shadow-[0_0_15px_rgba(236,72,153,0.3)] group-hover:scale-105 transition-transform">VI</div>
          <span className="font-display font-black tracking-tighter text-lg ml-2 text-white uppercase">
            GTA <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">VI</span> HUB
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1" id="desktop-nav">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative flex items-center space-x-2 px-4 py-2 text-xs font-display font-black uppercase tracking-wider transition-colors select-none ${
                  isActive ? 'text-pink-500' : 'text-zinc-400 hover:text-white'
                }`}
                id={`nav-${item.id}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-500 to-orange-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* "More Intel" Custom Hover Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsMoreOpen(true)}
            onMouseLeave={() => setIsMoreOpen(false)}
          >
            <button
              className={`flex items-center space-x-1 px-4 py-2 text-xs font-display font-black uppercase tracking-wider transition-colors select-none ${
                isMoreOpen || ['database', 'leaks', 'breakdown', 'gallery', 'videos', 'trust-legend', 'faq', 'search', 'about', 'profile', 'leaderboard'].includes(currentView)
                  ? 'text-pink-500' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>More Intel</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isMoreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-0 w-56 bg-black border border-white/10 p-2 shadow-2xl space-y-0.5"
                >
                  {moreNavItems.map((item) => {
                    const Icon = item.icon;
                    // Check active status
                    const isActive = currentView === item.id || 
                      (item.id === 'vehicles' && currentView === 'database') || 
                      (item.id === 'weapons' && currentView === 'database');
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleMoreClick(item)}
                        className={`w-full flex items-center space-x-3 px-3 py-2.5 text-left text-xs font-display font-black uppercase tracking-wider transition-colors rounded-none ${
                          isActive 
                            ? 'bg-pink-500/10 text-pink-500 border-l-2 border-pink-500' 
                            : 'text-zinc-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Right Section: Ticker + Notification Bell */}
        <div className="hidden sm:flex items-center space-x-4 border-l border-white/10 pl-6" id="header-countdown-ticker">
          
          {/* INTERACTIVE NOTIFICATION BELL CENTER (Requirement: Notification center UI) */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className={`p-2 transition-colors relative hover:text-white border border-white/5 bg-zinc-950 ${
                unreadCount > 0 ? 'text-pink-500' : 'text-zinc-400'
              }`}
              id="desktop-notif-bell"
            >
              <Bell className={`h-4 w-4 ${unreadCount > 0 ? 'animate-pulse' : ''}`} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-black text-[9px] font-mono font-black h-4 w-4 flex items-center justify-center select-none animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Float notification mini card drawer */}
            <AnimatePresence>
              {isNotifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-80 bg-black border border-white/10 p-4 shadow-2xl space-y-3 z-50 text-left"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-widest">Leonida Stream Alerts</span>
                    {notifications.length > 0 && (
                      <button 
                        onClick={clearAllNotifications}
                        className="text-[9px] font-mono text-zinc-500 hover:text-red-400 flex items-center space-x-1"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>Clear</span>
                      </button>
                    )}
                  </div>

                  {notifications.length === 0 ? (
                    <div className="py-6 text-center text-zinc-500 font-sans text-xs">
                      No active intelligence alerts.
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                      {notifications.slice(0, 3).map(notif => (
                        <div 
                          key={notif.id}
                          onClick={() => handleNotifClick(notif.id)}
                          className={`p-2.5 border text-xs cursor-pointer hover:bg-zinc-950 transition-colors ${
                            notif.read ? 'border-white/5 text-zinc-500' : 'border-pink-500/20 bg-pink-500/5 text-white'
                          }`}
                        >
                          <div className="flex justify-between items-baseline font-mono text-[9px] font-bold text-pink-400 uppercase">
                            <span>{notif.title}</span>
                            <span className="text-zinc-600 text-[8px]">{notif.timestamp}</span>
                          </div>
                          <p className="mt-0.5 leading-snug text-[11px] font-sans text-zinc-400 truncate">
                            {notif.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="border-t border-white/5 pt-2 flex justify-between items-center">
                    <button
                      onClick={() => { setView('profile'); setIsNotifOpen(false); }}
                      className="w-full text-center py-1 bg-white/5 hover:bg-pink-600 hover:text-black font-mono font-black text-[10px] text-zinc-400 uppercase transition-all select-none"
                    >
                      Inspect Full Analyst Profile ({notifications.length})
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-pink-500 animate-pulse" />
            <span className="text-zinc-500 font-mono text-[10px] tracking-wider uppercase">Launch Countdown:</span>
            <span className="text-white font-mono text-xs font-black bg-white/5 border border-white/10 px-2 py-1">
              {timeLeft.days}D : {timeLeft.hours}H : {timeLeft.minutes}M
            </span>
          </div>

        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center space-x-2">
          
          {/* Mobile notification bell link */}
          <button
            onClick={() => setView('profile')}
            className={`p-2 relative border border-white/5 bg-zinc-950 ${
              unreadCount > 0 ? 'text-pink-500' : 'text-zinc-500'
            }`}
            id="mobile-notif-bell"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-600 text-black text-[8px] font-mono font-black h-3.5 w-3.5 flex items-center justify-center rounded-none">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Miniature countdown for mobile screens */}
          <div className="flex items-center space-x-1 rounded bg-zinc-900 px-2.5 py-1 border border-zinc-800 sm:hidden">
            <Clock className="h-3 w-3 text-pink-500" />
            <span className="text-white font-mono text-[10px] font-bold">
              {timeLeft.days}d left
            </span>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white focus:outline-none"
            id="mobile-menu-btn"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer (Exhaustive, thumb-friendly list) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-b border-white/10 bg-[#050505] lg:hidden overflow-hidden"
            id="mobile-drawer"
          >
            <div className="space-y-1 px-2 pt-2 pb-4 max-h-[75vh] overflow-y-auto">
              {/* Primary list */}
              {primaryNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex w-full items-center space-x-3 px-4 py-3 text-sm font-display font-bold uppercase tracking-wider transition-colors ${
                      isActive 
                        ? 'bg-pink-500/10 border-l-4 border-pink-500 text-pink-400' 
                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              {/* Sub list */}
              <div className="border-t border-white/5 my-2 pt-2">
                <span className="px-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Advanced Sights</span>
                {moreNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id || 
                    (item.id === 'vehicles' && currentView === 'database') || 
                    (item.id === 'weapons' && currentView === 'database');
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleMoreClick(item)}
                      className={`flex w-full items-center space-x-3 px-4 py-2.5 text-xs font-display font-bold uppercase tracking-wider transition-colors ${
                        isActive 
                          ? 'bg-pink-500/5 border-l-2 border-pink-500 text-pink-400' 
                          : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile drawer countdown */}
              <div className="mx-4 mt-4 flex items-center justify-between bg-zinc-900 p-3 border border-zinc-800">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-pink-500" />
                  <span className="text-zinc-400 font-mono text-xs">Speculated Launch</span>
                </div>
                <span className="text-white font-mono text-xs font-bold">
                  {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
