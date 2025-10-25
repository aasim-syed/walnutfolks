import { useState } from "react";

type Props = { onAuthed: (email: string) => void };
export default function EmailGate({ onAuthed }: Props) {
  const [email, setEmail] = useState("");
  return (
    <div className="email-gate card">
      <h3>Enter Email to Edit Charts</h3>
      <input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button disabled={!email} onClick={() => onAuthed(email)}>Continue</button>
    </div>
  );
}
