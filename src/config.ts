/**
 * 🌟 AMMU UNIVERSE 2.0 CONFIGURATION 🌟
 * 
 * Personalized for:
 * - Name: PRITHI
 * - Nickname: Ammu 💙🌝
 * - Birthday: November 16
 * - Signature: Un favourite person 💗
 * - Footer: Made with all my love, just for Ammu. 💙
 */

export interface MemoryCard {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  caption: string;
  imageUrl?: string;
  placeholderType: 'first_meet' | 'laughter' | 'smile' | 'future' | 'custom';
}

export interface SpecialReason {
  id: number;
  frontTitle: string;
  frontIcon: string;
  message: string;
}

const defaultMemories: MemoryCard[] = [
  {
    id: 1,
    title: "Our Movie Date 🎬🍿",
    subtitle: "Dark theater & holding hands in the dark",
    date: "A Magical Theater Date 🍿",
    caption: "Sitting in the dark theatre with popcorn and holding your hand... honestly Ammu, watching you smile was better than any movie on the screen. 💙🍿",
    imageUrl: "/photos/Movie-Date.jpg",
    placeholderType: 'first_meet',
  },
  {
    id: 2,
    title: "Little Moments, Big Feelings 🌝",
    subtitle: "Our countless late night talks & laughs",
    date: "Every Single Day ❤️",
    caption: "All those random silly jokes, teasing each other, and those deep late conversations when the whole world is asleep and it's just you and me.",
    imageUrl: "/photos/Night-out.jpg",
    placeholderType: 'laughter',
  },
  {
    id: 3,
    title: "Your Smile, My Favourite View 🥹",
    subtitle: "The cutest smile in the entire universe",
    date: "Forever & Always 🌸",
    caption: "Whenever you smile genuinely, everything around feels peaceful and brighter. Keep smiling like that always, Ammu.",
    imageUrl: "/photos/Heart.jpg",
    placeholderType: 'smile',
  },
  {
    id: 4,
    title: "More Memories to Come 💙",
    subtitle: "The beautiful future waiting for us",
    date: "Our Next Chapter 🚀",
    caption: "So many more adventures, cute dates, celebrations, and dreams to achieve together. We are just getting started!",
    imageUrl: "/photos/Outing.jpg",
    placeholderType: 'future',
  },
];

const defaultReasons: SpecialReason[] = [
  {
    id: 1,
    frontTitle: "Your Smile",
    frontIcon: "🥹",
    message: "Un smile enakku romba pidikkum di. 🥹",
  },
  {
    id: 2,
    frontTitle: "Your Happiness",
    frontIcon: "💖",
    message: "Nee happy-ah irukkuradha paakradhu enakku happiness.",
  },
  {
    id: 3,
    frontTitle: "Your Reactions",
    frontIcon: "🌝",
    message: "Un cute reactions enakku special. 🌝",
  },
  {
    id: 4,
    frontTitle: "Your Dreams",
    frontIcon: "✨",
    message: "Nee un dreams-ah achieve panradha paakanum.",
  },
  {
    id: 5,
    frontTitle: "Your Feelings",
    frontIcon: "🫂",
    message: "Un feelings-um un happiness-um important.",
  },
  {
    id: 6,
    frontTitle: "Simply YOU",
    frontIcon: "💙",
    message: "Nee nee-ya irukkuradhe azhagu, Ammu. 💙",
  },
];

const defaultLoveLetterParagraphs = [
  "Hey Ammu... 💙🌝",
  "First of all, HAPPY BIRTHDAY DI AMMUUU! 🥹💙🎂",
  "Unakku innikku birthday... aana un life-la vandha indha special day-ah celebrate panradha vida, nee en life-la irukkuradhukku naan evlo happy-ah irukken nu sollanum pola irukku. ❤️",
  "Ammu, un smile enakku romba special di. Nee happy-ah irukkumbodhu enakkum automatic-ah happiness vandhudum. Un kooda pesura chinna chinna moments, namma sirikkura moments, nee cute-ah pesura moments... idhellam enakku romba precious. 🌝💗",
  "Unna eppovume happy-ah paakanum nu aasai. Un dreams ellam achieve pannanum, unakku pidichadha ellam nee achieve pannanum, nee un mela proud-ah feel pannanum.",
  "Life-la ellame perfect-ah irukkaadhu di. Aana un feelings-ah purinjukka try panra, unna respect panra, un smile-ku value kudukkura oruthana naan irukkanum nu aasai padren. ❤️",
  "Unakku oru birthday gift kudukkalaam... aana un face-la oru genuine smile vara vechaa adhuve enakku periya happiness.",
  "Ammu, nee enakku special. Unna nee eppovume underestimate pannadha. Nee deserve panra happiness, love, success ellame unakku kidaikkanum nu manasara wish panren.",
  "Innikki mattum illa... un life-la vara ovvoru birthday-um beautiful-ah irukkanum. Un dreams-ku nee pakkathula irukkura people support pannanum, unakku neraya reasons to smile kidaikkanum.",
  "And one last thing, Ammu...",
  "Indha website perfect-ah irukka nu theriyala... aana idha create pannumbodhu un face-la oru smile varanum nu dhaan nenachen. 🥹💙",
  "Happy Birthday, my Ammu.\nStay cute. Keep smiling. Keep being YOU.",
  "Unakku neraya love, hugs, happiness, and beautiful memories kidaikkanum.",
  "Once again... HAPPY BIRTHDAY, AMMUUU! 💙 🥹 🎂 😘",
];

export const BIRTHDAY_CONFIG = {
  // 💖 Personal Details
  recipientName: "PRITHI",
  nickname: "Ammu 💙🌝",
  senderName: "Un favourite PATTU 💗",

  // 🎂 Birthday Date (November 16)
  birthMonth: 11, // November
  birthDay: 16,   // 16th

  // 🌙 SCENE 01: The Mysterious Opening
  slide1: {
    ambientIntro: "A little universe was waiting for you…",
    title: "For My Ammu 💙🌝",
    subtitle: "A cinematic love story written in the stars",
    enterButton: "Enter Our Universe 💙",
    whisper: "Touch the screen to begin our journey ✨",
  },

  // ☕ SCENE 02: Our First Coffee Date
  slide2: {
    tag: "SCENE 01 • THE BEGINNING",
    title: "Our First Coffee Date ☕",
    subtitle: "Where our sweetest chapter began...",
    defaultImage: "/photos/coffee-date.jpg",
    defaultCaption: "That warm cup of coffee, your shy smile, and conversations that felt like home from the very first sip. Ammu, that day felt like the start of something beautiful. 💙☕",
    date: "A Day I'll Never Forget",
    placeholderHint: "Upload our first coffee date photo or tap change anytime 📸",
  },

  // 📸 SCENE 03: Our First Picture
  slide3: {
    tag: "SCENE 02 • THE FIRST FRAME",
    title: "Our First Picture Together 📸",
    subtitle: "The moment frozen in time forever",
    defaultImage: "/photos/First-Pic.jpg",
    defaultCaption: "The very first time we captured our happiness together. Look at us... nervous hearts, genuine smiles, and a love that was just starting to shine. 🥹💙",
    date: "Our Very First Photograph",
    placeholderHint: "Upload our first picture together 📸💙",
  },

  // 🍿 MOVIE DATE
  slideMovieDate: {
    tag: "SPECIAL MOMENT • MOVIE NIGHT",
    title: "Our Movie Date 🎬🍿",
    subtitle: "Dark theater, buttery popcorn, and your hand in mine",
    defaultImage: "/photos/Movie-Date.jpg",
    defaultCaption: "Sitting in the dark theatre, watching a film together, but honestly Ammu... you were the most captivating view in the whole cinema. Every laugh, every glance, every moment holding your hand. 💙🍿",
    date: "A Magical Theater Date",
    placeholderHint: "Upload our movie date photograph or replace anytime 🎬",
  },

  // 💙 SCENE 04: Our Beautiful Memories
  slide4: {
    tag: "SCENE 03 • GALLERY OF US",
    title: "Our Beautiful Memories 💙",
    subtitle: "A constellation of our favorite moments",
    memories: defaultMemories,
  },

  // 💌 SCENE 05: Words From the Heart
  slide5: {
    tag: "SCENE 04 • WORDS FROM THE HEART",
    title: "Words From the Heart 💌",
    date: "November 16",
    paragraphs: defaultLoveLetterParagraphs,
    signature: "Un favourite person 💗",
    closingNote: "Made with all my love, just for Ammu. 💙",
  },

  // 🎬 SCENE 06: Our Special Video
  slide6: {
    tag: "SCENE 05 • LIVING MEMORY",
    title: "Our Special Video 🎬",
    subtitle: "A little movie of our most beautiful moments",
    defaultVideo: "/video/BULLET-Drive.mp4",
    defaultCaption: "Every second with you feels like a romantic movie scene that I want to replay forever and ever. 🥹💙",
    placeholderHint: "Upload a special video clip (MP4 / WebM) of our favorite moment",
  },

  // 🎵 SCENE 07: Our Tamil Love Song
  slide7: {
    tag: "SCENE 06 • OUR MELODY",
    title: "Our Tamil Love Song 🎵",
    subtitle: "The melody that reminds me of you",
    defaultAudio: "/music/Don - Bae.mp3",
    defaultTitle: "Bae 💙 — DON",
    defaultArtist: "Anirudh Ravichander • Sivakarthikeyan",
    defaultCaption: "Music sounds completely different when you're in love... every romantic beat feels like it was composed only for your smile, Ammu. 🎶💙",
    placeholderHint: "Upload your chosen Tamil romantic audio file (MP3 / WAV / M4A)",
  },

  // ❤️ SCENE 08: Reasons I Love You
  slide8: {
    tag: "SCENE 07 • SIX REASONS",
    title: "Reasons I Love You ❤️",
    subtitle: "Six little truths from my soul to yours",
    reasons: defaultReasons,
  },

  // 🌙 SCENE 09: Our Little Universe
  slide9: {
    tag: "SCENE 08 • UNDER THE MOONLIGHT",
    title: "Our Little Universe 🌙",
    subtitle: "Where stars align for us",
    poeticMessage: "In a world with billions of stars and billions of souls, my heart found its home right beside you.\n\nYou are my moonlight on dark nights, my calm in every storm, and the most beautiful dream I never want to wake up from. 💙🌝",
    constellationText: "Look closely at the stars... they formed a heart just for you.",
  },

  // 🎂 SCENE 10: The Birthday Surprise
  slide10: {
    tag: "SCENE 09 • THE GRAND CELEBRATION",
    badge: "IT'S MY AMMU'S SPECIAL DAY! 🎂💙",
    heading: "Happy Birthday, My Ammu 💙🌝",
    recipient: "PRITHI",
    dateHighlight: "November 16 — the day my favourite person came into this beautiful world. 🌝❤️",
    universeCelebration: "Today, the whole universe is celebrating YOU! 💗",
    makeWishPrompt: "Make a sweet wish and tap the candle to blow it out! 🕯️✨",
    continueButton: "One Final Secret For You... 💙",
  },

  // 💙 SCENE 11: OUR SPECIAL LOVE CODE (THE ULTIMATE FINAL SCENE)
  slide11: {
    tag: "SCENE 10 • OUR SPECIAL LOVE CODE",
    line1: "Unaku Naanum… 💙",
    line2: "Enaku Neeyum… 🌙",
    line3: "Namaku Athiksha… 🫂❤️",
    line4: "Eppovume Onna Irupom! ♾️💙",
    footerTitle: "Our Story Forever 💙🌙",
    replayButton: "Replay Our Story 💙",
  },

  // 📲 WhatsApp / Sharing Text to send with link
  shareMessage: `Ammuuu 💙🌝🥹

Unakku oru chinna surprise pannirukken di... ❤️🎂

Open panni paaru. Idhula irukkuradhu oru website mattum illa, unakkaaga konjam love-um, neraya feelings-um vechu create pannadhu. 🥹💗

Happy Birthday in advance, en Ammu! 💙😘🌙`,

  // 🎵 Default music configuration
  music: {
    title: "Bae 💙 — DON",
    artist: "Anirudh Ravichander • Sivakarthikeyan",
    src: "/music/Don - Bae.mp3",
    useSynthesizedMelodyAsDefault: false,
  },

  // Backward compatibility aliases
  opening: {
    greeting: "Hey, Ammu... 💙🌝",
    subtext: "Pssst... someone made something special just for you. 🥹",
    question: "Ready for your little surprise, princess?",
    buttonText: "Open Your Little Universe 💌",
    footerNote: "Made with love, only for you, Ammu. 💙",
  },
  reveal: {
    badge: "IT'S MY AMMU'S SPECIAL DAY! 🎂💙",
    heading: "Happy Birthday, PRITHI!",
    dateHighlight: "November 16 — the day my favourite person came into this beautiful world. 🌝❤️",
    universeCelebration: "Today, the whole universe is celebrating YOU! 💗",
    makeWishPrompt: "Make a sweet wish and tap the candle to blow it out! 🕯️✨",
  },
  loveLetter: {
    title: "A Letter From My Heart 💌",
    date: "November 16",
    paragraphs: defaultLoveLetterParagraphs,
    signature: "Un favourite person 💗",
    closingNote: "Made with all my love, just for Ammu. 💙",
  },
  memories: defaultMemories,
  reasons: defaultReasons,
  gifts: {
    hug: {
      title: "A Warm Hug",
      icon: "🫂",
      tagline: "When you need comfort & warmth",
      message: "Virtual hug for my Ammu! Tight-ah hug pannikiren. 💙🫂",
    },
    kiss: {
      title: "Sweet Kisses",
      icon: "😘",
      tagline: "For the prettiest birthday girl",
      message: "One million imaginary kisses for the birthday princess! 😘💗",
    },
    wish: {
      title: "A Moonlit Wish",
      icon: "🌙",
      tagline: "A blessing from my heart",
      message: "My wish is simple: may you always have reasons to smile, people who value you, and dreams that make you excited about tomorrow. 💙",
    },
  },
  finalSurprise: {
    heading: "Hey Ammu... 💙",
    poeticMessage: "If I could give you one thing today, I would give you the ability to see yourself through my eyes, even for a moment...\n\nBecause then you would understand how special you are.",
    wishesLine1: "Happy Birthday, PRITHI! 💙🌝",
    wishesLine2: "En Ammu-ku always happiness, lots of love, and beautiful memories kidaikkanum.",
    hugButtonText: "One Last Hug for Ammu? 🫂",
    hugModalTitle: "Come here, Ammu... virtual hug time! 🫂💙",
    hugModalText: "Happy Birthday once again, my favourite human. 🌝😘",
    universeEnding: "THIS LITTLE UNIVERSE WAS MADE JUST FOR YOU. 💙",
  },
};
