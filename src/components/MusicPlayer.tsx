import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Disc3 } from 'lucide-react';
import { romanticAudio, type AudioEngineState } from '../utils/audio';

export const MusicPlayer: React.FC = () => {
  const [audioState, setAudioState] = useState<AudioEngineState>(romanticAudio.getState());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe((state) => {
      setAudioState(state);
    });
    return unsubscribe;
  }, []);

  const handleTogglePlay = () => {
    romanticAudio.togglePlay();
  };

  const handleToggleMute = () => {
    romanticAudio.toggleMute();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    romanticAudio.setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 select-none">
      <div
        className={`glass-card rounded-full transition-all duration-300 border border-sky-400/30 shadow-[0_10px_35px_rgba(0,0,0,0.5)] flex items-center p-1.5 sm:p-2 backdrop-blur-xl ${
          isExpanded ? 'px-4 gap-3' : 'gap-2 pr-3'
        }`}
      >
        {/* Vinyl / Music Icon */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform"
          title={isExpanded ? 'Collapse player' : 'Expand music controls'}
        >
          <Disc3
            className={`w-6 h-6 ${audioState.isPlaying && !audioState.isMuted ? 'animate-spin' : ''}`}
            style={{ animationDuration: '4s' }}
          />
          {audioState.isPlaying && !audioState.isMuted && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-400" />
            </span>
          )}
        </button>

        {/* Track Title & Subtitle */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="cursor-pointer flex flex-col text-left max-w-[120px] sm:max-w-[160px]"
        >
          <span className="text-xs font-bold text-white truncate font-sans">
            {audioState.trackTitle}
          </span>
          <div className="flex items-center gap-1.5 text-[10px] text-sky-200/80">
            <Music className="w-2.5 h-2.5 text-sky-300" />
            <span className="truncate">{audioState.trackArtist}</span>
          </div>
        </div>

        {/* Equalizer animation bars */}
        {audioState.isPlaying && !audioState.isMuted && (
          <div className="flex items-end gap-0.5 h-4 px-1">
            <span className="w-1 bg-sky-300 rounded-full animate-pulse h-3" />
            <span className="w-1 bg-sky-400 rounded-full animate-pulse h-4" style={{ animationDelay: '0.2s' }} />
            <span className="w-1 bg-blue-300 rounded-full animate-pulse h-2" style={{ animationDelay: '0.4s' }} />
            <span className="w-1 bg-indigo-300 rounded-full animate-pulse h-3.5" style={{ animationDelay: '0.1s' }} />
          </div>
        )}

        {/* Play / Pause Button */}
        <button
          onClick={handleTogglePlay}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105 active:scale-95"
          title={audioState.isPlaying ? 'Pause music' : 'Play music'}
        >
          {audioState.isPlaying ? (
            <Pause className="w-4 h-4 fill-white" />
          ) : (
            <Play className="w-4 h-4 fill-white" />
          )}
        </button>

        {/* Expanded Controls: Mute & Volume Slider */}
        {isExpanded && (
          <div className="flex items-center gap-2 pl-2 border-l border-sky-400/20">
            <button
              onClick={handleToggleMute}
              className="p-1.5 text-sky-200 hover:text-white transition-colors"
              title={audioState.isMuted ? 'Unmute' : 'Mute'}
            >
              {audioState.isMuted ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={audioState.isMuted ? 0 : audioState.volume}
              onChange={handleVolumeChange}
              className="w-16 accent-sky-400 h-1 bg-white/20 rounded-lg cursor-pointer"
              title="Volume"
            />
          </div>
        )}
      </div>
    </div>
  );
};
