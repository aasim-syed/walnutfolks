import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs("div", { style: { display: "grid", gap: 14 }, children: [_jsxs("div", { className: "card", children: [_jsx("div", { className: "section-title", children: "Calls by Hour" }), _jsxs(BarChart, { width: 700, height: 320, data: callsByHour, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "hour" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Bar, { dataKey: "calls" })] })] }), _jsxs("div", { className: "card", children: [_jsx("div", { className: "section-title", children: "Intent Split" }), _jsx(PieChart, { width: 400, height: 320, children: _jsx(Pie, { data: intentSplit, dataKey: "value", nameKey: "name", label: true }) })] })] }));
}
