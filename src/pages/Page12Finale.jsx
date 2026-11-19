import FinalScene from '../components/FinalScene';

export default function Page12Finale({ onReplay }) {
  return (
    <section className="page page--finale" aria-label="A thousand wishes and the quiet ending">
      <FinalScene onReplay={onReplay} />
    </section>
  );
}
