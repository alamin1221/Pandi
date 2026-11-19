import { useMemo } from 'react';
import { useParallax, seededRandom } from '../utils/animations';

export default function StarBackground({
  variant = 'night',
  moon = true,
  clouds = true,
  nebula = true,
  count = 76,
  className = '',
}) {
  const ref = useParallax(18);

  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: seededRandom(i + 1) * 100,
        top: seededRandom(i + 101) * 100,
        size: 1 + seededRandom(i + 201) * 2.6,
        delay: seededRandom(i + 301) * 6,
        duration: 2.6 + seededRandom(i + 401) * 3.6,
        bright: seededRandom(i + 501) > 0.84,
      })),
    [count]
  );

  const nearStars = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: seededRandom(i + 901) * 100,
        top: seededRandom(i + 1001) * 78,
        size: 2.4 + seededRandom(i + 1101) * 2.4,
        delay: seededRandom(i + 1201) * 5,
      })),
    []
  );

  return (
    <div ref={ref} className={`star-background star-bg--${variant} ${className}`} aria-hidden="true">
      {nebula && (
        <>
          <div className="nebula nebula--one parallax-layer" />
          <div className="nebula nebula--two parallax-layer" />
        </>
      )}

      <div className="star-layer parallax-layer">
        {stars.map((star, i) => (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className={`star ${star.bright ? 'star--bright' : ''}`}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="star-layer star-layer--near parallax-layer">
        {nearStars.map((star, i) => (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className="star star--near"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {moon && (
        <div className="moon parallax-layer">
          <span className="moon__halo" />
          <span className="moon__body" />
        </div>
      )}

      {clouds && (
        <div className="clouds parallax-layer">
          <span className="cloud cloud--one" />
          <span className="cloud cloud--two" />
          <span className="cloud cloud--three" />
        </div>
      )}
    </div>
  );
}
