import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, Pie } from "recharts";

const callsByHour = Array.from({ length: 8 }).map((_, i) => ({
  hour: `${i + 9}:00`,
  calls: Math.floor(10 + Math.random() * 40),
}));
const intentSplit = [
  { name: "Sales", value: 400 },
  { name: "Support", value: 300 },
  { name: "Billing", value: 200 },
  { name: "Other", value: 100 },
];

export default function Charts() {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div className="card">
        <div className="section-title">Calls by Hour</div>
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
        <div className="section-title">Intent Split</div>
        <PieChart width={400} height={320}>
          <Pie data={intentSplit} dataKey="value" nameKey="name" label />
        </PieChart>
      </div>
    </div>
  );
}
