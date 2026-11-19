import { useMemo } from 'react';
import { seededRandom } from '../utils/animations';

export default function FloatingParticles({ count = 24, variant = 'gold', className = '' }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: seededRandom(i + 31) * 100,
        delay: seededRandom(i + 71) * 12,
        duration: 9 + seededRandom(i + 97) * 12,
        size: 2 + seededRandom(i + 131) * 4,
        drift: (seededRandom(i + 177) - 0.5) * 90,
      })),
    [count]
  );

  return (
    <div className={`floating-particles particles--${variant} ${className}`} aria-hidden="true">
      {particles.map((p, i) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--drift': `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
