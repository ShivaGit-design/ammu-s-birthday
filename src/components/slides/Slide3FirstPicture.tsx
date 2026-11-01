import React, { useState, useEffect } from 'react';
import { Camera, Upload, Heart, Edit3, Check, Trash2, ZoomIn } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../../config';
import { romanticAudio } from '../../utils/audio';
import { getMediaItem, saveMediaItem, removeMediaItem } from '../../utils/mediaStorage';

export const Slide3FirstPicture: React.FC = () => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(BIRTHDAY_CONFIG.slide3.defaultImage || null);
  const [caption, setCaption] = useState(BIRTHDAY_CONFIG.slide3.defaultCaption);
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [tempCaption, setTempCaption] = useState(caption);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    getMediaItem('first_picture_photo').then((item) => {
      if (item instanceof Blob) {
        setPhotoUrl(URL.createObjectURL(item));
      } else if (typeof item === 'string' && item) {
        setPhotoUrl(item);
      }
    });

    getMediaItem('first_picture_caption').then((item) => {
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
      await saveMediaItem('first_picture_photo', file);
    }
  };

  const handleRemovePhoto = async () => {
    setPhotoUrl(null);
    await removeMediaItem('first_picture_photo');
    romanticAudio.playGiftPop();
  };

  const handleSaveCaption = async () => {
    setCaption(tempCaption);
    setIsEditingCaption(false);
    romanticAudio.playSparkle();
    await saveMediaItem('first_picture_caption', tempCaption);
  };

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center px-3 sm:px-6 pt-16 sm:pt-20 pb-36 sm:pb-32 select-none z-10 text-center overflow-x-hidden">
      
      {/* Background Soft Deep Blue Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] rounded-full bg-gradient-to-r from-blue-600/15 via-sky-400/20 to-indigo-800/20 blur-[140px] pointer-events-none" />

      {/* Scene Tag */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-200 text-xs font-semibold tracking-widest uppercase border border-sky-400/30 mb-3 animate-pulse-glow">
        <Camera className="w-3.5 h-3.5 text-sky-300" />
        <span>{BIRTHDAY_CONFIG.slide3.tag}</span>
      </div>

      {/* Title */}
      <div className="max-w-xl mx-auto space-y-1 mb-5">
        <h2 className="text-3xl sm:text-5xl font-bold font-script text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-blue-300 drop-shadow-[0_0_25px_rgba(112,161,255,0.6)]">
          {BIRTHDAY_CONFIG.slide3.title}
        </h2>
        <p className="text-xs sm:text-sm text-sky-200/70 font-handwriting text-base sm:text-lg">
          {BIRTHDAY_CONFIG.slide3.subtitle}
        </p>
      </div>

      {/* Cinematic Photo Frame */}
      <div className="relative max-w-lg w-full">
        
        {/* Ornate Glowing Frame Border */}
        <div className="relative rounded-3xl p-1 bg-gradient-to-tr from-sky-400/50 via-blue-200/40 to-sky-600/50 shadow-[0_0_50px_rgba(112,161,255,0.4)]">
          <div className="relative rounded-[22px] bg-[#070e28] overflow-hidden p-2 sm:p-3">
            
            {/* Corner Decorative Accents */}
            <div className="absolute top-3 left-3 text-sky-300 text-xs select-none pointer-events-none">✨</div>
            <div className="absolute top-3 right-3 text-sky-300 text-xs select-none pointer-events-none">✨</div>
            <div className="absolute bottom-3 left-3 text-sky-300 text-xs select-none pointer-events-none">💙</div>
            <div className="absolute bottom-3 right-3 text-sky-300 text-xs select-none pointer-events-none">💙</div>

            {/* Photo Viewport */}
            <div className="relative w-full h-56 xs:h-72 sm:h-96 rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center group">
              {photoUrl ? (
                <div className="relative w-full h-full animate-fadeIn">
                  <img
                    src={photoUrl}
                    alt="Our First Picture"
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isZoomed ? 'scale-125' : 'group-hover:scale-105'
                    }`}
                  />
                  {/* Subtle filmic glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                  
                  {/* Quick Action Overlay Controls */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20">
                    <button
                      onClick={() => setIsZoomed(!isZoomed)}
                      className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all hover:scale-110"
                      title={isZoomed ? "Zoom out" : "Zoom in"}
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <label className="cursor-pointer p-2 rounded-full bg-sky-600/80 hover:bg-sky-500 text-white backdrop-blur-md transition-all hover:scale-110">
                      <Upload className="w-4 h-4" />
                      <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                    </label>
                    <button
                      onClick={handleRemovePhoto}
                      className="p-2 rounded-full bg-rose-600/80 hover:bg-rose-500 text-white backdrop-blur-md transition-all hover:scale-110"
                      title="Remove picture"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Attractive Placeholder */
                <div className="flex flex-col items-center justify-center p-6 text-center space-y-4">
                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-sky-400/20 via-blue-500/20 to-purple-500/20 border border-sky-300/40 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(112,161,255,0.3)]">
                    <Camera className="w-12 h-12 text-sky-200 drop-shadow-[0_0_15px_#70a1ff] animate-pulse" />
                    <span className="absolute -top-1 -right-1 text-sm animate-bounce">📸</span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-base font-bold text-sky-100">
                      Our Very First Picture Together
                    </p>
                    <p className="text-xs text-sky-200/60 font-handwriting text-base">
                      {BIRTHDAY_CONFIG.slide3.placeholderHint}
                    </p>
                  </div>

                  <label className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-semibold uppercase tracking-wider shadow-[0_0_25px_rgba(74,144,226,0.5)] transition-all hover:scale-105 active:scale-95">
                    <Upload className="w-4 h-4" />
                    <span>Upload Our First Picture 📸</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  </label>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Caption Container */}
        <div className="mt-4 glass-card rounded-2xl p-4 border border-sky-400/20 text-left relative">
          {isEditingCaption ? (
            <div className="space-y-2">
              <textarea
                value={tempCaption}
                onChange={(e) => setTempCaption(e.target.value)}
                className="w-full h-20 p-2.5 rounded-xl bg-white/10 border border-sky-300/40 text-xs sm:text-sm text-white font-sans focus:outline-none focus:border-sky-300"
                placeholder="Write your memory of your first picture together..."
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
            <span>{BIRTHDAY_CONFIG.slide3.date}</span>
            <span className="flex items-center gap-1 font-handwriting text-xs text-sky-200">
              <Heart className="w-3 h-3 text-sky-400 fill-sky-400 inline" />
              Forever in my heart
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
