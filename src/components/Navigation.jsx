import { useEffect, useState } from 'react';
import { chapters, pad } from '../data/settings';

export default function Navigation({ index, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const chapter = chapters[index];
  const total = chapters.length;
  const progress = ((index + 1) / total) * 100;

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const go = (next) => {
    setMenuOpen(false);
    onNavigate(next);
  };

  return (
    <>
      <header className="site-nav">
        <div className="site-nav__brand">
          <span className="site-nav__spark" aria-hidden="true">✦</span>
          <span className="site-nav__brand-text">For Pandi</span>
        </div>

        <div className="site-nav__chapter">
          <span className="site-nav__counter">
            {pad(chapter.number)} <span>/ {pad(total)}</span>
          </span>
          <span className="site-nav__title">{chapter.title}</span>
        </div>
      </header>

      <div className="nav-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <nav className="nav-actions" aria-label="Chapter navigation">
        <button
          type="button"
          className="nav-button nav-button--prev"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label="Previous chapter"
        >
          <span aria-hidden="true">←</span>
          <span className="nav-button__label">Previous</span>
        </button>

        <button
          type="button"
          className="nav-button nav-button--menu"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-label="Open chapter menu"
        >
          <span className="nav-button__dots" aria-hidden="true">
            {chapters.map((item, i) => (
              <i key={item.id} className={i === index ? 'is-active' : ''} />
            ))}
          </span>
          <span className="nav-button__label">Chapters</span>
        </button>

        <button
          type="button"
          className="nav-button nav-button--next"
          onClick={() => go(index + 1)}
          disabled={index === total - 1}
          aria-label="Next chapter"
        >
          <span className="nav-button__label">Next</span>
          <span aria-hidden="true">→</span>
        </button>
      </nav>

      {menuOpen && (
        <div className="chapter-menu" role="dialog" aria-modal="true" aria-label="Chapter menu">
          <button
            type="button"
            className="chapter-menu__backdrop"
            aria-label="Close chapter menu"
            onClick={() => setMenuOpen(false)}
          />
          <div className="chapter-menu__panel">
            <p className="chapter-menu__eyebrow">Our little journey</p>
            <h2 className="chapter-menu__heading">Choose a chapter</h2>
            <div className="chapter-menu__grid">
              {chapters.map((item, i) => (
                <button
                  type="button"
                  key={item.id}
                  className={`chapter-menu__item ${i === index ? 'is-active' : ''}`}
                  onClick={() => go(i)}
                  aria-current={i === index ? 'step' : undefined}
                >
                  <span className="chapter-menu__number">{pad(item.number)}</span>
                  <span className="chapter-menu__icon" aria-hidden="true">{item.icon}</span>
                  <span className="chapter-menu__name">{item.short}</span>
                </button>
              ))}
            </div>
            <button type="button" className="chapter-menu__close" onClick={() => setMenuOpen(false)}>
              Close ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
