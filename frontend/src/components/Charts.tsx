import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, Pie } from "recharts";

const callsByHour = Array.from({length: 8}).map((_, i) => ({ hour: `${i+9}:00`, calls: Math.floor(10 + Math.random()*40) }));
const intentSplit = [
  { name: 'Sales', value: 400 },
  { name: 'Support', value: 300 },
  { name: 'Billing', value: 200 },
  { name: 'Other', value: 100 }
];

export default function Charts() {
  return (
    <div className="grid">
      <div className="card">
        <h3>Calls by Hour</h3>
        <BarChart width={700} height={320} data={callsByHour}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="calls" />
        </BarChart>
      </div>

      <div className="card">
        <h3>Intent Split</h3>
        <PieChart width={400} height={320}>
          <Pie data={intentSplit} dataKey="value" nameKey="name" label />
        </PieChart>
      </div>
    </div>
  );
}
