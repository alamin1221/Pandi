import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../utils/animations';

export default function CustomCursor() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (!window.matchMedia('(pointer: fine)').matches || prefersReducedMotion()) return undefined;

    let frame = 0;
    let x = -100;
    let y = -100;

    const onMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        node.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        frame = 0;
      });
    };

    const onOver = (event) => {
      const interactive = event.target.closest('button, a, input, [data-cursor="grow"]');
      node.classList.toggle('is-hovering', Boolean(interactive));
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="custom-cursor" aria-hidden="true" />;
}
