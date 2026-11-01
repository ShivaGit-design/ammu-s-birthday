import React, { useState, useEffect } from 'react';
import { Music, Upload, Play, Pause, Volume2, VolumeX, Disc3, Edit3, Check } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../../config';
import { romanticAudio, type AudioEngineState } from '../../utils/audio';
import { getMediaItem, saveMediaItem } from '../../utils/mediaStorage';

export const Slide7TamilSong: React.FC = () => {
  const [audioState, setAudioState] = useState<AudioEngineState>(romanticAudio.getState());
  const [songTitle, setSongTitle] = useState(BIRTHDAY_CONFIG.slide7.defaultTitle);
  const [songArtist, setSongArtist] = useState(BIRTHDAY_CONFIG.slide7.defaultArtist);
  const [caption, setCaption] = useState(BIRTHDAY_CONFIG.slide7.defaultCaption);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [tempTitle, setTempTitle] = useState(songTitle);
  const [tempArtist, setTempArtist] = useState(songArtist);

  useEffect(() => {
    const unsub = romanticAudio.subscribe((st) => setAudioState(st));

    getMediaItem('tamil_song').then((item) => {
      if (item instanceof Blob) {
        const url = URL.createObjectURL(item);
        romanticAudio.setCustomAudio(url);
      } else {
        // Use default Bae song
        if (BIRTHDAY_CONFIG.slide7.defaultAudio) {
          romanticAudio.setCustomAudio(BIRTHDAY_CONFIG.slide7.defaultAudio);
          romanticAudio.setTrackInfo(BIRTHDAY_CONFIG.slide7.defaultTitle, BIRTHDAY_CONFIG.slide7.defaultArtist);
        }
      }
    });

    getMediaItem('tamil_song_meta').then((item) => {
      if (typeof item === 'string') {
        try {
          const parsed = JSON.parse(item);
          if (parsed.title) {
            setSongTitle(parsed.title);
            setTempTitle(parsed.title);
          }
          if (parsed.artist) {
            setSongArtist(parsed.artist);
            setTempArtist(parsed.artist);
          }
          if (parsed.caption) {
            setCaption(parsed.caption);
          }
          romanticAudio.setTrackInfo(
            parsed.title || BIRTHDAY_CONFIG.slide7.defaultTitle,
            parsed.artist || BIRTHDAY_CONFIG.slide7.defaultArtist
          );
        } catch {
          // fallback
        }
      }
    });

    return unsub;
  }, []);

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 80 * 1024 * 1024) {
        alert("Audio file is larger than 80MB. Please choose a slightly smaller file.");
        return;
      }
      const url = URL.createObjectURL(file);
      const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      setSongTitle(fileNameWithoutExt);
      setTempTitle(fileNameWithoutExt);

      romanticAudio.setTrackInfo(fileNameWithoutExt, "Dedicated to Ammu 💙🌝");
      romanticAudio.setCustomAudio(url, true);
      romanticAudio.playSparkle();

      await saveMediaItem('tamil_song', file);
      await saveMediaItem('tamil_song_meta', JSON.stringify({
        title: fileNameWithoutExt,
        artist: "Dedicated to Ammu 💙🌝",
        caption: caption,
      }));
    }
  };

  const handleTogglePlay = () => {
    romanticAudio.togglePlay();
  };

  const handleToggleMute = () => {
    romanticAudio.toggleMute();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    romanticAudio.seek(parseFloat(e.target.value));
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    romanticAudio.setVolume(parseFloat(e.target.value));
  };

  const handleSaveInfo = async () => {
    setSongTitle(tempTitle);
    setSongArtist(tempArtist);
    setIsEditingInfo(false);
    romanticAudio.setTrackInfo(tempTitle, tempArtist);
    romanticAudio.playSparkle();

    await saveMediaItem('tamil_song_meta', JSON.stringify({
      title: tempTitle,
      artist: tempArtist,
      caption: caption,
    }));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center px-3 sm:px-6 pt-16 sm:pt-20 pb-36 sm:pb-32 select-none z-10 text-center overflow-x-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] rounded-full bg-gradient-to-tr from-sky-500/15 via-blue-700/10 to-transparent blur-[140px] pointer-events-none" />

      {/* Scene Tag */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-200 text-xs font-semibold tracking-widest uppercase border border-sky-400/30 mb-3 animate-pulse-glow">
        <Music className="w-3.5 h-3.5 text-sky-300" />
        <span>{BIRTHDAY_CONFIG.slide7.tag}</span>
      </div>

      {/* Title */}
      <div className="max-w-xl mx-auto space-y-1 mb-5">
        <h2 className="text-3xl sm:text-5xl font-bold font-script text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-blue-300 drop-shadow-[0_0_25px_rgba(112,161,255,0.6)]">
          {BIRTHDAY_CONFIG.slide7.title}
        </h2>
        <p className="text-xs sm:text-sm text-sky-200/70 font-handwriting text-base sm:text-lg">
          {BIRTHDAY_CONFIG.slide7.subtitle}
        </p>
      </div>

      {/* Premium Player Card */}
      <div className="relative max-w-md w-full glass-card rounded-3xl p-5 sm:p-7 border border-sky-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        
        {/* Spinning Vinyl Record Visualizer */}
        <div className="relative w-32 h-32 xs:w-36 xs:h-36 sm:w-44 sm:h-44 mx-auto mb-4 sm:mb-5 rounded-full bg-gradient-to-tr from-[#0b1436] via-[#152763] to-[#070e28] border-4 border-sky-400/30 shadow-[0_0_40px_rgba(112,161,255,0.4)] flex items-center justify-center">
          
          {/* Subtle Grooves on Vinyl */}
          <div className="absolute inset-2 rounded-full border border-white/10" />
          <div className="absolute inset-5 rounded-full border border-white/10" />
          <div className="absolute inset-8 rounded-full border border-white/10" />

          {/* Center Record Label */}
          <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-white shadow-inner ${
            audioState.isPlaying && !audioState.isMuted ? 'animate-spin' : ''
          }`} style={{ animationDuration: '6s' }}>
            <Disc3 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>

          {/* Floating Accents when playing */}
          {audioState.isPlaying && !audioState.isMuted && (
            <>
              <div className="absolute -top-2 left-6 text-base animate-float">💙</div>
              <div className="absolute -bottom-2 right-6 text-sm animate-float-reverse">🎵</div>
              <div className="absolute top-10 -right-2 text-xs animate-twinkle">✨</div>
            </>
          )}
        </div>

        {/* Animated Sound Waves Bars */}
        <div className="flex items-end justify-center gap-1.5 h-8 mb-4">
          {[4, 8, 12, 16, 22, 14, 26, 18, 10, 20, 14, 7, 18, 24, 12, 6].map((h, i) => (
            <span
              key={i}
              className={`w-1 rounded-full transition-all duration-300 ${
                audioState.isPlaying && !audioState.isMuted
                  ? 'bg-gradient-to-t from-sky-400 to-blue-200 animate-pulse'
                  : 'bg-sky-400/30'
              }`}
              style={{
                height: audioState.isPlaying && !audioState.isMuted ? `${Math.max(6, (h * (i % 3 + 1)) % 30)}px` : '4px',
                animationDelay: `${i * 0.08}s`,
              }}
            />
          ))}
        </div>

        {/* Track Title & Artist */}
        <div className="mb-4">
          {isEditingInfo ? (
            <div className="space-y-2 mb-2">
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                placeholder="Song Title"
                className="w-full p-2 rounded-xl bg-white/10 border border-sky-300/40 text-xs text-white"
              />
              <input
                type="text"
                value={tempArtist}
                onChange={(e) => setTempArtist(e.target.value)}
                placeholder="Artist or Dedication"
                className="w-full p-2 rounded-xl bg-white/10 border border-sky-300/40 text-xs text-white"
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => setIsEditingInfo(false)} className="px-2.5 py-1 text-xs text-slate-300">
                  Cancel
                </button>
                <button onClick={handleSaveInfo} className="px-3 py-1 bg-sky-500 text-white text-xs font-semibold rounded-lg">
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="relative group">
              <h3 className="text-xl font-bold font-script text-white truncate px-6">
                {songTitle}
              </h3>
              <p className="text-xs text-sky-200/70 font-mono mt-0.5">
                {songArtist}
              </p>
              <button
                onClick={() => setIsEditingInfo(true)}
                className="absolute top-0 right-2 p-1 text-sky-300/60 hover:text-sky-200 transition-colors"
                title="Edit track title"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Progress Bar & Timers */}
        <div className="space-y-1 mb-4">
          <input
            type="range"
            min="0"
            max={audioState.duration || 180}
            step="0.5"
            value={audioState.currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-sky-400"
          />
          <div className="flex justify-between text-[11px] font-mono text-sky-300/70">
            <span>{formatTime(audioState.currentTime)}</span>
            <span>{formatTime(audioState.duration)}</span>
          </div>
        </div>

        {/* Main Playback Controls */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={handleToggleMute}
            className="p-2.5 rounded-full glass-card hover:bg-white/10 text-sky-200 transition-all hover:scale-105"
            title={audioState.isMuted ? "Unmute" : "Mute"}
          >
            {audioState.isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handleTogglePlay}
            className="p-4 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-white shadow-[0_0_25px_rgba(74,144,226,0.5)] transition-all hover:scale-110 active:scale-95"
            title={audioState.isPlaying ? "Pause" : "Play"}
          >
            {audioState.isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
          </button>

          <label
            className="p-2.5 rounded-full glass-card hover:bg-white/10 text-sky-200 cursor-pointer transition-all hover:scale-105"
            title="Upload your chosen Tamil romantic audio (MP3 / WAV / M4A)"
          >
            <Upload className="w-4 h-4" />
            <input type="file" accept="audio/*" className="hidden" onChange={handleAudioUpload} />
          </label>
        </div>

        {/* Volume Slider */}
        <div className="mt-4 flex items-center justify-center gap-2 max-w-[200px] mx-auto text-xs text-sky-300/70">
          <span className="text-[10px] font-mono">VOL</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={audioState.isMuted ? 0 : audioState.volume}
            onChange={handleVolume}
            className="w-full h-1 bg-white/20 rounded cursor-pointer accent-sky-400"
          />
        </div>

        {/* Upload Status Banner */}
        <div className="mt-4 pt-3 border-t border-sky-400/20 text-xs font-handwriting text-sky-200/80">
          <span className="text-sky-300 flex items-center justify-center gap-1">
            <Check className="w-3.5 h-3.5 text-sky-400" />
            <span>&ldquo;Bae 💙 — DON&rdquo; is loaded &amp; plays continuously across all slides 🎶💙</span>
          </span>
        </div>

      </div>

    </div>
  );
};
