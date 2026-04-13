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
    <div className="progress-chart-shell">
      <div className="glass-card progress-chart-card">
        <h3 className="progress-chart-title">Status Distribution</h3>
        {hasData ? (
          <div className="progress-chart-canvas">
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
          <div className="progress-chart-empty">
            No task data available yet.
          </div>
        )}
      </div>
    </div>
  );
}
