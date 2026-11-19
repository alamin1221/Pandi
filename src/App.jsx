import { useCallback, useEffect, useRef, useState } from 'react';
import { chapters, settings, pad } from './data/settings';
import { prefersReducedMotion } from './utils/animations';

import Navigation from './components/Navigation';
import MusicPlayer from './components/MusicPlayer';
import PageTransition from './components/PageTransition';
import CustomCursor from './components/CustomCursor';

import Page01Welcome from './pages/Page01Welcome';
import Page02Birthday from './pages/Page02Birthday';
import Page03Memories from './pages/Page03Memories';
import Page04Timeline from './pages/Page04Timeline';
import Page05SecretEnvelope from './pages/Page05SecretEnvelope';
import Page06Letter from './pages/Page06Letter';
import Page07OpenWhen from './pages/Page07OpenWhen';
import Page08Constellation from './pages/Page08Constellation';
import Page09WishGarden from './pages/Page09WishGarden';
import Page10WishJar from './pages/Page10WishJar';
import Page11ThailandPostcard from './pages/Page11ThailandPostcard';
import Page12Finale from './pages/Page12Finale';

const PAGES = [
  Page01Welcome,
  Page02Birthday,
  Page03Memories,
  Page04Timeline,
  Page05SecretEnvelope,
  Page06Letter,
  Page07OpenWhen,
  Page08Constellation,
  Page09WishGarden,
  Page10WishJar,
  Page11ThailandPostcard,
  Page12Finale,
];

// Overlays keep their own scrolling/gestures — a chapter must not change behind them.
const WHEEL_IGNORE = [
  '.no-swipe',
  '.lightbox',
  '.chapter-menu',
  '[role="dialog"]',
  '.music-player',
  'input',
  'textarea',
  'select',
  '[contenteditable="true"]',
].join(', ');

const TOUCH_IGNORE = [
  '.no-swipe',
  '.lightbox',
  '.chapter-menu',
  '[role="dialog"]',
  '.music-player',
  'button',
  'a',
  'input',
  'textarea',
  'select',
  '.letter-paper',
  '.open-when-letter',
  '.postcard',
  '.wish-note',
].join(', ');

// Returns the closest ancestor that can still scroll in this direction.
// null means every scrollable ancestor is already at its edge.
function findActiveScroller(target, direction) {
  let element = target instanceof Element ? target : null;

  while (element) {
    const overflowY = window.getComputedStyle(element).overflowY;
    if (/(auto|scroll)/.test(overflowY)) {
      const max = element.scrollHeight - element.clientHeight;
      if (max > 2) {
        const atStart = element.scrollTop <= 2;
        const atEnd = element.scrollTop >= max - 2;
        if ((direction > 0 && !atEnd) || (direction < 0 && !atStart)) {
          return element;
        }
      }
    }
    element = element.parentElement;
  }

  return null;
}

export default function App() {
  const [index, setIndex] = useState(0);
  const [journeyKey, setJourneyKey] = useState(0);
  const [transition, setTransition] = useState({
    active: false,
    phase: 'in',
    chapter: null,
    direction: 1,
  });
  const busy = useRef(false);
  const timers = useRef([]);
  const touchStart = useRef(null);
  const wheelIntent = useRef({ direction: 0, amount: 0, lastAt: 0 });
  const pageBarRef = useRef(null);

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

  const resetWheelIntent = () => {
    wheelIntent.current = { direction: 0, amount: 0, lastAt: 0 };
  };

  // Scroll reveals + a thin "how far into this chapter" progress line.
  useEffect(() => {
    const slot = document.querySelector('.page-slot');
    const page = slot?.querySelector('.finale-scene') || slot?.querySelector('.page');
    if (!slot) return undefined;

    const items = slot.querySelectorAll('[data-reveal]');
    let observer = null;

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { root: page || null, threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
      );
      items.forEach((item) => observer.observe(item));
    }

    const paintBar = (element) => {
      if (!element || !pageBarRef.current) return;
      const max = element.scrollHeight - element.clientHeight;
      const ratio = max > 2 ? Math.min(1, Math.max(0, element.scrollTop / max)) : 0;
      pageBarRef.current.style.transform = `scaleX(${ratio})`;
    };

    const onScroll = (event) => {
      const element = event.target;
      if (!element || typeof element.classList === 'undefined') return;
      if (!element.classList.contains('page') && !element.classList.contains('finale-scene')) return;
      paintBar(element);
    };

    document.addEventListener('scroll', onScroll, true);
    paintBar(page);

    return () => {
      document.removeEventListener('scroll', onScroll, true);
      if (observer) observer.disconnect();
    };
  }, [index, journeyKey]);

  const navigate = useCallback(
    (target) => {
      const next = Math.max(0, Math.min(chapters.length - 1, target));
      if (busy.current || next === index) return;

      const chapter = chapters[next];
      busy.current = true;
      resetWheelIntent();
      touchStart.current = null;

      const duration = prefersReducedMotion() ? 160 : settings.transitionDuration;
      setTransition({
        active: true,
        phase: 'in',
        direction: next > index ? 1 : -1,
        chapter: {
          number: pad(chapter.number),
          title: chapter.title,
          icon: chapter.icon,
        },
      });

      timers.current.push(
        window.setTimeout(() => {
          setIndex(next);
          setTransition((current) => ({ ...current, phase: 'out' }));
        }, duration / 2)
      );

      timers.current.push(
        window.setTimeout(() => {
          setTransition({ active: false, phase: 'in', chapter: null, direction: 1 });
          busy.current = false;
        }, duration)
      );
    },
    [index]
  );

  const replay = useCallback(() => {
    setJourneyKey((key) => key + 1);
    navigate(0);
  }, [navigate]);

  // Keyboard navigation — ignored while typing or inside a dialog.
  useEffect(() => {
    const onKey = (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      const target = event.target;
      if (
        target.closest('input, textarea, select, [contenteditable="true"], .lightbox, [role="dialog"], .no-arrow-nav')
      ) {
        return;
      }
      navigate(index + (event.key === 'ArrowRight' ? 1 : -1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, navigate]);

  // Vertical wheel scrolling reveals the chapter; at the end it turns the page.
  useEffect(() => {
    const onWheel = (event) => {
      if (busy.current || event.ctrlKey || event.defaultPrevented || !event.deltaY) return;
      const target = event.target;
      if (!(target instanceof Element) || target.closest(WHEEL_IGNORE)) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      if (findActiveScroller(target, direction)) {
        resetWheelIntent();
        return;
      }
      if ((direction > 0 && index >= chapters.length - 1) || (direction < 0 && index <= 0)) return;

      event.preventDefault();

      const now = Date.now();
      if (wheelIntent.current.direction !== direction || now - wheelIntent.current.lastAt > 700) {
        wheelIntent.current = { direction, amount: 0, lastAt: now };
      }
      const unit = event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? window.innerHeight : 1;
      wheelIntent.current.amount += Math.abs(event.deltaY) * unit;
      wheelIntent.current.lastAt = now;

      if (wheelIntent.current.amount >= 40) {
        resetWheelIntent();
        navigate(index + direction);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [index, navigate]);

  const onTouchStart = (event) => {
    if (busy.current) return;
    const target = event.target;
    if (!(target instanceof Element) || target.closest(TOUCH_IGNORE)) {
      touchStart.current = null;
      return;
    }

    const touch = event.touches[0];
    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      atBottom: findActiveScroller(target, 1) === null,
      atTop: findActiveScroller(target, -1) === null,
    };
  };

  const onTouchEnd = (event) => {
    const start = touchStart.current;
    if (!start || busy.current) return;
    touchStart.current = null;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    // Horizontal swipe still works as a shortcut on phones.
    if (Math.abs(dx) > 85 && Math.abs(dx) > Math.abs(dy) * 1.6) {
      navigate(index + (dx < 0 ? 1 : -1));
      return;
    }

    // A vertical swipe only turns the page when the current chapter is at its edge.
    if (Math.abs(dy) > 60 && Math.abs(dy) > Math.abs(dx) * 1.3) {
      if (dy < 0 && start.atBottom && index < chapters.length - 1) navigate(index + 1);
      else if (dy > 0 && start.atTop && index > 0) navigate(index - 1);
    }
  };

  const CurrentPage = PAGES[index];

  return (
    <div className="app-shell" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <CustomCursor />

      <main className="app-pages">
        <div className="page-slot" key={`${journeyKey}-${index}`}>
          <CurrentPage onNext={() => navigate(index + 1)} onReplay={replay} />
        </div>
      </main>

      <Navigation index={index} onNavigate={navigate} />
      <div className="page-progress" aria-hidden="true">
        <span ref={pageBarRef} />
      </div>
      <MusicPlayer />
      <PageTransition
        active={transition.active}
        phase={transition.phase}
        chapter={transition.chapter}
        direction={transition.direction}
      />
    </div>
  );
}
