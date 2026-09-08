import { useEffect, useRef, useState } from "react";

/**
 * Animated particle network background.
 * Performance-conscious: disabled on small screens, on touch devices and when
 * the user prefers reduced motion. Capped particle count, capped DPR,
 * throttled to ~30fps, spatially cheap connection pass.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
}

const ACCENT = "90, 140, 220";
const CONNECTION_DISTANCE = 170;
const CONNECTION_DISTANCE_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
const PARTICLE_DENSITY = 0.00005;
const MIN_PARTICLES = 28;
const MAX_PARTICLES = 70;
const FRAME_INTERVAL = 1000 / 30;

function createParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.28,
    r: Math.random() * 2 + 1.2,
    opacity: Math.random() * 0.35 + 0.4,
  };
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const [enabled, setEnabled] = useState(false);

  // Decide after hydration: skip entirely on mobile / reduced motion / touch.
  useEffect(() => {
    const ok =
      window.matchMedia("(min-width: 900px)").matches &&
      window.matchMedia("(hover: hover)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;
    const id = window.setTimeout(() => setEnabled(true), 300);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let running = true;
    let last = 0;

    function resize() {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);

      const count = Math.max(
        MIN_PARTICLES,
        Math.min(MAX_PARTICLES, Math.floor(rect.width * rect.height * PARTICLE_DENSITY)),
      );
      while (particlesRef.current.length < count) {
        particlesRef.current.push(createParticle(rect.width, rect.height));
      }
      particlesRef.current.length = Math.min(particlesRef.current.length, count);
    }

    let resizeTimer = 0;
    function onResize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 200);
    }

    resize();
    window.addEventListener("resize", onResize, { passive: true });

    function onVisibility() {
      running = document.visibilityState === "visible";
      if (running) {
        last = 0;
        animRef.current = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(animRef.current);
      }
    }
    document.addEventListener("visibilitychange", onVisibility);

    function draw(now: number) {
      if (!canvas || !ctx || !running) return;
      animRef.current = requestAnimationFrame(draw);
      if (now - last < FRAME_INTERVAL) return;
      last = now;

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      }

      // Connections
      ctx.lineWidth = 0.7;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CONNECTION_DISTANCE_SQ) {
            const alpha = (1 - Math.sqrt(d2) / CONNECTION_DISTANCE) * 0.25;
            ctx.strokeStyle = `rgba(${ACCENT}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Particles (two cheap passes instead of four glow arcs each)
      ctx.fillStyle = `rgba(${ACCENT}, 0.7)`;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 0.45, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        maskImage:
          "linear-gradient(to right, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.4) 65%, black 85%)",
        WebkitMaskImage:
          "linear-gradient(to right, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.4) 65%, black 85%)",
      }}
    />
  );
}
