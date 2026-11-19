import { useEffect, useState } from 'react';

// Makes absolute "/..." asset paths work on Vercel, Cloudflare and
// GitHub Pages sub-paths alike (VITE_BASE in vite.config.js).
export function assetPath(src) {
  if (!src) return '';
  if (!src.startsWith('/')) return src;
  const base = import.meta.env.BASE_URL || '/';
  return `${base.replace(/\/$/, '')}${src}`;
}

// Loads an image only when its element is near the viewport and reports
// success/failure. Cards use this to hide themselves rather than show a
// broken icon. `ref` should point at the card element.
export function useImageStatus(src, ref, rootMargin = '350px 0px') {
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    if (!src) {
      setStatus('error');
      return undefined;
    }

    setStatus('pending');
    let cancelled = false;
    let image = null;

    const load = () => {
      if (cancelled || image) return;
      image = new Image();
      image.decoding = 'async';
      image.onload = () => {
        if (!cancelled) setStatus('loaded');
      };
      image.onerror = () => {
        if (!cancelled) setStatus('error');
      };
      image.src = assetPath(src);
      if (image.complete && image.naturalWidth > 0 && !cancelled) setStatus('loaded');
    };

    const element = ref?.current;
    if (!element || !('IntersectionObserver' in window)) {
      load();
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer.disconnect();
            load();
          }
        },
        { rootMargin }
      );
      observer.observe(element);
      return () => {
        cancelled = true;
        observer.disconnect();
        if (image) {
          image.onload = null;
          image.onerror = null;
        }
      };
    }

    return () => {
      cancelled = true;
      if (image) {
        image.onload = null;
        image.onerror = null;
      }
    };
  }, [src, ref, rootMargin]);

  return status;
}

export function shuffled(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
