import { useState } from 'react';
import { starMessages, allStarsMessage } from '../data/wishes';
import FloatingParticles from './FloatingParticles';

const POSITIONS = [
  { x: 13, y: 26 },
  { x: 31, y: 12 },
  { x: 52, y: 27 },
  { x: 75, y: 15 },
  { x: 87, y: 40 },
  { x: 67, y: 62 },
  { x: 43, y: 73 },
  { x: 19, y: 59 },
];

export default function InteractiveStars() {
  const [order, setOrder] = useState([]);
  const [activeMessage, setActiveMessage] = useState('');
  const complete = order.length === starMessages.length;

  const catchStar = (index) => {
    if (order.includes(index)) {
      setActiveMessage(starMessages[index]);
      return;
    }

    const nextOrder = [...order, index];
    setOrder(nextOrder);
    setActiveMessage(
      nextOrder.length === starMessages.length ? allStarsMessage : starMessages[index]
    );
  };

  const reset = () => {
    setOrder([]);
    setActiveMessage('');
  };

  return (
    <div className="constellation" data-reveal>
      <FloatingParticles count={20} variant="cosmic" />

      <div className="constellation__field no-swipe">
        <svg className="constellation__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {order.slice(1).map((point, i) => {
            const from = POSITIONS[order[i]];
            const to = POSITIONS[point];
            return (
              <line
                key={`${order[i]}-${point}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className="constellation__line"
                style={{ animationDelay: `${i * 0.12}s` }}
              />
            );
          })}
        </svg>

        {POSITIONS.map((position, index) => {
          const found = order.includes(index);
          return (
            <button
              key={index}
              type="button"
              className={`star-target no-swipe ${found ? 'is-found' : ''}`}
              style={{ left: `${position.x}%`, top: `${position.y}%` }}
              onClick={() => catchStar(index)}
              aria-label={`Catch star ${index + 1}${found ? ', already found' : ''}`}
            >
              <span className="star-target__glow" />
              <span className="star-target__shape">✦</span>
            </button>
          );
        })}
      </div>

      <div className={`constellation__message ${activeMessage ? 'is-visible' : ''} ${complete ? 'is-complete' : ''}`} aria-live="polite">
        <p>{activeMessage || 'Tap a star and see what it has to say.'}</p>
        <span className="constellation__count">{order.length} / {starMessages.length} stars found</span>
        {order.length > 0 && (
          <button type="button" className="constellation__reset" onClick={reset}>
            Start again ↺
          </button>
        )}
      </div>
    </div>
  );
}
