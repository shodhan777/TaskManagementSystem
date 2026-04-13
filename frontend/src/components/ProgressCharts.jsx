import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

const COLORS = {
  Todo: '#94a3b8', // Slighly darker than background for neutral
  'In Progress': '#fbbf24', // Amber
  Done: '#10b981', // Emerald
  Overdue: '#ef4444' // Red
};

export default function ProgressCharts({ stats }) {
  const pieData = [
    { name: 'Todo', value: stats.todo || 0 },
    { name: 'In Progress', value: stats.inProgress || 0 },
    { name: 'Done', value: stats.done || 0 },
    { name: 'Overdue', value: stats.overdue || 0 },
  ].filter(d => d.value > 0);

  const historyData = (stats.completionHistory || []).map(h => ({
    ...h,
    day: new Date(h.date).toLocaleDateString(undefined, { weekday: 'short' })
  }));

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
      {/* Status Distribution Pie Chart */}
      <div className="glass-card" style={{ padding: '1.5rem', minHeight: '350px', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: 'var(--text-main)', textAlign: 'center' }}>Status Distribution</h3>
        <div style={{ flexGrow: 1 }}>
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
      </div>

      {/* Completion History Bar Chart */}
      <div className="glass-card" style={{ padding: '1.5rem', minHeight: '350px', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: 'var(--text-main)', textAlign: 'center' }}>7-Day Completion Velocity</h3>
        <div style={{ flexGrow: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={historyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
              <XAxis 
                dataKey="day" 
                fontSize={12} 
                axisLine={false} 
                tickLine={false}
                stroke="var(--text-muted)"
              />
              <YAxis 
                allowDecimals={false} 
                fontSize={12} 
                axisLine={false} 
                tickLine={false}
                stroke="var(--text-muted)"
              />
              <Tooltip 
                 cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                 contentStyle={{ 
                   borderRadius: '12px', 
                   border: '1px solid var(--border-color)',
                   backgroundColor: 'rgba(255, 255, 255, 0.9)' 
                 }}
              />
              <Bar 
                dataKey="count" 
                fill="var(--primary-color)" 
                radius={[6, 6, 0, 0]} 
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
