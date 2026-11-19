import { useCallback, useEffect, useRef, useState } from 'react';
import { memories } from '../data/memories';
import { assetPath, useImageStatus } from '../utils/imageHelpers';
import PhotoLightbox from './PhotoLightbox';

const TILTS = [-4, 3, -2, 5, -5, 2, 4, -3, 2, -4, 5, -2];

function MemoryCard({ memory, index, onLoaded, onOpen }) {
  const ref = useRef(null);
  const status = useImageStatus(memory.src, ref);

  useEffect(() => {
    if (status === 'loaded') onLoaded(memory.src);
  }, [status, memory.src, onLoaded]);

  if (status !== 'loaded') return <div ref={ref} className="polaroid-slot" aria-hidden="true" />;

  return (
    <figure
      ref={ref}
      className={`polaroid polaroid--${(index % 4) + 1}`}
      style={{ '--tilt': `${TILTS[index % TILTS.length]}deg` }}
    >
      <span className="polaroid__tape" aria-hidden="true" />
      <button type="button" className="polaroid__button no-swipe" onClick={() => onOpen(memory.src)} aria-label={`Open ${memory.title || 'memory'} in full screen`}>
        <img src={assetPath(memory.src)} alt={memory.title || 'A little memory'} loading="lazy" draggable="false" />
        <span className="polaroid__shine" aria-hidden="true" />
      </button>
      <figcaption>
        <span className="polaroid__caption">{memory.caption}</span>
        {memory.date && <span className="polaroid__date">{memory.date}</span>}
      </figcaption>
      <span className="polaroid__flower" aria-hidden="true">✿</span>
    </figure>
  );
}

export default function PolaroidGallery() {
  const [loadedSources, setLoadedSources] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const handleLoaded = useCallback((src) => {
    setLoadedSources((current) => (current.includes(src) ? current : [...current, src]));
  }, []);

  const visible = memories.filter((memory) => loadedSources.includes(memory.src));

  const openAt = (src) => {
    const found = visible.findIndex((memory) => memory.src === src);
    if (found >= 0) setLightboxIndex(found);
  };

  const navigate = (direction) => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      return (current + direction + visible.length) % visible.length;
    });
  };

  return (
    <div className="polaroid-gallery-wrap" data-reveal>
      {visible.length === 0 && (
        <p className="gallery-empty">
          Your photos will appear here as soon as you add them to the memories folder. ♡
        </p>
      )}

      <div className="polaroid-gallery">
        {memories.map((memory, index) => (
          <MemoryCard
            key={memory.src}
            memory={memory}
            index={index}
            onLoaded={handleLoaded}
            onOpen={openAt}
          />
        ))}
      </div>

      {lightboxIndex !== null && visible.length > 0 && (
        <PhotoLightbox
          items={visible}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={navigate}
        />
      )}
    </div>
  );
}
