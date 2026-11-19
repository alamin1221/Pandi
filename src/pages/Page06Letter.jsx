import { useEffect, useRef, useState } from 'react';
import { letterParagraphs } from '../data/messages';
import StarBackground from '../components/StarBackground';
import FloatingParticles from '../components/FloatingParticles';

export default function Page06Letter() {
  const [open, setOpen] = useState(false);
  const pageRef = useRef(null);

  // The letter opens itself as soon as the reader scrolls a little further.
  useEffect(() => {
    if (open) return undefined;
    const page = pageRef.current;
    if (!page) return undefined;

    const openOnScroll = () => {
      if (page.scrollTop > 72) setOpen(true);
    };

    page.addEventListener('scroll', openOnScroll, { passive: true });
    return () => page.removeEventListener('scroll', openOnScroll);
  }, [open]);

  return (
    <section ref={pageRef} className="page page--letter page--scroll" aria-label="A letter for you">
      <StarBackground variant="lavender" moon={false} clouds={false} nebula count={44} />
      <FloatingParticles count={20} variant="petal" />

      <div className="page-heading page-heading--center">
        <p className="section-eyebrow">chapter six ♡</p>
        <h1>A Few Words From Me to You</h1>
        <p className="page-heading__intro">Things I hope you remember, even after today.</p>
        <p className={`letter-scroll-cue ${open ? 'is-hidden' : ''}`}>scroll a little more to open the letter ♡</p>
      </div>

      <div className={`letter-stage ${open ? 'is-open' : ''}`} data-reveal>
        <div className="letter-paper no-swipe">
          <span className="letter-paper__border" aria-hidden="true" />
          <span className="letter-paper__flower letter-paper__flower--one" aria-hidden="true">❀</span>
          <span className="letter-paper__flower letter-paper__flower--two" aria-hidden="true">✿</span>
          <span className="letter-paper__flower letter-paper__flower--three" aria-hidden="true">❁</span>

          {!open && (
            <div className="letter-teaser">
              <p>Hey Pandi,</p>
              <p>Happy Birthday!</p>
              <button type="button" className="letter-teaser__cue" onClick={() => setOpen(true)}>
                Open My Letter ♡
              </button>
            </div>
          )}

          <div className="letter-paper__content">
            {letterParagraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={`${index === 0 ? 'letter-greeting' : ''} ${index === 1 ? 'letter-subgreeting' : ''} ${index === letterParagraphs.length - 1 ? 'letter-signoff' : ''}`}
                style={{ '--paragraph': index }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
