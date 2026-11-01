import React, { useState, useEffect } from 'react';
import { Images, ChevronLeft, ChevronRight, Upload, Edit3, Check, Trash2, Calendar } from 'lucide-react';
import { BIRTHDAY_CONFIG, type MemoryCard } from '../../config';
import { romanticAudio } from '../../utils/audio';
import { getMediaItem, saveMediaItem } from '../../utils/mediaStorage';

export const Slide4MemoriesGallery: React.FC = () => {
  const [cards, setCards] = useState<MemoryCard[]>(BIRTHDAY_CONFIG.slide4.memories);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editCaption, setEditCaption] = useState("");
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    // Load persisted memory cards if modified
    getMediaItem('gallery_cards').then((item) => {
      if (typeof item === 'string') {
        try {
          const parsed = JSON.parse(item);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCards(parsed);
          }
        } catch {
          // fallback
        }
      }
    });
  }, []);

  const saveUpdatedCards = async (updated: MemoryCard[]) => {
    setCards(updated);
    await saveMediaItem('gallery_cards', JSON.stringify(updated));
  };

  const handleNext = () => {
    romanticAudio.playSparkle();
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    romanticAudio.playSparkle();
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    setTouchStartX(null);
  };

  const handlePhotoUpload = async (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = reader.result as string;
        const updated = cards.map((c) => (c.id === id ? { ...c, imageUrl: dataUrl } : c));
        await saveUpdatedCards(updated);
        romanticAudio.playSparkle();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNewCard = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = reader.result as string;
        const newCard: MemoryCard = {
          id: Date.now(),
          title: `Our Special Memory #${cards.length + 1} 💙`,
          subtitle: "Captured in our universe",
          date: "A Precious Moment",
          caption: "Another unforgettable page in our love story with Ammu. 🥹💙",
          imageUrl: dataUrl,
          placeholderType: 'custom',
        };
        const updated = [...cards, newCard];
        await saveUpdatedCards(updated);
        setCurrentIndex(updated.length - 1);
        romanticAudio.playSparkle();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteCard = async (id: number) => {
    if (cards.length <= 1) {
      alert("At least one memory card should remain!");
      return;
    }
    const updated = cards.filter((c) => c.id !== id);
    await saveUpdatedCards(updated);
    setCurrentIndex(0);
    romanticAudio.playGiftPop();
  };

  const handleSaveCaption = async (id: number) => {
    const updated = cards.map((c) => (c.id === id ? { ...c, caption: editCaption } : c));
    await saveUpdatedCards(updated);
    setEditingId(null);
    romanticAudio.playSparkle();
  };

  const currentCard = cards[currentIndex];

  const renderPlaceholder = (type: MemoryCard['placeholderType']) => {
    switch (type) {
      case 'first_meet':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#0e1942] to-[#070c24] text-center">
            <span className="text-4xl mb-2">✨</span>
            <p className="text-sm font-semibold text-sky-200">The Beginning of Us</p>
            <p className="text-xs text-sky-300/60 font-handwriting text-sm mt-1">Tap &apos;Upload Photo&apos; to put our real picture here 📸</p>
          </div>
        );
      case 'laughter':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#121b44] to-[#0a1030] text-center">
            <span className="text-4xl mb-2">🌝</span>
            <p className="text-sm font-semibold text-sky-200">Little Moments, Big Feelings</p>
            <p className="text-xs text-sky-300/60 font-handwriting text-sm mt-1">Countless laughs & late night talks ❤️</p>
          </div>
        );
      case 'smile':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#111f4d] to-[#070e28] text-center">
            <span className="text-4xl mb-2">🥹</span>
            <p className="text-sm font-semibold text-sky-200">Your Smile, My Favourite View</p>
            <p className="text-xs text-sky-300/60 font-handwriting text-sm mt-1">The prettiest smile in the universe 🌸</p>
          </div>
        );
      case 'future':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#142357] to-[#091238] text-center">
            <span className="text-4xl mb-2">🚀</span>
            <p className="text-sm font-semibold text-sky-200">More Memories to Come</p>
            <p className="text-xs text-sky-300/60 font-handwriting text-sm mt-1">Endless adventures waiting for us 💙</p>
          </div>
        );
      default:
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#0c163b] to-[#070e29] text-center">
            <span className="text-4xl mb-2">💙</span>
            <p className="text-sm font-semibold text-sky-200">Our Special Memory</p>
          </div>
        );
    }
  };

  return (
    <div
      className="relative w-full h-full min-h-screen flex flex-col items-center justify-center px-4 py-16 select-none z-10 text-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[650px] h-[380px] sm:h-[650px] rounded-full bg-gradient-to-tr from-sky-500/15 via-blue-700/10 to-transparent blur-[140px] pointer-events-none" />

      {/* Scene Tag */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-200 text-xs font-semibold tracking-widest uppercase border border-sky-400/30 mb-3 animate-pulse-glow">
        <Images className="w-3.5 h-3.5 text-sky-300" />
        <span>{BIRTHDAY_CONFIG.slide4.tag}</span>
      </div>

      {/* Title */}
      <div className="max-w-xl mx-auto space-y-1 mb-4">
        <h2 className="text-3xl sm:text-5xl font-bold font-script text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-blue-300 drop-shadow-[0_0_25px_rgba(112,161,255,0.6)]">
          {BIRTHDAY_CONFIG.slide4.title}
        </h2>
        <p className="text-xs sm:text-sm text-sky-200/70 font-handwriting text-base sm:text-lg">
          {BIRTHDAY_CONFIG.slide4.subtitle}
        </p>
      </div>

      {/* Layered Card Container */}
      <div className="relative max-w-md w-full">
        
        {/* Navigation Arrows for Desktop/Tablet */}
        <button
          onClick={handlePrev}
          className="hidden sm:flex absolute -left-14 top-1/2 -translate-y-1/2 p-3 rounded-full glass-card border border-sky-400/30 text-sky-200 hover:text-white hover:scale-110 active:scale-95 transition-all z-30"
          title="Previous memory"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="hidden sm:flex absolute -right-14 top-1/2 -translate-y-1/2 p-3 rounded-full glass-card border border-sky-400/30 text-sky-200 hover:text-white hover:scale-110 active:scale-95 transition-all z-30"
          title="Next memory"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* The Active Memory Card */}
        <div className="glass-card rounded-3xl p-4 sm:p-5 border border-sky-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative">
          
          {/* Card Top Details */}
          <div className="flex items-center justify-between text-xs text-sky-300/80 mb-2">
            <span className="font-mono flex items-center gap-1">
              <Calendar className="w-3 h-3 text-sky-400" />
              {currentCard.date}
            </span>
            <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-sky-200">
              {currentIndex + 1} / {cards.length}
            </span>
          </div>

          {/* Photo Frame */}
          <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-950 border border-sky-400/20 group">
            {currentCard.imageUrl ? (
              <img
                src={currentCard.imageUrl}
                alt={currentCard.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              renderPlaceholder(currentCard.placeholderType)
            )}

            {/* Upload or Change button */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-600/90 hover:bg-sky-500 text-white text-xs font-semibold shadow-lg backdrop-blur-md transition-all hover:scale-105">
                <Upload className="w-3.5 h-3.5" />
                <span>{currentCard.imageUrl ? "Replace" : "Upload Photo"}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handlePhotoUpload(currentCard.id, e)}
                />
              </label>
              {cards.length > 1 && (
                <button
                  onClick={() => handleDeleteCard(currentCard.id)}
                  className="p-1.5 rounded-full bg-rose-600/80 hover:bg-rose-500 text-white shadow-lg transition-all hover:scale-110"
                  title="Delete this card"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Title & Caption */}
          <div className="mt-3 text-left">
            <h3 className="text-lg font-bold font-script text-white">
              {currentCard.title}
            </h3>

            {editingId === currentCard.id ? (
              <div className="mt-2 space-y-2">
                <textarea
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                  className="w-full h-16 p-2 rounded-xl bg-white/10 border border-sky-300/40 text-xs text-white focus:outline-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-2.5 py-1 rounded bg-white/10 text-xs text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSaveCaption(currentCard.id)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded bg-sky-500 text-white text-xs font-semibold"
                  >
                    <Check className="w-3 h-3" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative group/caption mt-1">
                <p className="text-xs sm:text-sm text-sky-100 font-handwriting text-base leading-relaxed pr-6">
                  &ldquo;{currentCard.caption}&rdquo;
                </p>
                <button
                  onClick={() => {
                    setEditingId(currentCard.id);
                    setEditCaption(currentCard.caption);
                  }}
                  className="absolute top-0 right-0 p-1 text-sky-300/60 hover:text-sky-200 transition-colors"
                  title="Edit caption"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Pagination Dots & Add Photo Option */}
        <div className="mt-4 flex items-center justify-between px-2">
          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {cards.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  romanticAudio.playSparkle();
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-6 bg-sky-400 shadow-[0_0_10px_#70a1ff]' : 'w-2 bg-sky-300/30'
                }`}
              />
            ))}
          </div>

          {/* Add Another Photo Button */}
          <label className="cursor-pointer inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-sky-400/30 text-sky-200 text-xs transition-all hover:scale-105">
            <Upload className="w-3 h-3 text-sky-400" />
            <span>+ Add Photo</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleAddNewCard} />
          </label>
        </div>

      </div>

      {/* Swipe Hint on Mobile */}
      <div className="mt-3 text-[11px] text-sky-300/60 font-mono sm:hidden flex items-center gap-1">
        <span>← Swipe left / right to browse memories →</span>
      </div>

    </div>
  );
};
