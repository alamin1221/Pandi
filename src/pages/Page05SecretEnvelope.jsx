import StarBackground from '../components/StarBackground';
import SecretEnvelope from '../components/SecretEnvelope';

export default function Page05SecretEnvelope() {
  return (
    <section className="page page--secret" aria-label="A secret envelope">
      <StarBackground variant="dream" moon clouds nebula count={62} />

      <div className="page-heading page-heading--center">
        <p className="section-eyebrow">chapter five ♡</p>
        <h1>A Secret Envelope</h1>
        <p className="page-heading__intro">A little note you haven't opened yet...</p>
      </div>

      <SecretEnvelope />
    </section>
  );
}
