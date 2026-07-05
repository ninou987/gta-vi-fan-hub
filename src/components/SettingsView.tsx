import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sliders, Globe, Shield, Eye, Bell, Sparkles, Check, CheckSquare } from 'lucide-react';

interface SettingsViewProps {
  setView: (view: any) => void;
}

export default function SettingsView({ setView }: SettingsViewProps) {
  // Theme State
  const [activeTheme, setActiveTheme] = useState<string>(() => localStorage.getItem('gta_hub_theme') || 'neon');
  // Language State
  const [activeLang, setActiveLang] = useState<string>(() => localStorage.getItem('gta_hub_lang') || 'en');
  
  // Accessibility States
  const [textScaling, setTextScaling] = useState<number>(() => Number(localStorage.getItem('gta_text_scale')) || 100);
  const [dyslexicFont, setDyslexicFont] = useState<boolean>(() => localStorage.getItem('gta_dyslexic') === 'true');
  const [highContrast, setHighContrast] = useState<boolean>(() => localStorage.getItem('gta_high_contrast') === 'true');
  const [reduceMotion, setReduceMotion] = useState<boolean>(() => localStorage.getItem('gta_reduce_motion') === 'true');

  // Notification States
  const [notifOfficial, setNotifOfficial] = useState<boolean>(() => localStorage.getItem('gta_notif_official') !== 'false');
  const [notifSpeculation, setNotifSpeculation] = useState<boolean>(() => localStorage.getItem('gta_notif_speculation') !== 'false');
  const [notifSound, setNotifSound] = useState<boolean>(() => localStorage.getItem('gta_notif_sound') !== 'false');

  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Apply visual configurations to document body/root where applicable
  const handleSave = () => {
    localStorage.setItem('gta_hub_theme', activeTheme);
    localStorage.setItem('gta_hub_lang', activeLang);
    localStorage.setItem('gta_text_scale', textScaling.toString());
    localStorage.setItem('gta_dyslexic', dyslexicFont.toString());
    localStorage.setItem('gta_high_contrast', highContrast.toString());
    localStorage.setItem('gta_reduce_motion', reduceMotion.toString());
    localStorage.setItem('gta_notif_official', notifOfficial.toString());
    localStorage.setItem('gta_notif_speculation', notifSpeculation.toString());
    localStorage.setItem('gta_notif_sound', notifSound.toString());

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);

    // Apply simple visual changes
    if (highContrast) {
      document.documentElement.classList.add('contrast-high');
    } else {
      document.documentElement.classList.remove('contrast-high');
    }
  };

  const themesList = [
    { id: 'neon', name: 'Vice Beach Neon', accent: 'bg-pink-500', desc: 'Hot pink and neon sunset orange highlights' },
    { id: 'slate', name: 'Downtown Slate', accent: 'bg-zinc-400', desc: 'Monochromatic gray and crisp white steel' },
    { id: 'club', name: 'Coral Club', accent: 'bg-cyan-400', desc: 'Deep ocean teal and warm flamingo pink accents' },
    { id: 'swamp', name: 'Leonida Grassrivers', accent: 'bg-amber-500', desc: 'Everglades green and golden sunset amber' },
  ];

  const languages = [
    { id: 'en', name: 'English (US)', region: 'Global Operations' },
    { id: 'es', name: 'Español', region: 'América Latina & Iberia' },
    { id: 'de', name: 'Deutsch', region: 'Mitteleuropa' },
    { id: 'fr', name: 'Français', region: 'Europe Occidentale' }
  ];

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto" id="settings-view-root">
      
      {/* Title Header */}
      <div>
        <span className="text-pink-500 font-mono text-[10px] tracking-widest uppercase font-black block mb-1">HUB CONFIGURATION</span>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tighter uppercase leading-none">Settings & Calibration</h1>
        <p className="text-zinc-400 text-sm mt-2 max-w-2xl font-sans text-left">
          Calibrate visual shaders, language packs, acoustic alerts, and accessibility indices for the GTA VI Hub terminal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Side: Category Blocks (8 Cols) */}
        <div className="md:col-span-8 space-y-6">
          
          {/* Section 1: Themes */}
          <div className="bg-black border border-white/10 p-5 md:p-6 space-y-4 rounded-none text-left" id="settings-theme-block">
            <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
              <Sparkles className="h-5 w-5 text-pink-500" />
              <h2 className="text-xs font-mono font-black text-white uppercase tracking-widest">Theme Accent Profile</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {themesList.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setActiveTheme(theme.id)}
                  className={`border p-4 text-left rounded-none hover:border-pink-500/50 transition-colors flex items-start gap-3 relative ${
                    activeTheme === theme.id 
                      ? 'border-pink-500 bg-pink-500/[0.02]' 
                      : 'border-white/10 bg-[#050505]'
                  }`}
                >
                  <div className={`h-4 w-4 rounded-none shrink-0 mt-0.5 ${theme.accent}`} />
                  <div className="space-y-0.5">
                    <h3 className="font-display font-black text-xs text-white uppercase tracking-tight">{theme.name}</h3>
                    <p className="text-[10px] text-zinc-500 font-sans leading-tight">{theme.desc}</p>
                  </div>
                  {activeTheme === theme.id && (
                    <div className="absolute top-2 right-2 bg-pink-500 text-black p-0.5 rounded-none">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Languages */}
          <div className="bg-black border border-white/10 p-5 md:p-6 space-y-4 rounded-none text-left" id="settings-language-block">
            <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
              <Globe className="h-5 w-5 text-pink-500" />
              <h2 className="text-xs font-mono font-black text-white uppercase tracking-widest">Localization Deck</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setActiveLang(lang.id)}
                  className={`border p-3 text-center transition-colors relative ${
                    activeLang === lang.id
                      ? 'border-pink-500 bg-pink-500/5 text-pink-500'
                      : 'border-white/10 bg-[#050505] text-zinc-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span className="font-display font-black text-xs block">{lang.name}</span>
                  <span className="text-[8px] font-mono block text-zinc-500 uppercase mt-0.5">{lang.region}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Accessibility */}
          <div className="bg-black border border-white/10 p-5 md:p-6 space-y-5 rounded-none text-left" id="settings-accessibility-block">
            <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
              <Eye className="h-5 w-5 text-pink-500" />
              <h2 className="text-xs font-mono font-black text-white uppercase tracking-widest">Accessibility Overlays</h2>
            </div>

            {/* Slider text size */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-zinc-400 font-bold uppercase">Text Scaling Index</span>
                <span className="text-pink-500 font-black">{textScaling}%</span>
              </div>
              <input 
                type="range"
                min="90"
                max="130"
                step="5"
                value={textScaling}
                onChange={(e) => setTextScaling(Number(e.target.value))}
                className="w-full accent-pink-600 bg-zinc-950 h-1 cursor-pointer"
              />
              <span className="text-[9px] font-sans text-zinc-500 block leading-tight">
                Controls the typography scaling of all core dossier descriptions.
              </span>
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
              
              <button
                onClick={() => setDyslexicFont(!dyslexicFont)}
                className={`flex items-center gap-2.5 p-3 border transition-all text-left ${
                  dyslexicFont ? 'border-pink-500 text-white bg-pink-500/[0.01]' : 'border-white/10 text-zinc-400 bg-zinc-950'
                }`}
              >
                <div className={`h-4 w-4 border flex items-center justify-center shrink-0 ${dyslexicFont ? 'border-pink-500 bg-pink-600 text-black' : 'border-white/20 bg-black'}`}>
                  {dyslexicFont && <Check className="h-3 w-3 text-black font-black" />}
                </div>
                <div className="font-mono text-[10px] uppercase">Dyslexia Font</div>
              </button>

              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`flex items-center gap-2.5 p-3 border transition-all text-left ${
                  highContrast ? 'border-pink-500 text-white bg-pink-500/[0.01]' : 'border-white/10 text-zinc-400 bg-zinc-950'
                }`}
              >
                <div className={`h-4 w-4 border flex items-center justify-center shrink-0 ${highContrast ? 'border-pink-500 bg-pink-600 text-black' : 'border-white/20 bg-black'}`}>
                  {highContrast && <Check className="h-3 w-3 text-black font-black" />}
                </div>
                <div className="font-mono text-[10px] uppercase">High Contrast</div>
              </button>

              <button
                onClick={() => setReduceMotion(!reduceMotion)}
                className={`flex items-center gap-2.5 p-3 border transition-all text-left ${
                  reduceMotion ? 'border-pink-500 text-white bg-pink-500/[0.01]' : 'border-white/10 text-zinc-400 bg-zinc-950'
                }`}
              >
                <div className={`h-4 w-4 border flex items-center justify-center shrink-0 ${reduceMotion ? 'border-pink-500 bg-pink-600 text-black' : 'border-white/20 bg-black'}`}>
                  {reduceMotion && <Check className="h-3 w-3 text-black font-black" />}
                </div>
                <div className="font-mono text-[10px] uppercase">Reduce Motion</div>
              </button>

            </div>
          </div>

          {/* Section 4: Notifications (UI Only) */}
          <div className="bg-black border border-white/10 p-5 md:p-6 space-y-4 rounded-none text-left" id="settings-notifications-block">
            <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
              <Bell className="h-5 w-5 text-pink-500" />
              <h2 className="text-xs font-mono font-black text-white uppercase tracking-widest">Notification Prefs</h2>
            </div>

            <div className="space-y-3 pt-1">
              {[
                { state: notifOfficial, setState: setNotifOfficial, label: 'Official Shaders & Trailers', desc: 'Receive high-alert broadcast notifications when Rockstar launches video packages.' },
                { state: notifSpeculation, setState: setNotifSpeculation, label: 'Rumor & Mapping Consensus Shifts', desc: 'Get notified when mapping indexes or speculation events change trust ratings.' },
                { state: notifSound, setState: setNotifSound, label: 'Audible Acoustic Signals', desc: 'Synthesizer sound wave triggers on toggle switches, updates, and navigation tabs.' }
              ].map((notif, idx) => (
                <div 
                  key={idx} 
                  onClick={() => notif.setState(!notif.state)}
                  className="flex items-start gap-3.5 p-3 bg-[#050505] border border-white/5 cursor-pointer hover:border-white/15 transition-all"
                >
                  <div className={`h-4 w-4 border flex items-center justify-center shrink-0 mt-0.5 ${notif.state ? 'border-pink-500 bg-pink-600 text-black' : 'border-white/20 bg-black'}`}>
                    {notif.state && <Check className="h-3 w-3 text-black font-black" />}
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10px] uppercase font-black text-white tracking-wider block">{notif.label}</span>
                    <p className="text-[10px] text-zinc-500 font-sans leading-tight">{notif.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Quick calibration / Save CTA (4 Cols) */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-[#09090b] border border-white/10 p-5 space-y-4 rounded-none text-left">
            <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
              <Shield className="h-4.5 w-4.5 text-pink-500" />
              <h2 className="text-[10px] font-mono font-black text-white uppercase tracking-widest">Calibration Status</h2>
            </div>

            <div className="space-y-3.5 text-xs font-mono">
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 uppercase text-[9px]">Dossier Target</span>
                <span className="text-white font-black">LEONIDA_VI</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 uppercase text-[9px]">Active Engine</span>
                <span className="text-pink-500 font-black">RAGE_v9_BLD</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 uppercase text-[9px]">Hardware Link</span>
                <span className="text-emerald-500 font-black">STABLE</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 uppercase text-[9px]">Verification Registry</span>
                <span className="text-cyan-400 font-black">CONNECTED</span>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 space-y-3">
              <button
                onClick={handleSave}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-orange-400 hover:brightness-110 text-black font-display font-black text-xs uppercase tracking-widest transition-all select-none rounded-none"
              >
                Apply Parameters
              </button>

              <button
                onClick={() => setView('home')}
                className="w-full py-2.5 border border-white/10 bg-black hover:bg-zinc-950 text-zinc-400 hover:text-white font-mono text-[9px] uppercase tracking-wider transition-colors"
              >
                Return to Deck
              </button>
            </div>

            {saveSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-emerald-950/20 border border-emerald-900/35 text-emerald-400 font-mono text-[10px] uppercase text-center mt-2"
              >
                Parameters committed to storage!
              </motion.div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
