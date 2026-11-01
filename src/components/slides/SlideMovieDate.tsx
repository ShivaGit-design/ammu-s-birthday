import React, { useState, useEffect } from 'react';
import { Film, Clapperboard, Upload, Heart, Edit3, Check, Trash2, Ticket } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../../config';
import { romanticAudio } from '../../utils/audio';
import { getMediaItem, saveMediaItem, removeMediaItem } from '../../utils/mediaStorage';

export const SlideMovieDate: React.FC = () => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(
    BIRTHDAY_CONFIG.slideMovieDate.defaultImage || null
  );
  const [caption, setCaption] = useState(BIRTHDAY_CONFIG.slideMovieDate.defaultCaption);
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [tempCaption, setTempCaption] = useState(caption);

  useEffect(() => {
    getMediaItem('movie_date_photo').then((item) => {
      if (item instanceof Blob) {
        setPhotoUrl(URL.createObjectURL(item));
      } else if (typeof item === 'string' && item) {
        setPhotoUrl(item);
      } else if (!item && BIRTHDAY_CONFIG.slideMovieDate.defaultImage) {
        setPhotoUrl(BIRTHDAY_CONFIG.slideMovieDate.defaultImage);
      }
    });

    getMediaItem('movie_date_caption').then((item) => {
      if (typeof item === 'string' && item) {
        setCaption(item);
        setTempCaption(item);
      }
    });
  }, []);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 30 * 1024 * 1024) {
        alert("Image is larger than 30MB. Please choose a slightly smaller file.");
        return;
      }
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
      romanticAudio.playSparkle();
      await saveMediaItem('movie_date_photo', file);
    }
  };

  const handleRemovePhoto = async () => {
    setPhotoUrl(null);
    await removeMediaItem('movie_date_photo');
    romanticAudio.playGiftPop();
  };

  const handleSaveCaption = async () => {
    setCaption(tempCaption);
    setIsEditingCaption(false);
    romanticAudio.playSparkle();
    await saveMediaItem('movie_date_caption', tempCaption);
  };

  return (
    <div className="relative w-full h-full min-h-screen flex flex-col items-center justify-center px-4 py-16 select-none z-10 text-center">
      
      {/* Background Dimmed Cinema Blue Ambient Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[650px] h-[380px] sm:h-[650px] rounded-full bg-gradient-to-tr from-sky-600/15 via-blue-800/15 to-indigo-950/30 blur-[140px] pointer-events-none" />

      {/* Scene Tag */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-200 text-xs font-semibold tracking-widest uppercase border border-sky-400/30 mb-3 animate-pulse-glow">
        <Film className="w-3.5 h-3.5 text-sky-300" />
        <span>{BIRTHDAY_CONFIG.slideMovieDate.tag}</span>
      </div>

      {/* Title */}
      <div className="max-w-xl mx-auto space-y-1 mb-5">
        <h2 className="text-3xl sm:text-5xl font-bold font-script text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-blue-300 drop-shadow-[0_0_25px_rgba(112,161,255,0.6)]">
          {BIRTHDAY_CONFIG.slideMovieDate.title}
        </h2>
        <p className="text-xs sm:text-sm text-sky-200/70 font-handwriting text-base sm:text-lg">
          {BIRTHDAY_CONFIG.slideMovieDate.subtitle}
        </p>
      </div>

      {/* Cinema Frame Card */}
      <div className="relative max-w-md w-full">
        
        {/* Floating Ticket SVGs */}
        <div className="absolute -top-7 -right-3 sm:-right-5 text-2xl animate-float-slow select-none z-20">
          🍿
        </div>
        <div className="absolute -top-6 -left-3 sm:-left-5 text-2xl animate-float-reverse select-none z-20">
          🎟️
        </div>

        <div className="glass-card rounded-3xl p-4 sm:p-6 border border-sky-400/30 shadow-[0_15px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl relative">
          
          {/* Cinema Screen Frame */}
          <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-gradient-to-b from-[#09112e] to-[#04081c] border border-sky-400/30 shadow-inner flex items-center justify-center group">
            {photoUrl ? (
              <div className="relative w-full h-full animate-fadeIn">
                <img
                  src={photoUrl}
                  alt="Our Movie Date"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Cinema vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />
                
                {/* Photo controls */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20">
                  <label className="cursor-pointer p-2 rounded-full bg-sky-600/80 hover:bg-sky-500 text-white shadow-lg backdrop-blur-md transition-all hover:scale-110">
                    <Upload className="w-4 h-4" />
                    <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  </label>
                  <button
                    onClick={handleRemovePhoto}
                    className="p-2 rounded-full bg-rose-600/80 hover:bg-rose-500 text-white shadow-lg backdrop-blur-md transition-all hover:scale-110"
                    title="Remove picture"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* Romantic Cinema Placeholder */
              <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
                <div className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-sky-400/20 via-blue-600/20 to-indigo-600/20 border border-sky-300/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Clapperboard className="w-11 h-11 text-sky-200 drop-shadow-[0_0_15px_#70a1ff] animate-pulse" />
                  <span className="absolute -top-1 -right-1 text-sm animate-bounce">🍿</span>
                  <span className="absolute -bottom-1 -left-1 text-xs">💙</span>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-bold text-sky-100">
                    Our Movie Date Photograph
                  </p>
                  <p className="text-xs text-sky-200/60 font-handwriting text-base">
                    {BIRTHDAY_CONFIG.slideMovieDate.placeholderHint}
                  </p>
                </div>

                <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-semibold uppercase tracking-wider shadow-[0_0_20px_rgba(74,144,226,0.5)] transition-all hover:scale-105 active:scale-95">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Movie Date Photo 🎬</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                </label>
              </div>
            )}
          </div>

          {/* Caption Container */}
          <div className="mt-4 pt-3 border-t border-sky-400/20 text-left">
            {isEditingCaption ? (
              <div className="space-y-2">
                <textarea
                  value={tempCaption}
                  onChange={(e) => setTempCaption(e.target.value)}
                  className="w-full h-20 p-2.5 rounded-xl bg-white/10 border border-sky-300/40 text-xs sm:text-sm text-white font-sans focus:outline-none focus:border-sky-300"
                  placeholder="Write your sweet movie date memory..."
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
              <span className="flex items-center gap-1">
                <Ticket className="w-3 h-3 text-sky-400" />
                {BIRTHDAY_CONFIG.slideMovieDate.date}
              </span>
              <span className="flex items-center gap-1 font-handwriting text-xs text-sky-200">
                <Heart className="w-3 h-3 text-sky-400 fill-sky-400 inline" />
                Holding hands in the dark
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
