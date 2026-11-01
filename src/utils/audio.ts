/**
 * Romantic Audio Engine for Ammu's Little Universe 2.0
 * - Supports the official Bae song: "Bae 💙 — DON" (Anirudh Ravichander • Sivakarthikeyan)
 * - Autoplay handling with graceful browser autoplay block detection & welcome overlay
 * - Multi-scene continuous playback without interruption or restart
 * - Supports custom user audio (.mp3, .wav, .m4a / audio element / uploaded Blob) with Object URL memory management
 * - Built-in Web Audio API romantic ambient chime & piano generator fallback
 * - Exposes currentTime, duration, seek, and volume for custom music players
 * - Sound effects: sparkle chime, pop, candle blow, heart chime
 */

export interface AudioEngineState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  trackTitle: string;
  trackArtist: string;
  isAutoplayBlocked: boolean;
  isLoaded: boolean;
  playbackStatus: 'idle' | 'loading' | 'playing' | 'paused' | 'blocked' | 'error';
}

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.75;
  private currentTime: number = 0;
  private duration: number = 180;
  private trackTitle: string = "Bae 💙 — DON";
  private trackArtist: string = "Anirudh Ravichander • Sivakarthikeyan";
  private isAutoplayBlocked: boolean = false;
  private isLoaded: boolean = false;
  private playbackStatus: 'idle' | 'loading' | 'playing' | 'paused' | 'blocked' | 'error' = 'idle';

  private melodyTimer: number | null = null;
  private timeUpdateTimer: number | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private currentNoteIndex: number = 0;
  private listeners: Set<(state: AudioEngineState) => void> = new Set();
  private customSrc: string = "/music/Don - Bae.mp3";
  private currentBlobUrl: string | null = null;
  private fallbackIndex: number = 0;
  private defaultAudioSources: string[] = [
    "/music/Don - Bae.mp3",
    "/music/Don%20-%20Bae.mp3",
    "/music/Don-Bae.mp3",
    "/audio/Don - Bae.mp3",
    "/audio/Don-Bae.mp3",
  ];

  constructor() {
    if (typeof window !== 'undefined' && typeof Audio !== 'undefined') {
      try {
        this.setCustomAudio(this.defaultAudioSources[0], false);
      } catch (err) {
        console.warn("RomanticAudioEngine audio preload", err);
      }
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public subscribe(fn: (state: AudioEngineState) => void) {
    this.listeners.add(fn);
    fn(this.getState());
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((fn) => fn(state));
  }

  public getState(): AudioEngineState {
    const currentDuration =
      this.audioElement && !isNaN(this.audioElement.duration) && this.audioElement.duration > 0
        ? this.audioElement.duration
        : this.duration;

    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
      currentTime: this.audioElement ? this.audioElement.currentTime : this.currentTime,
      duration: currentDuration,
      trackTitle: this.trackTitle,
      trackArtist: this.trackArtist,
      isAutoplayBlocked: this.isAutoplayBlocked,
      isLoaded: this.isLoaded,
      playbackStatus: this.playbackStatus,
    };
  }

  public setTrackInfo(title: string, artist: string) {
    this.trackTitle = title;
    this.trackArtist = artist;
    this.notify();
  }

  public setCustomAudio(src: string, autoPlay: boolean = false) {
    if (!src) return;

    // Revoke previous blob URL if different to avoid memory leaks
    if (this.currentBlobUrl && this.currentBlobUrl !== src) {
      try {
        URL.revokeObjectURL(this.currentBlobUrl);
      } catch {
        // ignore
      }
      this.currentBlobUrl = null;
    }

    if (src.startsWith('blob:')) {
      this.currentBlobUrl = src;
    }

    this.customSrc = src;
    this.playbackStatus = 'loading';
    this.isLoaded = false;
    this.fallbackIndex = 0;

    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.removeAttribute('src');
      this.audioElement.load();
    }

    const normalizedSrc = src.startsWith('blob:') || src.startsWith('data:') ? src : encodeURI(decodeURI(src));
    this.audioElement = new Audio(normalizedSrc);
    this.audioElement.preload = 'auto';
    this.audioElement.loop = true;
    this.audioElement.volume = this.isMuted ? 0 : this.volume;

    this.audioElement.addEventListener('canplay', () => {
      this.isLoaded = true;
      if (!this.isPlaying && this.playbackStatus === 'loading') {
        this.playbackStatus = 'idle';
      }
      this.notify();
    });

    this.audioElement.addEventListener('timeupdate', () => {
      if (this.audioElement) {
        this.currentTime = this.audioElement.currentTime;
        if (!isNaN(this.audioElement.duration) && this.audioElement.duration > 0) {
          this.duration = this.audioElement.duration;
        }
        this.notify();
      }
    });

    this.audioElement.addEventListener('loadedmetadata', () => {
      if (this.audioElement && !isNaN(this.audioElement.duration) && this.audioElement.duration > 0) {
        this.duration = this.audioElement.duration;
        this.isLoaded = true;
        this.notify();
      }
    });

    this.audioElement.addEventListener('play', () => {
      this.isPlaying = true;
      this.playbackStatus = 'playing';
      this.isAutoplayBlocked = false;
      this.notify();
    });

    this.audioElement.addEventListener('pause', () => {
      if (this.playbackStatus === 'playing') {
        this.isPlaying = false;
        this.playbackStatus = 'paused';
        this.notify();
      }
    });

    // Fallback if one URL scheme (spaces vs %20 vs /audio) fails
    this.audioElement.addEventListener('error', () => {
      if (!src.startsWith('blob:') && this.fallbackIndex < this.defaultAudioSources.length - 1) {
        this.fallbackIndex++;
        const nextSrc = this.defaultAudioSources[this.fallbackIndex];
        if (this.audioElement) {
          this.audioElement.src = nextSrc;
          this.audioElement.load();
          if (this.isPlaying) {
            this.audioElement.play().catch(() => {});
          }
        }
      } else {
        this.playbackStatus = 'error';
        this.notify();
      }
    });

    if (autoPlay || this.isPlaying) {
      this.startMusic();
    } else {
      this.notify();
    }
  }

  /**
   * Attempt autoplay on initial page load.
   * If browser allows autoplay with sound, it begins immediately.
   * If browser blocks autoplay (standard on mobile), it marks isAutoplayBlocked = true so the UI displays the welcome overlay.
   */
  public async attemptAutoplay(): Promise<boolean> {
    this.initContext();
    if (!this.audioElement) {
      this.setCustomAudio(this.defaultAudioSources[0], false);
    }

    if (this.audioElement) {
      try {
        this.audioElement.volume = this.isMuted ? 0 : this.volume;
        await this.audioElement.play();
        this.isPlaying = true;
        this.isAutoplayBlocked = false;
        this.playbackStatus = 'playing';
        this.startTimeTracker();
        this.notify();
        return true;
      } catch {
        // Autoplay blocked by browser policy
        this.isPlaying = false;
        this.isAutoplayBlocked = true;
        this.playbackStatus = 'blocked';
        this.notify();
        return false;
      }
    }
    return false;
  }

  public async startMusic(customSrc?: string): Promise<boolean> {
    this.initContext();
    this.isAutoplayBlocked = false;

    if (customSrc && customSrc !== this.customSrc) {
      this.setCustomAudio(customSrc, true);
      return true;
    }

    if (this.audioElement) {
      if (this.melodyTimer) {
        window.clearInterval(this.melodyTimer);
        this.melodyTimer = null;
      }

      this.audioElement.volume = this.isMuted ? 0 : this.volume;

      try {
        await this.audioElement.play();
        this.isPlaying = true;
        this.playbackStatus = 'playing';
        this.isAutoplayBlocked = false;
        this.startTimeTracker();
        this.notify();
        return true;
      } catch (err) {
        // If blocked, record state
        const isNotAllowed = err instanceof Error && err.name === 'NotAllowedError';
        if (isNotAllowed) {
          this.isPlaying = false;
          this.isAutoplayBlocked = true;
          this.playbackStatus = 'blocked';
        } else {
          // fallback to synthesized romantic melody if audio element fails to decode
          this.isPlaying = true;
          this.playbackStatus = 'playing';
          this.startSynthesizedMelody();
        }
        this.notify();
        return false;
      }
    } else {
      this.isPlaying = true;
      this.playbackStatus = 'playing';
      this.startSynthesizedMelody();
      this.startTimeTracker();
      this.notify();
      return true;
    }
  }

  public pauseMusic() {
    this.isPlaying = false;
    this.playbackStatus = 'paused';
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.melodyTimer) {
      window.clearInterval(this.melodyTimer);
      this.melodyTimer = null;
    }
    if (this.timeUpdateTimer) {
      window.clearInterval(this.timeUpdateTimer);
      this.timeUpdateTimer = null;
    }
    this.notify();
  }

  public togglePlay(customSrc?: string) {
    if (this.isPlaying) {
      this.pauseMusic();
    } else {
      this.startMusic(customSrc);
    }
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
    }
    this.notify();
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
    }
    this.notify();
  }

  public seek(seconds: number) {
    if (this.audioElement && !isNaN(this.audioElement.duration) && this.audioElement.duration > 0) {
      this.audioElement.currentTime = Math.max(0, Math.min(seconds, this.audioElement.duration));
      this.currentTime = this.audioElement.currentTime;
    } else {
      this.currentTime = seconds;
    }
    this.notify();
  }

  public dismissAutoplayOverlay() {
    this.isAutoplayBlocked = false;
    this.notify();
  }

  private startTimeTracker() {
    if (this.timeUpdateTimer) {
      window.clearInterval(this.timeUpdateTimer);
    }
    this.timeUpdateTimer = window.setInterval(() => {
      if (!this.audioElement && this.isPlaying) {
        this.currentTime = (this.currentTime + 1) % 180;
        this.duration = 180;
        this.notify();
      }
    }, 1000);
  }

  /**
   * Dreamy romantic piano & music-box melody generator (fallback)
   */
  private startSynthesizedMelody() {
    if (this.melodyTimer) {
      window.clearInterval(this.melodyTimer);
    }

    const notes = [
      { f: 261.63, d: 1.2 }, // C4
      { f: 329.63, d: 1.0 }, // E4
      { f: 392.00, d: 1.0 }, // G4
      { f: 493.88, d: 1.5 }, // B4
      { f: 523.25, d: 2.0 }, // C5
      { f: 392.00, d: 0.8 }, // G4
      { f: 440.00, d: 1.2 }, // A4
      { f: 523.25, d: 1.0 }, // C5
      { f: 659.25, d: 1.8 }, // E5
      { f: 587.33, d: 1.0 }, // D5
      { f: 523.25, d: 1.5 }, // C5
      { f: 349.23, d: 1.2 }, // F4
      { f: 440.00, d: 1.0 }, // A4
      { f: 523.25, d: 1.2 }, // C5
      { f: 659.25, d: 1.5 }, // E5
      { f: 783.99, d: 2.2 }, // G5
      { f: 659.25, d: 1.0 }, // E5
      { f: 587.33, d: 1.2 }, // D5
      { f: 523.25, d: 1.8 }, // C5
      { f: 392.00, d: 1.2 }, // G4
      { f: 329.63, d: 1.5 }, // E4
      { f: 261.63, d: 2.5 }, // C4
    ];

    const playNext = () => {
      if (!this.isPlaying || this.isMuted) return;
      const note = notes[this.currentNoteIndex % notes.length];
      this.playRomanticChime(note.f, note.d, 0.16 * this.volume);
      this.currentNoteIndex++;
    };

    playNext();
    this.melodyTimer = window.setInterval(playNext, 1600);
  }

  /**
   * Soft chime tone
   */
  public playRomanticChime(freq: number, duration: number = 1.2, gainFactor: number = 0.2) {
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(gainFactor * this.volume, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.1);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now);
      gain2.gain.setValueAtTime(0.0001, now);
      gain2.gain.exponentialRampToValueAtTime(gainFactor * 0.3 * this.volume, now + 0.05);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now);
      osc2.stop(now + duration * 0.7 + 0.1);
    } catch {
      // AudioContext catch
    }
  }

  /**
   * Sound effect: Magical sparkle / starburst chime
   */
  public playSparkle() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;
    const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    freqs.forEach((f, idx) => {
      window.setTimeout(() => {
        this.playRomanticChime(f, 0.6, 0.18);
      }, idx * 70);
    });
  }

  /**
   * Sound effect: Soft pop
   */
  public playGiftPop() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.15);

      gain.gain.setValueAtTime(0.25 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // catch
    }
  }

  /**
   * Sound effect: Candle blow
   */
  public playBlowCandle() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.4);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3 * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch {
      // catch
    }
  }
}

export const romanticAudio = new RomanticAudioEngine();
