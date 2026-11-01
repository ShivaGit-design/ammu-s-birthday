import React, { useState, useEffect } from 'react';
import { Moon, Sparkles, Heart, Edit3, Check } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../../config';
import { romanticAudio } from '../../utils/audio';
import { getMediaItem, saveMediaItem } from '../../utils/mediaStorage';

export const Slide9OurUniverse: React.FC = () => {
  const [poeticMessage, setPoeticMessage] = useState(BIRTHDAY_CONFIG.slide9.poeticMessage);
  const [isEditing, setIsEditing] = useState(false);
  const [tempMsg, setTempMsg] = useState(poeticMessage);
  const [constellationDrawn, setConstellationDrawn] = useState(false);

  useEffect(() => {
    getMediaItem('universe_poem').then((item) => {
      if (typeof item === 'string' && item) {
        setPoeticMessage(item);
        setTempMsg(item);
      }
    });

    const timer = setTimeout(() => {
      setConstellationDrawn(true);
      romanticAudio.playSparkle();
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleSave = async () => {
    setPoeticMessage(tempMsg);
    setIsEditing(false);
    romanticAudio.playSparkle();
    await saveMediaItem('universe_poem', tempMsg);
  };

  // Heart Constellation Stars (Coordinates on a 200x200 canvas)
  const constellationStars = [
    { x: 100, y: 140 }, // bottom tip
    { x: 60, y: 100 },  // bottom left
    { x: 45, y: 65 },   // mid left
    { x: 65, y: 45 },   // top left lobe
    { x: 100, y: 70 },  // top center indent
    { x: 135, y: 45 },  // top right lobe
    { x: 155, y: 65 },  // mid right
    { x: 140, y: 100 }, // bottom right
  ];

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center px-3 sm:px-6 pt-16 sm:pt-20 pb-36 sm:pb-32 select-none z-10 text-center overflow-x-hidden">
      
      {/* Deep Space Atmosphere Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[650px] h-[380px] sm:h-[650px] rounded-full bg-gradient-to-tr from-sky-400/20 via-blue-700/10 to-indigo-900/30 blur-[150px] pointer-events-none" />

      {/* Scene Tag */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-200 text-xs font-semibold tracking-widest uppercase border border-sky-400/30 mb-3 animate-pulse-glow">
        <Moon className="w-3.5 h-3.5 text-sky-300" />
        <span>{BIRTHDAY_CONFIG.slide9.tag}</span>
      </div>

      {/* Title */}
      <div className="max-w-xl mx-auto space-y-1 mb-5">
        <h2 className="text-3xl sm:text-5xl font-bold font-script text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-blue-300 drop-shadow-[0_0_25px_rgba(112,161,255,0.6)]">
          {BIRTHDAY_CONFIG.slide9.title}
        </h2>
        <p className="text-xs sm:text-sm text-sky-200/70 font-handwriting text-base sm:text-lg">
          {BIRTHDAY_CONFIG.slide9.subtitle}
        </p>
      </div>

      {/* Floating Constellation & Moon Visual */}
      <div className="relative w-56 h-44 sm:w-72 sm:h-52 my-1 flex items-center justify-center">
        {/* Glowing Heart Constellation SVG */}
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_20px_rgba(112,161,255,0.7)]">
          {/* Lines connecting stars */}
          <path
            d="M100 140 L60 100 L45 65 L65 45 L100 70 L135 45 L155 65 L140 100 Z"
            fill={constellationDrawn ? 'rgba(112, 161, 255, 0.08)' : 'none'}
            stroke="rgba(180, 212, 255, 0.6)"
            strokeWidth="1.5"
            strokeDasharray={constellationDrawn ? 'none' : '4 4'}
            className="transition-all duration-1000"
          />

          {/* Star nodes */}
          {constellationStars.map((st, i) => (
            <g key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}>
              <circle cx={st.x} cy={st.y} r="3" fill="#ffffff" />
              <circle cx={st.x} cy={st.y} r="6" fill="#70a1ff" opacity="0.5" />
            </g>
          ))}
        </svg>

        {/* Orbiting Moon */}
        <div className="absolute -top-3 -right-3 sm:-right-4 w-12 h-12 rounded-full bg-gradient-to-tr from-sky-200 to-white/90 shadow-[0_0_25px_#70a1ff] flex items-center justify-center animate-float">
          <Moon className="w-6 h-6 text-sky-700 fill-sky-700/60" />
        </div>
      </div>

      <div className="text-xs font-handwriting text-sky-300/80 mb-4 flex items-center justify-center gap-1">
        <Sparkles className="w-3.5 h-3.5 text-sky-300" />
        <span>{BIRTHDAY_CONFIG.slide9.constellationText}</span>
      </div>

      {/* Poetic Message Parchment Card */}
      <div className="max-w-lg w-full glass-card rounded-3xl p-5 sm:p-7 border border-sky-300/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative">
        {isEditing ? (
          <div className="space-y-3">
            <textarea
              value={tempMsg}
              onChange={(e) => setTempMsg(e.target.value)}
              className="w-full h-28 p-3 rounded-xl bg-white/10 border border-sky-300/40 text-xs sm:text-sm text-white font-sans focus:outline-none"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsEditing(false)} className="px-3 py-1 bg-white/10 text-xs text-slate-300 rounded-lg">
                Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-1 bg-sky-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="relative group text-left">
            <p className="font-handwriting text-lg sm:text-2xl text-sky-100 leading-relaxed whitespace-pre-line tracking-wide pr-6">
              &ldquo;{poeticMessage}&rdquo;
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="absolute top-0 right-0 p-1 text-sky-300/60 hover:text-sky-200 transition-colors"
              title="Edit poem"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-sky-400/20 flex items-center justify-between text-[11px] text-sky-300/70 font-mono">
          <span>You &amp; Me Under The Same Moon 🌝</span>
          <span className="flex items-center gap-1 font-handwriting text-xs text-sky-200">
            <Heart className="w-3 h-3 text-sky-400 fill-sky-400 inline" />
            Endless Love
          </span>
        </div>
      </div>

    </div>
  );
};
