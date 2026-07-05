import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image, Maximize2, X, Download, Tag, ZoomIn, Eye } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'locations' | 'action' | 'vehicles' | 'protagonists';
  imageUrl: string;
  description: string;
  spottedElement: string;
  specs: string[];
}

const galleryItems: GalleryItem[] = [
  {
    id: 'vice-beach-sunset',
    title: 'Vice Beach Sunset Promenade',
    category: 'locations',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    description: 'Beautiful cinematic ocean horizon reflecting off Vice Beach, showcasing dense dynamic pedestrian AI, sand-physics tracks, and dynamic volumetric clouds.',
    spottedElement: 'Spotted: Speculated Ocean Drive strip with highly interactive hotel lobbies.',
    specs: ['Ray-traced reflections', 'Volumetric ocean foam', 'Pedestrian count: 120+']
  },
  {
    id: 'neon-skylines',
    title: 'Downtown Neon & Canal Waterways',
    category: 'locations',
    imageUrl: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&q=80&w=800',
    description: 'Helicopter view of the neon-lit Downtown skyline, showcasing water refraction ripples, real-time light emission on yachts, and simulated traffic patterns.',
    spottedElement: 'Spotted: Customizable watercraft racing along deep water channels.',
    specs: ['Global illumination', 'Dynamic water foam', 'Draw distance: Ultra']
  },
  {
    id: 'getaway-car',
    title: 'Lucia & Jason Midnight Cruiser',
    category: 'protagonists',
    imageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800',
    description: 'Lucia and Jason navigating a deep metallic cherry Tulip muscle car under yellow sodium streetlamps. Dynamic interior gauge cluster glow is visible.',
    spottedElement: 'Spotted: Physical dashboard GPS displays updating in real-time.',
    specs: ['Interior model detailing', 'Dynamic neon bounce', 'Anisotropic tire tracks']
  },
  {
    id: 'airboat-everglades',
    title: 'Grassrivers Volumetric Everglades',
    category: 'locations',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800',
    description: 'An airboat speeding through deep marshy grasslands. Highly complex weed physical simulations reacting to fan propeller drafts are shown.',
    spottedElement: 'Spotted: Wildlife interactive behaviors (alligators, flamingos).',
    specs: ['Procedural flora physics', 'Propeller draft wind waves', 'Ambient fog maps']
  },
  {
    id: 'mud-club',
    title: 'Kelly County Offroad Mudfest',
    category: 'action',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    description: 'Deep mud trucks racing in circles, demonstrating highly advanced real-time dirt-build up, tyre deformation, and splashing volumetric clay.',
    spottedElement: 'Spotted: Specialized offroad lift kits and body armor accessories.',
    specs: ['Real-time clay accumulation', 'Particle collision mesh', 'Spectator physics active']
  },
  {
    id: 'supercar-keys',
    title: 'Leonida Keys Bridge Crossing',
    category: 'vehicles',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
    description: 'A custom aerodynamic sports car blasting down the sprawling overseas bridge. The sky is highly dramatic, showing a brewing oceanic thunderstorm.',
    spottedElement: 'Spotted: Dynamic spoiler wing adjustments based on current speeds.',
    specs: ['Wind-tunnel drag maps', 'Rain droplet streak shader', 'Suspension stress model']
  }
];

export default function GalleryView() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'locations' | 'action' | 'vehicles' | 'protagonists'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = galleryItems.filter(item => 
    activeFilter === 'all' ? true : item.category === activeFilter
  );

  return (
    <div className="space-y-8 pb-12" id="gallery-view-root">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-pink-500 font-mono text-[10px] tracking-widest uppercase font-black block mb-1">VISUAL INTELLIGENCE BOARD</span>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tighter uppercase leading-none">Leonida Gallery & Concepts</h1>
          <p className="text-zinc-400 text-sm mt-2 max-w-2xl font-sans">
            High-fidelity environmental frames and vehicle concept captures showcasing real-time visual techniques verified in the trailer feeds.
          </p>
        </div>

        {/* Categories Tab Deck */}
        <div className="flex flex-wrap gap-1 bg-[#09090b] border border-white/10 p-1 shrink-0">
          {(['all', 'locations', 'action', 'vehicles', 'protagonists'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest transition-colors select-none ${
                activeFilter === filter 
                  ? 'bg-pink-600 text-black font-black' 
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className="group bg-black border border-white/10 relative overflow-hidden flex flex-col hover:border-pink-500/50 transition-colors"
          >
            {/* Visual Viewport */}
            <div className="aspect-video w-full overflow-hidden relative bg-zinc-950">
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 saturate-[0.85]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
              
              {/* Hot button zoom */}
              <button 
                onClick={() => setSelectedImage(item)}
                className="absolute top-3 right-3 p-2 bg-black/80 border border-white/10 text-zinc-400 hover:text-white transition-colors"
                title="Enlarge screen"
              >
                <Maximize2 className="h-4 w-4" />
              </button>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="font-mono text-[9px] bg-pink-600 text-black font-black px-2 py-0.5 uppercase tracking-widest">
                  {item.category}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  RAGE_9_BUILD
                </span>
              </div>
            </div>

            {/* Bottom context block */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <h3 className="font-display font-black text-white text-base uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-xs font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Verified details */}
              <div className="space-y-2 pt-2 border-t border-white/5 text-[11px]">
                <div className="text-zinc-500 font-sans italic flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5 text-pink-500" />
                  <span>{item.spottedElement}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.specs.map((spec, sidx) => (
                    <span key={sidx} className="bg-[#09090b] text-zinc-400 font-mono text-[9px] px-2 py-0.5 border border-white/5 uppercase">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enlarged image modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-black border border-white/10 max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-none flex flex-col md:grid md:grid-cols-12"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Media viewport (7 columns) */}
              <div className="md:col-span-8 bg-[#050505] relative flex items-center justify-center aspect-video md:aspect-auto md:h-full min-h-[300px]">
                <img 
                  src={selectedImage.imageUrl} 
                  alt={selectedImage.title}
                  className="w-full h-full object-cover md:max-h-[80vh] saturate-[0.9]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Float indicator */}
                <div className="absolute top-4 left-4 bg-black/80 border border-white/10 px-3 py-1 font-mono text-[9px] uppercase text-pink-500 tracking-widest font-black flex items-center gap-1">
                  <ZoomIn className="h-3 w-3" />
                  HQ SCANNING MODE
                </div>
              </div>

              {/* Side intel registry panel (4 columns) */}
              <div className="md:col-span-4 p-6 md:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-pink-500 font-bold block">INTEL_CAT: {selectedImage.category}</span>
                      <h2 className="text-xl font-display font-black text-white uppercase tracking-tight mt-0.5">{selectedImage.title}</h2>
                    </div>
                    <button 
                      onClick={() => setSelectedImage(null)}
                      className="p-1.5 bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Frame Synopsis</span>
                    <p className="text-zinc-300 text-xs font-sans leading-relaxed">{selectedImage.description}</p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Aesthetic spotting</span>
                    <p className="text-zinc-300 text-xs font-sans italic">{selectedImage.spottedElement}</p>
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Rendering Pipeline Features</span>
                    <div className="flex flex-col gap-1.5">
                      {selectedImage.specs.map((spec, sidx) => (
                        <div key={sidx} className="flex items-center space-x-2 text-xs font-mono text-zinc-400">
                          <span className="h-1.5 w-1.5 bg-pink-500 shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <button 
                    onClick={() => {
                      // Custom interactive mock download flow
                      const link = document.createElement('a');
                      link.href = selectedImage.imageUrl;
                      link.target = '_blank';
                      link.click();
                    }}
                    className="w-full py-2.5 bg-pink-600 hover:bg-pink-700 text-black font-display font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 rounded-none"
                  >
                    <Download className="h-4 w-4" />
                    Export Concept Frame
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
