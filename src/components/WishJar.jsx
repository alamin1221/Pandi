import { useState } from 'react';
import { jarWishes } from '../data/wishes';
import { shuffled } from '../utils/imageHelpers';
import FloatingParticles from './FloatingParticles';

const NOTE_STYLES = [
  { left: '30%', top: '52%', rotate: '-11deg' },
  { left: '54%', top: '46%', rotate: '8deg' },
  { left: '38%', top: '38%', rotate: '4deg' },
  { left: '62%', top: '59%', rotate: '-6deg' },
  { left: '27%', top: '64%', rotate: '13deg' },
  { left: '49%', top: '57%', rotate: '-3deg' },
  { left: '67%', top: '39%', rotate: '9deg' },
  { left: '35%', top: '47%', rotate: '-8deg' },
  { left: '57%', top: '66%', rotate: '5deg' },
];

export default function WishJar() {
  const [remaining, setRemaining] = useState(() => shuffled(jarWishes));
  const [current, setCurrent] = useState(null);
  const [noteKey, setNoteKey] = useState(0);

  const pickNote = () => {
    let pool = remaining;
    if (pool.length === 0) {
      pool = shuffled(jarWishes);
    }
    const [wish, ...rest] = pool;
    setRemaining(rest);
    setCurrent(wish);
    setNoteKey((key) => key + 1);
  };

  const closeNote = () => setCurrent(null);

  return (
    <div className="wish-jar-scene" data-reveal>
      <FloatingParticles count={22} variant="gold" />

      <div className={`wish-jar ${current ? 'has-note' : ''}`}>
        <span className="wish-jar__glow" aria-hidden="true" />
        <span className="wish-jar__lid" aria-hidden="true" />
        <div className="wish-jar__glass no-swipe">
          <span className="wish-jar__shine" aria-hidden="true" />
          <span className="wish-jar__sparkles" aria-hidden="true">✦ ✧ ✦</span>

          {jarWishes.map((wish, index) => (
            <button
              type="button"
              key={wish}
              className="wish-jar__note"
              style={{
                left: NOTE_STYLES[index].left,
                top: NOTE_STYLES[index].top,
                '--note-rotate': NOTE_STYLES[index].rotate,
              }}
              onClick={pickNote}
              aria-label="Pick a little note from the jar"
            >
              <span />
            </button>
          ))}
        </div>
        <span className="wish-jar__shadow" aria-hidden="true" />
      </div>

      {current && (
        <div className="wish-note-overlay" role="dialog" aria-modal="true" aria-label="Your little wish">
          <button type="button" className="wish-note-overlay__backdrop" aria-label="Close note" onClick={closeNote} />
          <div key={noteKey} className="wish-note">
            <button type="button" className="wish-note__close" onClick={closeNote} aria-label="Close note">✕</button>
            <span className="wish-note__pin" aria-hidden="true">✦</span>
            <p className="wish-note__label">a little wish for you</p>
            <p className="wish-note__text">{current}</p>
            <button type="button" className="wish-note__another" onClick={closeNote}>
              Pick another note ↺
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
