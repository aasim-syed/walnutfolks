import { useState } from "react";
import EmailGate from "./components/EmailGate";
import ChartEditable from "./components/ChartEditable";
import Charts from "./components/Charts";

export default function App() {
  const [email, setEmail] = useState<string | null>(null);
  return (
    <div className="container">
      <header>
        <h1>Voice Agent Analytics</h1>
        <p>Superbryn-inspired minimal styling with crisp cards & charts.</p>
      </header>

      <Charts />

      <section>
        {!email ? (
          <EmailGate onAuthed={setEmail} />
        ) : (
          <ChartEditable email={email} />
        )}
      </section>

      <footer>© {new Date().getFullYear()} Analytics Demo</footer>
    </div>
  );
}
