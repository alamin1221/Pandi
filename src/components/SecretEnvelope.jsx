import { useEffect, useRef, useState } from 'react';
import { secretLetterText } from '../data/messages';
import FloatingParticles from './FloatingParticles';

export default function SecretEnvelope() {
  const [stage, setStage] = useState('sealed');
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

  const open = () => {
    if (stage !== 'sealed') return;
    setStage('breaking');
    timers.current.push(window.setTimeout(() => setStage('open'), 420));
    timers.current.push(window.setTimeout(() => setStage('letter'), 1050));
  };

  const replay = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    setStage('sealed');
  };

  return (
    <div className={`secret-scene secret-scene--${stage}`} data-reveal>
      <FloatingParticles count={stage === 'sealed' ? 14 : 30} variant="gold" />

      <div className={`secret-glow ${stage !== 'sealed' ? 'is-active' : ''}`} aria-hidden="true" />

      <div className="secret-stage">
        <button
          type="button"
          className="secret-envelope no-swipe"
          onClick={open}
          disabled={stage !== 'sealed'}
          aria-label={stage === 'sealed' ? 'Open the secret envelope' : 'Envelope already opened'}
        >
          <span className="secret-envelope__back" />
          <span className="secret-envelope__paper" />
          <span className="secret-envelope__flap" />
          <span className="secret-envelope__front" />
          <span className="secret-envelope__seal">✦</span>
        </button>

        <div className="secret-letter" aria-hidden={stage !== 'letter'}>
          <span className="secret-letter__fold" />
          <p className="secret-letter__eyebrow">just for you</p>
          {secretLetterText.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <span className="secret-letter__signature">♡</span>
        </div>
      </div>

      {stage === 'letter' && (
        <button type="button" className="soft-replay" onClick={replay}>
          Seal it again ↺
        </button>
      )}
    </div>
  );
}
