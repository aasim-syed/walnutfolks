import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import {
  ResponsiveContainer,
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend
} from "recharts";

type Point = { name: string; value: number };
const defaultData: Point[] = [
  { name: "Mon", value: 12 },
  { name: "Tue", value: 18 },
  { name: "Wed", value: 9 },
  { name: "Thu", value: 22 },
  { name: "Fri", value: 15 },
];

export default function ChartEditable({ email }: { email: string }) {
  const [data, setData] = useState<Point[]>(defaultData);
  const [pending, setPending] = useState<Point[]>(defaultData);
  const [prev, setPrev] = useState<Point[] | null>(null);

  useEffect(() => {
    (async () => {
      const { data: row } = await (supabase as any)
        .from("analytics")
        .select("data")
        .eq("email", email)
        .single();
      if ((row as any)?.data) {
        setData(row.data as Point[]);
        setPrev(row.data as Point[]);
        setPending(row.data as Point[]);
      }
    })();
  }, [email]);

  const overwrite = async () => {
    if (prev) {
      const ok = confirm("We found previous values. Overwrite?");
      if (!ok) return;
    }
    await (supabase as any).from("analytics").upsert({ email, data: pending });
    setData(pending);
    setPrev(pending);
    alert("Saved!");
  };

  const updateValue = (i: number, val: number) => {
    const next = Math.max(0, Number.isFinite(val) ? val : 0); // clamp ≥ 0
    const copy = [...pending];
    copy[i] = { ...copy[i], value: next };
    setPending(copy);
  };

  return (
    <div>
      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.12)" strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: "var(--muted)" }} />
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
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--accent-2)"
              strokeWidth={2}
              dot={{ r: 3, stroke: "var(--accent-2)" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="controls">
        {pending.map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <label>{p.name}</label>
            <input
              type="number"
              min={0}
              step={1}
              value={p.value}
              onChange={(e) => updateValue(i, Number(e.target.value))}
            />
          </div>
        ))}
      </div>

      <div className="controls" style={{ marginTop: 10 }}>
        <button onClick={overwrite}>Save Values</button>
        <span className="kbd">Enter</span> to submit
      </div>
    </div>
  );
}
