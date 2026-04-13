export default function StatsCards({ stats, vertical }) {
  const cards = [
    { label: "Total", value: stats.total || 0, color: "var(--primary-color)" },
    { label: "Todo", value: stats.todo || 0, color: "var(--text-muted)" },
    { label: "In Progress", value: stats.inProgress || 0, color: "var(--accent-color)" },
    { label: "Done", value: stats.done || 0, color: "#10b981" },
  ];

  return (
    <div style={{
      display: vertical ? "flex" : "grid",
      flexDirection: vertical ? "column" : "row",
      gridTemplateColumns: vertical ? "none" : "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "1rem",
      marginBottom: "0"
    }}>
      {cards.map(card => (
        <div key={card.label} className="glass-card" style={{
          padding: "1rem",
          textAlign: "center",
          borderTop: `4px solid ${card.color}`
        }}>
          <h4 style={{ color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
            {card.label}
          </h4>
          <p style={{ fontSize: "1.75rem", fontWeight: "700", color: "var(--text-main)", lineHeight: 1, margin: 0 }}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}