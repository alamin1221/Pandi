import { useState } from 'react';
import { welcomeLines } from '../data/messages';
import { settings } from '../data/settings';
import StarBackground from '../components/StarBackground';
import FloatingParticles from '../components/FloatingParticles';

export default function Page01Welcome({ onNext }) {
  const [secretOpen, setSecretOpen] = useState(false);

  return (
    <section className="page page--welcome" aria-label="The little surprise">
      <StarBackground variant="night" moon clouds nebula count={88} />
      <FloatingParticles count={22} variant="cosmic" />
      <div className="welcome-vignette" aria-hidden="true" />

      <button
        type="button"
        className="hidden-star no-swipe"
        onClick={() => setSecretOpen((value) => !value)}
        aria-label="A tiny star looks clickable"
        aria-expanded={secretOpen}
      >
        ✦
      </button>

      {secretOpen && (
        <div className="secret-star-message" role="status">
          <span aria-hidden="true">✧</span>
          <p>{settings.hiddenStarMessage}</p>
          <button type="button" onClick={() => setSecretOpen(false)} aria-label="Close secret message">✕</button>
        </div>
      )}

      <div className="welcome-content" data-reveal>
        <p className="welcome-eyebrow">a little world made with care</p>
        <div className="welcome-lines">
          {welcomeLines.map((line, index) => (
            <p key={line} className="welcome-line" style={{ '--line': index }}>
              {line}
            </p>
          ))}
        </div>
        <button type="button" className="primary-button welcome-enter" onClick={onNext}>
          Enter Your Little World →
        </button>
      </div>

      <p className="scroll-hint" aria-hidden="true">scroll down to continue the story ✦</p>
    </section>
  );
}
