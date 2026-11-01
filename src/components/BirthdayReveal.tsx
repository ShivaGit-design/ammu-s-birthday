import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Flame } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';
import { romanticAudio } from '../utils/audio';

export const BirthdayReveal: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);

  const handleBlowCandles = () => {
    if (!candlesLit) {
      // Re-light if tapped again
      setCandlesLit(true);
      setWishMade(false);
      romanticAudio.playSparkle();
      return;
    }

    romanticAudio.playBlowCandle();
    setCandlesLit(false);
    setWishMade(true);

    window.setTimeout(() => {
      romanticAudio.playSparkle();
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#ffb4d6', '#b4d4ff', '#ffd166', '#ffffff', '#c084fc'],
        });
      } catch {
        // catch
      }
    }, 400);
  };

  return (
    <section className="relative py-12 md:py-20 px-4 flex flex-col items-center justify-center text-center">
      {/* Background soft ambient halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-gradient-to-r from-ammu-sky/15 via-ammu-blush/20 to-ammu-lavender/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Badge */}
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card text-ammu-babyBlue text-xs md:text-sm font-semibold tracking-wider uppercase mb-6 border border-ammu-sky/30 shadow-[0_0_20px_rgba(112,161,255,0.3)] animate-pulse-glow">
        <Sparkles className="w-4 h-4 text-ammu-gold" />
        <span>{BIRTHDAY_CONFIG.reveal.badge}</span>
        <Sparkles className="w-4 h-4 text-ammu-gold" />
      </div>

      {/* Main Birthday Titles */}
      <div className="space-y-4 max-w-2xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-script tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-ammu-babyBlue via-white to-ammu-blush drop-shadow-[0_4px_25px_rgba(180,212,255,0.5)]">
          {BIRTHDAY_CONFIG.reveal.heading}
        </h2>
        
        <p className="text-base sm:text-lg md:text-xl text-slate-200/90 font-medium max-w-xl mx-auto leading-relaxed px-2">
          {BIRTHDAY_CONFIG.reveal.dateHighlight}
        </p>
      </div>

      {/* Interactive Birthday Cake Container */}
      <div className="my-10 relative flex flex-col items-center">
        {/* White Roses & Butterflies Accent */}
        <div className="absolute -left-8 md:-left-16 top-1/3 text-2xl md:text-3xl animate-float-slow select-none">
          🌹🤍
        </div>
        <div className="absolute -right-8 md:-right-16 top-1/4 text-2xl md:text-3xl animate-float-reverse select-none">
          🦋✨
        </div>

        {/* The Pastel Birthday Cake (Handcrafted SVG & CSS) */}
        <div
          onClick={handleBlowCandles}
          className="relative cursor-pointer group transition-transform duration-300 hover:scale-105 select-none"
          title="Click to blow out the candles and make a wish!"
        >
          {/* Candle Flame Sparks */}
          <div className="flex justify-center items-center gap-6 mb-1 relative z-20">
            {/* Candle 1 */}
            <div className="flex flex-col items-center">
              {candlesLit ? (
                <div className="relative">
                  <Flame className="w-6 h-6 text-yellow-300 fill-yellow-400 animate-pulse drop-shadow-[0_0_12px_#ffd166]" />
                  <div className="absolute inset-0 bg-yellow-400/50 rounded-full blur-sm animate-ping" style={{ animationDuration: '2s' }} />
                </div>
              ) : (
                <div className="w-1.5 h-6 text-slate-400 text-xs font-serif animate-float">
                  💨
                </div>
              )}
              <div className="w-2.5 h-8 bg-gradient-to-b from-pink-200 to-pink-300 rounded-t-sm shadow-sm border border-pink-100" />
            </div>

            {/* Candle 2 (Center - taller) */}
            <div className="flex flex-col items-center">
              {candlesLit ? (
                <div className="relative">
                  <Flame className="w-8 h-8 text-amber-300 fill-amber-400 animate-bounce drop-shadow-[0_0_16px_#ffd166]" style={{ animationDuration: '1.2s' }} />
                  <div className="absolute inset-0 bg-amber-400/50 rounded-full blur-sm animate-ping" style={{ animationDuration: '1.8s' }} />
                </div>
              ) : (
                <div className="w-1.5 h-6 text-slate-400 text-xs font-serif animate-float" style={{ animationDelay: '0.2s' }}>
                  💨
                </div>
              )}
              <div className="w-3 h-10 bg-gradient-to-b from-sky-200 to-sky-300 rounded-t-sm shadow-sm border border-sky-100" />
            </div>

            {/* Candle 3 */}
            <div className="flex flex-col items-center">
              {candlesLit ? (
                <div className="relative">
                  <Flame className="w-6 h-6 text-yellow-300 fill-yellow-400 animate-pulse drop-shadow-[0_0_12px_#ffd166]" style={{ animationDelay: '0.4s' }} />
                  <div className="absolute inset-0 bg-yellow-400/50 rounded-full blur-sm animate-ping" style={{ animationDuration: '2.2s' }} />
                </div>
              ) : (
                <div className="w-1.5 h-6 text-slate-400 text-xs font-serif animate-float" style={{ animationDelay: '0.4s' }}>
                  💨
                </div>
              )}
              <div className="w-2.5 h-8 bg-gradient-to-b from-purple-200 to-purple-300 rounded-t-sm shadow-sm border border-purple-100" />
            </div>
          </div>

          {/* Top Layer of Cake */}
          <div className="relative w-44 md:w-56 h-16 bg-gradient-to-b from-[#ffeff6] via-[#ffd6e7] to-[#ffb8d7] rounded-2xl mx-auto shadow-md border-b-4 border-pink-300/50 flex flex-col justify-between p-2 overflow-hidden">
            {/* Cream Icing Drips */}
            <div className="flex justify-around items-start">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-4 h-3 bg-white rounded-b-full shadow-sm" />
              ))}
            </div>
            {/* Strawberries & Pearl decorations */}
            <div className="flex justify-around items-center px-2">
              <span className="text-xs">🍓</span>
              <span className="text-xs">🤍</span>
              <span className="text-xs">🍓</span>
              <span className="text-xs">🤍</span>
              <span className="text-xs">🍓</span>
            </div>
          </div>

          {/* Bottom Layer of Cake */}
          <div className="relative w-56 md:w-72 h-20 bg-gradient-to-b from-[#e8f3ff] via-[#d0e5ff] to-[#b4d4ff] rounded-2xl mx-auto -mt-2 shadow-xl border-b-4 border-blue-300/50 flex flex-col justify-between p-2 overflow-hidden">
            {/* Blue & Cream Icing Swirls */}
            <div className="flex justify-around items-start">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-5 h-4 bg-white/95 rounded-b-full shadow-sm" />
              ))}
            </div>
            {/* Cute heart inscription */}
            <div className="text-center font-handwriting text-sm text-ammu-deepBlue/80 font-bold">
              Ammu 💙 16
            </div>
            {/* Bottom pearls */}
            <div className="flex justify-around items-center px-4">
              <span className="text-xs">🌸</span>
              <span className="text-xs">✨</span>
              <span className="text-xs">💙</span>
              <span className="text-xs">✨</span>
              <span className="text-xs">🌸</span>
            </div>
          </div>

          {/* Golden Cake Stand */}
          <div className="w-64 md:w-80 h-4 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 rounded-full mx-auto -mt-1 shadow-lg border border-amber-300" />
          <div className="w-24 h-4 bg-gradient-to-b from-amber-200 to-amber-300 mx-auto rounded-b-lg shadow-sm opacity-80" />
          <div className="w-40 h-2 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 mx-auto rounded-full" />
        </div>

        {/* Wish Prompt & State Feedback */}
        <div className="mt-4">
          {wishMade ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/20 text-ammu-blush border border-pink-400/40 text-sm font-medium animate-pulse">
              <Sparkles className="w-4 h-4 text-ammu-gold" />
              <span>Wish made! May every dream of yours come true, Ammu! 🥹💙</span>
              <Sparkles className="w-4 h-4 text-ammu-gold" />
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-ammu-babyBlue/80 font-handwriting text-base sm:text-lg flex items-center justify-center gap-1.5 cursor-pointer hover:text-white transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-ammu-gold inline" />
              {BIRTHDAY_CONFIG.reveal.makeWishPrompt}
            </p>
          )}
        </div>
      </div>

      {/* Cute Mascot / Character Holding Heart */}
      <div className="flex flex-col items-center mt-2 space-y-3">
        <div className="relative group">
          {/* Animated Cute Bunny/Cat Mascot SVG */}
          <div className="w-28 h-28 md:w-32 md:h-32 relative animate-float">
            <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,180,214,0.4)]">
              {/* Ears */}
              <ellipse cx="45" cy="30" rx="10" ry="25" fill="#ffffff" />
              <ellipse cx="45" cy="30" rx="6" ry="18" fill="#ffb4d6" />
              <ellipse cx="75" cy="30" rx="10" ry="25" fill="#ffffff" />
              <ellipse cx="75" cy="30" rx="6" ry="18" fill="#ffb4d6" />
              
              {/* Head */}
              <circle cx="60" cy="55" r="28" fill="#ffffff" />
              
              {/* Cheeks */}
              <circle cx="46" cy="62" r="5" fill="#ffb4d6" opacity="0.7" />
              <circle cx="74" cy="62" r="5" fill="#ffb4d6" opacity="0.7" />
              
              {/* Eyes (happy curves) */}
              <path d="M46 52 Q50 48 54 52" stroke="#1b2559" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M66 52 Q70 48 74 52" stroke="#1b2559" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              
              {/* Nose & Smile */}
              <polygon points="58,58 62,58 60,61" fill="#ff758f" />
              <path d="M57 62 Q60 65 63 62" stroke="#1b2559" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              
              {/* Body */}
              <ellipse cx="60" cy="90" rx="22" ry="18" fill="#ffffff" />
              
              {/* Arms holding glowing Heart */}
              <path d="M42 82 Q50 90 60 88" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
              <path d="M78 82 Q70 90 60 88" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
            </svg>

            {/* Glowing Big Heart in Mascot's hands */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 animate-heartbeat">
              <Heart className="w-9 h-9 text-ammu-pink fill-ammu-pink drop-shadow-[0_0_15px_#ff758f]" />
            </div>
          </div>
        </div>

        {/* Universe Celebration Text */}
        <p className="text-lg md:text-2xl font-bold font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-ammu-babyBlue via-pink-200 to-ammu-blush">
          {BIRTHDAY_CONFIG.reveal.universeCelebration}
        </p>
      </div>

    </section>
  );
};
