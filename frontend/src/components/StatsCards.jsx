export default function StatsCards({ stats, vertical }) {
  const cards = [
    { label: "Total", value: stats.total || 0, color: "var(--primary-color)" },
    { label: "Todo", value: stats.todo || 0, color: "var(--text-muted)" },
    { label: "In Progress", value: stats.inProgress || 0, color: "var(--accent-color)" },
    { label: "Done", value: stats.done || 0, color: "#10b981" },
  ];

  return (
    <div
      className={vertical ? "stats-grid stats-grid-vertical" : "stats-grid"}
    >
      {cards.map(card => (
        <div
          key={card.label}
          className="glass-card stats-card"
          style={{ borderTop: `4px solid ${card.color}` }}
        >
          <h4 className="stats-card-label">
            {card.label}
          </h4>
          <p className="stats-card-value">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}
