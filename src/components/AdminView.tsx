import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sliders, Shield, Newspaper, Brain, MessageSquare, Users, BarChart2, Settings,
  Plus, Edit2, Trash2, Check, RefreshCw, Eye, SlidersHorizontal, AlertCircle
} from 'lucide-react';

interface MockArticle {
  id: string;
  title: string;
  category: 'official' | 'speculation' | 'leak';
  date: string;
  trustScore: number;
  status: 'Published' | 'Draft';
}

interface UserAccount {
  id: string;
  username: string;
  role: 'Lead Investigator' | 'Senior Analyst' | 'Theorist' | 'Suspended';
  points: number;
  joined: string;
}

interface ReportLog {
  id: string;
  source: string;
  type: 'Inaccuracy' | 'Copyright' | 'Spam';
  content: string;
  status: 'Pending' | 'Resolved';
}

export default function AdminView() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'news' | 'ai' | 'reports' | 'users' | 'analytics' | 'settings'>('dashboard');

  // Interactive News Management Local State
  const [articles, setArticles] = useState<MockArticle[]>([
    { id: 'art-1', title: 'Official Trailer 2 Subdomain Refresh Complete', category: 'official', date: 'Jul 2026', trustScore: 100, status: 'Published' },
    { id: 'art-2', title: 'Leaked GPU Water Shader Fourier Analysis', category: 'leak', date: 'Jun 2026', trustScore: 94, status: 'Published' },
    { id: 'art-3', title: 'Lucia Stunt Bike Custom Underglow Speculation', category: 'speculation', date: 'May 2026', trustScore: 54, status: 'Draft' },
    { id: 'art-4', title: 'Florida Highway Intersections Demarcated Coordinates', category: 'speculation', date: 'Apr 2026', trustScore: 92, status: 'Published' }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'official' | 'speculation' | 'leak'>('speculation');
  const [newScore, setNewScore] = useState(75);
  const [editingId, setEditingId] = useState<string | null>(null);

  // User list state
  const [users, setUsers] = useState<UserAccount[]>([
    { id: 'usr-1', username: 'LeonidaMapper', role: 'Senior Analyst', points: 4120, joined: 'Dec 2023' },
    { id: 'usr-2', username: 'Tez2_Fan', role: 'Theorist', points: 1850, joined: 'Jan 2024' },
    { id: 'usr-3', username: 'GamerX6_Burner', role: 'Suspended', points: 10, joined: 'May 2026' },
    { id: 'usr-4', username: 'ViceCityExpert', role: 'Lead Investigator', points: 8940, joined: 'Nov 2023' }
  ]);

  // Report feed state
  const [reports, setReports] = useState<ReportLog[]>([
    { id: 'rep-1', source: '@TwitterCop', type: 'Copyright', content: 'DMCA claim regarding gameplay stream recording hash matching v1.1.2 build variables.', status: 'Pending' },
    { id: 'rep-2', source: 'r/GTA6 Mod Team', type: 'Inaccuracy', content: 'Claim coordinates mismatch real-world Fort Lauderdale canals.', status: 'Pending' },
    { id: 'rep-3', source: 'User_X', type: 'Spam', content: 'User posting redundant discord referral links on speculation cards.', status: 'Resolved' }
  ]);

  // Settings State
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [telemetryEnabled, setTelemetryEnabled] = useState(true);
  const [alertSounds, setAlertSounds] = useState(true);

  // Form Add / Edit / Delete handlers
  const handleAddArticle = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    if (editingId) {
      setArticles(prev => prev.map(art => {
        if (art.id === editingId) {
          return {
            ...art,
            title: newTitle,
            category: newCategory,
            trustScore: newScore
          };
        }
        return art;
      }));
      setEditingId(null);
    } else {
      const art: MockArticle = {
        id: `art-${Math.floor(Math.random() * 900) + 100}`,
        title: newTitle,
        category: newCategory,
        date: 'Jul 2026',
        trustScore: newScore,
        status: 'Draft'
      };
      setArticles([art, ...articles]);
    }
    setNewTitle('');
    setNewScore(75);
  };

  const handleEditClick = (art: MockArticle) => {
    setEditingId(art.id);
    setNewTitle(art.title);
    setNewCategory(art.category);
    setNewScore(art.trustScore);
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(prev => prev.filter(art => art.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setArticles(prev => prev.map(art => {
      if (art.id === id) {
        return {
          ...art,
          status: art.status === 'Published' ? 'Draft' : 'Published'
        };
      }
      return art;
    }));
  };

  const handleResolveReport = (id: string) => {
    setReports(prev => prev.map(rep => {
      if (rep.id === id) {
        return { ...rep, status: 'Resolved' };
      }
      return rep;
    }));
  };

  const handleRoleChange = (id: string, newRole: any) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        return { ...u, role: newRole };
      }
      return u;
    }));
  };

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto" id="admin-view">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="text-pink-500 font-mono text-[10px] tracking-widest uppercase font-black block mb-1">
            SITE CONTROL DECK — UI MODE ONLY
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tighter uppercase leading-none">
            Admin Console
          </h1>
          <p className="text-zinc-400 text-sm mt-2 max-w-3xl font-sans text-left">
            Manage articles, calibrate automated scrapers, process community dispute reports, and edit roles for registered investigative fact-checkers.
          </p>
        </div>

        <div className="bg-[#09090b] border border-white/10 px-4 py-2 flex items-center gap-3 shrink-0">
          <Shield className="h-5 w-5 text-pink-500 shrink-0" />
          <div className="text-left font-mono">
            <span className="text-[9px] text-zinc-500 block uppercase font-bold">OPERATIONAL PRIVILEGES</span>
            <span className="text-xs text-white font-black">LEAD INVESTIGATOR</span>
          </div>
        </div>
      </div>

      {/* SUB-TABS NAVIGATION */}
      <div className="border-b border-white/10 flex flex-wrap gap-1 bg-[#050505]/40 p-1">
        {[
          { id: 'dashboard', label: 'Admin Dashboard', icon: Shield },
          { id: 'news', label: 'News Management', icon: Newspaper },
          { id: 'ai', label: 'AI Management', icon: Brain },
          { id: 'reports', label: 'Reports & Flagging', icon: MessageSquare },
          { id: 'users', label: 'User Management', icon: Users },
          { id: 'analytics', label: 'Site Analytics', icon: BarChart2 },
          { id: 'settings', label: 'Site Settings', icon: Settings }
        ].map((subTab) => {
          const Icon = subTab.icon;
          return (
            <button
              key={subTab.id}
              onClick={() => setActiveTab(subTab.id as any)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors select-none ${
                activeTab === subTab.id 
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
        
        {/* 1. ADMIN DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6" id="admin-sub-dashboard">
            {/* Quick Overview Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Total Articles Listed", value: "48 timeline entries", detail: "4 drafted/pending", icon: Newspaper },
                { title: "Moderator Reports", value: "3 unresolved cases", detail: "2 DMCA notifications", icon: AlertCircle },
                { title: "Active Contributors", value: "128 registered users", detail: "4 active in past hour", icon: Users },
                { title: "Network Status", value: "SECURE OPERATIONS", detail: "All nodes reporting normal", icon: Shield }
              ].map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div key={idx} className="bg-black border border-white/10 p-5 space-y-2 relative overflow-hidden text-left">
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">{card.title}</span>
                    <h3 className="text-white text-lg font-display font-black uppercase tracking-tight">{card.value}</h3>
                    <p className="text-[10px] text-zinc-400 font-mono">{card.detail}</p>
                  </div>
                );
              })}
            </div>

            {/* Quick Action Hub & System Warning */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
              
              <div className="lg:col-span-8 bg-black/50 border border-white/10 p-5 space-y-4">
                <h3 className="text-sm font-mono font-black text-white uppercase tracking-wider border-b border-white/5 pb-2">
                  System Security Directive
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                  The admin console operates entirely serverless (UI mock interfaces) to prevent credential leakages. All modifications represent local browser configurations. Remember to sync with the RAGE deployment certificates before declaring core platform updates.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('news')}
                    className="p-4 bg-[#050505] border border-white/5 hover:border-pink-500/30 text-left transition-all"
                  >
                    <span className="font-mono text-xs font-black text-pink-500 block uppercase mb-1">News Matrix</span>
                    <p className="text-[10px] text-zinc-400 font-sans">Submit new coordinates, leak validations, and official updates.</p>
                  </button>
                  <button
                    onClick={() => setActiveTab('ai')}
                    className="p-4 bg-[#050505] border border-white/5 hover:border-pink-500/30 text-left transition-all"
                  >
                    <span className="font-mono text-xs font-black text-pink-500 block uppercase mb-1">AI Ingest Controls</span>
                    <p className="text-[10px] text-zinc-400 font-sans">Recalibrate OCR pixel matrices, confidence sliders, and retraining weights.</p>
                  </button>
                </div>
              </div>

              {/* Maintenance Card */}
              <div className="lg:col-span-4 bg-[#09090b] border border-white/10 p-5 space-y-4">
                <h3 className="font-display font-black text-xs uppercase tracking-widest text-white border-b border-white/5 pb-2">
                  Terminal Settings
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-400 uppercase">Emergency Maintenance</span>
                    <button
                      onClick={() => setMaintenanceMode(!maintenanceMode)}
                      className={`px-3 py-1 border text-[10px] font-black uppercase tracking-wider ${
                        maintenanceMode ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse' : 'bg-zinc-900 border-white/10 text-zinc-500 hover:text-white'
                      }`}
                    >
                      {maintenanceMode ? 'Active' : 'Offline'}
                    </button>
                  </div>

                  <div className="flex justify-between items-center text-xs font-mono border-t border-white/5 pt-3">
                    <span className="text-zinc-400 uppercase">Scraper Diagnostics</span>
                    <button
                      onClick={() => setTelemetryEnabled(!telemetryEnabled)}
                      className={`px-3 py-1 border text-[10px] font-black uppercase tracking-wider ${
                        telemetryEnabled ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-zinc-900 border-white/10 text-zinc-500 hover:text-white'
                      }`}
                    >
                      {telemetryEnabled ? 'Verbose' : 'Muted'}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. NEWS MANAGEMENT */}
        {activeTab === 'news' && (
          <div className="space-y-6" id="admin-sub-news">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
              
              {/* Form to Create/Edit */}
              <div className="lg:col-span-4 bg-black border border-white/10 p-5 space-y-4 self-start">
                <h3 className="text-xs font-mono font-black text-white uppercase tracking-widest border-b border-white/5 pb-3">
                  {editingId ? 'Edit Article Parameters' : 'Deploy New Article'}
                </h3>

                <form onSubmit={handleAddArticle} className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-zinc-500 font-bold font-mono uppercase tracking-wider">Article Title</label>
                    <input 
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Trailer 2 Staging Subdomain Found"
                      className="w-full bg-black border border-white/10 p-2 text-white placeholder-zinc-700 focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-500 font-bold font-mono uppercase tracking-wider">Intelligence Category</label>
                    <select
                      value={newCategory}
                      onChange={(e: any) => setNewCategory(e.target.value)}
                      className="w-full bg-black border border-white/10 p-2 text-zinc-400 focus:outline-none"
                    >
                      <option value="official">Official Announcement</option>
                      <option value="speculation">Community Speculation</option>
                      <option value="leak">Confidential Leak</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-zinc-500 font-bold font-mono uppercase tracking-wider">Manual Trust Score</label>
                      <span className="text-pink-500 font-mono font-black">{newScore}%</span>
                    </div>
                    <input 
                      type="range"
                      min="1"
                      max="100"
                      value={newScore}
                      onChange={(e) => setNewScore(Number(e.target.value))}
                      className="w-full accent-pink-500 bg-zinc-950 h-1 cursor-pointer"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-gradient-to-r from-pink-500 to-orange-400 text-black font-display font-black text-[10px] uppercase tracking-widest hover:brightness-110 transition-all select-none"
                    >
                      {editingId ? 'Update Node' : 'Stage Draft'}
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          setNewTitle('');
                          setNewScore(75);
                        }}
                        className="px-3 py-2 border border-white/10 text-zinc-400 font-mono text-[10px] uppercase hover:text-white"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Interactive List Deck */}
              <div className="lg:col-span-8 bg-black border border-white/10 p-5 space-y-4">
                <h3 className="text-xs font-mono font-black text-white uppercase tracking-widest border-b border-white/5 pb-3">
                  Interactive Node Directory ({articles.length})
                </h3>

                <div className="space-y-2.5">
                  {articles.map((art) => (
                    <div key={art.id} className="p-4 bg-[#050505] border border-white/5 hover:border-pink-500/20 transition-all flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-1.5 py-0.5 text-[8px] font-mono font-black uppercase ${
                            art.category === 'official' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' :
                            art.category === 'leak' ? 'text-blue-400 border-blue-500/20 bg-blue-500/5' : 'text-orange-400 border-orange-500/20'
                          }`}>
                            {art.category}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-500">{art.date}</span>
                        </div>
                        <h4 className="text-white text-sm font-sans font-semibold">{art.title}</h4>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          onClick={() => handleToggleStatus(art.id)}
                          className={`px-2 py-1 text-[9px] font-mono border uppercase tracking-wider font-bold transition-all ${
                            art.status === 'Published' ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' : 'border-zinc-800 text-zinc-500 bg-zinc-950'
                          }`}
                        >
                          {art.status}
                        </button>

                        <button 
                          onClick={() => handleEditClick(art)}
                          className="p-1.5 border border-white/5 hover:border-pink-500/40 text-zinc-400 hover:text-pink-500"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteArticle(art.id)}
                          className="p-1.5 border border-white/5 hover:border-red-500/40 text-zinc-400 hover:text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 3. AI MANAGEMENT */}
        {activeTab === 'ai' && (
          <div className="space-y-6" id="admin-sub-ai">
            <div className="bg-black border border-white/10 p-6 space-y-6 text-left">
              <div>
                <h3 className="text-sm font-mono font-black text-white uppercase tracking-wider border-b border-white/5 pb-2">
                  AI Parameter Calibration
                </h3>
                <p className="text-zinc-400 text-xs mt-1">Calibrate neural filter weights and threshold triggers for autonomous pipelines.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-xs font-mono">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 uppercase">Crawler Scrape Frequency</span>
                      <span className="text-white font-bold">Every 5 minutes</span>
                    </div>
                    <input type="range" min="1" max="60" defaultValue="5" className="w-full accent-pink-500 bg-zinc-950 h-1 cursor-pointer" />
                  </div>

                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 uppercase">EXIF Pixel Forensics Severity</span>
                      <span className="text-white font-bold">Level 4 Strict</span>
                    </div>
                    <input type="range" min="1" max="10" defaultValue="4" className="w-full accent-pink-500 bg-zinc-950 h-1 cursor-pointer" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 uppercase">NLP Semantic Coherence Gate</span>
                      <span className="text-white font-bold">82% Match Minimum</span>
                    </div>
                    <input type="range" min="50" max="99" defaultValue="82" className="w-full accent-pink-500 bg-zinc-950 h-1 cursor-pointer" />
                  </div>

                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 uppercase">Author Reputation Demotion Bias</span>
                      <span className="text-white font-bold">2.4x Multiplier</span>
                    </div>
                    <input type="range" min="1" max="5" step="0.1" defaultValue="2.4" className="w-full accent-pink-500 bg-zinc-950 h-1 cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 flex justify-between items-center">
                <span className="text-[10px] text-zinc-500 font-mono">Calibration parameters affect background OCR mapping and LLM verification pipelines.</span>
                <button className="px-4 py-2 bg-pink-500 text-black font-display font-black text-[10px] uppercase tracking-wider hover:brightness-110 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. REPORTS */}
        {activeTab === 'reports' && (
          <div className="space-y-6" id="admin-sub-reports">
            <div className="bg-black border border-white/10 p-5 text-left space-y-4">
              <h3 className="text-xs font-mono font-black text-white uppercase tracking-widest border-b border-white/5 pb-2">
                Inbound Community Reports & Moderation Flags
              </h3>

              <div className="space-y-3">
                {reports.map((rep) => (
                  <div key={rep.id} className="p-4 bg-[#050505] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`px-1.5 py-0.5 text-[8px] font-mono font-black uppercase ${
                          rep.type === 'Copyright' ? 'text-red-400 border-red-500/20 bg-red-500/5' :
                          rep.type === 'Inaccuracy' ? 'text-amber-400 border-amber-500/20' : 'text-zinc-400'
                        }`}>
                          {rep.type}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono">Source: {rep.source} • Ref: {rep.id}</span>
                      </div>
                      <p className="text-zinc-300 text-xs font-sans">{rep.content}</p>
                    </div>

                    <div className="shrink-0">
                      {rep.status === 'Pending' ? (
                        <button
                          onClick={() => handleResolveReport(rep.id)}
                          className="px-3 py-1.5 bg-zinc-900 border border-white/10 hover:border-pink-500 text-white hover:text-pink-400 font-mono text-[9px] uppercase tracking-wider transition-colors"
                        >
                          Resolve Issue
                        </button>
                      ) : (
                        <span className="px-3 py-1.5 text-[9px] font-mono text-emerald-400 uppercase font-bold border border-emerald-500/10 bg-emerald-500/5">
                          ✓ Resolved
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. USER MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="space-y-6" id="admin-sub-users">
            <div className="bg-black border border-white/10 p-5 text-left space-y-4">
              <h3 className="text-xs font-mono font-black text-white uppercase tracking-widest border-b border-white/5 pb-2">
                Fact-Check Roster & Credentials
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs text-zinc-400">
                  <thead>
                    <tr className="bg-zinc-950 text-zinc-500 border-b border-white/10 text-[9px] uppercase font-black">
                      <th className="p-4">Username</th>
                      <th className="p-4">Credential Role</th>
                      <th className="p-4">Reputation Points</th>
                      <th className="p-4">Joined Hub</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-white/[0.01] transition-colors">
                        <td className="p-4 text-white font-bold">{u.username}</td>
                        <td className="p-4 text-pink-500 uppercase font-black">{u.role}</td>
                        <td className="p-4 font-black">{u.points} pts</td>
                        <td className="p-4 text-zinc-500">{u.joined}</td>
                        <td className="p-4 text-right">
                          <select
                            value={u.role}
                            onChange={(e) => handleRoleChange(u.id, e.target.value as any)}
                            className="bg-black border border-white/10 px-2.5 py-1 text-[9px] focus:outline-none uppercase text-zinc-400"
                          >
                            <option value="Lead Investigator">Lead</option>
                            <option value="Senior Analyst">Analyst</option>
                            <option value="Theorist">Theorist</option>
                            <option value="Suspended">Suspend</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 6. SITE ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6" id="admin-sub-analytics">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left font-mono text-xs">
              {[
                { title: "Session Durations", value: "8m 42s", desc: "User interest index stable" },
                { title: "Global Bounce Rate", value: "24.1%", desc: "Highly optimized UI delivery" },
                { title: "Peak Concurrents", value: "4,192 CCU", desc: "Monitored during state changes" }
              ].map((item, idx) => (
                <div key={idx} className="bg-black border border-white/10 p-5 space-y-2">
                  <span className="text-[10px] text-zinc-500 uppercase font-black block">{item.title}</span>
                  <h3 className="text-white text-lg font-bold">{item.value}</h3>
                  <p className="text-[10px] text-zinc-400">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#050505] border border-white/10 p-5 text-left space-y-2">
              <h3 className="text-xs font-mono font-black text-white uppercase tracking-widest border-b border-white/5 pb-2">
                Regional Visitor Channels (Simulated)
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                Primary incoming traffic spikes are logged dynamically around North America, United Kingdom, Brazil, and Central Europe. Scaled serverless load balancing buffers regional request queues during Rockstar announcement spikes.
              </p>
            </div>
          </div>
        )}

        {/* 7. SITE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6" id="admin-sub-settings">
            <div className="bg-black border border-white/10 p-6 space-y-6 text-left">
              <div>
                <h3 className="text-sm font-mono font-black text-white uppercase tracking-wider border-b border-white/5 pb-2">
                  Systemic Configurations
                </h3>
                <p className="text-zinc-400 text-xs mt-1">Configure systemic variables and telemetry tracking modules.</p>
              </div>

              <div className="space-y-4 pt-1 text-xs font-mono">
                
                <div className="flex items-center justify-between p-3.5 bg-zinc-950/80 border border-white/5">
                  <div className="space-y-0.5">
                    <span className="text-white uppercase font-black text-[11px]">Developer API Verification Pipeline</span>
                    <p className="text-[10px] text-zinc-500 font-sans">Allows registered factcheckers to directly hit Take-Two SEC registries.</p>
                  </div>
                  <button 
                    onClick={() => setAlertSounds(!alertSounds)}
                    className={`px-3 py-1 border text-[10px] font-black uppercase tracking-wider ${
                      alertSounds ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-zinc-900 border-white/10 text-zinc-500 hover:text-white'
                    }`}
                  >
                    {alertSounds ? 'Active' : 'Disabled'}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-zinc-950/80 border border-white/5">
                  <div className="space-y-0.5">
                    <span className="text-white uppercase font-black text-[11px]">Telemetry Tracking Logs</span>
                    <p className="text-[10px] text-zinc-500 font-sans">Saves aggregate visitor counts to browser local storage buffers.</p>
                  </div>
                  <button 
                    onClick={() => setTelemetryEnabled(!telemetryEnabled)}
                    className={`px-3 py-1 border text-[10px] font-black uppercase tracking-wider ${
                      telemetryEnabled ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-zinc-900 border-white/10 text-zinc-500 hover:text-white'
                    }`}
                  >
                    {telemetryEnabled ? 'Active' : 'Muted'}
                  </button>
                </div>

              </div>

              <div className="border-t border-white/5 pt-4 flex justify-end">
                <button className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-orange-400 text-black font-display font-black text-[10px] uppercase tracking-widest hover:brightness-110 transition-all select-none">
                  Commit System Variables
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
