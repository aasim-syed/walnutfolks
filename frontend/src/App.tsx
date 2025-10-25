import { useState } from "react";
import EmailGate from "./components/EmailGate";
import ChartEditable from "./components/ChartEditable";
import Charts from "./components/Charts";
import { DEMO_MODE } from "./supabaseClient";

export default function App() {
  const [email, setEmail] = useState<string | null>(null);

  return (
    <div className="container" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Navbar */}
      <div className="nav">
        <div className="logo" />
        <div className="brand">Voice Agent Analytics</div>
        <div className="sub">Realtime-ish insights • Minimal UI</div>
      </div>

      {/* Header */}
      <div className="header">
        <div>
          <h1>
            Dashboard <span className="tag">Live</span>
          </h1>
          <p className="lead">
            Clean cards, soft shadows, and tasteful accents — now fully vertical and closer to that Superbryn vibe.
          </p>
        </div>
      </div>

      {/* Demo Mode Notice */}
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

      {/* Overview Section */}
      <div className="card">
        <div className="section-title">Overview</div>
        <Charts />
      </div>

      {/* Editable Section */}
      <div className="card">
        <div className="section-title">Edit & Save</div>
        {!email ? <EmailGate onAuthed={setEmail} /> : <ChartEditable email={email} />}
      </div>

      {/* Footer */}
      <div className="footer">© {new Date().getFullYear()} Analytics Demo</div>
    </div>
  );
}
