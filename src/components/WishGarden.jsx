import { useState } from 'react';
import { gardenWishes } from '../data/wishes';
import FloatingParticles from './FloatingParticles';

export default function WishGarden() {
  const [opened, setOpened] = useState([]);
  const [activeWish, setActiveWish] = useState('');
  const fullBloom = opened.length === gardenWishes.length;

  const pickFlower = (index) => {
    setActiveWish(gardenWishes[index]);
    setOpened((current) => (current.includes(index) ? current : [...current, index]));
  };

  return (
    <div className={`wish-garden ${fullBloom ? 'is-full-bloom' : ''}`} data-reveal>
      <FloatingParticles count={26} variant="petal" />

      <div className="wish-garden__ground" aria-hidden="true" />

      <div className="wish-garden__flowers no-swipe">
        {gardenWishes.map((wish, index) => {
          const isOpen = opened.includes(index);
          return (
            <button
              type="button"
              key={wish}
              className={`garden-flower garden-flower--${index + 1} ${isOpen ? 'is-open' : ''}`}
              onClick={() => pickFlower(index)}
              aria-label={`Open flower ${index + 1}${isOpen ? ', wish already opened' : ''}`}
              style={{ '--bloom-delay': `${index * 0.08}s`, '--sway-delay': `${index * 0.6}s` }}
            >
              <span className="garden-flower__bloom" aria-hidden="true">
                {Array.from({ length: 6 }, (_, petal) => (
                  <i key={petal} style={{ '--petal': petal }} />
                ))}
                <b />
              </span>
              <span className="garden-flower__stem" aria-hidden="true">
                <i className="garden-flower__leaf garden-flower__leaf--left" />
                <i className="garden-flower__leaf garden-flower__leaf--right" />
              </span>
            </button>
          );
        })}
      </div>

      <div className={`wish-garden__message ${activeWish ? 'is-visible' : ''}`} aria-live="polite">
        <p>{activeWish || 'Every flower holds a little wish for you.'}</p>
        <span>{opened.length} / {gardenWishes.length} wishes opened</span>
      </div>

      {fullBloom && (
        <p className="wish-garden__final">The whole garden is blooming for you. 🌷</p>
      )}
    </div>
  );
}
