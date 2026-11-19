import { useEffect, useRef, useState } from 'react';
import { finalWishes, beforeYouGo, quietMomentText } from '../data/wishes';
import { finalSignature, finalClosing } from '../data/messages';
import { settings } from '../data/settings';
import { useSequentialReveal, wait } from '../utils/animations';
import StarBackground from './StarBackground';

export default function FinalScene({ onReplay }) {
  const [sceneB, setSceneB] = useState(false);
  const [quietPhase, setQuietPhase] = useState(0);
  const timers = useRef([]);
  const revealed = useSequentialReveal(finalWishes.length, 920, !sceneB, 700);
  const wishesDone = revealed === finalWishes.length;

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

  const enterQuiet = () => {
    setSceneB(true);
    setQuietPhase(0);
    timers.current.push(window.setTimeout(() => setQuietPhase(1), settings.quietMomentDelay));
    timers.current.push(window.setTimeout(() => setQuietPhase(2), settings.quietMomentDelay + 2200));
    timers.current.push(window.setTimeout(() => setQuietPhase(3), settings.quietMomentDelay + 3600));
  };

  const replay = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    onReplay();
  };

  if (sceneB) {
    return (
      <section className="finale-scene finale-scene--quiet" aria-label="A quiet moment">
        <StarBackground variant="quiet" moon clouds nebula count={90} className="final-sky" />
        <div className="quiet-vignette" aria-hidden="true" />

        <div className="quiet-content">
          <div className={`quiet-words ${quietPhase >= 1 ? 'is-visible' : ''}`}>
            {quietMomentText.split('\n\n').map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <p className={`quiet-signature ${quietPhase >= 2 ? 'is-visible' : ''}`}>{finalSignature}</p>

          <div className={`quiet-footer ${quietPhase >= 3 ? 'is-visible' : ''}`}>
            <p>{settings.footer}</p>
            <button type="button" className="primary-button" onClick={replay}>
              Replay Our Little Journey ↺
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="finale-scene finale-scene--wishes" aria-label="A thousand wishes for you">
      <StarBackground variant="warm" moon clouds nebula count={72} />
      <div className="finale-glow" aria-hidden="true" />

      <div className="finale-content" data-reveal>
        <p className="section-eyebrow">chapter twelve ♡</p>
        <h1 className="finale-title">A Thousand Wishes for You</h1>

        <div className="finale-wishes">
          {finalWishes.map((wish, index) => (
            <p
              key={wish}
              className={`finale-wish ${index < revealed ? 'is-visible' : ''}`}
              style={{ '--line': index }}
            >
              <span aria-hidden="true">✦</span> {wish}
            </p>
          ))}
        </div>

        <div className={`before-you-go ${wishesDone ? 'is-visible' : ''}`}>
          <h3>Before You Go...</h3>
          <div className="before-you-go__text">
            {beforeYouGo.split('\n\n').map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <div className={`final-message ${wishesDone ? 'is-visible' : ''}`}>
          <h2>{finalSignature}</h2>
          {finalClosing.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <button type="button" className="primary-button" onClick={enterQuiet}>
            Continue to the Quiet Moment →
          </button>
        </div>
      </div>
    </section>
  );
}
