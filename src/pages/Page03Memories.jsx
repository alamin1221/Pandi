import { memoriesIntro } from '../data/messages';
import StarBackground from '../components/StarBackground';
import FloatingParticles from '../components/FloatingParticles';
import PolaroidGallery from '../components/PolaroidGallery';

export default function Page03Memories() {
  return (
    <section className="page page--memories page--scroll" aria-label="Little memories of you">
      <StarBackground variant="soft" moon={false} clouds={false} nebula count={40} />
      <FloatingParticles count={16} variant="petal" />

      <div className="page-heading">
        <p className="section-eyebrow">chapter three ♡</p>
        <h1>Little Moments, Little Memories</h1>
        {memoriesIntro.map((line) => (
          <p key={line} className="page-heading__intro">{line}</p>
        ))}
      </div>

      <PolaroidGallery />
      <p className="gallery-footer" data-reveal>Tap any photo to see it up close. Swipe to wander through them. ✨</p>
    </section>
  );
}
