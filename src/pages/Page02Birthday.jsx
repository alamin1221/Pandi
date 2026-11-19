import { useState } from 'react';
import { birthdayIntro, birthdayWishReveal } from '../data/messages';
import StarBackground from '../components/StarBackground';
import FloatingParticles from '../components/FloatingParticles';

const CONFETTI = Array.from({ length: 38 }, (_, i) => ({
  left: (i * 37) % 100,
  delay: (i % 11) * 0.7,
  duration: 7 + (i % 7),
  color: ['#ffb6d9', '#c9b6ff', '#ffe6a7', '#bde9ff', '#ffd1c1'][i % 5],
  rotate: (i * 47) % 360,
}));

export default function Page02Birthday({ onNext }) {
  const [wished, setWished] = useState(false);

  return (
    <section className="page page--birthday" aria-label="Happy birthday Pandi">
      <StarBackground variant="blush" moon={false} clouds nebula count={52} />
      <FloatingParticles count={26} variant="gold" />

      <div className="birthday-lights" aria-hidden="true" />
      <div className="confetti" aria-hidden="true">
        {CONFETTI.map((piece, i) => (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            style={{
              left: `${piece.left}%`,
              background: piece.color,
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.duration}s`,
              '--rotate': `${piece.rotate}deg`,
            }}
          />
        ))}
      </div>

      <div className="birthday-content" data-reveal>
        <div className="birthday-copy">
          <p className="section-eyebrow">the big day</p>
          <h1 className="birthday-title">Happy Birthday, Pandi!</h1>
          <p className="birthday-intro">{birthdayIntro}</p>
          <button type="button" className="primary-button" onClick={() => setWished(true)} disabled={wished}>
            Make a Little Wish ✨
          </button>
          <div className={`wish-reveal ${wished ? 'is-visible' : ''}`} aria-live="polite">
            <p>{birthdayWishReveal}</p>
          </div>
          {wished && (
            <button type="button" className="birthday-next" onClick={onNext}>
              Keep exploring →
            </button>
          )}
        </div>

        <div className={`cake-scene ${wished ? 'is-wished' : ''}`} aria-hidden="true">
          <span className="cake-glow" />
          <div className="cake">
            <div className="cake__topper">Happy Birthday</div>
            <div className="cake__candles">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className="cake__candle" style={{ '--candle': i }}>
                  <i className="cake__flame" />
                  <i className="cake__stick" />
                </span>
              ))}
            </div>
            <div className="cake__tier cake__tier--small">
              <span className="cake__drip" />
            </div>
            <div className="cake__tier cake__tier--medium">
              <span className="cake__drip" />
            </div>
            <div className="cake__tier cake__tier--large">
              <span className="cake__drip" />
            </div>
            <div className="cake__plate" />
          </div>
          <div className="cake-flowers">
            <span>🌸</span><span>🌷</span><span>🌼</span><span>💐</span>
          </div>
          <div className="cake-sparkles"><span>✦</span><span>✧</span><span>✦</span></div>
        </div>
      </div>
    </section>
  );
}
