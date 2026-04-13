import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const COLORS = {
  Todo: '#94a3b8', 
  'In Progress': '#fbbf24', 
  Done: '#10b981', 
  Overdue: '#ef4444'
};

export default function ProgressCharts({ stats }) {
  const pieData = [
    { name: 'Todo', value: stats.todo || 0 },
    { name: 'In Progress', value: stats.inProgress || 0 },
    { name: 'Done', value: stats.done || 0 },
    { name: 'Overdue', value: stats.overdue || 0 },
  ].filter(d => d.value > 0);
  const hasData = pieData.length > 0;

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div className="glass-card" style={{ padding: '1.5rem', minHeight: '350px', display: 'flex', flexDirection: 'column', width: '100%' }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: 'var(--text-main)', textAlign: 'center' }}>Status Distribution</h3>
        {hasData ? (
          <div style={{ flexGrow: 1, minHeight: '260px', height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                  animationDuration={1000}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)' 
                  }} 
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div
            style={{
              flexGrow: 1,
              minHeight: '260px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              textAlign: 'center',
              padding: '1rem'
            }}
          >
            No task data available yet.
          </div>
        )}
      </div>
    </div>
  );
}
