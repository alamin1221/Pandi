import { useEffect, useRef, useState } from 'react';

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function wait(ms) {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve();
    window.setTimeout(resolve, prefersReducedMotion() ? Math.min(ms, 120) : ms);
  });
}

// Adds `is-visible` when the element scrolls into view.
export function useReveal({ threshold = 0.18, once = true } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      node.classList.add('is-visible');
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  return ref;
}

// Subtle pointer parallax written to CSS variables (no React re-renders).
export function useParallax(strength = 16) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return undefined;
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;

    const onMove = (event) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        node.style.setProperty('--parallax-x', `${(targetX * strength).toFixed(2)}px`);
        node.style.setProperty('--parallax-y', `${(targetY * strength).toFixed(2)}px`);
        frame = 0;
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [strength]);

  return ref;
}

// Reveals items one after another. Used by the finale's cinematic lines.
export function useSequentialReveal(total, step = 900, enabled = true, startDelay = 400) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setCount(0);
      return undefined;
    }
    setCount(0);
    const timers = [];
    for (let i = 0; i < total; i += 1) {
      timers.push(
        window.setTimeout(() => setCount(i + 1), prefersReducedMotion() ? 60 : startDelay + i * step)
      );
    }
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [total, step, enabled, startDelay]);

  return count;
}

// Deterministic pseudo-random values so decorations never jump between renders.
export function seededRandom(seed) {
  let value = Math.sin(seed * 128.989 + 78.233) * 43758.5453;
  value -= Math.floor(value);
  return value;
}
