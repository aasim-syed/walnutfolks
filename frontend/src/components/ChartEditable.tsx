import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

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
      const { data: row } = await supabase
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
    await supabase.from("analytics").upsert({ email, data: pending });
    setData(pending);
    setPrev(pending);
    alert("Saved!");
  };

  return (
    <div className="card">
      <h3>Editable: Daily Successful Calls</h3>
      <LineChart width={700} height={320} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" />
      </LineChart>

      <div className="editor">
        {pending.map((p, i) => (
          <div key={i} className="row">
            <label>{p.name}</label>
            <input
              type="number"
              value={p.value}
              onChange={(e) => {
                const copy = [...pending];
                copy[i] = { ...copy[i], value: Number(e.target.value) };
                setPending(copy);
              }}
            />
          </div>
        ))}
        <button onClick={overwrite}>Save Values</button>
      </div>
    </div>
  );
}
