import { useState } from "react";

type Props = { onAuthed: (email: string) => void };
export default function EmailGate({ onAuthed }: Props) {
  const [email, setEmail] = useState("");
  return (
    <div>
      <div className="controls">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button disabled={!email} onClick={() => onAuthed(email)}>
          Continue
        </button>
      </div>
      <p className="lead" style={{ marginTop: 10 }}>
        We’ll save your custom chart values keyed to this email.
      </p>
    </div>
  );
}
