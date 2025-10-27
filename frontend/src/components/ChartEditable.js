import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
const defaultData = [
    { name: "Mon", value: 12 },
    { name: "Tue", value: 18 },
    { name: "Wed", value: 9 },
    { name: "Thu", value: 22 },
    { name: "Fri", value: 15 },
];
export default function ChartEditable({ email }) {
    const [data, setData] = useState(defaultData);
    const [pending, setPending] = useState(defaultData);
    const [prev, setPrev] = useState(null);
    useEffect(() => {
        (async () => {
            const { data: row } = await supabase
                .from("analytics")
                .select("data")
                .eq("email", email)
                .single();
            if (row?.data) {
                setData(row.data);
                setPrev(row.data);
                setPending(row.data);
            }
        })();
    }, [email]);
    const overwrite = async () => {
        if (prev) {
            const ok = confirm("We found previous values. Overwrite?");
            if (!ok)
                return;
        }
        await supabase.from("analytics").upsert({ email, data: pending });
        setData(pending);
        setPrev(pending);
        alert("Saved!");
    };
    const updateValue = (i, val) => {
        const next = Math.max(0, Number.isFinite(val) ? val : 0); // clamp ≥ 0
        const copy = [...pending];
        copy[i] = { ...copy[i], value: next };
        setPending(copy);
    };
    return (_jsxs("div", { children: [_jsx("div", { style: { width: "100%", height: 320 }, children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: data, margin: { top: 10, right: 12, left: 0, bottom: 0 }, children: [_jsx(CartesianGrid, { stroke: "rgba(255,255,255,0.12)", strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "name", tick: { fill: "var(--muted)" } }), _jsx(YAxis, { tick: { fill: "var(--muted)" } }), _jsx(Tooltip, { contentStyle: {
                                    background: "var(--panel)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    color: "var(--fg)",
                                }, labelStyle: { color: "var(--fg)" }, itemStyle: { color: "var(--fg)" } }), _jsx(Legend, { wrapperStyle: { color: "var(--muted)" } }), _jsx(Line, { type: "monotone", dataKey: "value", stroke: "var(--accent-2)", strokeWidth: 2, dot: { r: 3, stroke: "var(--accent-2)" }, activeDot: { r: 5 } })] }) }) }), _jsx("div", { className: "controls", children: pending.map((p, i) => (_jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [_jsx("label", { children: p.name }), _jsx("input", { type: "number", min: 0, step: 1, value: p.value, onChange: (e) => updateValue(i, Number(e.target.value)) })] }, i))) }), _jsxs("div", { className: "controls", style: { marginTop: 10 }, children: [_jsx("button", { onClick: overwrite, children: "Save Values" }), _jsx("span", { className: "kbd", children: "Enter" }), " to submit"] })] }));
}
