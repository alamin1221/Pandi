export default function PageTransition({ active, phase, chapter, direction = 1 }) {
  return (
    <div
      className={`page-transition ${active ? 'is-active' : ''} ${phase === 'out' ? 'is-leaving' : ''} ${
        direction < 0 ? 'is-backward' : 'is-forward'
      }`}
      aria-hidden="true"
    >
      <div className="page-transition__veil" />
      <div className="page-transition__sweep" />
      <div className="page-transition__moon" />
      <div className="page-transition__particles">
        {Array.from({ length: 22 }, (_, i) => (
          <span key={i} style={{ '--i': i }} />
        ))}
      </div>

      {chapter && (
        <div className="page-transition__label">
          <span className="page-transition__number">{chapter.number}</span>
          <span className="page-transition__title">{chapter.title}</span>
          <span className="page-transition__flourish">
            {chapter.icon} <i aria-hidden="true">✦</i> turning the page <i aria-hidden="true">✦</i>
          </span>
        </div>
      )}
    </div>
  );
}
