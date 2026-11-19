import { useEffect, useRef, useState } from 'react';
import { assetPath } from '../utils/imageHelpers';

export default function PhotoLightbox({ items, index, onClose, onNavigate }) {
  const [zoomed, setZoomed] = useState(false);
  const closeRef = useRef(null);
  const touchStart = useRef(null);
  const item = items[index];

  useEffect(() => {
    setZoomed(false);
    if (closeRef.current) closeRef.current.focus();
  }, [index]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNavigate(1);
      if (event.key === 'ArrowLeft') onNavigate(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onNavigate]);

  if (!item) return null;

  const onTouchStart = (event) => {
    touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  };

  const onTouchEnd = (event) => {
    if (!touchStart.current || zoomed) return;
    const dx = event.changedTouches[0].clientX - touchStart.current.x;
    const dy = event.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) onNavigate(dx < 0 ? 1 : -1);
    touchStart.current = null;
  };

  return (
    <div
      className="lightbox no-swipe"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button type="button" className="lightbox__backdrop" aria-label="Close photo" onClick={onClose} />

      <div className="lightbox__inner">
        <div className="lightbox__top">
          <span className="lightbox__counter">{index + 1} / {items.length}</span>
          <button ref={closeRef} type="button" className="lightbox__close" onClick={onClose} aria-label="Close photo">
            ✕
          </button>
        </div>

        <button
          type="button"
          className={`lightbox__image-wrap ${zoomed ? 'is-zoomed' : ''}`}
          onClick={() => setZoomed((value) => !value)}
          aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
        >
          <img src={assetPath(item.src)} alt={item.title || 'A saved memory'} draggable="false" />
        </button>

        <div className="lightbox__caption">
          {item.date && <span className="lightbox__date">{item.date}</span>}
          <h3>{item.title}</h3>
          <p>{item.caption}</p>
          {item.description && <p className="lightbox__description">{item.description}</p>}
          <span className="lightbox__zoom-hint">Tap the photo to {zoomed ? 'zoom out' : 'zoom in'}</span>
        </div>

        <div className="lightbox__controls">
          <button type="button" onClick={() => onNavigate(-1)} aria-label="Previous photo">←</button>
          <button type="button" onClick={() => onNavigate(1)} aria-label="Next photo">→</button>
        </div>
      </div>
    </div>
  );
}
