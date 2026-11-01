import React, { useEffect, useRef } from 'react';

export const BackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Stars collection - predominantly blue, ice-blue, white, and silver
    const starCount = Math.min(Math.floor((width * height) / 7500), 180);
    const stars: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      delta: number;
      color: string;
    }> = [];

    const starColors = ['#b4d4ff', '#ffffff', '#70a1ff', '#e2f0ff', '#e0e7ff', '#c7d2fe'];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        delta: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    // Shooting stars
    const shootingStars: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;
    }> = [];

    const spawnShootingStar = () => {
      if (shootingStars.filter((s) => s.active).length < 2) {
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.4,
          length: Math.random() * 90 + 50,
          speed: Math.random() * 10 + 8,
          angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
          opacity: 1,
          active: true,
        });
      }
    };

    const shootingStarInterval = window.setInterval(spawnShootingStar, 4000);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render stars
      stars.forEach((star) => {
        star.alpha += star.delta;
        if (star.alpha > 1) {
          star.alpha = 1;
          star.delta = -Math.abs(star.delta);
        } else if (star.alpha < 0.15) {
          star.alpha = 0.15;
          star.delta = Math.abs(star.delta);
        }

        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        if (star.radius > 1.2) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = star.color;
          ctx.stroke();
        }
        ctx.restore();
      });

      // Render shooting stars
      shootingStars.forEach((s) => {
        if (!s.active) return;
        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        grad.addColorStop(0, `rgba(180, 212, 255, ${s.opacity})`);
        grad.addColorStop(0.4, `rgba(112, 161, 255, ${s.opacity * 0.7})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        ctx.restore();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= 0.015;

        if (s.opacity <= 0 || s.x > width || s.y > height) {
          s.active = false;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.clearInterval(shootingStarInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Gradient Mesh - Midnight Blue / Deep Ocean */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050818] via-[#091136] to-[#060c24]" />
      
      {/* Soft Blue Romantic Ambient Nebulae */}
      <div className="absolute top-[-10%] left-[10%] w-[550px] h-[550px] rounded-full bg-[#3a86ff]/12 blur-[140px]" />
      <div className="absolute top-[35%] right-[5%] w-[500px] h-[500px] rounded-full bg-[#1e40af]/15 blur-[150px]" />
      <div className="absolute bottom-[10%] left-[20%] w-[600px] h-[600px] rounded-full bg-[#4338ca]/12 blur-[160px]" />

      {/* Canvas for stars and meteors */}
      <canvas ref={canvasRef} className="absolute inset-0 block" />

      {/* Floating Fairy Lights & Glow Orbs */}
      <div className="absolute top-24 left-1/4 w-2 h-2 rounded-full bg-[#b4d4ff] shadow-[0_0_15px_#70a1ff] animate-twinkle" />
      <div className="absolute top-48 right-1/3 w-3 h-3 rounded-full bg-[#e2f0ff] shadow-[0_0_20px_#b4d4ff] animate-twinkle-fast" />
      <div className="absolute top-3/4 left-16 w-2 h-2 rounded-full bg-[#70a1ff] shadow-[0_0_12px_#3a86ff] animate-twinkle" />
      <div className="absolute bottom-32 right-24 w-2.5 h-2.5 rounded-full bg-[#b4d4ff] shadow-[0_0_15px_#70a1ff] animate-twinkle-fast" />

      {/* Floating Blue Hearts & Butterflies */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute text-sky-300/30 text-xl animate-float-slow"
          style={{ top: '18%', left: '8%', animationDelay: '0s' }}
        >
          💙
        </div>
        <div
          className="absolute text-sky-200/20 text-2xl animate-float-reverse"
          style={{ top: '65%', left: '10%', animationDelay: '2s' }}
        >
          💙
        </div>
        <div
          className="absolute text-sky-300/25 text-lg animate-float-slow"
          style={{ top: '38%', right: '8%', animationDelay: '3.5s' }}
        >
          💙
        </div>
        <div
          className="absolute text-sky-200/30 text-xl animate-float"
          style={{ top: '82%', right: '15%', animationDelay: '1.2s' }}
        >
          💙
        </div>

        {/* Fluttering Blue Butterfly 1 */}
        <div
          className="absolute text-2xl animate-butterfly pointer-events-none drop-shadow-[0_0_8px_rgba(112,161,255,0.6)]"
          style={{ top: '24%', left: '14%', animationDuration: '7s' }}
        >
          🦋
        </div>
        {/* Fluttering Blue Butterfly 2 */}
        <div
          className="absolute text-xl animate-butterfly pointer-events-none drop-shadow-[0_0_8px_rgba(112,161,255,0.6)]"
          style={{ top: '72%', right: '12%', animationDuration: '9s', animationDelay: '3s' }}
        >
          🦋
        </div>
      </div>
    </div>
  );
};
