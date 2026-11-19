import { useState } from 'react';
import { openWhenLetters } from '../data/wishes';
import StarBackground from '../components/StarBackground';
import FloatingParticles from '../components/FloatingParticles';

export default function Page07OpenWhen() {
  const [openIds, setOpenIds] = useState([]);

  const toggle = (id) => {
    setOpenIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  return (
    <section className="page page--open-when page--scroll" aria-label="Open when letters">
      <StarBackground variant="dream" moon={false} clouds nebula count={48} />
      <FloatingParticles count={18} variant="gold" />

      <div className="page-heading page-heading--center">
        <p className="section-eyebrow">chapter seven ♡</p>
        <h1>Open When...</h1>
        <p className="page-heading__intro">Little letters for whatever kind of day you're having.</p>
      </div>

      <div className="open-when-grid" data-reveal>
        {openWhenLetters.map((letter, index) => {
          const isOpen = openIds.includes(letter.id);
          return (
            <article key={letter.id} className={`open-when-card ${isOpen ? 'is-open' : ''}`} style={{ '--card': index }}>
              {!isOpen ? (
                <button
                  type="button"
                  className="open-when-envelope no-swipe"
                  onClick={() => toggle(letter.id)}
                  aria-label={`${letter.label}: open letter`}
                >
                  <span className="open-when-envelope__flap" />
                  <span className="open-when-envelope__body" />
                  <span className="open-when-envelope__seal">{letter.icon}</span>
                  <span className="open-when-envelope__label">{letter.label}</span>
                </button>
              ) : (
                <div className="open-when-letter no-swipe">
                  <span className="open-when-letter__pin" aria-hidden="true">✦</span>
                  <h3>{letter.label}</h3>
                  <p>{letter.message}</p>
                  <button type="button" onClick={() => toggle(letter.id)}>
                    Fold it back up ↺
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
