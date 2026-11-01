import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, PartyPopper } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
}

const calculateTimeLeft = (): TimeLeft => {
  const now = new Date();
  const currentYear = now.getFullYear();

  // Check if today is the birthday (Month is 0-indexed in JS Date: Nov is 10)
  const isToday =
    now.getMonth() === BIRTHDAY_CONFIG.birthMonth - 1 &&
    now.getDate() === BIRTHDAY_CONFIG.birthDay;

  if (isToday) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true };
  }

  // Determine target birthday: this year or next year
  let targetDate = new Date(
    currentYear,
    BIRTHDAY_CONFIG.birthMonth - 1,
    BIRTHDAY_CONFIG.birthDay,
    0,
    0,
    0
  );

  // If this year's date has passed, use next year's date
  if (now.getTime() > targetDate.getTime()) {
    targetDate = new Date(
      currentYear + 1,
      BIRTHDAY_CONFIG.birthMonth - 1,
      BIRTHDAY_CONFIG.birthDay,
      0,
      0,
      0
    );
  }

  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds, isToday: false };
};

export const BirthdayCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-10 px-4 flex flex-col items-center justify-center relative">
      <div className="max-w-2xl w-full mx-auto glass-card rounded-3xl p-6 sm:p-8 border border-ammu-sky/25 relative overflow-hidden shadow-2xl">
        
        {/* Background Decorative Pink Clouds & Glowing Moon */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-ammu-sky/15 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-ammu-blush/20 blur-2xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 text-ammu-babyBlue text-xs font-semibold uppercase tracking-widest">
            <Clock className="w-3.5 h-3.5 text-ammu-sky" />
            <span>Birthday Countdown</span>
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-bold font-script text-transparent bg-clip-text bg-gradient-to-r from-ammu-babyBlue via-white to-ammu-blush">
            Waiting for Ammu&apos;s Special Day 🌙💙
          </h3>
          <p className="text-xs sm:text-sm text-slate-300/80">
            Every second bringing us closer to celebrating the most wonderful human
          </p>
        </div>

        {/* Countdown Digits or Birthday Alert */}
        {timeLeft.isToday ? (
          <div className="py-6 px-4 rounded-2xl bg-gradient-to-r from-pink-500/20 via-sky-500/20 to-purple-500/20 border-2 border-pink-400/50 text-center animate-pulse-glow">
            <PartyPopper className="w-10 h-10 text-ammu-gold mx-auto mb-2 animate-bounce" />
            <h4 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-ammu-gold via-white to-pink-300 drop-shadow">
              IT&apos;S AMMU&apos;S BIRTHDAY TODAY! 🎂💙
            </h4>
            <p className="text-sm sm:text-base text-pink-200 mt-2 font-medium">
              Today belongs entirely to you, Prithi! Wishing you infinite joy, smiles & sweet memories! 🥹❤️
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
            {/* Days */}
            <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/5 border border-ammu-sky/20 backdrop-blur-md hover:border-ammu-sky/50 transition-all">
              <span className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-mono text-ammu-babyBlue drop-shadow-[0_0_10px_rgba(180,212,255,0.5)]">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-300 mt-1">
                Days
              </span>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/5 border border-ammu-blush/20 backdrop-blur-md hover:border-ammu-blush/50 transition-all">
              <span className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-mono text-ammu-blush drop-shadow-[0_0_10px_rgba(255,180,214,0.5)]">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-300 mt-1">
                Hours
              </span>
            </div>

            {/* Minutes */}
            <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/5 border border-ammu-lavender/20 backdrop-blur-md hover:border-ammu-lavender/50 transition-all">
              <span className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-mono text-ammu-lavender drop-shadow-[0_0_10px_rgba(216,180,254,0.5)]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-300 mt-1">
                Minutes
              </span>
            </div>

            {/* Seconds */}
            <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/5 border border-ammu-gold/20 backdrop-blur-md hover:border-ammu-gold/50 transition-all">
              <span className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-mono text-ammu-gold drop-shadow-[0_0_10px_rgba(255,209,102,0.5)]">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-300 mt-1">
                Seconds
              </span>
            </div>
          </div>
        )}

        {/* Cute Subnote */}
        <div className="text-center mt-5 pt-3 border-t border-white/10 flex items-center justify-center gap-1.5 text-xs text-ammu-babyBlue/70 font-handwriting text-base">
          <Sparkles className="w-3.5 h-3.5 text-ammu-blush inline" />
          <span>Mark your calendar: November 16 is Ammu&apos;s Queen Day 👑</span>
        </div>

      </div>
    </section>
  );
};
