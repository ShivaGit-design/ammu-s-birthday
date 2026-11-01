import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Share2, Menu, X, Heart, Sparkles } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';
import { romanticAudio } from '../utils/audio';

interface CinematicNavigationProps {
  currentSlide: number; // 1 to 11
  totalSlides: number;  // 11
  onNext: () => void;
  onPrev: () => void;
  onJumpToSlide: (slideNumber: number) => void;
  onOpenShare: () => void;
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

  // Exact 11 Scenes matching the cinematic structure
  const sceneTitles = [
    "01 • The Mysterious Opening 🌙",
    "02 • Our First Coffee Date ☕",
    "03 • Our First Picture 📸",
    "04 • Our Beautiful Memories 💙",
    "05 • Words From the Heart 💌",
    "06 • Our Special Video 🎬",
    "07 • Our Tamil Love Song 🎵",
    "08 • Reasons I Love You ❤️",
    "09 • Our Little Universe 🌙",
    "10 • The Final Birthday Surprise 🎂💙",
    "11 • OUR SPECIAL LOVE CODE ♾️💙",
  ];

  const handleNextClick = () => {
    romanticAudio.playSparkle();
    onNext();
  };

  const handlePrevClick = () => {
    romanticAudio.playSparkle();
    onPrev();
  };

  const progressPercentage = ((currentSlide - 1) / Math.max(totalSlides - 1, 1)) * 100;

  return (
    <>
      {/* 1. TOP CINEMATIC HEADER WITH SAFE AREA INSET */}
      <header className="fixed top-0 left-0 right-0 z-40 select-none backdrop-blur-md bg-[#050818]/70 border-b border-sky-400/15 transition-all pt-[env(safe-area-inset-top,0px)]">
        {/* Slim Illuminated Progress Bar */}
        <div className="w-full h-1 bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300 shadow-[0_0_10px_#70a1ff] transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between text-xs">
          {/* Brand & Slide Counter */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl glass-card hover:bg-white/10 text-sky-200 hover:text-white transition-all flex items-center gap-1.5 border border-sky-400/25 active:scale-95"
              title="Open scene selector"
              aria-label="Open scenes list"
            >
              <Menu className="w-4 h-4 text-sky-300" />
              <span className="hidden xs:inline font-mono text-[11px] font-semibold">Scenes</span>
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-script text-base sm:text-xl font-bold text-white tracking-wide truncate max-w-[100px] xs:max-w-none">
                {BIRTHDAY_CONFIG.nickname}
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-200 flex-shrink-0">
                {String(currentSlide).padStart(2, '0')}/{String(totalSlides).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Quick Scene Name for tablet & desktop */}
          <div className="hidden md:block font-handwriting text-sm lg:text-base text-sky-200/80 truncate max-w-xs lg:max-w-md">
            {sceneTitles[currentSlide - 1]}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenShare}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full glass-card hover:bg-white/10 text-sky-200 hover:text-white transition-all border border-sky-400/30 font-semibold active:scale-95 flex-shrink-0"
              title="Share message to send with link"
            >
              <Share2 className="w-3.5 h-3.5 text-sky-300" />
              <span className="hidden sm:inline">Send to Ammu</span>
              <span className="sm:hidden text-[11px]">Share</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. DOCKED SLIDE CONTROLS (Floating at the bottom, separate from music player) */}
      <div
        className="fixed z-40 select-none transition-all duration-300
          bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] left-3 right-3 sm:left-auto sm:right-5 sm:bottom-5 md:bottom-6 md:right-6
          flex items-center justify-between sm:justify-end gap-2 max-w-[340px] sm:max-w-none mx-auto sm:mx-0"
      >
        {/* Previous Scene Button */}
        {currentSlide > 1 ? (
          <button
            onClick={handlePrevClick}
            className="inline-flex items-center gap-1 px-3.5 py-2.5 sm:p-3 rounded-full glass-card border border-sky-400/30 hover:border-sky-300 text-sky-200 hover:text-white shadow-xl hover:scale-105 active:scale-95 transition-all text-xs font-semibold backdrop-blur-xl"
            title="Previous scene (Left Arrow)"
            aria-label="Previous scene"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="sm:hidden font-mono">Prev</span>
          </button>
        ) : (
          <div className="w-0 sm:hidden" />
        )}

        {/* Next Scene Button */}
        {currentSlide < totalSlides && (
          <button
            onClick={handleNextClick}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm shadow-[0_0_25px_rgba(74,144,226,0.5)] border border-sky-300/40 hover:scale-105 active:scale-95 transition-all flex-shrink-0"
            title="Next scene (Right Arrow / Space)"
            aria-label="Next scene"
          >
            <span>
              {currentSlide === 10 ? "Love Code ♾️💙" : "Next Scene"}
            </span>
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
            className="max-w-md w-full glass-card rounded-3xl p-5 sm:p-6 border border-sky-400/30 shadow-2xl relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-sky-400/20 mb-3 sm:mb-4">
              <div className="flex items-center gap-2 text-sky-200">
                <Sparkles className="w-4 h-4 text-sky-300" />
                <h3 className="text-base sm:text-lg font-bold font-script text-white">
                  Scenes of Our Love Story
                </h3>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95"
                aria-label="Close scenes list"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5 max-h-[55vh] sm:max-h-[60vh] overflow-y-auto pr-1 scrollbar-thin">
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
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-between active:scale-98 ${
                      isActive
                        ? 'bg-sky-500/25 border border-sky-400/50 text-white font-bold shadow-[0_0_15px_rgba(112,161,255,0.3)]'
                        : 'hover:bg-white/5 text-sky-200/80 hover:text-white'
                    }`}
                  >
                    <span className="truncate pr-2">{title}</span>
                    {isActive && <Heart className="w-3.5 h-3.5 text-sky-400 fill-sky-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            <p className="mt-3 sm:mt-4 pt-3 border-t border-sky-400/20 text-[11px] text-sky-300/70 font-handwriting text-center text-sm">
              Touch any scene to travel through our universe 💙🌝
            </p>
          </div>
        </div>
      )}
    </>
  );
};
