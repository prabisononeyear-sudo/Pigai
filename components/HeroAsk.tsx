"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const CHIPS = [
  "I need a professional website.",
  "I keep forgetting to follow up.",
  "I need videos for my products.",
  "I want more customer enquiries.",
];

export default function HeroAsk() {
  const router = useRouter();
  const [draft, setDraft] = useState("");

  const go = (text: string) => {
    const t = text.trim();
    if (!t) return;
    router.push(`/ask-pig?intro=${encodeURIComponent(t)}`);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        go(draft);
      }}
      style={{
        flex: "1 1 320px",
        minWidth: 0,
        background: "#fff",
        border: "1.5px solid var(--ink)",
        borderRadius: 20,
        padding: "clamp(20px,3vw,32px)",
        boxShadow: "6px 6px 0 #202020",
      }}
    >
      <label
        id="hero-ask"
        htmlFor="hero-input"
        style={{
          display: "block",
          font: "800 clamp(24px,3vw,34px)/1.1 var(--font-display)",
          letterSpacing: "-0.02em",
          marginBottom: 14,
        }}
      >
        What&rsquo;s slowing your business down?
      </label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        <input
          id="hero-input"
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={600}
          placeholder="e.g. I keep losing track of enquiries"
          autoComplete="off"
          style={{
            flex: "1 1 240px",
            minHeight: 52,
            padding: "0 16px",
            fontSize: 17,
            border: "1.5px solid var(--ink)",
            borderRadius: 12,
            background: "var(--cream)",
            color: "var(--ink)",
          }}
        />
        <button type="submit" className="btn btn-dark" style={{ minHeight: 52, border: "1.5px solid var(--ink)" }}>
          Ask Pig
        </button>
      </div>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}
        role="group"
        aria-label="Example problems"
      >
        {CHIPS.map((text) => (
          <button key={text} type="button" onClick={() => go(text)} className="chip">
            {text}
          </button>
        ))}
      </div>
      <p style={{ margin: "14px 0 0", fontSize: 14, color: "var(--ink-soft)" }}>
        Messages are drafted with an AI service. No account or email needed.
      </p>
    </form>
  );
}
