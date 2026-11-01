import React, { useState, useEffect, useCallback } from 'react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { CinematicNavigation } from './components/CinematicNavigation';
import { MusicPlayer } from './components/MusicPlayer';
import { ShareMessageModal } from './components/ShareMessageModal';

// 11 Cinematic Slides
import { Slide1Opening } from './components/slides/Slide1Opening';
import { Slide2CoffeeDate } from './components/slides/Slide2CoffeeDate';
import { Slide3FirstPicture } from './components/slides/Slide3FirstPicture';
import { Slide4MemoriesGallery } from './components/slides/Slide4MemoriesGallery';
import { Slide5LoveLetter } from './components/slides/Slide5LoveLetter';
import { Slide6SpecialVideo } from './components/slides/Slide6SpecialVideo';
import { Slide7TamilSong } from './components/slides/Slide7TamilSong';
import { Slide8ReasonsILoveYou } from './components/slides/Slide8ReasonsILoveYou';
import { Slide9OurUniverse } from './components/slides/Slide9OurUniverse';
import { Slide10BirthdaySurprise } from './components/slides/Slide10BirthdaySurprise';
import { Slide11LoveCode } from './components/slides/Slide11LoveCode';
import { romanticAudio } from './utils/audio';
import { BIRTHDAY_CONFIG } from './config';
import { getMediaItem } from './utils/mediaStorage';

export const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const totalSlides = 11;

  // Initialize and arm audio for immediate playback on enter
  useEffect(() => {
    getMediaItem('tamil_song').then((item) => {
      if (item instanceof Blob) {
        const url = URL.createObjectURL(item);
        romanticAudio.setCustomAudio(url, false);
      } else {
        romanticAudio.setCustomAudio(BIRTHDAY_CONFIG.slide7.defaultAudio, false);
      }
    });

    getMediaItem('tamil_song_meta').then((item) => {
      if (typeof item === 'string') {
        try {
          const meta = JSON.parse(item);
          if (meta.title) {
            romanticAudio.setTrackInfo(meta.title, meta.artist || "Special Melody for Ammu 💙🌝");
          }
        } catch {
          // keep default
        }
      }
    });
  }, []);

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides));
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleJumpToSlide = useCallback((slideNumber: number) => {
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
      setCurrentSlide(slideNumber);
    }
  }, [totalSlides]);

  const handleReplay = useCallback(() => {
    setCurrentSlide(1);
  }, []);

  // Keyboard navigation (Arrow keys and Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Mobile Touch Gestures for Slide Swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const diffX = touchStartX - e.changedTouches[0].clientX;
    const diffY = touchStartY - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    setTouchStartX(null);
    setTouchStartY(null);
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-[#050818] text-slate-100 selection:bg-sky-400 selection:text-[#050818]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Living Cosmic Sky Canvas (Stars, Nebulae, Meteors) */}
      <BackgroundEffects />

      {/* Cinematic Top Navigation & Bottom Docked Controls */}
      <CinematicNavigation
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onNext={handleNext}
        onPrev={handlePrev}
        onJumpToSlide={handleJumpToSlide}
        onOpenShare={() => setIsShareOpen(true)}
      />

      {/* Full-Screen Slide Container */}
      <div className="relative w-full h-full overflow-y-auto overflow-x-hidden scrollbar-none">
        {currentSlide === 1 && <Slide1Opening onEnter={handleNext} />}
        {currentSlide === 2 && <Slide2CoffeeDate />}
        {currentSlide === 3 && <Slide3FirstPicture />}
        {currentSlide === 4 && <Slide4MemoriesGallery />}
        {currentSlide === 5 && <Slide5LoveLetter />}
        {currentSlide === 6 && <Slide6SpecialVideo />}
        {currentSlide === 7 && <Slide7TamilSong />}
        {currentSlide === 8 && <Slide8ReasonsILoveYou />}
        {currentSlide === 9 && <Slide9OurUniverse />}
        {currentSlide === 10 && (
          <Slide10BirthdaySurprise onContinueToLoveCode={handleNext} />
        )}
        {currentSlide === 11 && <Slide11LoveCode onReplay={handleReplay} />}
      </div>

      {/* Persistent Global Floating Music Player */}
      <MusicPlayer />

      {/* WhatsApp / Social Share Message Modal */}
      <ShareMessageModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
    </div>
  );
};

export default App;
