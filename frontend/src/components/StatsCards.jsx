export default function StatsCards({ stats }) {
  const cards = [
    { label: "Total", value: stats.total },
    { label: "Todo", value: stats.todo },
    { label: "In Progress", value: stats.inProgress },
    { label: "Done", value: stats.done },
    { label: "Overdue", value: stats.overdue },
  ];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
      gap: "16px",
      marginBottom: "24px"
    }}>
      {cards.map(card => (
        <div key={card.label} style={{
          background: "white",
          padding: "18px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
        }}>
          <h4>{card.label}</h4>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}