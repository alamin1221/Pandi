import StarBackground from '../components/StarBackground';
import FloatingParticles from '../components/FloatingParticles';
import MemoryTimeline from '../components/MemoryTimeline';

export default function Page04Timeline() {
  return (
    <section className="page page--timeline page--scroll" aria-label="A few moments along the way">
      <StarBackground variant="sepia" moon={false} clouds={false} nebula count={38} />
      <FloatingParticles count={14} variant="gold" />

      <div className="page-heading">
        <p className="section-eyebrow">chapter four ♡</p>
        <h1>A Few Moments Along the Way</h1>
        <p className="page-heading__intro">A quiet little path through the moments you choose to keep.</p>
      </div>

      <MemoryTimeline />
    </section>
  );
}
