import React, { useState, useEffect, useRef } from 'react';
import { Heart, FastForward, Play, Pause, RotateCcw } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';
import { romanticAudio } from '../utils/audio';

export const LoveLetter: React.FC = () => {
  const fullText = BIRTHDAY_CONFIG.loveLetter.paragraphs.join('\n\n');
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  // Start typing when section comes into viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    if (letterRef.current) {
      observer.observe(letterRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  // Typing effect loop
  useEffect(() => {
    if (!hasStarted || !isTyping) return;

    if (displayedLength >= fullText.length) {
      const doneTimer = setTimeout(() => setIsTyping(false), 0);
      return () => clearTimeout(doneTimer);
    }

    const timer = setTimeout(() => {
      // Step by 2 or 3 chars for smooth pace without being agonizingly slow
      setDisplayedLength(prev => Math.min(prev + 3, fullText.length));
    }, 28);

    return () => clearTimeout(timer);
  }, [hasStarted, isTyping, displayedLength, fullText.length]);

  const handleSkipTyping = () => {
    setDisplayedLength(fullText.length);
    setIsTyping(false);
    romanticAudio.playSparkle();
  };

  const handleToggleTyping = () => {
    setIsTyping(!isTyping);
  };

  const handleRestart = () => {
    setDisplayedLength(0);
    setIsTyping(true);
  };

  const displayedContent = fullText.slice(0, displayedLength);

  return (
    <section ref={letterRef} className="py-14 md:py-24 px-4 flex flex-col items-center justify-center relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[650px] h-[400px] md:h-[650px] bg-pink-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Section Title */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-card text-ammu-blush text-xs font-semibold uppercase tracking-widest border border-pink-400/20">
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
          <span>A Sincere Message From My Heart</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-script text-transparent bg-clip-text bg-gradient-to-r from-ammu-babyBlue via-white to-ammu-blush drop-shadow">
          Personal Letter for Ammu 💌
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 font-handwriting text-lg sm:text-xl">
          Every word written with infinite love & care
        </p>
      </div>

      {/* Beautiful Letter Parchment Container */}
      <div className="max-w-2xl w-full relative">
        {/* Floating Pink Flowers & Blue Hearts on Parchment Corners */}
        <div className="absolute -top-4 -left-4 text-2xl md:text-3xl z-20 animate-float select-none">
          🌸
        </div>
        <div className="absolute -top-3 -right-3 text-2xl md:text-3xl z-20 animate-float-reverse select-none">
          💙
        </div>
        <div className="absolute -bottom-4 -left-3 text-2xl md:text-3xl z-20 animate-float-slow select-none">
          💙
        </div>
        <div className="absolute -bottom-4 -right-4 text-2xl md:text-3xl z-20 animate-float select-none">
          🌸
        </div>

        {/* Paper Sheet */}
        <div className="relative rounded-3xl bg-[#fffef9] text-slate-800 p-6 sm:p-10 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.4)] border-2 border-[#f0e6d6] overflow-hidden">
          
          {/* Subtle Lined Notebook Paper Texture / Faint Lines */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, #3a86ff, #3a86ff 1px, transparent 1px, transparent 32px)',
            }}
          />

          {/* Delicate Top Floral Header inside letter */}
          <div className="flex items-center justify-between border-b border-pink-200/80 pb-3 mb-6">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-handwriting text-ammu-blue font-bold tracking-wider">
              <span>🌸</span>
              <span>November 16 • Ammu&apos;s Special Day</span>
            </div>
            <div className="flex items-center gap-2 text-pink-500">
              <span className="text-xs font-handwriting">Only For You</span>
              <Heart className="w-4 h-4 fill-pink-400" />
            </div>
          </div>

          {/* Letter Body - Handwritten font style */}
          <div className="font-handwriting text-lg sm:text-xl md:text-2xl leading-relaxed text-slate-800 whitespace-pre-line tracking-wide">
            {displayedContent}
            {isTyping && (
              <span className="inline-block w-2 h-5 bg-ammu-blue/70 ml-1 animate-pulse align-middle" />
            )}
          </div>

          {/* Handwritten Animated Signature */}
          {displayedLength >= fullText.length && (
            <div className="mt-8 pt-6 border-t border-pink-200/80 flex flex-col items-end animate-fadeIn space-y-1">
              <div className="font-script text-2xl sm:text-3xl text-ammu-blue font-bold tracking-wide">
                {BIRTHDAY_CONFIG.loveLetter.signature}
              </div>
              <div className="text-xs sm:text-sm font-handwriting text-pink-600 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-pink-500 inline" />
                <span>{BIRTHDAY_CONFIG.loveLetter.closingNote}</span>
              </div>
            </div>
          )}

          {/* Wax Seal / Stamp Bottom Left */}
          <div className="mt-6 flex items-center justify-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-handwriting font-bold">
              <span>💙 Forever & Always Sealed</span>
            </div>
          </div>
        </div>

        {/* Playback & Skip Controls Bar */}
        <div className="mt-4 flex items-center justify-between px-2 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            {displayedLength < fullText.length ? (
              <>
                <button
                  onClick={handleToggleTyping}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full glass-card text-slate-200 hover:text-white transition-all text-xs"
                >
                  {isTyping ? <Pause className="w-3.5 h-3.5 text-ammu-sky" /> : <Play className="w-3.5 h-3.5 text-ammu-sky" />}
                  <span>{isTyping ? 'Pause typing' : 'Resume'}</span>
                </button>
                <button
                  onClick={handleSkipTyping}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full glass-card text-ammu-babyBlue hover:text-white transition-all text-xs"
                >
                  <FastForward className="w-3.5 h-3.5 text-ammu-gold" />
                  <span>Read all at once</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full glass-card text-slate-200 hover:text-white transition-all text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5 text-ammu-sky" />
                <span>Re-type letter</span>
              </button>
            )}
          </div>

          <div className="text-slate-400 font-mono text-[11px]">
            {Math.round((displayedLength / fullText.length) * 100)}% read
          </div>
        </div>

      </div>
    </section>
  );
};
