import React, { useState, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight, Edit3, Star } from 'lucide-react';
import { BIRTHDAY_CONFIG, type SpecialReason } from '../../config';
import { romanticAudio } from '../../utils/audio';
import { getMediaItem, saveMediaItem } from '../../utils/mediaStorage';

export const Slide8ReasonsILoveYou: React.FC = () => {
  const [reasons, setReasons] = useState<SpecialReason[]>(BIRTHDAY_CONFIG.slide8.reasons);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editMsg, setEditMsg] = useState("");

  useEffect(() => {
    getMediaItem('reasons_data').then((item) => {
      if (typeof item === 'string') {
        try {
          const parsed = JSON.parse(item);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setReasons(parsed);
          }
        } catch {
          // fallback
        }
      }
    });
  }, []);

  const handleNext = () => {
    romanticAudio.playSparkle();
    setCurrentIndex((prev) => (prev + 1) % reasons.length);
  };

  const handlePrev = () => {
    romanticAudio.playSparkle();
    setCurrentIndex((prev) => (prev - 1 + reasons.length) % reasons.length);
  };

  const handleSaveReason = async (id: number) => {
    const updated = reasons.map((r) => (r.id === id ? { ...r, message: editMsg } : r));
    setReasons(updated);
    setEditingId(null);
    romanticAudio.playSparkle();
    await saveMediaItem('reasons_data', JSON.stringify(updated));
  };

  const current = reasons[currentIndex];

  return (
    <div className="relative w-full h-full min-h-screen flex flex-col items-center justify-center px-4 py-16 select-none z-10 text-center">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] rounded-full bg-gradient-to-tr from-sky-500/15 via-blue-700/10 to-transparent blur-[140px] pointer-events-none" />

      {/* Scene Tag */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-200 text-xs font-semibold tracking-widest uppercase border border-sky-400/30 mb-3 animate-pulse-glow">
        <Heart className="w-3.5 h-3.5 text-sky-300 fill-sky-300" />
        <span>{BIRTHDAY_CONFIG.slide8.tag}</span>
      </div>

      {/* Title */}
      <div className="max-w-xl mx-auto space-y-1 mb-5">
        <h2 className="text-3xl sm:text-5xl font-bold font-script text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-blue-300 drop-shadow-[0_0_25px_rgba(112,161,255,0.6)]">
          {BIRTHDAY_CONFIG.slide8.title}
        </h2>
        <p className="text-xs sm:text-sm text-sky-200/70 font-handwriting text-base sm:text-lg">
          {BIRTHDAY_CONFIG.slide8.subtitle}
        </p>
      </div>

      {/* Main Single Animated Card Presentation */}
      <div className="relative max-w-md w-full">
        
        {/* Navigation Arrows for Desktop */}
        <button
          onClick={handlePrev}
          className="hidden sm:flex absolute -left-14 top-1/2 -translate-y-1/2 p-3 rounded-full glass-card border border-sky-400/30 text-sky-200 hover:text-white hover:scale-110 active:scale-95 transition-all z-30"
          title="Previous reason"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="hidden sm:flex absolute -right-14 top-1/2 -translate-y-1/2 p-3 rounded-full glass-card border border-sky-400/30 text-sky-200 hover:text-white hover:scale-110 active:scale-95 transition-all z-30"
          title="Next reason"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* The Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-sky-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden min-h-[300px] flex flex-col justify-between">
          
          {/* Top Badge: Reason #X of 6 */}
          <div className="flex items-center justify-between text-xs text-sky-300/80 mb-3">
            <span className="font-mono flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-sky-200">
              <Star className="w-3 h-3 text-sky-300 fill-sky-300" />
              Reason #{currentIndex + 1}
            </span>
            <span className="font-mono text-sky-300/70">
              {currentIndex + 1} of {reasons.length}
            </span>
          </div>

          {/* Central Heart Visual */}
          <div className="my-3 flex flex-col items-center">
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-sky-400/20 via-blue-600/20 to-purple-500/20 border border-sky-300/40 flex items-center justify-center shadow-[0_0_30px_rgba(112,161,255,0.4)] animate-heartbeat">
              <Heart className="w-12 h-12 text-sky-300 fill-sky-300/70 drop-shadow-[0_0_15px_#70a1ff]" />
              <span className="absolute -bottom-1 -right-1 text-xl select-none">
                {current.frontIcon}
              </span>
            </div>

            <h3 className="text-xl font-bold font-script text-white mt-3">
              {current.frontTitle}
            </h3>
          </div>

          {/* The Tanglish Message */}
          <div className="my-2">
            {editingId === current.id ? (
              <div className="space-y-2">
                <textarea
                  value={editMsg}
                  onChange={(e) => setEditMsg(e.target.value)}
                  className="w-full h-20 p-2 rounded-xl bg-white/10 border border-sky-300/40 text-xs sm:text-sm text-white focus:outline-none"
                />
                <div className="flex justify-end gap-2">
                  <button onClick={() => setEditingId(null)} className="px-2.5 py-1 text-xs text-slate-300">
                    Cancel
                  </button>
                  <button onClick={() => handleSaveReason(current.id)} className="px-3 py-1 bg-sky-500 text-white text-xs font-semibold rounded-lg">
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative group/msg">
                <p className="font-handwriting text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-100 via-white to-blue-200 leading-snug px-3">
                  &ldquo;{current.message}&rdquo;
                </p>
                <button
                  onClick={() => {
                    setEditingId(current.id);
                    setEditMsg(current.message);
                  }}
                  className="absolute top-0 right-0 p-1 text-sky-300/60 hover:text-sky-200 transition-colors"
                  title="Edit message"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Next Reason Button */}
          <div className="mt-4 pt-3 border-t border-sky-400/20 flex items-center justify-between">
            <button
              onClick={handlePrev}
              className="text-xs text-sky-300/70 hover:text-white font-mono flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Prev
            </button>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-semibold shadow hover:scale-105 active:scale-95 transition-all"
            >
              <span>{currentIndex === reasons.length - 1 ? "Start Over" : "Next Reason 💙"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Progress Dots */}
        <div className="mt-4 flex justify-center items-center gap-2">
          {reasons.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                romanticAudio.playSparkle();
                setCurrentIndex(idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-6 bg-sky-400 shadow-[0_0_10px_#70a1ff]' : 'w-2 bg-sky-300/30'
              }`}
            />
          ))}
        </div>

      </div>

    </div>
  );
};
