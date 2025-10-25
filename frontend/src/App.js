import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import EmailGate from "./components/EmailGate";
import ChartEditable from "./components/ChartEditable";
import Charts from "./components/Charts";
import { DEMO_MODE } from "./supabaseClient";
export default function App() {
    const [email, setEmail] = useState(null);
    return (_jsxs("div", { className: "container", children: [_jsxs("div", { className: "nav", children: [_jsx("div", { className: "logo" }), _jsx("div", { className: "brand", children: "Voice Agent Analytics" }), _jsx("div", { className: "sub", children: "Realtime-ish insights \u2022 Minimal UI" })] }), _jsx("div", { className: "header", children: _jsxs("div", { children: [_jsxs("h1", { children: ["Dashboard ", _jsx("span", { className: "tag", children: "Live" })] }), _jsx("p", { className: "lead", children: "Clean cards, soft shadows, and tasteful accents\u2014now closer to that Superbryn vibe." })] }) }), DEMO_MODE && (_jsxs("div", { className: "card", style: { marginBottom: 16, border: "1px dashed rgba(122,162,255,0.35)" }, children: [_jsx("strong", { children: "Demo mode:" }), " Supabase env vars missing. Data will be stored locally in your browser."] })), _jsxs("div", { className: "grid", children: [_jsxs("div", { className: "card", children: [_jsx("div", { className: "section-title", children: "Overview" }), _jsx(Charts, {})] }), _jsxs("div", { className: "card", children: [_jsx("div", { className: "section-title", children: "Edit & Save" }), !email ? (_jsx(EmailGate, { onAuthed: setEmail })) : (_jsx(ChartEditable, { email: email }))] })] }), _jsxs("div", { className: "footer", children: ["\u00A9 ", new Date().getFullYear(), " Analytics Demo"] })] }));
}
