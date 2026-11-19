import { useRef, useState } from 'react';
import { thailandImages } from '../data/memories';
import { postcardText } from '../data/messages';
import { assetPath, useImageStatus } from '../utils/imageHelpers';
import FloatingParticles from './FloatingParticles';

function ScenicPanel({ src, className, label, refToUse }) {
  const status = useImageStatus(src, refToUse);
  return (
    <div ref={refToUse} className={`postcard-scenery__panel ${className} ${status === 'loaded' ? 'has-photo' : ''}`}>
      {status === 'loaded' && <img src={assetPath(src)} alt="" loading="lazy" />}
      <span className="postcard-scenery__label">{label}</span>
    </div>
  );
}

export default function ThailandPostcard() {
  const [flipped, setFlipped] = useState(false);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  return (
    <div className="thailand-scene" data-reveal>
      <FloatingParticles count={18} variant="gold" />
      <div className="thailand-scene__sky" aria-hidden="true">
        <div className="postcard-cloud postcard-cloud--one" />
        <div className="postcard-cloud postcard-cloud--two" />
        <div className="postcard-plane" aria-hidden="true">
          <span className="postcard-plane__trail" />
          ✈
        </div>
        <div className="thailand-sun" />
      </div>

      <div className="postcard-scenery" aria-hidden="true">
        <ScenicPanel src={thailandImages[0]} refToUse={ref1} className="postcard-scenery__panel--city" label="Bangkok" />
        <ScenicPanel src={thailandImages[1]} refToUse={ref2} className="postcard-scenery__panel--beach" label="Islands & Beaches" />
        <ScenicPanel src={thailandImages[2]} refToUse={ref3} className="postcard-scenery__panel--temple" label="Chiang Mai" />
      </div>

      <div className={`postcard ${flipped ? 'is-flipped' : ''}`}>
        <div className="postcard__inner">
          <div className="postcard__face postcard__face--front">
            <span className="postcard__border" aria-hidden="true" />
            <div className="postcard__stamps" aria-hidden="true">
              <span className="postcard__stamp">🇹🇭<small>THAILAND</small></span>
              <span className="postcard__postmark">✦<small>DREAM POST</small></span>
            </div>
            <div className="postcard__front-art" aria-hidden="true">
              <span className="postcard__sun" />
              <span className="postcard__water" />
              <span className="postcard__palm postcard__palm--left">🌴</span>
              <span className="postcard__palm postcard__palm--right">🌴</span>
              <span className="postcard__skyline">🏯</span>
            </div>
            <p className="postcard__script">Someday,<br />somewhere beautiful.</p>
            <span className="postcard__address">To: Pandi<br /><em>A dream still waiting to happen</em></span>
          </div>

          <div className="postcard__face postcard__face--back">
            <span className="postcard__border" aria-hidden="true" />
            <div className="postcard__writing">
              {postcardText.map((paragraph, index) => (
                <p key={paragraph} className={index === 0 || index === postcardText.length - 1 ? 'is-signature' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>
            <span className="postcard__stamp postcard__stamp--corner" aria-hidden="true">🇹🇭</span>
          </div>
        </div>
      </div>

      <button type="button" className="postcard__flip no-swipe" onClick={() => setFlipped((value) => !value)}>
        {flipped ? 'See the front again ↺' : 'Turn the postcard over →'}
      </button>
      <p className="postcard__note">A little dream of a place, not a memory — yet.</p>
    </div>
  );
}
