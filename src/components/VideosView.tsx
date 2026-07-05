import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Volume2, Film, Shield, Award, Sparkles, Sliders } from 'lucide-react';

interface VideoFeedItem {
  id: string;
  title: string;
  source: string;
  releaseDate: string;
  duration: string;
  views: string;
  synopsis: string;
  insights: string[];
  framesCount: number;
}

const videoFeeds: VideoFeedItem[] = [
  {
    id: 'trailer-1',
    title: 'Grand Theft Auto VI - Official Trailer 1',
    source: 'Rockstar Games Official YouTube',
    releaseDate: 'Dec 5, 2023',
    duration: '1:30',
    views: '220M+ Views',
    synopsis: 'The record-shattering initial reveal of Grand Theft Auto VI. Set to Tom Petty\'s "Love Is A Long Road," the video introduces Vice City\'s atmospheric neon strip, mud-baths, everglades, and the romantic-crime duo Lucia and Jason.',
    insights: ['Official intro of Lucia and Jason Bonnie & Clyde themes', 'Highlights incredible ray-traced reflections on car bodies', 'Showcases real-time volumetric crowd counts on beaches'],
    framesCount: 12
  },
  {
    id: 'speculative-gameplay',
    title: 'Leonida Engine Technical Showcase (Speculative)',
    source: 'RAGE 9 Community Estimates',
    releaseDate: 'Mar 14, 2024',
    duration: '2:15',
    views: '1.2M+ Community Views',
    synopsis: 'A synthesized community presentation compiling pre-alpha physics engine behaviors, detailing real-time vehicle deformation limits, vehicle paint wear, and wind draft mechanics.',
    insights: ['Demonstrates dynamic tyre traction on wet asphalt', 'Displays customizable spoilers altering drag coefficients', 'Speculated vehicle bumper damage meshes'],
    framesCount: 8
  },
  {
    id: 'fan-map-breakdown',
    title: 'Vice City Map & Sights Analysis',
    source: 'GTA Fan Mapping Team',
    releaseDate: 'Jun 22, 2024',
    duration: '3:45',
    views: '850K+ Views',
    synopsis: 'Comprehensive breakdown correlating coordinate stamps from leaked footage to outline the scale of state Leonida relative to Los Santos and Liberty City.',
    insights: ['Estates Leonida to be roughly 2.3 times larger than San Andreas', 'Identifies key sub-regions (Keys, Port Gellhorn, Lake Leonida)', 'Speculates mountain terrain in northern borderlines'],
    framesCount: 6
  }
];

interface VideosViewProps {
  setView: (view: any) => void;
}

export default function VideosView({ setView }: VideosViewProps) {
  const [selectedVideoId, setSelectedVideoId] = useState<string>('trailer-1');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [soundVolume, setSoundVolume] = useState<number>(80);

  const selectedVideo = videoFeeds.find(v => v.id === selectedVideoId) || videoFeeds[0];

  // Reset video player when changing videos
  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
  }, [selectedVideoId]);

  // Simulate video playback ticking
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + (1 * playbackSpeed);
        });
      }, 250);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Sound beep click
    try {
      const audioCtx = typeof window !== 'undefined' ? (window.AudioContext || (window as any).webkitAudioContext) : null;
      if (audioCtx) {
        const ctx = new audioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(isPlaying ? 600 : 900, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }
    } catch(e){}
  };

  return (
    <div className="space-y-8 pb-12" id="videos-view-root">
      
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-pink-500 font-mono text-[10px] tracking-widest uppercase font-black block mb-1">CINEMATIC VIDEO ARCHIVE</span>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tighter uppercase leading-none">Media & Video Feed</h1>
          <p className="text-zinc-400 text-sm mt-2 max-w-2xl font-sans">
            Play the official media broadcasts, speculative technical showcase analyses, and fan community mapping projects in our simulated terminal receiver.
          </p>
        </div>

        {/* Granular scrubber promo */}
        <button
          onClick={() => setView('breakdown')}
          className="bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-700 hover:to-orange-600 text-black font-display font-black text-xs uppercase tracking-wider py-3 px-5 inline-flex items-center gap-2 transition-all select-none self-start md:self-auto rounded-none shadow-[0_0_15px_rgba(236,72,153,0.2)]"
        >
          <Film className="h-4 w-4" />
          Launch Frame Scrubber Scanners
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Playback Viewport Console (7 columns) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="bg-black border border-white/10 p-4 rounded-none space-y-4 relative overflow-hidden">
            
            {/* Ambient telemetry line */}
            <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 tracking-wider">
              <span>SIMULATED_FEED_ID: {selectedVideo.id.toUpperCase()}</span>
              <span className="text-pink-500 font-bold uppercase animate-pulse">
                {isPlaying ? '● STREAMING ACTIVE' : '■ FEED PAUSED'}
              </span>
            </div>

            {/* Custom simulated video frame screen container */}
            <div className="aspect-video w-full bg-[#09090b] border border-white/10 relative overflow-hidden flex flex-col justify-between p-4 group">
              
              {/* Scanline overlay effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_3px,3px_100%] pointer-events-none z-10" />

              {/* Dynamic waveform simulation on screen */}
              {isPlaying && (
                <div className="absolute inset-0 bg-pink-500/5 pointer-events-none flex items-center justify-center opacity-40">
                  <div className="flex items-end space-x-1 h-20">
                    {[1, 2, 3, 4, 3, 2, 5, 4, 3, 6, 2, 4, 1, 3, 5, 2, 3].map((val, idx) => (
                      <motion.div
                        key={idx}
                        animate={{ height: [val * 6, val * 16, val * 6] }}
                        transition={{ repeat: Infinity, duration: 1.2, delay: idx * 0.08 }}
                        className="w-1 bg-pink-500 rounded-none"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Video Title Indicator overlay */}
              <div className="z-10 flex justify-between items-start">
                <span className="font-mono text-[9px] bg-black/80 text-zinc-400 px-2 py-1 border border-white/10">
                  RES: 1080P_DECRYPTED
                </span>
                <span className="font-mono text-[9px] bg-pink-600 text-black font-black px-2 py-1 uppercase">
                  {selectedVideo.views}
                </span>
              </div>

              {/* Center Play Button Overlay if paused */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <AnimatePresence>
                  {!isPlaying && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="h-16 w-16 bg-pink-600/90 text-black rounded-none flex items-center justify-center shadow-lg border border-pink-500 pointer-events-auto cursor-pointer"
                      onClick={togglePlay}
                    >
                      <Play className="h-8 w-8 fill-black translate-x-0.5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom dynamic overlay details */}
              <div className="z-10 bg-black/80 border border-white/10 p-3 flex justify-between items-center text-xs font-mono text-zinc-400">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-pink-500" />
                  <span>{selectedVideo.source}</span>
                </div>
                <span>{Math.floor((progress / 100) * parseInt(selectedVideo.duration.split(':')[0] || '1'))}:
                {String(Math.floor((progress / 100) * 60) % 60).padStart(2, '0')} / {selectedVideo.duration}</span>
              </div>

            </div>

            {/* Custom Interactive Deck Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-white/10 pt-4">
              
              {/* Play / Speed options */}
              <div className="flex items-center space-x-2 justify-center sm:justify-start">
                <button
                  onClick={togglePlay}
                  className="p-3 bg-pink-600 text-black font-black hover:bg-pink-700 transition-colors rounded-none"
                  title={isPlaying ? 'Pause Feed' : 'Start Feed'}
                >
                  {isPlaying ? <Pause className="h-4 w-4 fill-black" /> : <Play className="h-4 w-4 fill-black" />}
                </button>

                <button
                  onClick={() => setProgress(0)}
                  className="p-3 bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors rounded-none"
                  title="Restart Track"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>

                <div className="h-8 w-[1px] bg-white/10" />

                {/* Speed Controls */}
                <div className="flex items-center space-x-1">
                  {([1, 1.5, 2] as const).map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setPlaybackSpeed(speed)}
                      className={`px-2.5 py-1 text-[9px] font-mono border ${
                        playbackSpeed === speed 
                          ? 'bg-white/10 border-pink-500 text-pink-500' 
                          : 'bg-transparent border-white/5 text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider timeline scrubber */}
              <div className="flex-1 flex items-center space-x-2 px-2">
                <Sliders className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                <div className="h-2 flex-1 bg-zinc-950 rounded-none overflow-hidden relative border border-white/10">
                  <div 
                    style={{ width: `${progress}%` }}
                    className="h-full bg-pink-600"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={(e) => setProgress(Number(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full"
                  />
                </div>
                <span className="text-[10px] font-mono text-zinc-500">{progress}%</span>
              </div>

              {/* Volume mock slider */}
              <div className="flex items-center space-x-1.5 justify-center">
                <Volume2 className="h-3.5 w-3.5 text-zinc-500" />
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={soundVolume}
                  onChange={(e) => setSoundVolume(Number(e.target.value))}
                  className="w-16 accent-pink-600 bg-zinc-950 h-1 cursor-pointer"
                />
              </div>

            </div>

          </div>

          {/* Synopsis information */}
          <div className="bg-black border border-white/10 p-5 space-y-3">
            <h3 className="text-sm font-mono text-zinc-400 uppercase tracking-widest border-b border-white/5 pb-2">Feed Description</h3>
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans">{selectedVideo.synopsis}</p>
          </div>

        </div>

        {/* Video Select Checklist Side Deck (5 columns) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-black border border-white/10 p-4 rounded-none">
            <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black border-b border-white/10 pb-2">
              Select Stream Track ({videoFeeds.length})
            </h3>
            
            <div className="space-y-2 mt-3">
              {videoFeeds.map((feed) => {
                const isSelected = selectedVideoId === feed.id;
                return (
                  <button
                    key={feed.id}
                    onClick={() => setSelectedVideoId(feed.id)}
                    className={`w-full text-left p-3.5 rounded-none border transition-colors flex items-center justify-between ${
                      isSelected 
                        ? 'bg-pink-500/5 border-pink-500 text-pink-500' 
                        : 'bg-[#09090b] border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="space-y-1 pr-4">
                      <h4 className="font-display font-black text-sm uppercase tracking-tight">{feed.title}</h4>
                      <div className="flex gap-3 text-[10px] font-mono text-zinc-500">
                        <span>Duration: {feed.duration}</span>
                        <span>{feed.views}</span>
                      </div>
                    </div>
                    <Play className={`h-4 w-4 shrink-0 ${isSelected ? 'text-pink-500 fill-pink-500/20' : 'text-zinc-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Insights bullets card */}
          <div className="bg-black border border-white/10 p-5 space-y-4 rounded-none">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-black">
              <Sparkles className="h-4 w-4 text-pink-500 animate-pulse" />
              <span>Community Analytical Insights</span>
            </div>
            
            <div className="space-y-3">
              {selectedVideo.insights.map((insight, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-xs text-zinc-300">
                  <span className="h-1.5 w-1.5 bg-pink-500 shrink-0 mt-2" />
                  <p className="leading-relaxed font-sans">{insight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Frame count disclaimer callout to scrubber */}
          <div className="bg-gradient-to-r from-zinc-950 to-black border border-white/10 p-4 rounded-none flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-1.5 text-[9px] text-pink-500 font-mono tracking-widest font-black uppercase">
                <Award className="h-3.5 w-3.5" />
                <span>Verified Scrubber Active</span>
              </div>
              <p className="text-[10px] text-zinc-500 font-sans">
                This stream track correlates with {selectedVideo.framesCount} interactive high-definition frames in our cinematic scrubber.
              </p>
            </div>
            
            <button
              onClick={() => setView('breakdown')}
              className="px-3 py-1.5 bg-white/5 border border-white/10 text-white font-mono text-[9px] uppercase hover:bg-pink-600 hover:text-black hover:border-pink-500 transition-colors shrink-0"
            >
              Analyze
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
