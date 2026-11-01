import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';
import { romanticAudio } from '../utils/audio';

export const WhySpecial: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const handleCardClick = (id: number) => {
    romanticAudio.playSparkle();

    setFlippedCards(prev => {
      const updated = { ...prev, [id]: !prev[id] };

      // Check if all 6 are flipped for the first time
      const flippedCount = Object.values(updated).filter(Boolean).length;
      if (flippedCount === BIRTHDAY_CONFIG.reasons.length && !prev[id]) {
        window.setTimeout(() => {
          try {
            confetti({
              particleCount: 90,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#ff758f', '#b4d4ff', '#ffd166', '#ffb4d6'],
            });
          } catch {
            // catch
          }
        }, 300);
      }

      return updated;
    });
  };

  const flippedCount = Object.values(flippedCards).filter(Boolean).length;
  const allUnlocked = flippedCount === BIRTHDAY_CONFIG.reasons.length;

  return (
    <section className="py-14 md:py-24 px-4 flex flex-col items-center justify-center relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[650px] h-[350px] md:h-[650px] bg-pink-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center space-y-2 mb-10 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-ammu-blush text-xs font-semibold uppercase tracking-widest border border-pink-400/20">
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
          <span>Infinite Reasons To Love You</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-script text-transparent bg-clip-text bg-gradient-to-r from-ammu-babyBlue via-white to-ammu-blush drop-shadow">
          Little Things I Love About You 💙
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 font-handwriting text-lg sm:text-xl">
          Tap each heart to reveal why you mean the entire universe to me
        </p>

        {/* Progress Tracker */}
        <div className="inline-flex items-center gap-2 pt-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-ammu-babyBlue">
          {allUnlocked ? (
            <span className="flex items-center gap-1.5 text-ammu-gold font-bold">
              <CheckCircle2 className="w-4 h-4 text-ammu-gold" />
              All 6 reasons unlocked for Ammu! 🥹💖
            </span>
          ) : (
            <span>
              Unlocked: <strong className="text-ammu-blush">{flippedCount}</strong> of {BIRTHDAY_CONFIG.reasons.length} hearts 💌
            </span>
          )}
        </div>
      </div>

      {/* 6 Interactive Heart Cards Grid */}
      <div className="max-w-4xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-2">
        {BIRTHDAY_CONFIG.reasons.map((reason, index) => {
          const isFlipped = !!flippedCards[reason.id];

          return (
            <div
              key={reason.id}
              onClick={() => handleCardClick(reason.id)}
              className="h-56 perspective-1000 cursor-pointer select-none group"
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d rounded-3xl ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT OF CARD (Unflipped) */}
                <div className="absolute inset-0 backface-hidden rounded-3xl glass-card p-6 flex flex-col items-center justify-center text-center border border-ammu-sky/25 shadow-xl group-hover:border-ammu-sky/60 group-hover:shadow-[0_0_25px_rgba(112,161,255,0.3)] transition-all">
                  
                  {/* Floating Number Badge */}
                  <div className="absolute top-4 left-4 w-7 h-7 rounded-full bg-ammu-sky/15 border border-ammu-sky/30 flex items-center justify-center text-xs font-mono font-bold text-ammu-babyBlue">
                    #{index + 1}
                  </div>

                  {/* Top Sparkle */}
                  <div className="absolute top-4 right-4">
                    <Sparkles className="w-4 h-4 text-ammu-gold opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Center Heart Icon */}
                  <div className="relative my-2">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400/20 via-sky-400/20 to-purple-400/20 flex items-center justify-center border border-pink-300/30 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                      <Heart className="w-10 h-10 text-ammu-blush fill-ammu-blush/60 animate-heartbeat" />
                    </div>
                    <span className="absolute bottom-0 right-0 text-lg">
                      {reason.frontIcon}
                    </span>
                  </div>

                  {/* Title & Prompt */}
                  <h3 className="text-lg font-bold font-script text-white mt-1 group-hover:text-ammu-babyBlue transition-colors">
                    {reason.frontTitle}
                  </h3>
                  <span className="text-[11px] text-ammu-babyBlue/70 font-handwriting text-sm mt-1">
                    Tap to flip heart 💙
                  </span>
                </div>

                {/* BACK OF CARD (Flipped message) */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-gradient-to-br from-[#1c1d48] via-[#2d1a3c] to-[#121b44] p-6 flex flex-col items-center justify-center text-center border-2 border-pink-400/50 shadow-[0_0_30px_rgba(255,117,143,0.35)]">
                  
                  <Heart className="w-6 h-6 text-pink-400 fill-pink-400 mb-2 animate-bounce" />
                  
                  {/* Tanglish Message */}
                  <p className="text-base sm:text-lg font-handwriting font-bold text-transparent bg-clip-text bg-gradient-to-r from-ammu-babyBlue via-white to-pink-200 leading-snug px-1">
                    &ldquo;{reason.message}&rdquo;
                  </p>

                  <div className="mt-3 text-[10px] uppercase tracking-widest text-ammu-blush font-semibold flex items-center gap-1">
                    <span>Reason #{index + 1}</span>
                    <span>•</span>
                    <span>Tap to flip back</span>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
