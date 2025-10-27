import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import EmailGate from "./components/EmailGate";
import ChartEditable from "./components/ChartEditable";
import Charts from "./components/Charts";
import TransactionTester from "./components/TransactionTester"; // <-- make sure this file exists
import { DEMO_MODE } from "./supabaseClient";
export default function App() {
    const [email, setEmail] = useState(null);
    return (_jsxs("div", { className: "container", style: { display: "flex", flexDirection: "column", gap: "24px" }, children: [_jsxs("div", { className: "nav", children: [_jsx("div", { className: "logo" }), _jsx("div", { className: "brand", children: "Voice Agent Analytics" })] }), _jsx("div", { className: "header", children: _jsxs("div", { children: [_jsxs("h1", { children: ["Dashboard ", _jsx("span", { className: "tag", children: "Live" })] }), _jsx("p", { className: "lead", children: "Now with a visible Transactions API tester." })] }) }), DEMO_MODE && (_jsxs("div", { className: "card", style: {
                    border: "1px dashed rgba(122,162,255,0.35)",
                    background: "rgba(122,162,255,0.05)",
                }, children: [_jsx("strong", { children: "Demo mode:" }), " Supabase env vars missing. Data will be stored locally in your browser."] })), _jsxs("div", { className: "card", style: { outline: "2px solid rgba(124,245,255,0.35)" }, children: [_jsx("div", { className: "section-title", children: "Transactions API" }), _jsx(TransactionTester, {})] }), _jsxs("div", { className: "card", children: [_jsx("div", { className: "section-title", children: "Overview" }), _jsx(Charts, {})] }), _jsxs("div", { className: "card", children: [_jsx("div", { className: "section-title", children: "Edit & Save" }), !email ? _jsx(EmailGate, { onAuthed: setEmail }) : _jsx(ChartEditable, { email: email })] }), _jsxs("div", { className: "footer", children: ["\u00A9 ", new Date().getFullYear(), " Analytics Demo"] })] }));
}
