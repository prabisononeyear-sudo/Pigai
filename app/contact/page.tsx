"use client";

import { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useAdvisor } from "@/lib/advisor-context";
import { CONTACT } from "@/lib/catalogue";

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactInner />
    </Suspense>
  );
}

function ContactInner() {
  const searchParams = useSearchParams();
  const advisor = useAdvisor();
  const { state } = advisor;
  const appliedParam = useRef(false);

  useEffect(() => {
    if (appliedParam.current) return;
    appliedParam.current = true;
    const problem = searchParams.get("problem");
    if (problem && !state.contact.problem) {
      advisor.setContactField("problem", problem);
    }
    // Runs once on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const c = state.contact;
  const hasBrief = !!state.brief;
  const subject = encodeURIComponent(`Pig.ai enquiry${c.business ? " — " + c.business : c.name ? " — " + c.name : ""}`);
  const mailtoFull = `mailto:${CONTACT.email}?subject=${subject}&body=${encodeURIComponent(advisor.fullBrief() || "Hi Pig.ai,\n\n")}`;
  const mailtoSimple = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Pig.ai enquiry")}`;

  const inputStyle: React.CSSProperties = {
    minHeight: 48,
    padding: "0 14px",
    fontSize: 16,
    border: "1.5px solid var(--ink)",
    borderRadius: 12,
    background: "var(--cream)",
    color: "var(--ink)",
  };

  return (
    <div data-screen-label="Contact" style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(40px,7vw,80px) 20px clamp(48px,7vw,88px)" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: "24px 40px", marginBottom: 36 }}>
        <h1 style={{ flex: "1 1 480px", margin: 0, font: "800 clamp(42px,8vw,104px)/0.92 var(--font-display)", letterSpacing: "-0.04em" }}>
          Let&rsquo;s make your business easier to run.
        </h1>
        <img
          data-breathe="1"
          src="/assets/pig-07-cut.png"
          alt="Pig in a tie with a confident smile"
          width={390}
          height={721}
          loading="eager"
          style={{ width: "clamp(90px,12vw,150px)", height: "auto" }}
        />
      </div>
      <p style={{ margin: "0 0 28px", maxWidth: 620, fontSize: "clamp(17px,1.8vw,20px)" }}>
        A human reads every message. Pig.ai is a human-run agency based in Nepal, working remotely
        with businesses in the United States.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", gap: 16, marginBottom: 40 }}>
        <a href={mailtoSimple} className="card-link card-hover-lift" style={{ display: "flex", flexDirection: "column", gap: 6, background: "var(--pink)", border: "1.5px solid var(--ink)", borderRadius: 16, padding: 20, boxShadow: "4px 4px 0 #202020", minHeight: 44 }}>
          <span style={{ font: "800 22px/1.1 var(--font-display)" }}>Email Pig.ai</span>
          <span style={{ fontSize: 15, wordBreak: "break-all" }}>{CONTACT.email}</span>
        </a>
        <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className="card-link card-hover" style={{ display: "flex", flexDirection: "column", gap: 6, background: "#fff", border: "1.5px solid var(--ink)", borderRadius: 16, padding: 20, boxShadow: "4px 4px 0 #202020" }}>
          <span style={{ font: "800 22px/1.1 var(--font-display)" }}>Message on Instagram</span>
          <span style={{ fontSize: 15 }}>{CONTACT.instagramHandle} · opens in a new tab</span>
        </a>
        <button
          type="button"
          onClick={advisor.copyEmail}
          className="card-hover"
          style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start", background: "#fff", border: "1.5px solid var(--ink)", borderRadius: 16, padding: 20, color: "var(--ink)", boxShadow: "4px 4px 0 #202020", cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}
        >
          <span style={{ font: "800 22px/1.1 var(--font-display)" }}>{state.copied === "email" ? "Copied ✓" : "Copy email address"}</span>
          <span style={{ fontSize: 15 }}>Paste it into any email app</span>
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: 22, alignItems: "start" }}>
        <form
          onSubmit={(e) => e.preventDefault()}
          aria-labelledby="composer-title"
          style={{ background: "#fff", border: "1.5px solid var(--ink)", borderRadius: 20, padding: "clamp(20px,3vw,28px)", boxShadow: "5px 5px 0 #202020", display: "grid", gap: 14 }}
        >
          <h2 id="composer-title" style={{ margin: 0, font: "800 26px/1.1 var(--font-display)", letterSpacing: "-0.02em" }}>
            Short enquiry
          </h2>
          <label style={{ display: "grid", gap: 4, fontWeight: 600, fontSize: 15 }}>
            <span>Your name</span>
            <input type="text" value={c.name} onChange={(e) => advisor.setContactField("name", e.target.value)} autoComplete="name" maxLength={120} style={inputStyle} />
          </label>
          <label style={{ display: "grid", gap: 4, fontWeight: 600, fontSize: 15 }}>
            <span>Business name</span>
            <input type="text" value={c.business} onChange={(e) => advisor.setContactField("business", e.target.value)} autoComplete="organization" maxLength={120} style={inputStyle} />
          </label>
          <label style={{ display: "grid", gap: 4, fontWeight: 600, fontSize: 15 }}>
            <span>Preferred contact</span>
            <select value={c.preferred} onChange={(e) => advisor.setContactField("preferred", e.target.value)} style={{ ...inputStyle, padding: "0 12px" }}>
              <option value="Email">Email</option>
              <option value="Instagram">Instagram</option>
            </select>
          </label>
          <label style={{ display: "grid", gap: 4, fontWeight: 600, fontSize: 15 }}>
            <span>Your business problem</span>
            <textarea
              value={c.problem}
              onChange={(e) => advisor.setContactField("problem", e.target.value)}
              rows={4}
              maxLength={1200}
              placeholder="What's slowing you down?"
              style={{ padding: "12px 14px", fontSize: 16, lineHeight: 1.4, border: "1.5px solid var(--ink)", borderRadius: 12, background: "var(--cream)", color: "var(--ink)", resize: "vertical", minHeight: 100 }}
            />
          </label>
          <label style={{ display: "grid", gap: 4, fontWeight: 600, fontSize: 15 }}>
            <span>
              Website URL <span style={{ color: "var(--ink-soft)", fontWeight: 400 }}>(optional)</span>
            </span>
            <input type="url" value={c.website} onChange={(e) => advisor.setContactField("website", e.target.value)} placeholder="https://" inputMode="url" maxLength={200} style={inputStyle} />
          </label>
          <label style={{ display: "grid", gap: 4, fontWeight: 600, fontSize: 15 }}>
            <span>
              Budget <span style={{ color: "var(--ink-soft)", fontWeight: 400 }}>(optional)</span>
            </span>
            <input type="text" value={c.budget} onChange={(e) => advisor.setContactField("budget", e.target.value)} placeholder="e.g. $300 setup, up to $50 a month" maxLength={120} style={inputStyle} />
          </label>
        </form>

        <div style={{ display: "grid", gap: 22 }}>
          <section
            aria-labelledby="brief-title"
            style={{ background: "var(--pink-light)", border: "1.5px solid var(--ink)", borderRadius: 20, padding: "clamp(20px,3vw,28px)", boxShadow: "5px 5px 0 #202020", display: "grid", gap: 12 }}
          >
            <h2 id="brief-title" style={{ margin: 0, font: "800 26px/1.1 var(--font-display)", letterSpacing: "-0.02em" }}>
              {hasBrief ? "Your plan from Ask Pig" : "Your brief"}
            </h2>
            <p style={{ margin: 0, fontSize: 15, color: "var(--ink-soft)" }}>
              {hasBrief
                ? "Review and edit before sending. It includes your problem, suggested services, known costs and open questions."
                : "Optional. Notes for us, or ask Pig first and your plan appears here automatically."}
            </p>
            <label style={{ display: "grid", gap: 4, fontWeight: 600, fontSize: 15 }}>
              <span style={{ position: "absolute", left: -9999 }}>Brief</span>
              <textarea
                value={state.brief}
                onChange={(e) => advisor.setBrief(e.target.value)}
                rows={10}
                maxLength={4000}
                style={{ padding: "12px 14px", fontSize: 15, lineHeight: 1.45, border: "1.5px solid var(--ink)", borderRadius: 12, background: "#fff", color: "var(--ink)", resize: "vertical", minHeight: 180, fontFamily: "ui-monospace,SFMono-Regular,Menlo,monospace" }}
              />
            </label>
          </section>
          <section aria-labelledby="send-title" style={{ background: "#fff", border: "1.5px solid var(--ink)", borderRadius: 20, padding: "clamp(20px,3vw,28px)", boxShadow: "5px 5px 0 #202020", display: "grid", gap: 12 }}>
            <h2 id="send-title" style={{ margin: 0, font: "800 26px/1.1 var(--font-display)", letterSpacing: "-0.02em" }}>
              Send it your way
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <a href={mailtoFull} className="btn btn-pink btn-sm">
                Open email draft
              </a>
              <button type="button" onClick={advisor.copyBrief} className="btn btn-white btn-sm">
                {state.copied === "brief" ? "Copied ✓" : "Copy brief"}
              </button>
              <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-white btn-sm">
                Open Instagram
              </a>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: "var(--ink-soft)" }}>
              Email opens a pre-filled draft in your mail app — you press send. For Instagram, copy
              the brief first, then paste it into a message to {CONTACT.instagramHandle}; nothing is
              sent automatically.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
