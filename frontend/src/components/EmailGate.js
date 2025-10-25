import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export default function EmailGate({ onAuthed }) {
    const [email, setEmail] = useState("");
    return (_jsxs("div", { children: [_jsxs("div", { className: "controls", children: [_jsx("label", { htmlFor: "email", children: "Email" }), _jsx("input", { id: "email", type: "email", placeholder: "you@example.com", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx("button", { disabled: !email, onClick: () => onAuthed(email), children: "Continue" })] }), _jsx("p", { className: "lead", style: { marginTop: 10 }, children: "We\u2019ll save your custom chart values keyed to this email." })] }));
}
