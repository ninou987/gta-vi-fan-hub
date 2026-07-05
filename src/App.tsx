import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewType } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import CharactersView from './components/CharactersView';
import MapView from './components/MapView';
import DatabaseView from './components/DatabaseView';
import NewsView from './components/NewsView';
import TrustLegendView from './components/TrustLegendView';
import AINewsView from './components/AINewsView';
import LeaksView from './components/LeaksView';
import TrailerBreakdownView from './components/TrailerBreakdownView';
import GalleryView from './components/GalleryView';
import VideosView from './components/VideosView';
import FAQView from './components/FAQView';
import SearchView from './components/SearchView';
import AboutView from './components/AboutView';
import ProfileView from './components/ProfileView';
import LeaderboardView from './components/LeaderboardView';
import SettingsView from './components/SettingsView';
import AISystemView from './components/AISystemView';
import SourceManagementView from './components/SourceManagementView';
import AdminView from './components/AdminView';
import AnalyticsView from './components/AnalyticsView';
import { CommunityProvider } from './context/CommunityContext';

export default function App() {
  return (
    <CommunityProvider>
      <AppContent />
    </CommunityProvider>
  );
}

function AppContent() {
  const [currentView, setView] = useState<ViewType>('home');
  const [selectedCharacterId, setSelectedCharacterId] = useState<'lucia' | 'jason'>('lucia');
  const [selectedDatabaseTab, setSelectedDatabaseTab] = useState<'vehicle' | 'weapon'>('vehicle');

  // Cancel any active speech synthesis on view transition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView setView={(view) => setView(view as ViewType)} />;
      case 'characters':
        return <CharactersView initialId={selectedCharacterId} />;
      case 'map':
        return <MapView />;
      case 'database':
        return <DatabaseView initialTab={selectedDatabaseTab} />;
      case 'news':
        return <NewsView setView={(view) => setView(view as ViewType)} />;
      case 'ai-news':
        return <AINewsView setView={(view) => setView(view as ViewType)} />;
      case 'trust-legend':
        return <TrustLegendView setView={(view) => setView(view as ViewType)} />;
      case 'profile':
        return <ProfileView setView={(view) => setView(view as ViewType)} />;
      case 'leaderboard':
        return <LeaderboardView setView={(view) => setView(view as ViewType)} />;
      case 'settings':
        return <SettingsView setView={(view) => setView(view as ViewType)} />;
      case 'ai-system':
        return <AISystemView />;
      case 'sources':
        return <SourceManagementView />;
      case 'admin':
        return <AdminView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'leaks':
        return <LeaksView />;
      case 'breakdown':
        return <TrailerBreakdownView />;
      case 'gallery':
        return <GalleryView />;
      case 'videos':
        return <VideosView setView={(view) => setView(view as ViewType)} />;
      case 'faq':
        return <FAQView />;
      case 'search':
        return <SearchView setView={(view) => setView(view as ViewType)} setSelectedCharacterId={setSelectedCharacterId} setSelectedDatabaseTab={setSelectedDatabaseTab} />;
      case 'about':
        return <AboutView />;
      default:
        return <HomeView setView={(view) => setView(view as ViewType)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-zinc-100 selection:bg-pink-500/30 selection:text-pink-200 overflow-x-hidden antialiased font-sans">
      
      {/* Dynamic background lighting */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-500/5 via-transparent to-transparent pointer-events-none z-0" />
      
      <Header currentView={currentView} setView={(view) => setView(view as ViewType)} setSelectedDatabaseTab={setSelectedDatabaseTab} />

      {/* Main Content Stage */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 z-10 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            id="view-stage-wrapper"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* High-Impact Footer Ticker */}
      <div className="w-full bg-pink-600 py-3 flex items-center overflow-hidden whitespace-nowrap border-y border-white/10 select-none z-10 relative">
        <div className="flex animate-ticker whitespace-nowrap uppercase font-black tracking-widest text-xs text-black">
          <span className="px-10">Grand Theft Auto VI • Coming Fall 2025</span>
          <span className="px-10">Pre-order Campaign Details Coming Soon</span>
          <span className="px-10">Leonida State Radar Active • Lucia & Jason</span>
          <span className="px-10">Grand Theft Auto VI • Coming Fall 2025</span>
          <span className="px-10">Pre-order Campaign Details Coming Soon</span>
          <span className="px-10">Leonida State Radar Active • Lucia & Jason</span>
          <span className="px-10">Grand Theft Auto VI • Coming Fall 2025</span>
          <span className="px-10">Pre-order Campaign Details Coming Soon</span>
          <span className="px-10">Leonida State Radar Active • Lucia & Jason</span>
        </div>
      </div>

      <Footer setView={(view) => setView(view as ViewType)} />
    </div>
  );
}
