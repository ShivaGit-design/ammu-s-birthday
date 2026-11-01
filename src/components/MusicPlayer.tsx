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

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    romanticAudio.togglePlay();
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    romanticAudio.toggleMute();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    romanticAudio.setVolume(parseFloat(e.target.value));
  };

  return (
    <div
      className="fixed z-40 select-none transition-all duration-300
        bottom-[calc(4.25rem+env(safe-area-inset-bottom,0px))] left-3 right-3 sm:right-auto sm:left-5 sm:bottom-5 md:bottom-6 md:left-6"
    >
      <div
        className={`glass-card rounded-full transition-all duration-300 border border-sky-400/30 shadow-[0_10px_35px_rgba(0,0,0,0.5)] flex items-center p-1.5 sm:p-2 backdrop-blur-xl mx-auto sm:mx-0 max-w-[340px] sm:max-w-none justify-between sm:justify-start ${
          isExpanded ? 'px-3.5 gap-2.5 sm:gap-3' : 'gap-2 pr-3'
        }`}
      >
        {/* Left: Vinyl Disc Icon */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform flex-shrink-0"
          title={isExpanded ? 'Collapse player' : 'Expand music controls'}
          aria-label="Toggle music controls"
        >
          <Disc3
            className={`w-5 h-5 sm:w-6 sm:h-6 ${audioState.isPlaying && !audioState.isMuted ? 'animate-spin' : ''}`}
            style={{ animationDuration: '4s' }}
          />
          {audioState.isPlaying && !audioState.isMuted && (
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-400" />
            </span>
          )}
        </button>

        {/* Track Title & Artist */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="cursor-pointer flex flex-col text-left min-w-0 max-w-[120px] xs:max-w-[140px] sm:max-w-[170px]"
        >
          <span className="text-[11px] sm:text-xs font-bold text-white truncate font-sans tracking-tight">
            {audioState.trackTitle}
          </span>
          <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-sky-200/80 truncate">
            <Music className="w-2.5 h-2.5 text-sky-300 flex-shrink-0" />
            <span className="truncate">{audioState.trackArtist}</span>
          </div>
        </div>

        {/* Equalizer animation bars */}
        {audioState.isPlaying && !audioState.isMuted && (
          <div className="hidden xs:flex items-end gap-0.5 h-3.5 px-1 flex-shrink-0">
            <span className="w-0.5 bg-sky-300 rounded-full animate-pulse h-2.5" />
            <span className="w-0.5 bg-sky-400 rounded-full animate-pulse h-3.5" style={{ animationDelay: '0.2s' }} />
            <span className="w-0.5 bg-blue-300 rounded-full animate-pulse h-1.5" style={{ animationDelay: '0.4s' }} />
            <span className="w-0.5 bg-indigo-300 rounded-full animate-pulse h-3" style={{ animationDelay: '0.1s' }} />
          </div>
        )}

        {/* Play / Pause Button */}
        <button
          onClick={handleTogglePlay}
          className="p-2 rounded-full bg-sky-500/20 hover:bg-sky-500/40 text-white transition-all hover:scale-105 active:scale-95 flex-shrink-0 border border-sky-300/30"
          title={audioState.isPlaying ? 'Pause music' : 'Play music'}
          aria-label={audioState.isPlaying ? 'Pause music' : 'Play music'}
        >
          {audioState.isPlaying ? (
            <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
          ) : (
            <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white ml-0.5" />
          )}
        </button>

        {/* Mute Button on Compact Mobile */}
        {!isExpanded && (
          <button
            onClick={handleToggleMute}
            className="p-1.5 text-sky-200 hover:text-white transition-colors flex-shrink-0"
            title={audioState.isMuted ? 'Unmute' : 'Mute'}
            aria-label={audioState.isMuted ? 'Unmute' : 'Mute'}
          >
            {audioState.isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-sky-300" />
            )}
          </button>
        )}

        {/* Expanded Controls: Mute & Volume Slider */}
        {isExpanded && (
          <div className="flex items-center gap-1.5 sm:gap-2 pl-2 border-l border-sky-400/20">
            <button
              onClick={handleToggleMute}
              className="p-1.5 text-sky-200 hover:text-white transition-colors"
              title={audioState.isMuted ? 'Unmute' : 'Mute'}
              aria-label={audioState.isMuted ? 'Unmute' : 'Mute'}
            >
              {audioState.isMuted ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-sky-300" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={audioState.isMuted ? 0 : audioState.volume}
              onChange={handleVolumeChange}
              className="w-14 sm:w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-sky-400"
              title="Volume control"
              aria-label="Volume slider"
            />
          </div>
        )}
      </div>
    </div>
  );
};
