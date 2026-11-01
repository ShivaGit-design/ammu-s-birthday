import React, { useState, useEffect } from 'react';
import { Mail, Heart, FastForward, Play, Pause, RotateCcw } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../../config';
import { romanticAudio } from '../../utils/audio';

export const Slide5LoveLetter: React.FC = () => {
  const fullText = BIRTHDAY_CONFIG.slide5.paragraphs.join('\n\n');
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

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
      setDisplayedLength((prev) => Math.min(prev + 3, fullText.length));
    }, 25);

    return () => clearTimeout(timer);
  }, [isTyping, isEnvelopeOpen, displayedLength, fullText.length]);

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
    romanticAudio.playSparkle();
  };

  const displayedContent = fullText.slice(0, displayedLength);

  return (
    <div className="relative w-full h-full min-h-screen flex flex-col items-center justify-center px-4 py-16 select-none z-10 text-center">
      
      {/* Background Soft Blue Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] rounded-full bg-gradient-to-tr from-sky-400/15 via-blue-700/10 to-indigo-900/20 blur-[140px] pointer-events-none" />

      {/* Scene Tag */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-200 text-xs font-semibold tracking-widest uppercase border border-sky-400/30 mb-3 animate-pulse-glow">
        <Mail className="w-3.5 h-3.5 text-sky-300" />
        <span>{BIRTHDAY_CONFIG.slide5.tag}</span>
      </div>

      {/* Title */}
      <div className="max-w-xl mx-auto space-y-1 mb-4">
        <h2 className="text-3xl sm:text-5xl font-bold font-script text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-blue-300 drop-shadow-[0_0_25px_rgba(112,161,255,0.6)]">
          {BIRTHDAY_CONFIG.slide5.title}
        </h2>
        <p className="text-xs sm:text-sm text-sky-200/70 font-handwriting text-base sm:text-lg">
          Written with infinite love & care for Ammu 💙
        </p>
      </div>

      {/* Letter Container */}
      <div className="max-w-2xl w-full relative">
        
        {/* Floating corner flowers and hearts */}
        <div className="absolute -top-3 -left-3 text-2xl z-20 animate-float select-none">🌸</div>
        <div className="absolute -top-3 -right-3 text-2xl z-20 animate-float-reverse select-none">💙</div>
        <div className="absolute -bottom-3 -left-3 text-2xl z-20 animate-float-slow select-none">💙</div>
        <div className="absolute -bottom-3 -right-3 text-2xl z-20 animate-float select-none">🌸</div>

        {/* Parchment Sheet */}
        <div className="relative rounded-3xl bg-[#091338]/90 text-slate-100 p-5 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-sky-300/30 backdrop-blur-xl overflow-hidden max-h-[58vh] sm:max-h-[62vh] overflow-y-auto">
          
          {/* Subtle lined pattern */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, #70a1ff, #70a1ff 1px, transparent 1px, transparent 32px)',
            }}
          />

          {/* Top Header inside letter */}
          <div className="flex items-center justify-between border-b border-sky-400/20 pb-3 mb-5">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-handwriting text-sky-300 font-bold tracking-wider">
              <span>🌸</span>
              <span>November 16 • For My Ammu</span>
            </div>
            <div className="flex items-center gap-2 text-sky-300">
              <span className="text-xs font-handwriting">Only For You</span>
              <Heart className="w-4 h-4 text-sky-400 fill-sky-400" />
            </div>
          </div>

          {/* Letter Body */}
          <div className="font-handwriting text-base sm:text-lg md:text-xl leading-relaxed text-sky-50 whitespace-pre-line tracking-wide text-left">
            {displayedContent}
            {isTyping && (
              <span className="inline-block w-2 h-5 bg-sky-400 ml-1 animate-pulse align-middle" />
            )}
          </div>

          {/* Signature when complete */}
          {displayedLength >= fullText.length && (
            <div className="mt-8 pt-5 border-t border-sky-400/20 flex flex-col items-end animate-fadeIn space-y-1 text-right">
              <div className="font-script text-2xl sm:text-3xl text-sky-300 font-bold">
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
        <div className="mt-3 flex items-center justify-between px-2 text-xs">
          <div className="flex items-center gap-2">
            {displayedLength < fullText.length ? (
              <>
                <button
                  onClick={handleToggleTyping}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full glass-card text-sky-200 hover:text-white transition-all text-xs"
                >
                  {isTyping ? <Pause className="w-3.5 h-3.5 text-sky-400" /> : <Play className="w-3.5 h-3.5 text-sky-400" />}
                  <span>{isTyping ? 'Pause' : 'Resume'}</span>
                </button>
                <button
                  onClick={handleSkipTyping}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full glass-card text-sky-300 hover:text-white transition-all text-xs"
                >
                  <FastForward className="w-3.5 h-3.5 text-sky-400" />
                  <span>Read all at once</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full glass-card text-sky-200 hover:text-white transition-all text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
                <span>Re-type letter</span>
              </button>
            )}
          </div>

          <div className="text-sky-300/60 font-mono text-[11px]">
            {Math.round((displayedLength / fullText.length) * 100)}% read
          </div>
        </div>

      </div>

    </div>
  );
};
