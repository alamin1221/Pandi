import StarBackground from '../components/StarBackground';
import ThailandPostcard from '../components/ThailandPostcard';

export default function Page11ThailandPostcard() {
  return (
    <section className="page page--postcard page--scroll" aria-label="A postcard from your future">
      <StarBackground variant="sunset" moon={false} clouds nebula count={46} />

      <div className="page-heading page-heading--center">
        <p className="section-eyebrow">chapter eleven ♡</p>
        <h1>Greetings from Somewhere You've Dreamed Of</h1>
        <p className="page-heading__intro">A postcard from a future that is still yours to reach.</p>
      </div>

      <ThailandPostcard />
    </section>
  );
}
