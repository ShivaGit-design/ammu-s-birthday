import React, { useState, useEffect } from 'react';
import { Coffee, Upload, Sparkles, Heart, Edit3, Check, Trash2 } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../../config';
import { romanticAudio } from '../../utils/audio';
import { getMediaItem, saveMediaItem, removeMediaItem } from '../../utils/mediaStorage';

export const Slide2CoffeeDate: React.FC = () => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(BIRTHDAY_CONFIG.slide2.defaultImage || null);
  const [caption, setCaption] = useState(BIRTHDAY_CONFIG.slide2.defaultCaption);
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [tempCaption, setTempCaption] = useState(caption);

  useEffect(() => {
    // Load persisted coffee photo if available
    getMediaItem('coffee_date_photo').then((item) => {
      if (item instanceof Blob) {
        setPhotoUrl(URL.createObjectURL(item));
      } else if (typeof item === 'string' && item) {
        setPhotoUrl(item);
      }
    });

    // Load persisted custom caption if available
    getMediaItem('coffee_date_caption').then((item) => {
      if (typeof item === 'string' && item) {
        setCaption(item);
        setTempCaption(item);
      }
    });
  }, []);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        alert("Image is larger than 25MB. Please choose a slightly smaller file.");
        return;
      }
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
      romanticAudio.playSparkle();
      await saveMediaItem('coffee_date_photo', file);
    }
  };

  const handleRemovePhoto = async () => {
    setPhotoUrl(null);
    await removeMediaItem('coffee_date_photo');
    romanticAudio.playGiftPop();
  };

  const handleSaveCaption = async () => {
    setCaption(tempCaption);
    setIsEditingCaption(false);
    romanticAudio.playSparkle();
    await saveMediaItem('coffee_date_caption', tempCaption);
  };

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center px-3 sm:px-6 pt-16 sm:pt-20 pb-36 sm:pb-32 select-none z-10 text-center overflow-x-hidden">
      
      {/* Background Soft Blue Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[600px] h-[380px] sm:h-[600px] rounded-full bg-gradient-to-tr from-sky-500/15 via-blue-700/10 to-indigo-900/20 blur-[130px] pointer-events-none" />

      {/* Scene Tag */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-200 text-xs font-semibold tracking-widest uppercase border border-sky-400/30 mb-4 animate-pulse-glow">
        <Coffee className="w-3.5 h-3.5 text-sky-300" />
        <span>{BIRTHDAY_CONFIG.slide2.tag}</span>
      </div>

      {/* Main Title & Subtitle */}
      <div className="max-w-xl mx-auto space-y-2 mb-6">
        <h2 className="text-3xl sm:text-5xl font-bold font-script text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-blue-300 drop-shadow-[0_0_25px_rgba(112,161,255,0.6)]">
          {BIRTHDAY_CONFIG.slide2.title}
        </h2>
        <p className="text-xs sm:text-sm text-sky-200/70 font-handwriting text-base sm:text-lg">
          {BIRTHDAY_CONFIG.slide2.subtitle}
        </p>
      </div>

      {/* Central Visual Card: Photo with Animated Coffee Aura */}
      <div className="relative max-w-md w-full glass-card rounded-3xl p-4 sm:p-6 border border-sky-300/30 shadow-[0_15px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        
        {/* Floating Steam SVGs on top of card */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none opacity-80 z-20">
          <svg className="w-16 h-12 text-sky-300 animate-float-slow" viewBox="0 0 40 40" fill="none">
            <path
              d="M10 30 Q15 20 10 10 Q5 0 10 -10"
              stroke="rgba(180, 212, 255, 0.6)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M20 35 Q25 22 20 12 Q15 2 20 -8"
              stroke="rgba(255, 255, 255, 0.7)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M30 30 Q35 20 30 10 Q25 0 30 -10"
              stroke="rgba(180, 212, 255, 0.6)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Photo Container / Romantic Placeholder */}
        <div className="relative w-full h-52 xs:h-64 sm:h-72 rounded-2xl overflow-hidden bg-gradient-to-b from-[#0c163b] to-[#070e29] border border-sky-400/20 shadow-inner flex items-center justify-center group">
          {photoUrl ? (
            <div className="relative w-full h-full animate-fadeIn">
              <img
                src={photoUrl}
                alt="Our First Coffee Date"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Soft vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070a1e]/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Photo controls overlay */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20">
                <label className="cursor-pointer p-2 rounded-full bg-sky-600/80 hover:bg-sky-500 text-white shadow-lg backdrop-blur-md transition-all hover:scale-110">
                  <Upload className="w-4 h-4" />
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                </label>
                <button
                  onClick={handleRemovePhoto}
                  className="p-2 rounded-full bg-rose-600/80 hover:bg-rose-500 text-white shadow-lg backdrop-blur-md transition-all hover:scale-110"
                  title="Remove photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Attractive Cinematic Coffee Date Placeholder */
            <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-sky-500/20 to-blue-700/20 border border-sky-300/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Coffee className="w-12 h-12 text-sky-200 drop-shadow-[0_0_15px_#70a1ff] animate-pulse" />
                <span className="absolute -top-1 -right-1 text-sm animate-bounce">☕</span>
                <span className="absolute -bottom-1 -left-1 text-xs">💙</span>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-semibold text-sky-100">
                  Our First Coffee Date Photo
                </p>
                <p className="text-xs text-sky-200/60 font-handwriting text-base">
                  {BIRTHDAY_CONFIG.slide2.placeholderHint}
                </p>
              </div>

              {/* Upload Button */}
              <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-semibold uppercase tracking-wider shadow-[0_0_20px_rgba(74,144,226,0.4)] transition-all hover:scale-105 active:scale-95">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Our Photo 📸</span>
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </label>
            </div>
          )}
        </div>

        {/* Romantic Caption & Message Container */}
        <div className="mt-4 pt-3 border-t border-sky-400/20 text-left">
          {isEditingCaption ? (
            <div className="space-y-2">
              <textarea
                value={tempCaption}
                onChange={(e) => setTempCaption(e.target.value)}
                className="w-full h-20 p-2.5 rounded-xl bg-white/10 border border-sky-300/40 text-xs sm:text-sm text-white font-sans focus:outline-none focus:border-sky-300"
                placeholder="Write your personal coffee date memory..."
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditingCaption(false)}
                  className="px-3 py-1 rounded-lg bg-white/10 text-xs text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCaption}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="relative group/caption">
              <p className="font-handwriting text-base sm:text-lg text-sky-100 leading-relaxed pr-6">
                &ldquo;{caption}&rdquo;
              </p>
              <button
                onClick={() => setIsEditingCaption(true)}
                className="absolute top-0 right-0 p-1 text-sky-300/60 hover:text-sky-200 transition-colors"
                title="Edit caption"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="mt-2 flex items-center justify-between text-[11px] text-sky-300/60 font-mono">
            <span>{BIRTHDAY_CONFIG.slide2.date}</span>
            <span className="flex items-center gap-1 font-handwriting text-xs text-sky-200">
              <Heart className="w-3 h-3 text-sky-400 fill-sky-400 inline" />
              The day our world began
            </span>
          </div>
        </div>

      </div>

      <div className="mt-4 text-xs font-handwriting text-sky-300/60 flex items-center gap-1">
        <Sparkles className="w-3 h-3 text-sky-300 inline" />
        <span>Swipe or tap next for our very first photograph 📸</span>
      </div>

    </div>
  );
};
