import StarBackground from '../components/StarBackground';
import WishJar from '../components/WishJar';

export default function Page10WishJar() {
  return (
    <section className="page page--jar page--scroll" aria-label="A jar full of little wishes">
      <StarBackground variant="warm" moon clouds nebula count={56} />

      <div className="page-heading page-heading--center">
        <p className="section-eyebrow">chapter ten ♡</p>
        <h1>A Jar Full of Little Wishes</h1>
        <p className="page-heading__intro">Pick a little note.</p>
      </div>

      <WishJar />
    </section>
  );
}
