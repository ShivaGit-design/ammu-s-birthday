import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Share2, Menu, X, Heart, Sparkles } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';
import { romanticAudio } from '../utils/audio';

interface CinematicNavigationProps {
  currentSlide: number; // 1 to 12
  totalSlides: number;  // 12
  onNext: () => void;
  onPrev: () => void;
  onJumpToSlide: (slideNumber: number) => void;
  onOpenShare: () => void;
  onOpenMusicModal?: () => void;
}

export const CinematicNavigation: React.FC<CinematicNavigationProps> = ({
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
  onJumpToSlide,
  onOpenShare,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sceneTitles = [
    "01 • The Mysterious Opening 🌙",
    "02 • Our First Coffee Date ☕",
    "03 • Our Movie Date 🎬🍿",
    "04 • Our First Picture 📸",
    "05 • Our Beautiful Memories 💙",
    "06 • A Letter From My Heart 💌",
    "07 • Our Special Video 🎬",
    "08 • Our Tamil Love Song 🎵",
    "09 • Reasons I Love You ❤️",
    "10 • Our Little Universe 🌙",
    "11 • The Final Birthday Surprise 🎂💙",
    "12 • Our Special Love Code ♾️💙",
  ];

  const handleNextClick = () => {
    romanticAudio.playSparkle();
    onNext();
  };

  const handlePrevClick = () => {
    romanticAudio.playSparkle();
    onPrev();
  };

  const progressPercentage = ((currentSlide - 1) / (totalSlides - 1)) * 100;

  return (
    <>
      {/* 1. TOP CINEMATIC HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40 select-none backdrop-blur-md bg-[#050818]/60 border-b border-sky-400/15 transition-all">
        {/* Slim Progress Bar */}
        <div className="w-full h-1 bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300 shadow-[0_0_10px_#70a1ff] transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between text-xs">
          {/* Brand & Slide Counter */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-1.5 rounded-lg glass-card hover:bg-white/10 text-sky-200 hover:text-white transition-all flex items-center gap-1.5"
              title="Open scene selector"
            >
              <Menu className="w-4 h-4 text-sky-300" />
              <span className="hidden sm:inline font-mono text-[11px]">Scenes</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="font-script text-lg sm:text-xl font-bold text-white tracking-wide">
                {BIRTHDAY_CONFIG.nickname}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-200">
                {String(currentSlide).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Quick Scene Name for desktop */}
          <div className="hidden md:block font-handwriting text-base text-sky-200/80 truncate max-w-xs">
            {sceneTitles[currentSlide - 1]}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card hover:bg-white/10 text-sky-200 hover:text-white transition-all border border-sky-400/30 font-semibold"
              title="Share message to send with link"
            >
              <Share2 className="w-3.5 h-3.5 text-sky-300" />
              <span className="hidden xs:inline">Send to Ammu</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. DOCKED SLIDE CONTROLS (Floating Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 select-none">
        {currentSlide > 1 && (
          <button
            onClick={handlePrevClick}
            className="p-3 rounded-full glass-card border border-sky-400/30 hover:border-sky-300 text-sky-200 hover:text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
            title="Previous scene (Left Arrow)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {currentSlide < totalSlides && (
          <button
            onClick={handleNextClick}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm shadow-[0_0_25px_rgba(74,144,226,0.5)] border border-sky-300/40 hover:scale-105 active:scale-95 transition-all"
            title="Next scene (Right Arrow / Space)"
          >
            <span>{currentSlide === 11 ? "Our Special Love Code 💙" : "Next Scene"}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 3. SCENE SELECTOR DRAWER / MODAL */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="max-w-md w-full glass-card rounded-3xl p-6 border border-sky-400/30 shadow-2xl relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-sky-400/20 mb-4">
              <div className="flex items-center gap-2 text-sky-200">
                <Sparkles className="w-4 h-4 text-sky-300" />
                <h3 className="text-base font-bold font-script text-xl text-white">
                  Scenes of Our Love Story
                </h3>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
              {sceneTitles.map((title, idx) => {
                const slideNum = idx + 1;
                const isActive = slideNum === currentSlide;

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      romanticAudio.playSparkle();
                      onJumpToSlide(slideNum);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-sky-500/20 border border-sky-400/50 text-white font-bold shadow'
                        : 'hover:bg-white/5 text-sky-200/80 hover:text-white'
                    }`}
                  >
                    <span>{title}</span>
                    {isActive && <Heart className="w-3.5 h-3.5 text-sky-400 fill-sky-400" />}
                  </button>
                );
              })}
            </div>

            <p className="mt-4 pt-3 border-t border-sky-400/20 text-[11px] text-sky-300/60 font-handwriting text-center text-sm">
              Touch any scene to travel through our universe 💙🌝
            </p>
          </div>
        </div>
      )}
    </>
  );
};
