import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, X } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';
import { romanticAudio } from '../utils/audio';

type GiftType = 'hug' | 'kiss' | 'wish' | null;

export const InteractiveGifts: React.FC = () => {
  const [activeGift, setActiveGift] = useState<GiftType>(null);
  const [openedGifts, setOpenedGifts] = useState<Record<string, boolean>>({});

  const handleOpenGift = (type: 'hug' | 'kiss' | 'wish') => {
    setActiveGift(type);
    setOpenedGifts(prev => ({ ...prev, [type]: true }));
    romanticAudio.playGiftPop();

    // Trigger unique animation effects per gift
    if (type === 'hug') {
      romanticAudio.playSparkle();
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#70a1ff', '#b4d4ff', '#ffffff'],
        });
      } catch {
        // catch
      }
    } else if (type === 'kiss') {
      romanticAudio.playSparkle();
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ff758f', '#ffb4d6', '#f43f5e', '#ffffff'],
        });
      } catch {
        // catch
      }
    } else if (type === 'wish') {
      romanticAudio.playSparkle();
      try {
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#ffd166', '#ffffff', '#b4d4ff'],
        });
      } catch {
        // catch
      }
    }
  };

  return (
    <section className="py-14 md:py-24 px-4 flex flex-col items-center justify-center relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[650px] h-[350px] md:h-[650px] bg-ammu-sky/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center space-y-2 mb-10 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-ammu-babyBlue text-xs font-semibold uppercase tracking-widest border border-ammu-sky/30">
          <Gift className="w-3.5 h-3.5 text-ammu-gold" />
          <span>Special Surprises Packed With Love</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-script text-transparent bg-clip-text bg-gradient-to-r from-ammu-babyBlue via-white to-ammu-blush drop-shadow">
          Ammu, Pick a Little Surprise! 🎁
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 font-handwriting text-lg sm:text-xl">
          Three little gifts from my heart. You can open all of them! 💙
        </p>
      </div>

      {/* 3 Gift Boxes Grid */}
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
        {/* Gift 1: Hug */}
        <div
          onClick={() => handleOpenGift('hug')}
          className="group cursor-pointer rounded-3xl glass-card p-6 flex flex-col items-center text-center border border-ammu-sky/30 hover:border-ammu-sky/70 shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
        >
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-sky-400/20 border border-sky-400/30 flex items-center justify-center my-3 group-hover:scale-110 transition-transform shadow-inner relative">
            {/* Gift Box SVG with ribbon */}
            <span className="text-4xl select-none group-hover:animate-bounce">🎁</span>
            <span className="absolute -bottom-2 text-xl select-none">🫂</span>
          </div>

          <h3 className="text-xl font-bold font-script text-white mt-2 group-hover:text-ammu-babyBlue transition-colors">
            {BIRTHDAY_CONFIG.gifts.hug.title}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            {BIRTHDAY_CONFIG.gifts.hug.tagline}
          </p>

          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-ammu-babyBlue text-xs font-medium border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5 text-ammu-gold" />
            <span>{openedGifts['hug'] ? 'Opened! Tap to see again' : 'Tap to unwrap'}</span>
          </div>
        </div>

        {/* Gift 2: Kiss */}
        <div
          onClick={() => handleOpenGift('kiss')}
          className="group cursor-pointer rounded-3xl glass-card-pink p-6 flex flex-col items-center text-center border border-pink-400/30 hover:border-pink-400/70 shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
        >
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-400/20 border border-pink-400/30 flex items-center justify-center my-3 group-hover:scale-110 transition-transform shadow-inner relative">
            <span className="text-4xl select-none group-hover:animate-bounce">🎁</span>
            <span className="absolute -bottom-2 text-xl select-none">😘</span>
          </div>

          <h3 className="text-xl font-bold font-script text-white mt-2 group-hover:text-pink-300 transition-colors">
            {BIRTHDAY_CONFIG.gifts.kiss.title}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            {BIRTHDAY_CONFIG.gifts.kiss.tagline}
          </p>

          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 text-pink-300 text-xs font-medium border border-pink-400/30">
            <Sparkles className="w-3.5 h-3.5 text-ammu-gold" />
            <span>{openedGifts['kiss'] ? 'Opened! Tap to see again' : 'Tap to unwrap'}</span>
          </div>
        </div>

        {/* Gift 3: Wish */}
        <div
          onClick={() => handleOpenGift('wish')}
          className="group cursor-pointer rounded-3xl glass-card-gold p-6 flex flex-col items-center text-center border border-amber-400/30 hover:border-amber-400/70 shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
        >
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-400/20 border border-amber-400/30 flex items-center justify-center my-3 group-hover:scale-110 transition-transform shadow-inner relative">
            <span className="text-4xl select-none group-hover:animate-bounce">🎁</span>
            <span className="absolute -bottom-2 text-xl select-none">🌙</span>
          </div>

          <h3 className="text-xl font-bold font-script text-white mt-2 group-hover:text-amber-200 transition-colors">
            {BIRTHDAY_CONFIG.gifts.wish.title}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            {BIRTHDAY_CONFIG.gifts.wish.tagline}
          </p>

          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-200 text-xs font-medium border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5 text-ammu-gold" />
            <span>{openedGifts['wish'] ? 'Opened! Tap to see again' : 'Tap to unwrap'}</span>
          </div>
        </div>
      </div>

      {/* Active Gift Reveal Modal */}
      {activeGift && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setActiveGift(null)}
        >
          <div
            className="max-w-md w-full glass-card rounded-3xl p-6 sm:p-8 border border-white/20 relative shadow-2xl text-center"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveGift(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content for Gift 1: Hug */}
            {activeGift === 'hug' && (
              <div className="space-y-4">
                <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-sky-400/30 blur-xl animate-pulse" />
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-4xl shadow-lg animate-heartbeat">
                    🫂
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-ammu-babyBlue text-xs font-semibold">
                  <span>Gift 1: Warmest Virtual Hug</span>
                </div>

                <h3 className="text-2xl font-bold font-script text-white">
                  Tight-ah Hug For Ammu! 💙
                </h3>

                <p className="text-base sm:text-lg font-handwriting font-bold text-ammu-babyBlue bg-white/5 p-4 rounded-2xl border border-sky-400/30 leading-relaxed">
                  &ldquo;{BIRTHDAY_CONFIG.gifts.hug.message}&rdquo;
                </p>

                <p className="text-xs text-slate-300 font-sans">
                  Whenever you feel tired or need someone, remember I am always right here sending you the biggest, warmest hug in the universe! 🫂✨
                </p>
              </div>
            )}

            {/* Content for Gift 2: Kiss */}
            {activeGift === 'kiss' && (
              <div className="space-y-4">
                <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-pink-400/30 blur-xl animate-pulse" />
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-400 to-rose-600 flex items-center justify-center text-4xl shadow-lg animate-heartbeat">
                    😘
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold">
                  <span>Gift 2: Birthday Kisses</span>
                </div>

                <h3 className="text-2xl font-bold font-script text-white">
                  For the Birthday Princess! 👑
                </h3>

                <p className="text-base sm:text-lg font-handwriting font-bold text-pink-200 bg-white/5 p-4 rounded-2xl border border-pink-400/30 leading-relaxed">
                  &ldquo;{BIRTHDAY_CONFIG.gifts.kiss.message}&rdquo;
                </p>

                <div className="flex justify-center gap-3 text-2xl animate-bounce">
                  <span>💋</span>
                  <span>💗</span>
                  <span>😘</span>
                  <span>💗</span>
                  <span>💋</span>
                </div>
              </div>
            )}

            {/* Content for Gift 3: Wish */}
            {activeGift === 'wish' && (
              <div className="space-y-4">
                <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-amber-400/30 blur-xl animate-pulse" />
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-600 flex items-center justify-center text-4xl shadow-lg animate-spin" style={{ animationDuration: '10s' }}>
                    🌙
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 text-xs font-semibold">
                  <span>Gift 3: A Moonlit Wish</span>
                </div>

                <h3 className="text-2xl font-bold font-script text-white">
                  A Blessing For Your Life 🌟
                </h3>

                <p className="text-base sm:text-lg font-handwriting font-bold text-amber-100 bg-white/5 p-4 rounded-2xl border border-amber-400/30 leading-relaxed">
                  &ldquo;{BIRTHDAY_CONFIG.gifts.wish.message}&rdquo;
                </p>

                <p className="text-xs text-slate-300 font-sans">
                  May God bless you with good health, unshakeable happiness, and all the success in the world. 💙
                </p>
              </div>
            )}

            {/* Close / Enjoy button */}
            <div className="mt-6">
              <button
                onClick={() => setActiveGift(null)}
                className="w-full py-2.5 rounded-full bg-gradient-to-r from-ammu-sky to-ammu-pink text-white text-xs font-bold uppercase tracking-wider shadow hover:scale-105 transition-all"
              >
                Thank you, my favourite person! 💙
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
