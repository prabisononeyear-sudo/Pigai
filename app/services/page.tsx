import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "Services & prices",
  description:
    "Six services, each with a fixed price and a clear list of what costs extra.",
};

export default function ServicesPage() {
  return (
    <div data-screen-label="Services" style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(40px,7vw,80px) 20px clamp(48px,7vw,88px)" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: "24px 40px", marginBottom: 40 }}>
        <div style={{ flex: "1 1 480px" }}>
          <h1 style={{ margin: 0, font: "800 clamp(42px,8vw,104px)/0.92 var(--font-display)", letterSpacing: "-0.04em" }}>
            Six things we do well.
          </h1>
          <p style={{ margin: "20px 0 0", maxWidth: 620, fontSize: "clamp(17px,1.8vw,20px)", textWrap: "pretty" }}>
            Each one solves a specific problem, has a fixed price, and lists exactly what costs
            extra. Not sure which fits? Ask Pig and describe your situation.
          </p>
        </div>
        <img
          data-breathe="1"
          src="/assets/pig-06-cut.png"
          alt="Pig in a shirt and tie, listening"
          width={301}
          height={641}
          loading="eager"
          style={{ width: "clamp(90px,12vw,150px)", height: "auto" }}
        />
      </div>

      <div style={{ display: "grid", gap: 22 }}>
        {SERVICES.map((s) => (
          <article
            key={s.id}
            aria-labelledby={`svc-${s.id}`}
            style={{
              background: "#fff",
              border: "1.5px solid var(--ink)",
              borderRadius: 20,
              padding: "clamp(20px,3vw,32px)",
              boxShadow: "5px 5px 0 #202020",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))",
              gap: "24px 40px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "var(--pink)",
                    border: "1.5px solid var(--ink)",
                    display: "grid",
                    placeItems: "center",
                    font: "800 18px var(--font-display)",
                    flex: "none",
                  }}
                >
                  {s.letter}
                </span>
                <h2 id={`svc-${s.id}`} style={{ margin: 0, font: "800 clamp(26px,3vw,36px)/1.05 var(--font-display)", letterSpacing: "-0.025em" }}>
                  {s.name}
                </h2>
              </div>
              <p style={{ margin: 0 }}>
                <strong>The problem:</strong> {s.problem}
              </p>
              <p style={{ margin: 0 }}>
                <strong>What you get:</strong> {s.deliver}
              </p>
              <p style={{ margin: 0, padding: "12px 16px", background: "var(--pink-light)", border: "1.5px solid var(--ink)", borderRadius: 12 }}>
                <strong>Example:</strong> {s.example}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 0 }}>
              <div style={{ border: "1.5px solid var(--ink)", borderRadius: 14, padding: "16px 18px", background: "var(--cream)" }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>Price</p>
                <p style={{ margin: "4px 0 0", font: "800 clamp(22px,2.4vw,28px)/1.15 var(--font-display)", letterSpacing: "-0.02em" }}>{s.priceLine}</p>
              </div>
              <div>
                <p style={{ margin: "0 0 6px", fontSize: 13, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>What costs extra</p>
                <ul style={{ margin: 0, paddingLeft: 20, color: "var(--ink-soft)", display: "flex", flexDirection: "column", gap: 4 }}>
                  {s.extra.map((x: string) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: "auto" }}>
                <Link href={`/ask-pig?intro=${encodeURIComponent(`Tell me about ${s.name} — is it right for my business?`)}`} className="btn btn-pink btn-sm">
                  Ask Pig about this
                </Link>
                <Link
                  href={`/contact?problem=${encodeURIComponent(`I'd like to discuss ${s.name} (${s.priceLine}).`)}`}
                  className="btn btn-white btn-sm"
                >
                  Discuss this service
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
