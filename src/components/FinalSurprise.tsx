import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, X, RotateCcw } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';
import { romanticAudio } from '../utils/audio';

interface FinalSurpriseProps {
  onReplay: () => void;
}

export const FinalSurprise: React.FC<FinalSurpriseProps> = ({ onReplay }) => {
  const [showHugModal, setShowHugModal] = useState(false);
  const [hugGiven, setHugGiven] = useState(false);

  const handleLastHug = () => {
    setShowHugModal(true);
    setHugGiven(true);
    romanticAudio.playSparkle();

    // Heart explosion & massive pink and blue confetti cannons
    try {
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 7,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#70a1ff', '#b4d4ff', '#ffb4d6', '#ff758f', '#ffffff'],
        });
        confetti({
          particleCount: 7,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#70a1ff', '#b4d4ff', '#ffb4d6', '#ff758f', '#ffffff'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    } catch {
      // catch
    }
  };

  return (
    <section className="py-16 md:py-28 px-4 flex flex-col items-center justify-center relative text-center">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[750px] h-[350px] md:h-[750px] bg-gradient-to-r from-ammu-sky/15 via-ammu-blush/20 to-ammu-lavender/15 rounded-full blur-[150px] pointer-events-none" />

      {/* Giant Animated Pulsing Heart in Background */}
      <div className="relative mb-6">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-ammu-sky/20 via-pink-400/20 to-purple-400/20 flex items-center justify-center border-2 border-ammu-blush/40 shadow-[0_0_50px_rgba(255,180,214,0.4)] animate-pulse-glow">
          <Heart className="w-16 h-16 md:w-20 md:h-20 text-ammu-pink fill-ammu-pink/80 animate-heartbeat drop-shadow-[0_0_20px_#ff758f]" />
        </div>
        <div className="absolute -top-2 -right-2 text-2xl animate-float">
          🌝
        </div>
        <div className="absolute -bottom-2 -left-2 text-2xl animate-float-slow">
          💙
        </div>
      </div>

      {/* Sequential Romantic Emotional Text Reveals */}
      <div className="max-w-2xl w-full mx-auto space-y-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-script text-transparent bg-clip-text bg-gradient-to-r from-ammu-babyBlue via-white to-ammu-blush drop-shadow">
          {BIRTHDAY_CONFIG.finalSurprise.heading}
        </h2>

        {/* Poetic Message */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-ammu-sky/30 shadow-2xl relative">
          <p className="font-handwriting text-xl sm:text-2xl md:text-3xl leading-relaxed text-slate-100 font-medium whitespace-pre-line tracking-wide">
            &ldquo;{BIRTHDAY_CONFIG.finalSurprise.poeticMessage}&rdquo;
          </p>
        </div>

        {/* Wishes Lines */}
        <div className="space-y-2 pt-2">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-script text-transparent bg-clip-text bg-gradient-to-r from-ammu-babyBlue via-white to-ammu-blush drop-shadow">
            {BIRTHDAY_CONFIG.finalSurprise.wishesLine1}
          </h3>
          <p className="text-base sm:text-lg md:text-xl font-handwriting text-ammu-blush font-bold">
            {BIRTHDAY_CONFIG.finalSurprise.wishesLine2}
          </p>
        </div>

        {/* Glowing Button: One Last Hug for Ammu */}
        <div className="pt-6 flex flex-col items-center">
          {hugGiven && (
            <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold animate-pulse">
              <Heart className="w-3.5 h-3.5 fill-pink-400" />
              <span>Hug delivered! Tap anytime to hug again 🫂💙</span>
            </div>
          )}
          <button
            onClick={handleLastHug}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-lg font-bold text-white overflow-hidden shadow-[0_0_35px_rgba(255,117,143,0.6)] transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #ff758f 0%, #3a86ff 100%)',
            }}
          >
            {/* Shimmer sweep */}
            <span className="absolute inset-0 w-full h-full bg-white/25 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            
            <Heart className="w-5 h-5 text-white fill-white animate-pulse" />
            <span className="tracking-wide drop-shadow">
              {hugGiven ? "Another Tight Hug for Ammu? 🫂" : BIRTHDAY_CONFIG.finalSurprise.hugButtonText}
            </span>
            <Sparkles className="w-5 h-5 text-yellow-200 animate-spin" style={{ animationDuration: '4s' }} />
          </button>
        </div>

        {/* Grand Final Text */}
        <div className="pt-10">
          <p className="text-sm sm:text-base md:text-lg tracking-[0.2em] uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-ammu-sky via-ammu-blush to-ammu-lavender drop-shadow-md">
            {BIRTHDAY_CONFIG.finalSurprise.universeEnding}
          </p>
          <p className="text-xs text-ammu-babyBlue/60 font-handwriting text-base mt-1">
            Always & Forever in my thoughts, Ammu 💙🌝
          </p>
        </div>

        {/* Replay Surprise Button */}
        <div className="pt-8">
          <button
            onClick={onReplay}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card hover:bg-white/10 text-ammu-babyBlue hover:text-white text-xs sm:text-sm font-medium border border-ammu-sky/30 transition-all shadow-md"
          >
            <RotateCcw className="w-4 h-4 text-ammu-sky" />
            <span>Replay Opening Surprise Envelope 💌</span>
          </button>
        </div>
      </div>

      {/* Hug Explosion Modal */}
      {showHugModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setShowHugModal(false)}
        >
          <div
            className="max-w-md w-full glass-card rounded-3xl p-8 border-2 border-pink-400/50 relative shadow-[0_0_50px_rgba(255,117,143,0.5)] text-center animate-scaleUp"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowHugModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-ammu-pink to-ammu-sky flex items-center justify-center text-5xl shadow-xl animate-heartbeat my-2">
              🫂
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-script text-white mt-4">
              {BIRTHDAY_CONFIG.finalSurprise.hugModalTitle}
            </h3>

            <p className="text-lg font-handwriting font-bold text-ammu-babyBlue mt-3 leading-relaxed">
              &ldquo;{BIRTHDAY_CONFIG.finalSurprise.hugModalText}&rdquo;
            </p>

            <div className="my-4 py-2 border-t border-b border-white/10 flex justify-center gap-2 text-2xl">
              <span>💙</span>
              <span>🌝</span>
              <span>🎂</span>
              <span>🌸</span>
              <span>✨</span>
            </div>

            <button
              onClick={() => setShowHugModal(false)}
              className="w-full py-3 rounded-full bg-gradient-to-r from-ammu-sky to-ammu-pink text-white text-xs font-bold uppercase tracking-wider shadow hover:scale-105 transition-all"
            >
              Hug Received! I Love You 💙
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
