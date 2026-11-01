import React, { useState, useEffect } from 'react';
import { Heart, Share2, RotateCcw } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';

interface NavbarProps {
  onReplay: () => void;
  onOpenShare: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReplay, onOpenShare }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 py-3 select-none ${
        scrolled
          ? 'glass-card border-b border-ammu-sky/20 shadow-lg py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand / Name */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-ammu-sky to-ammu-pink flex items-center justify-center shadow-md animate-pulse">
            <Heart className="w-4 h-4 text-white fill-white" />
          </div>
          <div>
            <span className="font-script text-xl sm:text-2xl font-bold text-white tracking-wide">
              {BIRTHDAY_CONFIG.nickname}
            </span>
            <span className="hidden sm:inline-block ml-2 text-[11px] text-ammu-babyBlue/80 font-mono">
              Nov 16
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Share Message Button */}
          <button
            onClick={onOpenShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card hover:bg-white/10 text-ammu-babyBlue hover:text-white text-xs font-semibold border border-ammu-sky/30 transition-all shadow-sm"
            title="Get message to send with website"
          >
            <Share2 className="w-3.5 h-3.5 text-ammu-sky" />
            <span className="hidden xs:inline">Send to Ammu</span>
          </button>

          {/* Replay Envelope Button */}
          <button
            onClick={onReplay}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-ammu-sky to-ammu-pink hover:opacity-90 text-white text-xs font-semibold shadow-md transition-all hover:scale-105 active:scale-95"
            title="Replay opening envelope"
          >
            <RotateCcw className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline">Replay Surprise</span>
          </button>
        </div>
      </div>
    </header>
  );
};
