import React from 'react';
import { Heart, Music, Sparkles, Moon } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface AutoplayWelcomeModalProps {
  isOpen: boolean;
  onEnter: () => void;
  songTitle?: string;
  songArtist?: string;
}

export const AutoplayWelcomeModal: React.FC<AutoplayWelcomeModalProps> = ({
  isOpen,
  onEnter,
  songTitle = "Bae 💙 — DON",
  songArtist = "Anirudh Ravichander • Sivakarthikeyan",
}) => {
  if (!isOpen) return null;

  const handleEnter = async () => {
    romanticAudio.playSparkle();
    await romanticAudio.startMusic();
    onEnter();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none bg-[#050818]/95 backdrop-blur-2xl animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      {/* Background Soft Glow Halos */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full bg-gradient-to-b from-sky-400/20 via-blue-600/15 to-transparent blur-[120px] pointer-events-none animate-pulse-glow" />

      {/* Main Card */}
      <div className="relative max-w-md w-full glass-card rounded-3xl p-6 sm:p-8 border border-sky-300/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-center text-slate-100 flex flex-col items-center">
        
        {/* Subtle Animated Glowing Moon with Floating Heart */}
        <div className="relative mb-5">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#132257] via-[#1d357d] to-[#70a1ff]/30 border border-sky-300/40 flex items-center justify-center shadow-[0_0_40px_rgba(112,161,255,0.45)]">
            <Moon className="w-10 h-10 sm:w-12 sm:h-12 text-sky-200 fill-sky-200/80 drop-shadow-[0_0_15px_#b4d4ff] animate-float" />
            
            {/* Subtle animated pulsing heart */}
            <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[#050818] border border-sky-300/40 shadow-lg">
              <Heart className="w-4 h-4 text-sky-400 fill-sky-400 animate-heartbeat drop-shadow-[0_0_8px_#70a1ff]" />
            </div>
            <div className="absolute -top-1 -left-1 text-xs animate-twinkle">✨</div>
          </div>
        </div>

        {/* Greeting Whisper */}
        <p className="font-handwriting text-base sm:text-lg text-sky-200/80 mb-1">
          A little cinematic universe for Ammu 💙🌝
        </p>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold font-script tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-blue-200 drop-shadow-[0_0_20px_rgba(112,161,255,0.6)] mb-3">
          Our Love Story Begins
        </h2>

        {/* Song Info Badge */}
        <div className="w-full max-w-xs mx-auto mb-6 px-3.5 py-2.5 rounded-2xl bg-white/5 border border-sky-400/25 backdrop-blur-md flex items-center justify-center gap-2.5 shadow-inner">
          <Music className="w-4 h-4 text-sky-300 flex-shrink-0 animate-pulse" />
          <div className="text-left overflow-hidden">
            <p className="text-xs font-bold text-white truncate font-sans">
              {songTitle}
            </p>
            <p className="text-[10px] text-sky-300/70 truncate">
              {songArtist}
            </p>
          </div>
          {/* Mini Equalizer Waves */}
          <div className="flex items-end gap-0.5 h-3 pl-1 flex-shrink-0">
            <span className="w-0.5 bg-sky-300 rounded-full animate-pulse h-2" />
            <span className="w-0.5 bg-sky-400 rounded-full animate-pulse h-3" style={{ animationDelay: '0.2s' }} />
            <span className="w-0.5 bg-blue-300 rounded-full animate-pulse h-1.5" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>

        {/* The Exact Requested Button */}
        <button
          onClick={handleEnter}
          autoFocus
          className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm sm:text-base font-bold text-white shadow-[0_0_30px_rgba(74,144,226,0.6)] border border-sky-300/50 hover:border-white transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1d357d 0%, #3a86ff 50%, #70a1ff 100%)',
          }}
        >
          <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          <Sparkles className="w-4 h-4 text-sky-200" />
          <span className="tracking-wide drop-shadow">Tap to Enter Our Universe 💙🎵</span>
          <Heart className="w-4 h-4 text-sky-200 fill-sky-200 animate-pulse" />
        </button>

        <p className="mt-4 text-[11px] font-handwriting text-sky-300/60">
          Touch the button to start the music & enter our journey ✨
        </p>

      </div>
    </div>
  );
};

