import StarBackground from '../components/StarBackground';
import InteractiveStars from '../components/InteractiveStars';

export default function Page08Constellation() {
  return (
    <section className="page page--constellation page--scroll" aria-label="Catch a little star">
      <StarBackground variant="cosmic" moon clouds nebula count={94} />

      <div className="page-heading page-heading--center">
        <p className="section-eyebrow">chapter eight ♡</p>
        <h1>Catch a Little Star</h1>
        <p className="page-heading__intro">Tap a star and see what it has to say.</p>
      </div>

      <InteractiveStars />
    </section>
  );
}
