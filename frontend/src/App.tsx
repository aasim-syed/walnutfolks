import { useState } from "react";
import EmailGate from "./components/EmailGate";
import ChartEditable from "./components/ChartEditable";
import Charts from "./components/Charts";
import { DEMO_MODE } from "./supabaseClient";

export default function App() {
  const [email, setEmail] = useState<string | null>(null);
  return (
    <div className="container">
      <div className="nav">
        <div className="logo" />
        <div className="brand">Voice Agent Analytics</div>
        <div className="sub">Realtime-ish insights • Minimal UI</div>
      </div>

      <div className="header">
        <div>
          <h1>
            Dashboard <span className="tag">Live</span>
          </h1>
          <p className="lead">Clean cards, soft shadows, and tasteful accents—now closer to that Superbryn vibe.</p>
        </div>
      </div>

      {DEMO_MODE && (
        <div className="card" style={{ marginBottom: 16, border: "1px dashed rgba(122,162,255,0.35)" }}>
          <strong>Demo mode:</strong> Supabase env vars missing. Data will be stored locally in your browser.
        </div>
      )}

      <div className="grid">
        <div className="card">
          <div className="section-title">Overview</div>
          <Charts />
        </div>

        <div className="card">
          <div className="section-title">Edit & Save</div>
          {!email ? (
            <EmailGate onAuthed={setEmail} />
          ) : (
            <ChartEditable email={email} />
          )}
        </div>
      </div>

      <div className="footer">© {new Date().getFullYear()} Analytics Demo</div>
    </div>
  );
}
