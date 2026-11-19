import { useRef } from 'react';
import { timelineEntries } from '../data/timeline';
import { useReveal, useParallax } from '../utils/animations';
import { assetPath, useImageStatus } from '../utils/imageHelpers';

function TimelinePhoto({ src }) {
  const ref = useRef(null);
  const status = useImageStatus(src, ref);
  if (!src || status !== 'loaded') return null;
  return (
    <div ref={ref} className="timeline-card__photo">
      <img src={assetPath(src)} alt="" loading="lazy" />
    </div>
  );
}

export default function MemoryTimeline() {
  const revealRef = useReveal({ threshold: 0.1 });
  const parallaxRef = useParallax(10);

  return (
    <div ref={parallaxRef} className="timeline parallax-layer" data-reveal>
      <div ref={revealRef} className="timeline__track">
        {timelineEntries.length === 0 ? (
          <div className="timeline-empty is-visible">
            <span className="timeline-empty__icon" aria-hidden="true">🕰️</span>
            <h3>A little space, waiting for your stories.</h3>
            <p>
              Add dates and moments to <code>src/data/timeline.js</code> and they will appear here,
              beautifully arranged along this line.
            </p>
          </div>
        ) : (
          timelineEntries.map((entry, index) => (
            <article
              key={`${entry.date}-${entry.title}-${index}`}
              className={`timeline-entry ${index % 2 === 0 ? 'timeline-entry--left' : 'timeline-entry--right'}`}
            >
              <span className="timeline-entry__node" aria-hidden="true" />
              <div className="timeline-entry__card">
                {entry.date && <span className="timeline-entry__date">{entry.date}</span>}
                <h3>{entry.title}</h3>
                {entry.photo && <TimelinePhoto src={entry.photo} />}
                {entry.description && <p>{entry.description}</p>}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
