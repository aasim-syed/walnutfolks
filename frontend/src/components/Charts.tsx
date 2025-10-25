import {
  ResponsiveContainer,
  BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend,
  PieChart, Pie, Cell
} from "recharts";

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

const PIE_COLORS = [
  "var(--accent)",
  "var(--accent-2)",
  "#9bfffb",
  "#b5c2ff",
];

export default function Charts() {
  return (
   <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    alignItems: "stretch",
    width: "100%",
  }}
>

      {/* Calls by hour */}
      <div className="card">
        <div className="section-title">Calls by Hour</div>
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={callsByHour} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.12)" strokeDasharray="3 3" />
              <XAxis dataKey="hour" tick={{ fill: "var(--muted)" }} />
              <YAxis tick={{ fill: "var(--muted)" }} />
              <Tooltip
                contentStyle={{
                  background: "var(--panel)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "var(--fg)",
                }}
                labelStyle={{ color: "var(--fg)" }}
                itemStyle={{ color: "var(--fg)" }}
              />
              <Legend wrapperStyle={{ color: "var(--muted)" }} />
              <Bar dataKey="calls" fill="var(--accent)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Intent split */}
      <div className="card">
        <div className="section-title">Intent Split</div>
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={intentSplit} dataKey="value" nameKey="name" label>
                {intentSplit.map((_, idx) => (
                  <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "var(--panel)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "var(--fg)",
                }}
                labelStyle={{ color: "var(--fg)" }}
                itemStyle={{ color: "var(--fg)" }}
              />
              <Legend wrapperStyle={{ color: "var(--muted)" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
