import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';
import { romanticAudio } from '../utils/audio';

interface OpeningSurpriseProps {
  onOpen: () => void;
}

export const OpeningSurprise: React.FC<OpeningSurpriseProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Play sparkling chime sound
    romanticAudio.playSparkle();

    // Start background romantic music on user interaction
    romanticAudio.startMusic(BIRTHDAY_CONFIG.music.src);

    // Confetti burst of baby blue and soft pink hearts & sparkles
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#b4d4ff', '#ffb4d6', '#ffffff', '#70a1ff', '#ffd166'],
        shapes: ['circle'],
        scalar: 1.2,
      });

      window.setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 60,
          origin: { x: 0.2, y: 0.6 },
          colors: ['#ff758f', '#bae6fd', '#d8b4fe'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 60,
          origin: { x: 0.8, y: 0.6 },
          colors: ['#ff758f', '#bae6fd', '#d8b4fe'],
        });
      }, 300);
    } catch {
      // fallback
    }

    // Smooth transition to main universe after envelope unfolds
    window.setTimeout(() => {
      onOpen();
    }, 1400);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative z-10 px-4 py-8 select-none">
      {/* Container */}
      <div className="max-w-md w-full flex flex-col items-center text-center space-y-6">
        
        {/* Cute Welcome Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-ammu-babyBlue text-sm font-medium tracking-wide shadow-lg border border-ammu-sky/30 animate-pulse-glow">
          <Sparkles className="w-4 h-4 text-ammu-gold animate-spin" style={{ animationDuration: '6s' }} />
          <span>A Secret Gift Awaits</span>
          <Sparkles className="w-4 h-4 text-ammu-gold animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        {/* Cinematic Opening Texts */}
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold font-script tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-ammu-babyBlue via-white to-ammu-blush drop-shadow-[0_2px_15px_rgba(180,212,255,0.4)]">
            {BIRTHDAY_CONFIG.opening.greeting}
          </h1>
          <p className="text-base md:text-lg text-slate-200/90 font-medium leading-relaxed">
            {BIRTHDAY_CONFIG.opening.subtext}
          </p>
          <p className="text-sm md:text-base text-ammu-babyBlue/80 font-handwriting text-lg md:text-xl">
            {BIRTHDAY_CONFIG.opening.question}
          </p>
        </div>

        {/* Animated 3D Interactive Envelope */}
        <div
          className="relative w-72 h-48 md:w-80 md:h-52 my-4 cursor-pointer group perspective-1000"
          onClick={handleOpenClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Glowing aura around envelope */}
          <div
            className={`absolute -inset-4 rounded-3xl bg-gradient-to-r from-ammu-sky/20 via-ammu-blush/25 to-ammu-lavender/20 blur-xl transition-opacity duration-700 ${
              isHovered || isOpening ? 'opacity-100 scale-105' : 'opacity-60'
            }`}
          />

          {/* Envelope Body */}
          <div
            className={`relative w-full h-full rounded-2xl bg-gradient-to-b from-[#1b2559] to-[#0f173f] border-2 border-ammu-sky/40 shadow-2xl overflow-hidden transition-all duration-700 ${
              isOpening ? 'scale-110 shadow-[0_0_40px_rgba(112,161,255,0.8)]' : isHovered ? '-translate-y-2' : ''
            }`}
          >
            {/* Inner Letter peaking out */}
            <div
              className={`absolute left-4 right-4 bg-gradient-to-b from-[#fffefc] to-[#f4f7ff] rounded-t-xl p-4 shadow-md transition-all duration-1000 ${
                isOpening ? '-top-28 opacity-100' : 'top-3 opacity-90 group-hover:top-1'
              }`}
            >
              <div className="flex items-center justify-between border-b border-pink-100 pb-1 mb-1">
                <span className="text-[10px] font-semibold text-ammu-blue uppercase tracking-wider">For Ammu</span>
                <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
              </div>
              <p className="text-[11px] font-handwriting text-slate-700 leading-tight">
                To the prettiest birthday girl... 💙🌝
              </p>
            </div>

            {/* Envelope Back & Fold Lines */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 320 208" fill="none" preserveAspectRatio="none">
                {/* Lower V triangle fold */}
                <path
                  d="M0 208 L160 100 L320 208 Z"
                  fill="#141c48"
                  stroke="rgba(180, 212, 255, 0.25)"
                  strokeWidth="1.5"
                />
                {/* Left fold */}
                <path
                  d="M0 0 L160 100 L0 208 Z"
                  fill="#182357"
                  stroke="rgba(180, 212, 255, 0.2)"
                  strokeWidth="1.5"
                />
                {/* Right fold */}
                <path
                  d="M320 0 L160 100 L320 208 Z"
                  fill="#162050"
                  stroke="rgba(180, 212, 255, 0.2)"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            {/* Top Flap (opens up) */}
            <div
              className={`absolute top-0 left-0 right-0 h-28 origin-top transition-transform duration-700 ${
                isOpening ? '-rotate-180 -translate-y-2 opacity-30' : 'rotate-0'
              }`}
            >
              <svg className="w-full h-full" viewBox="0 0 320 110" fill="none" preserveAspectRatio="none">
                <path
                  d="M0 0 L160 100 L320 0 Z"
                  fill="#233275"
                  stroke="rgba(180, 212, 255, 0.4)"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Glowing Wax Seal / Heart Button */}
            <div
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center transition-all duration-500 ${
                isOpening ? 'scale-150 opacity-0' : 'scale-100'
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-ammu-pink to-ammu-rose shadow-[0_0_20px_rgba(255,117,143,0.8)] border-2 border-white/60 flex items-center justify-center animate-heartbeat group-hover:scale-110 transition-transform">
                <span className="text-xl">💙</span>
              </div>
              <span className="text-[10px] text-white/90 font-medium mt-1 tracking-wider uppercase drop-shadow">
                Tap to Open
              </span>
            </div>

            {/* Floating Sparkles while opening */}
            {isOpening && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-4xl animate-ping">✨</div>
              </div>
            )}
          </div>
        </div>

        {/* Main Action Button */}
        <button
          onClick={handleOpenClick}
          disabled={isOpening}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full text-base md:text-lg font-semibold text-white overflow-hidden shadow-[0_0_25px_rgba(112,161,255,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-80"
          style={{
            background: 'linear-gradient(135deg, #3a86ff 0%, #70a1ff 40%, #ff758f 100%)',
          }}
        >
          {/* Shimmer sweep */}
          <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          
          <Sparkles className="w-5 h-5 text-yellow-200 animate-spin" style={{ animationDuration: '4s' }} />
          <span className="tracking-wide drop-shadow">
            {isOpening ? "Opening Ammu's Universe..." : BIRTHDAY_CONFIG.opening.buttonText}
          </span>
          <Heart className="w-5 h-5 text-white fill-white/80 animate-pulse" />
        </button>

        {/* Delicate Footer Note */}
        <div className="pt-2">
          <p className="text-xs md:text-sm text-ammu-babyBlue/70 font-handwriting text-base tracking-wide flex items-center justify-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-ammu-pink fill-ammu-pink/70 inline" />
            {BIRTHDAY_CONFIG.opening.footerNote}
          </p>
        </div>

      </div>
    </div>
  );
};
