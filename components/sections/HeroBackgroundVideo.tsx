'use client';

import * as React from 'react';

export function HeroBackgroundVideo() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
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

    // AI Neural Nodes
    const nodeCount = Math.min(Math.floor(width / 18), 70);
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulse: number;
    }> = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.9,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2.5 + 1.5,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    let frame = 0;

    const render = () => {
      frame += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw glowing wave lines across the middle
      ctx.lineWidth = 1.5;
      for (let w = 0; w < 3; w++) {
        ctx.beginPath();
        const waveOffset = w * 0.8;
        for (let x = 0; x < width; x += 15) {
          const y =
            height * 0.35 +
            Math.sin(x * 0.003 + frame + waveOffset) * 45 +
            Math.cos(x * 0.006 - frame * 0.5) * 25;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(23, 99, 204, ${0.12 - w * 0.03})`;
        ctx.stroke();
      }

      // 2. Draw neural node connections
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i]!;
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j]!;
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(23, 99, 204, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // 3. Draw glowing nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]!;
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height * 0.95) n.vy *= -1;

        const pulseScale = Math.sin(frame * 2 + n.pulse) * 0.3 + 1;

        // Glowing outer aura
        const radGrad = ctx.createRadialGradient(
          n.x,
          n.y,
          0,
          n.x,
          n.y,
          n.radius * 4 * pulseScale
        );
        radGrad.addColorStop(0, 'rgba(23, 99, 204, 0.45)');
        radGrad.addColorStop(0.5, 'rgba(23, 99, 204, 0.15)');
        radGrad.addColorStop(1, 'rgba(23, 99, 204, 0)');

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 4 * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = radGrad;
        ctx.fill();

        // Node center core
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#60a5fa';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
      {/* Dynamic Animated AI Neural Waves & Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-75"
      />

      {/* Cybernetic High-Tech Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(23,99,204,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(23,99,204,0.06)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,#000_80%,transparent_100%)] opacity-70" />

      {/* Prominent Radial Ambient Atmosphere Lighting */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent/25 blur-[120px] rounded-full" />
      <div className="absolute top-1/4 -left-20 w-[500px] h-[400px] bg-accent/15 blur-[100px] rounded-full" />
      <div className="absolute top-1/3 -right-20 w-[500px] h-[400px] bg-accent/15 blur-[100px] rounded-full" />

      {/* Smooth Dark Vignette Mask for High Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface/30 via-surface/70 to-surface" />
    </div>
  );
}
