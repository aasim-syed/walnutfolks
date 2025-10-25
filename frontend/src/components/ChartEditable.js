import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
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
    return (_jsxs("div", { children: [_jsxs(LineChart, { width: 700, height: 320, data: data, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "name" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Line, { type: "monotone", dataKey: "value" })] }), _jsx("div", { className: "controls", children: pending.map((p, i) => (_jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [_jsx("label", { children: p.name }), _jsx("input", { type: "number", value: p.value, onChange: (e) => {
                                const copy = [...pending];
                                copy[i] = { ...copy[i], value: Number(e.target.value) };
                                setPending(copy);
                            } })] }, i))) }), _jsxs("div", { className: "controls", style: { marginTop: 10 }, children: [_jsx("button", { onClick: overwrite, children: "Save Values" }), _jsx("span", { className: "kbd", children: "Enter" }), " to submit"] })] }));
}
