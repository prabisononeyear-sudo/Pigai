"use client";

import type { PlanView } from "@/lib/advisor-context";

export default function PlanCard({
  plan,
  onSendToContact,
  onCopyPlan,
  copyLabel,
}: {
  plan: PlanView;
  onSendToContact: () => void;
  onCopyPlan: () => void;
  copyLabel: string;
}) {
  return (
    <article
      aria-label="Suggested plan"
      style={{ background: "#fff", border: "1.5px solid var(--ink)", borderRadius: 20, overflow: "hidden", boxShadow: "5px 5px 0 #202020", marginTop: 6 }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, alignItems: "center", padding: "14px 20px", background: "var(--pink-light)", borderBottom: "1.5px solid var(--ink)" }}>
        <h2 style={{ margin: 0, font: "800 22px/1.1 var(--font-display)", letterSpacing: "-0.02em" }}>Suggested plan</h2>
        <span style={{ fontSize: 13, fontWeight: 700, padding: "3px 10px", border: "1.5px solid var(--ink)", borderRadius: 999, background: "#fff" }}>
          Subject to scope confirmation
        </span>
      </div>
      <div style={{ padding: 20, display: "grid", gap: 18 }}>
        <div>
          <p style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>1 · What I understood</p>
          <p style={{ margin: 0 }}>{plan.understood}</p>
        </div>
        <div style={{ background: "var(--cream)", border: "1.5px solid var(--ink)", borderRadius: 12, padding: "12px 16px" }}>
          <p style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>2 · What you can try now (free)</p>
          <p style={{ margin: 0 }}>{plan.tryNow}</p>
        </div>
        {plan.unsupported && (
          <p style={{ margin: 0, padding: "12px 16px", border: "1.5px solid var(--ink)", borderRadius: 12, background: "#fff" }}>{plan.unsupported}</p>
        )}
        <div>
          <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>
            3 · How Pig.ai can help · 4 · Deliverables
          </p>
          {plan.hasLines ? (
            <div style={{ display: "grid", gap: 10 }}>
              {plan.lines.map((l) => (
                <div key={l.id} style={{ border: "1.5px solid var(--ink)", borderRadius: 12, padding: "12px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                    <strong>{l.name}</strong>
                    <span style={{ fontWeight: 700 }}>{l.priceLabel}</span>
                  </div>
                  <ul style={{ margin: "8px 0 0", paddingLeft: 18, color: "var(--ink-soft)", fontSize: 15, display: "flex", flexDirection: "column", gap: 2 }}>
                    {l.deliverables.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ margin: 0, color: "var(--ink-soft)" }}>No paid service suggested right now.</p>
          )}
          {plan.quoteRequired.map((qr) => (
            <div key={qr.name} style={{ marginTop: 10, border: "1.5px dashed var(--ink)", borderRadius: 12, padding: "12px 16px", display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <strong>{qr.name}</strong>
              <span style={{ fontWeight: 700 }}>Custom quote required · from {qr.fromLabel}</span>
            </div>
          ))}
          {plan.note && <p style={{ margin: "10px 0 0", fontSize: 15, color: "var(--ink-soft)" }}>{plan.note}</p>}
          {plan.cheaper && (
            <p style={{ margin: "10px 0 0", fontSize: 15, padding: "10px 14px", background: "var(--pink-light)", border: "1.5px solid var(--ink)", borderRadius: 10 }}>
              {plan.cheaper}
            </p>
          )}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10 }}>
          <div style={{ border: "1.5px solid var(--ink)", borderRadius: 12, padding: "12px 14px", background: "var(--cream)" }}>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>5 · Setup cost</p>
            <p style={{ margin: "2px 0 0", font: "800 26px/1 var(--font-display)" }}>{plan.setupLabel}</p>
            {plan.partial && <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--ink-soft)" }}>Known items only — quote items not included</p>}
          </div>
          <div style={{ border: "1.5px solid var(--ink)", borderRadius: 12, padding: "12px 14px", background: "var(--cream)" }}>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>6 · Monthly cost</p>
            <p style={{ margin: "2px 0 0", font: "800 26px/1 var(--font-display)" }}>{plan.monthlyLabel}</p>
          </div>
        </div>
        <div>
          <p style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>7 · Separate third-party costs</p>
          <p style={{ margin: 0, color: "var(--ink-soft)" }}>{plan.thirdParty}</p>
        </div>
        <div>
          <p style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>8 · Needs the owner&rsquo;s review</p>
          <p style={{ margin: 0, color: "var(--ink-soft)" }}>{plan.review}</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, paddingTop: 6, borderTop: "1.5px solid var(--ink)" }}>
          <button type="button" onClick={onSendToContact} className="btn btn-dark">
            9 · Send this plan to Pig.ai →
          </button>
          <button type="button" onClick={onCopyPlan} className="btn btn-white">
            {copyLabel}
          </button>
        </div>
      </div>
    </article>
  );
}
