import React, { useState } from 'react';
import { Camera, Calendar, Sparkles, ZoomIn, X, Info, Upload } from 'lucide-react';
import { BIRTHDAY_CONFIG, type MemoryCard } from '../config';
import { romanticAudio } from '../utils/audio';

export const PhotoGallery: React.FC = () => {
  const [selectedMemory, setSelectedMemory] = useState<MemoryCard | null>(null);
  const [showHelperModal, setShowHelperModal] = useState(false);
  const [localOverrides, setLocalOverrides] = useState<Record<number, string>>({});

  const handleCardClick = (memory: MemoryCard) => {
    romanticAudio.playSparkle();
    setSelectedMemory(memory);
  };

  const handleCustomUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLocalOverrides(prev => ({ ...prev, [id]: url }));
      romanticAudio.playSparkle();
    }
  };

  // Helper to render heart-melting SVG illustrations if no real photo is provided yet
  const renderPlaceholder = (type: MemoryCard['placeholderType']) => {
    switch (type) {
      case 'first_meet':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#121b44] via-[#1d2d6b] to-[#0d163a] p-4 text-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            {/* Moon & Stars Silhouette */}
            <div className="absolute top-4 right-6 w-10 h-10 rounded-full bg-amber-100/30 blur-sm" />
            <svg viewBox="0 0 160 120" className="w-40 h-28 drop-shadow">
              <circle cx="80" cy="50" r="30" fill="#3a86ff" opacity="0.15" />
              {/* Bench silhouette */}
              <rect x="40" y="85" width="80" height="4" rx="2" fill="#70a1ff" />
              <rect x="50" y="89" width="4" height="15" fill="#70a1ff" />
              <rect x="106" y="89" width="4" height="15" fill="#70a1ff" />
              {/* Two cute silhouettes */}
              <circle cx="68" cy="62" r="8" fill="#ffb4d6" />
              <circle cx="92" cy="60" r="9" fill="#bae6fd" />
              <path d="M62 70 Q68 68 74 76 L62 85 Z" fill="#ffb4d6" />
              <path d="M86 70 Q92 68 98 76 L86 85 Z" fill="#bae6fd" />
              {/* Little Heart between them */}
              <text x="75" y="52" fontSize="14" fill="#ff4d6d">❤️</text>
            </svg>
            <span className="text-xs font-handwriting text-ammu-babyBlue/90 mt-1">
              Tap to view / Replace with our first photo 📸
            </span>
          </div>
        );

      case 'laughter':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#2a133d] via-[#1d1b4d] to-[#0c1236] p-4 text-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <svg viewBox="0 0 160 120" className="w-40 h-28 drop-shadow">
              {/* Cute coffee cups / chat bubbles with heart */}
              <rect x="35" y="55" width="35" height="30" rx="6" fill="#ffb4d6" opacity="0.8" />
              <path d="M70 65 Q78 65 78 72 Q78 78 70 78" stroke="#ffb4d6" strokeWidth="3" fill="none" />
              
              <rect x="90" y="55" width="35" height="30" rx="6" fill="#70a1ff" opacity="0.8" />
              <path d="M125 65 Q133 65 133 72 Q133 78 125 78" stroke="#70a1ff" strokeWidth="3" fill="none" />

              {/* Steam hearts */}
              <text x="46" y="44" fontSize="12" fill="#ffd166">✨</text>
              <text x="102" y="44" fontSize="12" fill="#ffd166">✨</text>
              <text x="73" y="42" fontSize="16" fill="#ff758f">🌝</text>
            </svg>
            <span className="text-xs font-handwriting text-ammu-blush/90 mt-1">
              Late night laughs & precious moments ☕❤️
            </span>
          </div>
        );

      case 'smile':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#162947] via-[#213a68] to-[#0e1c36] p-4 text-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <svg viewBox="0 0 160 120" className="w-40 h-28 drop-shadow">
              {/* Smiling sun/moon with floral crown */}
              <circle cx="80" cy="58" r="28" fill="#ffd166" opacity="0.9" />
              <path d="M70 54 Q75 50 80 54" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M85 54 Q90 50 95 54" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M73 66 Q82 76 91 66" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* Cheeks */}
              <circle cx="70" cy="64" r="3.5" fill="#f43f5e" opacity="0.6" />
              <circle cx="93" cy="64" r="3.5" fill="#f43f5e" opacity="0.6" />
              {/* Flowers */}
              <text x="56" y="38" fontSize="14">🌸</text>
              <text x="73" y="32" fontSize="14">💙</text>
              <text x="91" y="38" fontSize="14">🌸</text>
            </svg>
            <span className="text-xs font-handwriting text-ammu-babyBlue/90 mt-1">
              Her smile that melts everything 🥹🌸
            </span>
          </div>
        );

      case 'future':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#241744] via-[#1a2357] to-[#0f183c] p-4 text-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <svg viewBox="0 0 160 120" className="w-40 h-28 drop-shadow">
              {/* Glowing hot air balloon carrying hearts to stars */}
              <ellipse cx="80" cy="46" rx="24" ry="30" fill="#70a1ff" opacity="0.85" />
              <path d="M70 30 Q80 18 90 30" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.7" />
              <rect x="74" y="85" width="12" height="10" rx="2" fill="#ffd166" />
              <line x1="72" y1="74" x2="75" y2="85" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="88" y1="74" x2="85" y2="85" stroke="#ffffff" strokeWidth="1.5" />
              <text x="74" y="60" fontSize="12" fill="#ffffff">💙</text>
              <text x="110" y="35" fontSize="14">🚀</text>
              <text x="40" y="45" fontSize="12">✨</text>
            </svg>
            <span className="text-xs font-handwriting text-ammu-lavender/90 mt-1">
              Endless adventures waiting for us 🚀💙
            </span>
          </div>
        );
    }
  };

  return (
    <section className="py-14 md:py-24 px-4 flex flex-col items-center justify-center relative">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[700px] h-[350px] md:h-[700px] bg-ammu-sky/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center space-y-2 mb-10 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-ammu-babyBlue text-xs font-semibold uppercase tracking-widest border border-ammu-sky/30">
          <Camera className="w-3.5 h-3.5 text-ammu-sky" />
          <span>Our Cherished Memories</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-script text-transparent bg-clip-text bg-gradient-to-r from-ammu-babyBlue via-white to-ammu-blush drop-shadow">
          Our Little World 📸💙
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 font-handwriting text-lg sm:text-xl">
          Tap any card to view up-close or customize with our real photos
        </p>

        {/* Instructions helper trigger button */}
        <div className="pt-2">
          <button
            onClick={() => setShowHelperModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ammu-sky/15 hover:bg-ammu-sky/25 border border-ammu-sky/40 text-ammu-babyBlue text-xs font-medium transition-all"
          >
            <Info className="w-3.5 h-3.5" />
            <span>How to add our real photos (Simple Guide)</span>
          </button>
        </div>
      </div>

      {/* 4 Polaroid / Glassmorphism Memory Cards Grid */}
      <div className="max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
        {BIRTHDAY_CONFIG.memories.map(memory => {
          const activeImage = localOverrides[memory.id] || memory.imageUrl;

          return (
            <div
              key={memory.id}
              onClick={() => handleCardClick(memory)}
              className="group cursor-pointer rounded-2xl glass-card p-3 border border-ammu-sky/20 shadow-xl hover:border-ammu-sky/60 hover:-translate-y-2 transition-all duration-300 relative flex flex-col justify-between"
            >
              {/* Little tape sticker on top of polaroid */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-white/20 backdrop-blur-sm rounded-sm border border-white/30 rotate-2 group-hover:rotate-0 transition-transform select-none z-10" />

              {/* Photo Area */}
              <div className="relative w-full h-56 rounded-xl overflow-hidden bg-slate-900 border border-white/10 shadow-inner flex items-center justify-center">
                {activeImage ? (
                  <img
                    src={activeImage}
                    alt={memory.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  renderPlaceholder(memory.placeholderType)
                )}

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-ammu-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white">
                  <ZoomIn className="w-5 h-5 text-ammu-babyBlue animate-bounce" />
                  <span className="text-xs font-semibold">View Memory</span>
                </div>
              </div>

              {/* Text / Caption Container */}
              <div className="pt-3 pb-1 px-1 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-ammu-babyBlue/80 mb-1">
                    <span className="inline-flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3 text-ammu-sky" />
                      {memory.date}
                    </span>
                    <Sparkles className="w-3 h-3 text-ammu-gold" />
                  </div>
                  
                  <h3 className="text-base font-bold font-script text-white group-hover:text-ammu-babyBlue transition-colors">
                    {memory.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                    {memory.caption}
                  </p>
                </div>

                {/* Instant Replace button directly on card */}
                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] text-ammu-babyBlue/60 font-handwriting text-xs">
                    {activeImage ? "Custom photo loaded 💙" : "Preset placeholder"}
                  </span>
                  <label
                    onClick={e => e.stopPropagation()}
                    className="cursor-pointer inline-flex items-center gap-1 text-[11px] text-pink-300 hover:text-white px-2 py-0.5 rounded bg-pink-500/10 hover:bg-pink-500/20 border border-pink-400/30 transition-all"
                    title="Upload photo from your phone or PC right now"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Change</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => handleCustomUpload(memory.id, e)}
                    />
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal for Zooming into Photo */}
      {selectedMemory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setSelectedMemory(null)}
        >
          <div
            className="max-w-lg w-full glass-card rounded-3xl p-6 border border-ammu-sky/40 relative shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMemory(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="w-full h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-900 border border-white/10 mb-4 flex items-center justify-center">
              {localOverrides[selectedMemory.id] || selectedMemory.imageUrl ? (
                <img
                  src={localOverrides[selectedMemory.id] || selectedMemory.imageUrl}
                  alt={selectedMemory.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                renderPlaceholder(selectedMemory.placeholderType)
              )}
            </div>

            {/* Memory Details */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-ammu-babyBlue">
                <span className="font-mono flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedMemory.date}
                </span>
                <span className="font-handwriting text-sm text-ammu-blush">
                  {selectedMemory.subtitle}
                </span>
              </div>

              <h3 className="text-2xl font-bold font-script text-white">
                {selectedMemory.title}
              </h3>
              
              <p className="text-sm text-slate-200 leading-relaxed font-sans">
                {selectedMemory.caption}
              </p>
            </div>

            {/* Upload directly inside modal */}
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-300 font-handwriting text-sm">
                Want to show our real photo here?
              </span>
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-ammu-sky to-ammu-pink text-white text-xs font-semibold shadow hover:scale-105 transition-all">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Our Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => handleCustomUpload(selectedMemory.id, e)}
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Guide Modal: How to add photos permanently */}
      {showHelperModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setShowHelperModal(false)}
        >
          <div
            className="max-w-md w-full glass-card rounded-3xl p-6 border border-ammu-sky/40 relative shadow-2xl text-left"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowHelperModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-ammu-babyBlue font-script mb-3 flex items-center gap-2">
              <Camera className="w-5 h-5 text-ammu-sky" />
              <span>How to add your real photos 📸💙</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-200">
              <p>
                <strong>Method 1 (Instant):</strong> You can click the <strong>&quot;Change&quot;</strong> button on any card above to pick a photo from your phone/PC right now.
              </p>
              
              <p>
                <strong>Method 2 (Permanent in code):</strong>
              </p>
              <ol className="list-decimal list-inside space-y-1.5 bg-white/5 p-3 rounded-xl border border-white/10 font-mono text-[11px] sm:text-xs">
                <li>Copy your pictures into the folder: <code className="text-ammu-blush">public/photos/</code></li>
                <li>Name them (e.g. <code className="text-ammu-babyBlue">photo1.jpg</code>, <code className="text-ammu-babyBlue">photo2.jpg</code>)</li>
                <li>Open <code className="text-ammu-gold">src/config.ts</code></li>
                <li>Set <code className="text-pink-300">imageUrl: &apos;/photos/photo1.jpg&apos;</code> on the respective memory card!</li>
              </ol>

              <p className="text-ammu-blush font-handwriting text-base">
                Until then, the artistic dreamy illustrations ensure everything looks magical! ✨
              </p>
            </div>

            <button
              onClick={() => setShowHelperModal(false)}
              className="w-full mt-5 py-2.5 rounded-full bg-gradient-to-r from-ammu-sky to-ammu-pink text-white text-xs font-bold uppercase tracking-wider shadow"
            >
              Got it, let&apos;s continue! 💙
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
