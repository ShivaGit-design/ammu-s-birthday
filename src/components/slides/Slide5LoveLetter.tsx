import React, { useState, useEffect, useRef } from 'react';
import { Mail, Heart, FastForward, Play, Pause, RotateCcw } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../../config';
import { romanticAudio } from '../../utils/audio';

export const Slide5LoveLetter: React.FC = () => {
  const fullText = BIRTHDAY_CONFIG.slide5.paragraphs.join('\n\n');
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const letterBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Open envelope after 500ms
    const t = setTimeout(() => {
      setIsEnvelopeOpen(true);
      setIsTyping(true);
      romanticAudio.playSparkle();
    }, 600);

    return () => clearTimeout(t);
  }, []);

  // Typewriter loop
  useEffect(() => {
    if (!isTyping || !isEnvelopeOpen) return;

    if (displayedLength >= fullText.length) {
      const doneTimer = setTimeout(() => setIsTyping(false), 0);
      return () => clearTimeout(doneTimer);
    }

    const timer = setTimeout(() => {
      setDisplayedLength((prev) => {
        const next = Math.min(prev + 3, fullText.length);
        return next;
      });
      // Gently keep the latest typed text in view
      if (letterBodyRef.current && letterBodyRef.current.scrollTop + letterBodyRef.current.clientHeight < letterBodyRef.current.scrollHeight - 40) {
        letterBodyRef.current.scrollTop = letterBodyRef.current.scrollHeight;
      }
    }, 25);

    return () => clearTimeout(timer);
  }, [isTyping, isEnvelopeOpen, displayedLength, fullText.length]);

  const handleSkipTyping = () => {
    setDisplayedLength(fullText.length);
    setIsTyping(false);
    romanticAudio.playSparkle();
    if (letterBodyRef.current) {
      setTimeout(() => {
        if (letterBodyRef.current) {
          letterBodyRef.current.scrollTop = letterBodyRef.current.scrollHeight;
        }
      }, 50);
    }
  };

  const handleToggleTyping = () => {
    setIsTyping(!isTyping);
  };

  const handleRestart = () => {
    setDisplayedLength(0);
    setIsTyping(true);
    romanticAudio.playSparkle();
    if (letterBodyRef.current) {
      letterBodyRef.current.scrollTop = 0;
    }
  };

  const displayedContent = fullText.slice(0, displayedLength);

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center px-3 sm:px-6 pt-16 sm:pt-20 pb-36 sm:pb-32 select-none z-10 text-center overflow-x-hidden">
      
      {/* Background Soft Blue Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[650px] h-[320px] sm:h-[650px] rounded-full bg-gradient-to-tr from-sky-400/15 via-blue-700/10 to-indigo-900/20 blur-[130px] pointer-events-none" />

      {/* Scene Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full glass-card text-sky-200 text-[11px] sm:text-xs font-semibold tracking-widest uppercase border border-sky-400/30 mb-2.5 sm:mb-3 animate-pulse-glow">
        <Mail className="w-3.5 h-3.5 text-sky-300" />
        <span>{BIRTHDAY_CONFIG.slide5.tag}</span>
      </div>

      {/* Title */}
      <div className="max-w-xl mx-auto space-y-1 mb-3 sm:mb-4 px-2">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-script text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-blue-300 drop-shadow-[0_0_25px_rgba(112,161,255,0.6)]">
          {BIRTHDAY_CONFIG.slide5.title}
        </h2>
        <p className="text-xs sm:text-sm text-sky-200/70 font-handwriting text-sm sm:text-lg">
          Written with infinite love & care for Ammu 💙
        </p>
      </div>

      {/* Letter Container */}
      <div className="max-w-2xl w-full relative">
        
        {/* Floating corner flowers and hearts */}
        <div className="absolute -top-2.5 -left-2 text-xl sm:text-2xl z-20 animate-float select-none">🌸</div>
        <div className="absolute -top-2.5 -right-2 text-xl sm:text-2xl z-20 animate-float-reverse select-none">💙</div>
        <div className="absolute -bottom-2.5 -left-2 text-xl sm:text-2xl z-20 animate-float-slow select-none">💙</div>
        <div className="absolute -bottom-2.5 -right-2 text-xl sm:text-2xl z-20 animate-float select-none">🌸</div>

        {/* Parchment Sheet */}
        <div
          ref={letterBodyRef}
          className="relative rounded-3xl bg-[#091338]/90 text-slate-100 p-4 sm:p-7 md:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-sky-300/30 backdrop-blur-xl overflow-x-hidden max-h-[46vh] xs:max-h-[50vh] sm:max-h-[56vh] overflow-y-auto overscroll-contain scrollbar-thin text-left"
        >
          {/* Subtle lined pattern */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, #70a1ff, #70a1ff 1px, transparent 1px, transparent 32px)',
            }}
          />

          {/* Top Header inside letter */}
          <div className="flex items-center justify-between border-b border-sky-400/20 pb-2.5 mb-4">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-handwriting text-sky-300 font-bold tracking-wider">
              <span>🌸</span>
              <span>November 16 • For My Ammu</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-sky-300">
              <span className="text-[11px] sm:text-xs font-handwriting">Only For You</span>
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 fill-sky-400 flex-shrink-0" />
            </div>
          </div>

          {/* Letter Body */}
          <div className="font-handwriting text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose text-sky-50 whitespace-pre-line tracking-wide break-words">
            {displayedContent}
            {isTyping && (
              <span className="inline-block w-1.5 sm:w-2 h-4 sm:h-5 bg-sky-400 ml-1 animate-pulse align-middle" />
            )}
          </div>

          {/* Signature when complete */}
          {displayedLength >= fullText.length && (
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-sky-400/20 flex flex-col items-end animate-fadeIn space-y-1 text-right">
              <div className="font-script text-xl sm:text-3xl text-sky-300 font-bold">
                {BIRTHDAY_CONFIG.slide5.signature}
              </div>
              <div className="text-xs sm:text-sm font-handwriting text-sky-200/80 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-sky-400 text-sky-400 inline" />
                <span>{BIRTHDAY_CONFIG.slide5.closingNote}</span>
              </div>
            </div>
          )}
        </div>

        {/* Playback & Skip Controls Bar */}
        <div className="mt-2.5 sm:mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
          <div className="flex items-center gap-2">
            {displayedLength < fullText.length ? (
              <>
                <button
                  onClick={handleToggleTyping}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full glass-card text-sky-200 hover:text-white transition-all text-[11px] sm:text-xs border border-sky-400/25 active:scale-95"
                >
                  {isTyping ? <Pause className="w-3 h-3 text-sky-400" /> : <Play className="w-3 h-3 text-sky-400 ml-0.5" />}
                  <span>{isTyping ? 'Pause' : 'Resume'}</span>
                </button>
                <button
                  onClick={handleSkipTyping}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full glass-card text-sky-300 hover:text-white transition-all text-[11px] sm:text-xs border border-sky-400/25 active:scale-95"
                >
                  <FastForward className="w-3 h-3 text-sky-400" />
                  <span>Read all at once</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-card text-sky-200 hover:text-white transition-all text-[11px] sm:text-xs border border-sky-400/30 active:scale-95"
              >
                <RotateCcw className="w-3 h-3 text-sky-400" />
                <span>Re-type letter</span>
              </button>
            )}
          </div>

          <div className="text-sky-300/70 font-mono text-[10px] sm:text-[11px] ml-auto">
            {Math.round((displayedLength / fullText.length) * 100)}% read
          </div>
        </div>

      </div>

    </div>
  );
};
