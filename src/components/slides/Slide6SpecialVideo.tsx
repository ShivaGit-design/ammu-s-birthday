import React, { useState, useEffect, useRef } from 'react';
import { Video, Upload, Play, Pause, Volume2, VolumeX, Maximize, Trash2, Edit3, Check } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../../config';
import { romanticAudio } from '../../utils/audio';
import { getMediaItem, saveMediaItem, removeMediaItem } from '../../utils/mediaStorage';

export const Slide6SpecialVideo: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(BIRTHDAY_CONFIG.slide6.defaultVideo || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [caption, setCaption] = useState(BIRTHDAY_CONFIG.slide6.defaultCaption);
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [tempCaption, setTempCaption] = useState(caption);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    getMediaItem('special_video').then((item) => {
      if (item instanceof Blob) {
        setVideoUrl(URL.createObjectURL(item));
      } else if (typeof item === 'string' && item) {
        setVideoUrl(item);
      }
    });

    getMediaItem('special_video_caption').then((item) => {
      if (typeof item === 'string' && item) {
        setCaption(item);
        setTempCaption(item);
      }
    });
  }, []);

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 150 * 1024 * 1024) {
        alert("Video size is larger than 150MB. Please select a smaller clip for smooth playback.");
        return;
      }
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      romanticAudio.playSparkle();
      await saveMediaItem('special_video', file);
    }
  };

  const handleRemoveVideo = async () => {
    setVideoUrl(null);
    setIsPlaying(false);
    await removeMediaItem('special_video');
    romanticAudio.playGiftPop();
  };

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      romanticAudio.pauseMusic();
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const time = parseFloat(e.target.value);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleSaveCaption = async () => {
    setCaption(tempCaption);
    setIsEditingCaption(false);
    romanticAudio.playSparkle();
    await saveMediaItem('special_video_caption', tempCaption);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center px-3 sm:px-6 pt-16 sm:pt-20 pb-36 sm:pb-32 select-none z-10 text-center overflow-x-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] rounded-full bg-gradient-to-tr from-sky-500/15 via-blue-700/10 to-transparent blur-[140px] pointer-events-none" />

      {/* Scene Tag */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-200 text-xs font-semibold tracking-widest uppercase border border-sky-400/30 mb-3 animate-pulse-glow">
        <Video className="w-3.5 h-3.5 text-sky-300" />
        <span>{BIRTHDAY_CONFIG.slide6.tag}</span>
      </div>

      {/* Title */}
      <div className="max-w-xl mx-auto space-y-1 mb-4">
        <h2 className="text-3xl sm:text-5xl font-bold font-script text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-blue-300 drop-shadow-[0_0_25px_rgba(112,161,255,0.6)]">
          {BIRTHDAY_CONFIG.slide6.title}
        </h2>
        <p className="text-xs sm:text-sm text-sky-200/70 font-handwriting text-base sm:text-lg">
          {BIRTHDAY_CONFIG.slide6.subtitle}
        </p>
      </div>

      {/* Cinematic Video Player Frame */}
      <div className="relative max-w-lg w-full">
        
        <div className="rounded-3xl p-1 bg-gradient-to-tr from-sky-400/40 via-blue-300/30 to-sky-600/40 shadow-[0_0_50px_rgba(112,161,255,0.35)]">
          <div className="rounded-[22px] bg-[#070e28] overflow-hidden p-2 sm:p-3 relative">
            
            {/* Viewport */}
            <div className="relative w-full h-52 xs:h-64 sm:h-80 rounded-xl overflow-hidden bg-black flex items-center justify-center group">
              {videoUrl ? (
                <>
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    className="w-full h-full object-contain"
                    playsInline
                    onTimeUpdate={() => {
                      if (videoRef.current) {
                        setCurrentTime(videoRef.current.currentTime);
                      }
                    }}
                    onLoadedMetadata={() => {
                      if (videoRef.current) {
                        setDuration(videoRef.current.duration);
                      }
                    }}
                    onEnded={() => setIsPlaying(false)}
                  />

                  {/* Top quick controls */}
                  <div className="absolute top-3 right-3 flex items-center gap-2 z-20 opacity-80 hover:opacity-100 transition-opacity">
                    <label className="cursor-pointer p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white shadow-md transition-all">
                      <Upload className="w-3.5 h-3.5" />
                      <input type="file" accept="video/mp4,video/webm" className="hidden" onChange={handleVideoUpload} />
                    </label>
                    <button
                      onClick={handleRemoveVideo}
                      className="p-1.5 rounded-full bg-rose-600/80 hover:bg-rose-500 text-white shadow-md transition-all"
                      title="Remove video"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Bottom Custom Playback Bar Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-1.5 z-20">
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      step="0.1"
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-sky-400"
                    />

                    <div className="flex items-center justify-between text-xs text-white">
                      <div className="flex items-center gap-3">
                        <button onClick={handleTogglePlay} className="p-1 hover:text-sky-300 transition-colors">
                          {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                        </button>
                        <button onClick={handleToggleMute} className="p-1 hover:text-sky-300 transition-colors">
                          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        <span className="font-mono text-[11px] text-sky-200">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>

                      <button onClick={handleFullscreen} className="p-1 hover:text-sky-300 transition-colors">
                        <Maximize className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* Video Placeholder */
                <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-sky-400/20 via-blue-500/20 to-purple-500/20 border border-sky-300/40 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Video className="w-10 h-10 text-sky-200 drop-shadow-[0_0_15px_#70a1ff]" />
                    <span className="absolute -top-1 -right-1 text-sm animate-bounce">🎬</span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-bold text-sky-100">
                      Our Special Video Slot
                    </p>
                    <p className="text-xs text-sky-200/60 font-handwriting text-base">
                      {BIRTHDAY_CONFIG.slide6.placeholderHint}
                    </p>
                  </div>

                  <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-semibold uppercase tracking-wider shadow-[0_0_20px_rgba(74,144,226,0.5)] transition-all hover:scale-105 active:scale-95">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Personal Video 🎬</span>
                    <input type="file" accept="video/mp4,video/webm" className="hidden" onChange={handleVideoUpload} />
                  </label>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Caption */}
        <div className="mt-3 glass-card rounded-2xl p-3.5 border border-sky-400/20 text-left relative">
          {isEditingCaption ? (
            <div className="space-y-2">
              <textarea
                value={tempCaption}
                onChange={(e) => setTempCaption(e.target.value)}
                className="w-full h-16 p-2 rounded-xl bg-white/10 border border-sky-300/40 text-xs text-white font-sans focus:outline-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditingCaption(false)}
                  className="px-2.5 py-1 rounded bg-white/10 text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCaption}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded bg-sky-500 text-white text-xs font-semibold"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="relative group/caption">
              <p className="font-handwriting text-sm sm:text-base text-sky-100 leading-relaxed pr-6">
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
        </div>

      </div>

    </div>
  );
};
