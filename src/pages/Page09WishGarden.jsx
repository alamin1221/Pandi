import StarBackground from '../components/StarBackground';
import WishGarden from '../components/WishGarden';

export default function Page09WishGarden() {
  return (
    <section className="page page--garden page--scroll" aria-label="A garden of good wishes">
      <StarBackground variant="garden" moon={false} clouds={false} nebula count={42} />

      <div className="page-heading page-heading--center">
        <p className="section-eyebrow">chapter nine ♡</p>
        <h1>A Garden of Good Wishes</h1>
        <p className="page-heading__intro">Every flower holds a little wish for you.</p>
      </div>

      <WishGarden />
    </section>
  );
}
