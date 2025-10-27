import { useState } from "react";
import EmailGate from "./components/EmailGate";
import ChartEditable from "./components/ChartEditable";
import Charts from "./components/Charts";
import TransactionTester from "./components/TransactionTester"; // <-- make sure this file exists
import { DEMO_MODE } from "./supabaseClient";

export default function App() {
  const [email, setEmail] = useState<string | null>(null);

  return (
    <div className="container" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Navbar */}
      <div className="nav">
        <div className="logo" />
        <div className="brand">Voice Agent Analytics</div>
      </div>

      {/* Header */}
      <div className="header">
        <div>
          <h1>
            Dashboard <span className="tag">Live</span>
          </h1>
          <p className="lead">Now with a visible Transactions API tester.</p>
        </div>
      </div>

      {/* Demo banner */}
      {DEMO_MODE && (
        <div
          className="card"
          style={{
            border: "1px dashed rgba(122,162,255,0.35)",
            background: "rgba(122,162,255,0.05)",
          }}
        >
          <strong>Demo mode:</strong> Supabase env vars missing. Data will be stored locally in your browser.
        </div>
      )}

      {/* Transactions tester – moved high so it's always visible */}
      <div className="card" style={{ outline: "2px solid rgba(124,245,255,0.35)" }}>
        <div className="section-title">Transactions API</div>
        <TransactionTester />
      </div>

      {/* Overview */}
      <div className="card">
        <div className="section-title">Overview</div>
        <Charts />
      </div>

      {/* Edit & Save */}
      <div className="card">
        <div className="section-title">Edit & Save</div>
        {!email ? <EmailGate onAuthed={setEmail} /> : <ChartEditable email={email} />}
      </div>

      <div className="footer">© {new Date().getFullYear()} Analytics Demo</div>
    </div>
  );
}
