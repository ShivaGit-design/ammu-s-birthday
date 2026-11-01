import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Flame, ArrowRight, PartyPopper } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../../config';
import { romanticAudio } from '../../utils/audio';

interface Slide10BirthdaySurpriseProps {
  onContinueToLoveCode: () => void;
}

export const Slide10BirthdaySurprise: React.FC<Slide10BirthdaySurpriseProps> = ({
  onContinueToLoveCode,
}) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);

  const handleBlowCandles = () => {
    if (!candlesLit) {
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
          particleCount: 110,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#70a1ff', '#b4d4ff', '#ffffff', '#ffd166', '#d8b4fe'],
        });
      } catch {
        // catch
      }
    }, 350);
  };

  const handleContinue = () => {
    romanticAudio.playSparkle();
    onContinueToLoveCode();
  };

  return (
    <div className="relative w-full h-full min-h-screen flex flex-col items-center justify-center px-4 py-16 select-none z-10 text-center">
      
      {/* Background Cinematic Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[700px] h-[380px] sm:h-[700px] rounded-full bg-gradient-to-tr from-sky-400/20 via-blue-600/15 to-indigo-900/25 blur-[150px] pointer-events-none" />

      {/* Header Badge */}
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card text-sky-200 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 border border-sky-400/30 shadow-[0_0_20px_rgba(112,161,255,0.4)] animate-pulse-glow">
        <Sparkles className="w-4 h-4 text-sky-300" />
        <span>{BIRTHDAY_CONFIG.slide10.badge}</span>
        <Sparkles className="w-4 h-4 text-sky-300" />
      </div>

      {/* Main Birthday Titles */}
      <div className="space-y-2 max-w-2xl mx-auto mb-6">
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold font-script tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-blue-300 drop-shadow-[0_4px_30px_rgba(112,161,255,0.7)]">
          {BIRTHDAY_CONFIG.slide10.heading}
        </h2>
        
        <p className="text-sm sm:text-lg text-sky-100 font-medium max-w-xl mx-auto leading-relaxed px-2">
          {BIRTHDAY_CONFIG.slide10.dateHighlight}
        </p>
      </div>

      {/* Interactive Birthday Cake */}
      <div className="my-4 relative flex flex-col items-center">
        
        {/* Floating Accents */}
        <div className="absolute -left-10 sm:-left-16 top-1/3 text-2xl sm:text-3xl animate-float-slow select-none">
          🤍✨
        </div>
        <div className="absolute -right-10 sm:-right-16 top-1/4 text-2xl sm:text-3xl animate-float-reverse select-none">
          🦋💙
        </div>

        {/* The Cake */}
        <div
          onClick={handleBlowCandles}
          className="relative cursor-pointer group transition-transform duration-300 hover:scale-105 select-none"
          title="Click to blow out the candles and make a wish!"
        >
          {/* Candle Flames */}
          <div className="flex justify-center items-center gap-6 mb-1 relative z-20">
            {/* Candle 1 */}
            <div className="flex flex-col items-center">
              {candlesLit ? (
                <div className="relative">
                  <Flame className="w-6 h-6 text-sky-300 fill-sky-200 animate-pulse drop-shadow-[0_0_12px_#70a1ff]" />
                  <div className="absolute inset-0 bg-sky-400/50 rounded-full blur-sm animate-ping" style={{ animationDuration: '2s' }} />
                </div>
              ) : (
                <div className="w-1.5 h-6 text-slate-400 text-xs font-serif animate-float">💨</div>
              )}
              <div className="w-2.5 h-8 bg-gradient-to-b from-sky-200 to-sky-400 rounded-t-sm shadow border border-sky-100" />
            </div>

            {/* Candle 2 (Center - taller) */}
            <div className="flex flex-col items-center">
              {candlesLit ? (
                <div className="relative">
                  <Flame className="w-8 h-8 text-amber-200 fill-amber-100 animate-bounce drop-shadow-[0_0_16px_#ffd166]" style={{ animationDuration: '1.2s' }} />
                  <div className="absolute inset-0 bg-amber-400/50 rounded-full blur-sm animate-ping" style={{ animationDuration: '1.8s' }} />
                </div>
              ) : (
                <div className="w-1.5 h-6 text-slate-400 text-xs font-serif animate-float" style={{ animationDelay: '0.2s' }}>💨</div>
              )}
              <div className="w-3 h-10 bg-gradient-to-b from-blue-200 to-blue-400 rounded-t-sm shadow border border-blue-100" />
            </div>

            {/* Candle 3 */}
            <div className="flex flex-col items-center">
              {candlesLit ? (
                <div className="relative">
                  <Flame className="w-6 h-6 text-sky-300 fill-sky-200 animate-pulse drop-shadow-[0_0_12px_#70a1ff]" style={{ animationDelay: '0.4s' }} />
                  <div className="absolute inset-0 bg-sky-400/50 rounded-full blur-sm animate-ping" style={{ animationDuration: '2.2s' }} />
                </div>
              ) : (
                <div className="w-1.5 h-6 text-slate-400 text-xs font-serif animate-float" style={{ animationDelay: '0.4s' }}>💨</div>
              )}
              <div className="w-2.5 h-8 bg-gradient-to-b from-indigo-200 to-indigo-400 rounded-t-sm shadow border border-indigo-100" />
            </div>
          </div>

          {/* Top Layer of Cake */}
          <div className="relative w-44 sm:w-56 h-14 sm:h-16 bg-gradient-to-b from-[#e0f2fe] via-[#bae6fd] to-[#7dd3fc] rounded-2xl mx-auto shadow-md border-b-4 border-sky-400/50 flex flex-col justify-between p-2 overflow-hidden">
            <div className="flex justify-around items-start">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-4 h-3 bg-white rounded-b-full shadow-sm" />
              ))}
            </div>
            <div className="flex justify-around items-center px-2">
              <span className="text-xs">🤍</span>
              <span className="text-xs">💙</span>
              <span className="text-xs">🤍</span>
              <span className="text-xs">💙</span>
              <span className="text-xs">🤍</span>
            </div>
          </div>

          {/* Bottom Layer of Cake */}
          <div className="relative w-56 sm:w-72 h-18 sm:h-20 bg-gradient-to-b from-[#bae6fd] via-[#7dd3fc] to-[#38bdf8] rounded-2xl mx-auto -mt-2 shadow-xl border-b-4 border-blue-500/50 flex flex-col justify-between p-2 overflow-hidden">
            <div className="flex justify-around items-start">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-5 h-4 bg-white/95 rounded-b-full shadow-sm" />
              ))}
            </div>
            <div className="text-center font-handwriting text-sm text-[#071330] font-bold">
              Ammu 💙 16
            </div>
            <div className="flex justify-around items-center px-4">
              <span className="text-xs">✨</span>
              <span className="text-xs">💙</span>
              <span className="text-xs">✨</span>
              <span className="text-xs">💙</span>
              <span className="text-xs">✨</span>
            </div>
          </div>

          {/* Golden Stand */}
          <div className="w-64 sm:w-80 h-3 bg-gradient-to-r from-sky-200 via-white to-sky-200 rounded-full mx-auto -mt-1 shadow-lg" />
          <div className="w-24 h-3 bg-gradient-to-b from-sky-300 to-sky-400 mx-auto rounded-b-lg opacity-80" />
        </div>

        {/* Wish Prompt */}
        <div className="mt-4">
          {wishMade ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/20 text-sky-200 border border-sky-400/40 text-xs sm:text-sm font-medium animate-pulse">
              <PartyPopper className="w-4 h-4 text-sky-300" />
              <span>Wish made! May every dream come true, Ammu! 🥹💙</span>
              <PartyPopper className="w-4 h-4 text-sky-300" />
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-sky-200/80 font-handwriting text-base sm:text-lg flex items-center justify-center gap-1.5 cursor-pointer hover:text-white transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-sky-300 inline" />
              {BIRTHDAY_CONFIG.slide10.makeWishPrompt}
            </p>
          )}
        </div>
      </div>

      {/* Universe Celebration Text */}
      <p className="text-lg sm:text-2xl font-bold font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-blue-200 mt-2">
        {BIRTHDAY_CONFIG.slide10.universeCelebration}
      </p>

      {/* Continue to Final Love Code Button */}
      <div className="mt-8">
        <button
          onClick={handleContinue}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-base sm:text-lg font-bold text-white overflow-hidden shadow-[0_0_35px_rgba(74,144,226,0.6)] border border-sky-300/40 transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #1d357d 0%, #3a86ff 50%, #70a1ff 100%)',
          }}
        >
          <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          <Heart className="w-5 h-5 text-sky-200 fill-sky-200 animate-pulse" />
          <span className="tracking-wide drop-shadow">{BIRTHDAY_CONFIG.slide10.continueButton}</span>
          <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
};
