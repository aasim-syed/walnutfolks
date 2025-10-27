import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
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
    return (_jsxs("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            alignItems: "stretch",
            width: "100%",
        }, children: [_jsxs("div", { className: "card", children: [_jsx("div", { className: "section-title", children: "Calls by Hour" }), _jsx("div", { style: { width: "100%", height: 320 }, children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: callsByHour, margin: { top: 10, right: 12, left: 0, bottom: 0 }, children: [_jsx(CartesianGrid, { stroke: "rgba(255,255,255,0.12)", strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "hour", tick: { fill: "var(--muted)" } }), _jsx(YAxis, { tick: { fill: "var(--muted)" } }), _jsx(Tooltip, { contentStyle: {
                                            background: "var(--panel)",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            color: "var(--fg)",
                                        }, labelStyle: { color: "var(--fg)" }, itemStyle: { color: "var(--fg)" } }), _jsx(Legend, { wrapperStyle: { color: "var(--muted)" } }), _jsx(Bar, { dataKey: "calls", fill: "var(--accent)", radius: [8, 8, 0, 0] })] }) }) })] }), _jsxs("div", { className: "card", children: [_jsx("div", { className: "section-title", children: "Intent Split" }), _jsx("div", { style: { width: "100%", height: 320 }, children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: intentSplit, dataKey: "value", nameKey: "name", label: true, children: intentSplit.map((_, idx) => (_jsx(Cell, { fill: PIE_COLORS[idx % PIE_COLORS.length] }, idx))) }), _jsx(Tooltip, { contentStyle: {
                                            background: "var(--panel)",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            color: "var(--fg)",
                                        }, labelStyle: { color: "var(--fg)" }, itemStyle: { color: "var(--fg)" } }), _jsx(Legend, { wrapperStyle: { color: "var(--muted)" } })] }) }) })] })] }));
}
