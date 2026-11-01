import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Moon, Heart, Sparkles, RotateCcw } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../../config';
import { romanticAudio } from '../../utils/audio';

interface Slide11LoveCodeProps {
  onReplay: () => void;
}

export const Slide11LoveCode: React.FC<Slide11LoveCodeProps> = ({ onReplay }) => {
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const [showHeartsJoined, setShowHeartsJoined] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    // Sequential cinematic timing
    const t1 = setTimeout(() => {
      setStep1(true);
      romanticAudio.playSparkle();
    }, 800);

    const t2 = setTimeout(() => {
      setStep2(true);
      romanticAudio.playSparkle();
    }, 2400);

    const t3 = setTimeout(() => {
      setStep3(true);
      romanticAudio.playSparkle();
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#70a1ff', '#b4d4ff', '#ffffff', '#ff758f'],
        });
      } catch {
        // catch
      }
    }, 4200);

    const t4 = setTimeout(() => {
      setStep4(true);
      romanticAudio.playSparkle();
      try {
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#70a1ff', '#b4d4ff', '#ffffff', '#ffd166', '#d8b4fe'],
        });
      } catch {
        // catch
      }
    }, 6000);

    const t5 = setTimeout(() => {
      setShowHeartsJoined(true);
    }, 7500);

    const t6 = setTimeout(() => {
      setShowFooter(true);
    }, 9000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, []);

  const handleReplayClick = () => {
    romanticAudio.playSparkle();
    onReplay();
  };

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center px-3 sm:px-6 pt-16 sm:pt-20 pb-36 sm:pb-32 select-none z-10 text-center overflow-x-hidden">
      
      {/* Deep Midnight Blue Glowing Nebula */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[750px] h-[380px] sm:h-[750px] rounded-full bg-gradient-to-tr from-sky-400/20 via-blue-600/15 to-indigo-950/40 blur-[150px] pointer-events-none" />

      {/* Floating Glowing Moon & Constellation Above */}
      <div className="relative mb-6">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#132257] via-[#1d357d] to-[#70a1ff]/30 border border-sky-300/40 flex items-center justify-center shadow-[0_0_50px_rgba(112,161,255,0.5)]">
          <Moon className="w-12 h-12 sm:w-14 sm:h-14 text-sky-200 fill-sky-200/80 drop-shadow-[0_0_20px_#b4d4ff] animate-float" />
          
          {/* Heart Constellation above moon when final reveal hits */}
          {showHeartsJoined && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center gap-1 text-sky-300 animate-pulse-glow">
              <span className="text-xs">✨</span>
              <Heart className="w-5 h-5 text-sky-300 fill-sky-300 drop-shadow-[0_0_10px_#70a1ff]" />
              <span className="text-xs">✨</span>
            </div>
          )}
        </div>
      </div>

      {/* Scene Tag */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-200 text-xs font-semibold tracking-widest uppercase border border-sky-400/30 mb-8 animate-pulse-glow">
        <Sparkles className="w-3.5 h-3.5 text-sky-300" />
        <span>{BIRTHDAY_CONFIG.slide11.tag}</span>
        <Sparkles className="w-3.5 h-3.5 text-sky-300" />
      </div>

      {/* THE SPECIAL LOVE CODE REVEAL CONTAINER */}
      <div className="max-w-xl w-full mx-auto space-y-5 sm:space-y-6">
        
        {/* Line 1: Unaku Naanum… 💙 */}
        <div
          className={`transition-all duration-1000 transform ${
            step1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
          }`}
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-script tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-sky-300 drop-shadow-[0_0_25px_rgba(112,161,255,0.6)]">
            {BIRTHDAY_CONFIG.slide11.line1}
          </h2>
        </div>

        {/* Line 2: Enaku Neeyum… 🌙 */}
        <div
          className={`transition-all duration-1000 transform ${
            step2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
          }`}
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-script tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-100 via-white to-blue-200 drop-shadow-[0_0_25px_rgba(112,161,255,0.6)]">
            {BIRTHDAY_CONFIG.slide11.line2}
          </h2>
        </div>

        {/* Line 3: Namaku Athiksha… 🫂❤️ */}
        <div
          className={`transition-all duration-1000 transform ${
            step3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
          }`}
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-script tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-rose-300 drop-shadow-[0_0_25px_rgba(255,117,143,0.6)]">
            {BIRTHDAY_CONFIG.slide11.line3}
          </h2>
        </div>

        {/* Line 4: Eppovume Onna Irupom! ♾️💙 */}
        <div
          className={`transition-all duration-1000 transform ${
            step4 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
          }`}
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-script tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-blue-400 drop-shadow-[0_0_35px_rgba(112,161,255,0.9)] animate-heartbeat">
            {BIRTHDAY_CONFIG.slide11.line4}
          </h2>
        </div>

        {/* Two Glowing Blue Hearts Joining Together */}
        <div
          className={`pt-4 transition-all duration-1000 flex items-center justify-center gap-3 ${
            showHeartsJoined ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          <Heart className="w-8 h-8 text-sky-400 fill-sky-400 drop-shadow-[0_0_20px_#70a1ff] animate-bounce" />
          <span className="text-2xl text-sky-200 font-mono">♾️</span>
          <Heart className="w-8 h-8 text-blue-300 fill-blue-300 drop-shadow-[0_0_20px_#70a1ff] animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>

        {/* Subtitle: Our Story Forever 💙🌙 */}
        <div
          className={`pt-3 transition-all duration-1000 ${
            showFooter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-sm sm:text-lg font-mono uppercase tracking-[0.25em] text-sky-200/80 font-bold">
            {BIRTHDAY_CONFIG.slide11.footerTitle}
          </p>
          <p className="text-xs text-sky-300/60 font-handwriting text-base mt-1">
            Made with all my heart for my favourite human, Ammu 💙🌝
          </p>
        </div>

        {/* Replay Our Story Button */}
        <div
          className={`pt-6 transition-all duration-1000 ${
            showFooter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
          }`}
        >
          <button
            onClick={handleReplayClick}
            className="group relative inline-flex items-center gap-2.5 px-7 py-3 rounded-full glass-card hover:bg-white/10 border border-sky-400/40 text-sky-200 hover:text-white text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(112,161,255,0.3)]"
          >
            <RotateCcw className="w-4 h-4 text-sky-300 group-hover:-rotate-90 transition-transform duration-500" />
            <span>{BIRTHDAY_CONFIG.slide11.replayButton}</span>
          </button>
        </div>

      </div>

    </div>
  );
};
