import type { Metadata } from "next";
import Link from "next/link";
import { PACKAGES, GLOBAL_EXCLUSIONS, money } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Three packages for three different situations, with first-month totals shown up front.",
};

const HEAD_BG: Record<string, string> = {
  get_online: "#FFF9F4",
  save_time: "#FCE5EC",
  bring_in_enquiries: "#F5A5B8",
};

export default function PricingPage() {
  return (
    <div data-screen-label="Pricing" style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(40px,7vw,80px) 20px clamp(48px,7vw,88px)" }}>
      <h1 style={{ margin: 0, font: "800 clamp(42px,8vw,104px)/0.92 var(--font-display)", letterSpacing: "-0.04em" }}>
        Pick the package that matches your need.
      </h1>
      <p style={{ margin: "20px 0 40px", maxWidth: 640, fontSize: "clamp(17px,1.8vw,20px)", textWrap: "pretty" }}>
        Three choices for three different situations — not a ladder you have to climb. First-month
        totals are shown up front. {GLOBAL_EXCLUSIONS}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 22, alignItems: "stretch" }}>
        {PACKAGES.map((p) => {
          const priceBreakdown = p.monthly
            ? `${money(p.setup)} setup + ${money(p.monthly)}/month`
            : `${money(p.setup)} one-time`;
          return (
            <article
              key={p.id}
              aria-labelledby={`pk-${p.id}`}
              style={{ display: "flex", flexDirection: "column", background: "#fff", border: "1.5px solid var(--ink)", borderRadius: 20, overflow: "hidden", boxShadow: "5px 5px 0 #202020" }}
            >
              <div style={{ padding: "24px 24px 20px", background: HEAD_BG[p.id], borderBottom: "1.5px solid var(--ink)" }}>
                <h2 id={`pk-${p.id}`} style={{ margin: 0, font: "800 clamp(26px,3vw,32px)/1 var(--font-display)", letterSpacing: "-0.02em", textTransform: "uppercase" }}>
                  {p.name}
                </h2>
                <p style={{ margin: "6px 0 0", color: "var(--ink-soft)" }}>{p.tagline}</p>
                <p style={{ margin: "18px 0 0", font: "800 clamp(40px,4vw,52px)/1 var(--font-display)", letterSpacing: "-0.035em" }}>{p.firstMonthLabel}</p>
                <p style={{ margin: "4px 0 0", fontWeight: 600 }}>first month · {p.ongoingLabel}</p>
                <p style={{ margin: "10px 0 0", fontSize: 15, color: "var(--ink-soft)" }}>{priceBreakdown}</p>
              </div>
              <ul style={{ margin: 0, padding: "20px 24px", listStyle: "none", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                {p.items.map((it: string) => (
                  <li key={it} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        flex: "none",
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        border: "1.5px solid var(--ink)",
                        background: "var(--pink)",
                        marginTop: 3,
                        display: "grid",
                        placeItems: "center",
                        fontSize: 11,
                        fontWeight: 800,
                      }}
                    >
                      ✓
                    </span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <div style={{ padding: "16px 24px", borderTop: "1.5px solid var(--ink)", background: "var(--cream)", display: "flex", flexDirection: "column", gap: 12 }}>
                <p style={{ margin: 0, fontSize: 14, color: "var(--ink-soft)" }}>
                  <strong style={{ color: "var(--ink)" }}>Extra costs:</strong> {p.extras}
                </p>
                <Link
                  href={`/contact?problem=${encodeURIComponent(`I'd like to discuss ${p.name} package (${p.firstMonthLabel} first month, ${p.ongoingLabel}).`)}`}
                  className="btn btn-dark"
                >
                  Discuss {p.name}
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 22, marginTop: 40 }}>
        <section
          aria-labelledby="fee-title"
          style={{ background: "var(--pink-light)", border: "1.5px solid var(--ink)", borderRadius: 20, padding: "clamp(20px,3vw,28px)", boxShadow: "4px 4px 0 #202020" }}
        >
          <h2 id="fee-title" style={{ margin: "0 0 12px", font: "800 26px/1.1 var(--font-display)", letterSpacing: "-0.02em" }}>
            Our fee vs. your ad budget
          </h2>
          <p style={{ margin: "0 0 14px" }}>Two separate amounts, paid to two different places.</p>
          <div style={{ display: "grid", gap: 8, fontSize: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, background: "#fff", border: "1.5px solid var(--ink)", borderRadius: 10, padding: "10px 14px" }}>
              <span>Bring In Enquiries — Pig.ai monthly fee</span>
              <strong>$299</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, background: "#fff", border: "1.5px solid var(--ink)", borderRadius: 10, padding: "10px 14px" }}>
              <span>Your chosen ad spend, paid to Meta (example)</span>
              <strong>$500</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, border: "1.5px solid var(--ink)", borderRadius: 10, padding: "10px 14px", background: "var(--pink)" }}>
              <span>What that month costs you in total</span>
              <strong>$799</strong>
            </div>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 14, color: "var(--ink-soft)" }}>
            You set the ad spend, and can change it. We manage up to $1,000/month of it on this
            plan; more needs a quote.
          </p>
        </section>
        <section
          aria-labelledby="own-title"
          style={{ background: "#fff", border: "1.5px solid var(--ink)", borderRadius: 20, padding: "clamp(20px,3vw,28px)", boxShadow: "4px 4px 0 #202020", display: "flex", flexDirection: "column", gap: 14 }}
        >
          <h2 id="own-title" style={{ margin: 0, font: "800 26px/1.1 var(--font-display)", letterSpacing: "-0.02em" }}>
            Already have a website?
          </h2>
          <p style={{ margin: 0 }}>
            Ask Pig for a plan using only the help you need — an automation for $149 or a video
            batch for $129 may be the whole answer.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: "auto" }}>
            <Link href="/ask-pig" className="btn btn-pink btn-sm">
              Ask Pig
            </Link>
            <Link href="/services" className="btn btn-white btn-sm">
              Individual services
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
