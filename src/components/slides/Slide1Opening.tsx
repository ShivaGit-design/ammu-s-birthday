import React, { useEffect, useState } from 'react';
import { Sparkles, Moon, Heart } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../../config';
import { romanticAudio } from '../../utils/audio';

interface Slide1OpeningProps {
  onEnter: () => void;
}

export const Slide1Opening: React.FC<Slide1OpeningProps> = ({ onEnter }) => {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowSubtitle(true), 600);
    const t2 = setTimeout(() => setShowTitle(true), 1600);
    const t3 = setTimeout(() => setShowButton(true), 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleEnterClick = () => {
    romanticAudio.playSparkle();
    romanticAudio.startMusic();
    onEnter();
  };

  return (
    <div className="relative w-full h-full min-h-screen flex flex-col items-center justify-center px-4 select-none overflow-hidden text-center z-10">
      
      {/* Cinematic Moonlight Glow Halo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full bg-gradient-to-b from-sky-400/20 via-blue-600/10 to-transparent blur-[110px] pointer-events-none animate-pulse-glow" />

      {/* Floating Mysterious Moon with Soft Light Rays */}
      <div className="relative mb-8 transition-transform duration-1000 transform hover:scale-105">
        {/* Light rays SVG */}
        <div className="absolute -inset-10 flex items-center justify-center opacity-40 pointer-events-none animate-spin" style={{ animationDuration: '40s' }}>
          <svg viewBox="0 0 200 200" className="w-56 h-56 sm:w-72 sm:h-72">
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="100"
                y1="100"
                x2={100 + 90 * Math.cos((i * Math.PI) / 6)}
                y2={100 + 90 * Math.sin((i * Math.PI) / 6)}
                stroke="rgba(180, 212, 255, 0.4)"
                strokeWidth="1.5"
                strokeDasharray="4 8"
              />
            ))}
          </svg>
        </div>

        {/* Crescent Moon Container */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-[#132257] via-[#1d357d] to-[#70a1ff]/30 border border-sky-300/30 flex items-center justify-center shadow-[0_0_50px_rgba(112,161,255,0.45)]">
          <Moon className="w-14 h-14 sm:w-18 sm:h-18 text-sky-200 fill-sky-200/80 drop-shadow-[0_0_20px_#b4d4ff] animate-float" />
          
          {/* Orbiting blue fairy sparkles */}
          <div className="absolute -top-1 -right-1 text-sm animate-twinkle">✨</div>
          <div className="absolute -bottom-2 -left-1 text-base animate-twinkle-fast">💙</div>
        </div>
      </div>

      {/* Narrative Reveal Texts */}
      <div className="max-w-xl mx-auto space-y-4">
        {/* Intro Whisper */}
        <p
          className={`text-base sm:text-xl font-handwriting tracking-wide text-sky-200/80 transition-all duration-1000 ${
            showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {BIRTHDAY_CONFIG.slide1.ambientIntro}
        </p>

        {/* Main Title: For My Ammu 💙🌝 */}
        <h1
          className={`text-4xl sm:text-6xl md:text-7xl font-bold font-script tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-blue-300 drop-shadow-[0_0_30px_rgba(112,161,255,0.7)] transition-all duration-1000 delay-150 ${
            showTitle ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {BIRTHDAY_CONFIG.slide1.title}
        </h1>

        <p
          className={`text-xs sm:text-sm uppercase tracking-[0.25em] text-sky-300/60 font-mono transition-all duration-1000 ${
            showTitle ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {BIRTHDAY_CONFIG.slide1.subtitle}
        </p>
      </div>

      {/* Button: Enter Our Universe 💙 */}
      <div
        className={`mt-10 transition-all duration-1000 ${
          showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
      >
        <button
          onClick={handleEnterClick}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-base sm:text-lg font-semibold text-white overflow-hidden shadow-[0_0_35px_rgba(74,144,226,0.5)] border border-sky-300/40 transition-all duration-500 hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #1b357d 0%, #3a86ff 50%, #70a1ff 100%)',
          }}
        >
          {/* Shimmer sweep */}
          <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          
          <Sparkles className="w-5 h-5 text-sky-200 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="tracking-wide drop-shadow">{BIRTHDAY_CONFIG.slide1.enterButton}</span>
          <Heart className="w-5 h-5 text-white fill-white animate-pulse" />
        </button>

        <p className="mt-3 text-[11px] text-sky-300/50 font-handwriting text-sm">
          {BIRTHDAY_CONFIG.slide1.whisper}
        </p>
      </div>

    </div>
  );
};
