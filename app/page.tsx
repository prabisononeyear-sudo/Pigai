import Link from "next/link";
import HeroAsk from "@/components/HeroAsk";
import { SERVICES, PACKAGES, GLOBAL_EXCLUSIONS } from "@/lib/catalogue";

const PAIRS = [
  { say: "I keep forgetting to follow up.", service: "Business Automation", price: "$149 one-time" },
  { say: "People can’t find me online.", service: "One-page website", price: "$249 one-time" },
  { say: "I need videos but I can’t film.", service: "AI promotional videos", price: "from $49" },
  { say: "I want more enquiries.", service: "Facebook & Instagram ads", price: "$149 setup + $149/month" },
];

const STEPS = [
  { n: "01", title: "Tell us your problem", text: "In plain words — to Pig on this site, or by email. No technical knowledge needed." },
  { n: "02", title: "Review your plan", text: "One main suggestion with its price, what is included, and what costs extra. Nothing is booked yet." },
  { n: "03", title: "Talk to us", text: "The owner confirms the scope, answers your questions and delivers the work with a handover walkthrough." },
];

const FLOW = [
  { n: "1", title: "New enquiry arrives", text: "From your website form", bg: "#FCE5EC", arrow: true },
  { n: "2", title: "Saved to your customer sheet", text: "Name, request, date — one row", bg: "#fff", arrow: true },
  { n: "3", title: "Acknowledgement sent", text: "Same-day reply in your words", bg: "#F5A5B8", arrow: false },
];

const FAQS = [
  { q: "Do I need to understand AI to work with you?", a: "No. You describe the problem in plain words; we choose the tools and explain what you get and what it costs before anything starts." },
  { q: "Who actually does the work?", a: "A human. Pig.ai is a small human-run agency based in Nepal working remotely with US businesses. The Pig advisor helps you plan; the owner reviews and delivers." },
  { q: "What is not included in the prices?", a: "Hosting, domain renewals after the first year, paid tools or booking software, advertising spend paid to platforms, and taxes. Each service lists its extras." },
  { q: "Can I start small?", a: "Yes. One promotional video is $49 and one automation is $149. You do not need a package." },
  { q: "How do we communicate?", a: "Email or Instagram, in plain English, and you approve each step. Time zones are handled by clear written updates." },
];

const h2Style: React.CSSProperties = {
  margin: 0,
  font: "800 clamp(34px,5vw,60px)/1 var(--font-display)",
  letterSpacing: "-0.03em",
};

export default function HomePage() {
  return (
    <div data-screen-label="Home">
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(40px,7vw,88px) 20px 24px", position: "relative" }}>
        <p style={{ margin: "0 0 18px", fontWeight: 700, fontSize: 14, letterSpacing: ".08em", textTransform: "uppercase" }}>
          Practical AI help for your small business
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: "24px 40px" }}>
          <h1
            style={{
              flex: "1 1 560px",
              margin: 0,
              font: "800 clamp(46px,9.5vw,126px)/0.92 var(--font-display)",
              letterSpacing: "-0.045em",
              textWrap: "balance",
            }}
          >
            Less busywork.
            <br />
            More room to grow.
          </h1>
          <img
            data-breathe="1"
            src="/assets/pig-05-cut.png"
            alt="A tired pig in a hoodie and backwards cap — the busy business owner"
            width={517}
            height={924}
            loading="eager"
            style={{ flex: "none", width: "clamp(96px,14vw,180px)", height: "auto", marginBottom: 6 }}
          />
        </div>
        <p style={{ maxWidth: 640, margin: "28px 0 0", fontSize: "clamp(18px,2vw,21px)", textWrap: "pretty" }}>
          Affordable websites, automations, content, and ads for small businesses. Tell Pig what
          you need help with—we&rsquo;ll suggest a practical place to start.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
          <Link href="/ask-pig" className="btn btn-pink">
            Tell Pig my problem
          </Link>
          <Link href="/services" className="btn btn-white">
            Explore services
          </Link>
        </div>
      </section>

      <section aria-labelledby="hero-ask" style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px 72px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "flex-end" }}>
          <HeroAsk />
          <div style={{ flex: "0 0 auto", display: "flex", justifyContent: "center", alignItems: "flex-end", margin: "0 auto" }}>
            <img
              data-wave="1"
              src="/assets/pig-03-cut.png"
              alt="Pig in a shirt and tie, gesturing as he explains"
              width={349}
              height={571}
              loading="lazy"
              style={{ width: "clamp(120px,18vw,220px)", height: "auto" }}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="ps-title" style={{ background: "var(--pink-light)", borderTop: "1.5px solid var(--ink)", borderBottom: "1.5px solid var(--ink)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(48px,7vw,88px) 20px" }}>
          <h2 id="ps-title" style={{ ...h2Style, marginBottom: 8 }}>
            You name the problem. We pick the tool.
          </h2>
          <p style={{ margin: "0 0 36px", maxWidth: 560, fontSize: 18 }}>
            Tell us what&rsquo;s slowing you down. We&rsquo;ll help you find the right website,
            automation, content, or advertising service.
          </p>
          <div style={{ display: "grid", gap: 14 }}>
            {PAIRS.map((pair) => (
              <div
                key={pair.say}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))",
                  gap: "0 24px",
                  alignItems: "center",
                  background: "#fff",
                  border: "1.5px solid var(--ink)",
                  borderRadius: 16,
                  padding: "18px 22px",
                  boxShadow: "4px 4px 0 #202020",
                }}
              >
                <p style={{ margin: 0, fontSize: "clamp(19px,2.2vw,24px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
                  &ldquo;{pair.say}&rdquo;
                </p>
                <p style={{ margin: "6px 0 0", display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                  <span aria-hidden="true" style={{ fontWeight: 800 }}>
                    →
                  </span>
                  <span style={{ fontWeight: 700 }}>{pair.service}</span>
                  <span style={{ color: "var(--ink-soft)" }}>{pair.price}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="svc-title" style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(48px,7vw,88px) 20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 16, marginBottom: 32 }}>
          <h2 id="svc-title" style={h2Style}>
            Six services. Clear prices.
          </h2>
          <Link href="/services" style={{ fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 4, minHeight: 44, display: "inline-flex", alignItems: "center" }}>
            All service details →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", gap: 18 }}>
          {SERVICES.map((s) => (
            <Link
              key={s.id}
              href="/services"
              className="card-link card-hover"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                background: "#fff",
                border: "1.5px solid var(--ink)",
                borderRadius: 16,
                padding: 22,
                boxShadow: "4px 4px 0 #202020",
              }}
            >
              <span
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "var(--pink)",
                  border: "1.5px solid var(--ink)",
                  display: "grid",
                  placeItems: "center",
                  font: "800 16px var(--font-display)",
                }}
              >
                {s.letter}
              </span>
              <span style={{ font: "800 22px/1.15 var(--font-display)", letterSpacing: "-0.02em" }}>{s.name}</span>
              <span style={{ color: "var(--ink-soft)", fontSize: 16, textWrap: "pretty" }}>{s.problem}</span>
              <span style={{ marginTop: "auto", fontWeight: 700 }}>{s.startingAt}</span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="how-title" style={{ background: "#fff", borderTop: "1.5px solid var(--ink)", borderBottom: "1.5px solid var(--ink)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(48px,7vw,88px) 20px" }}>
          <h2 id="how-title" style={{ ...h2Style, marginBottom: 36 }}>
            How it works
          </h2>
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))", gap: 18 }}>
            {STEPS.map((st) => (
              <li key={st.n} style={{ border: "1.5px solid var(--ink)", borderRadius: 16, padding: 24, background: "var(--cream)", boxShadow: "4px 4px 0 #202020" }}>
                <span
                  style={{
                    display: "block",
                    font: "800 clamp(40px,5vw,64px)/1 var(--font-display)",
                    letterSpacing: "-0.04em",
                    color: "var(--pink)",
                    WebkitTextStroke: "1.5px #202020",
                  }}
                >
                  {st.n}
                </span>
                <span style={{ display: "block", marginTop: 12, font: "800 24px/1.1 var(--font-display)", letterSpacing: "-0.02em" }}>{st.title}</span>
                <span style={{ display: "block", marginTop: 8, color: "var(--ink-soft)", textWrap: "pretty" }}>{st.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="work-title" style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(48px,7vw,88px) 20px" }}>
        <h2 id="work-title" style={{ ...h2Style, marginBottom: 6 }}>
          Demonstration work
        </h2>
        <p style={{ margin: "0 0 32px", color: "var(--ink-soft)", fontSize: 17 }}>
          Concept projects that show the kind of thing we build. None of these are paying clients,
          and no results are attached.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 18, alignItems: "start" }}>
          <figure style={{ margin: 0, border: "1.5px solid var(--ink)", borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: "4px 4px 0 #202020" }}>
            <div aria-hidden="true" style={{ display: "flex", gap: 6, alignItems: "center", padding: "10px 12px", borderBottom: "1.5px solid var(--ink)", background: "var(--pink-light)" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", border: "1.5px solid var(--ink)", background: "#fff" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", border: "1.5px solid var(--ink)", background: "#fff" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", border: "1.5px solid var(--ink)", background: "#fff" }} />
              <span style={{ marginLeft: 8, flex: 1, height: 18, border: "1.5px solid var(--ink)", borderRadius: 6, background: "#fff", fontSize: 11, padding: "0 8px", lineHeight: "16px", color: "var(--ink-soft)" }}>
                pigcoffee.example
              </span>
            </div>
            <div style={{ padding: "22px 20px 24px", background: "var(--cream)" }}>
              <p style={{ margin: 0, font: "800 12px/1 var(--font-body)", letterSpacing: ".1em", textTransform: "uppercase" }}>Pig Coffee Shop</p>
              <p style={{ margin: "10px 0 0", font: "800 clamp(28px,3vw,38px)/1 var(--font-display)", letterSpacing: "-0.03em" }}>
                Good coffee,
                <br />
                no queue.
              </p>
              <p style={{ margin: "10px 0 0", fontSize: 14, color: "var(--ink-soft)" }}>Order ahead, pick up in five minutes.</p>
              <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                <span style={{ padding: "8px 12px", border: "1.5px solid var(--ink)", borderRadius: 8, background: "var(--pink)", fontWeight: 700, fontSize: 13, whiteSpace: "nowrap" }}>Order now</span>
                <span style={{ padding: "8px 12px", border: "1.5px solid var(--ink)", borderRadius: 8, background: "#fff", fontWeight: 700, fontSize: 13, whiteSpace: "nowrap" }}>Call</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 16 }}>
                <span style={{ height: 46, border: "1.5px solid var(--ink)", borderRadius: 8, background: "var(--pink-light)" }} />
                <span style={{ height: 46, border: "1.5px solid var(--ink)", borderRadius: 8, background: "#fff" }} />
                <span style={{ height: 46, border: "1.5px solid var(--ink)", borderRadius: 8, background: "var(--pink-light)" }} />
              </div>
            </div>
            <figcaption style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap", padding: "12px 16px", borderTop: "1.5px solid var(--ink)", fontSize: 14 }}>
              <span style={{ fontWeight: 700 }}>One-page website</span>
              <span style={{ padding: "2px 10px", border: "1.5px solid var(--ink)", borderRadius: 999, background: "var(--pink-light)", fontWeight: 700, fontSize: 12, whiteSpace: "nowrap" }}>
                Concept project
              </span>
            </figcaption>
          </figure>

          <figure style={{ margin: 0, border: "1.5px solid var(--ink)", borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: "4px 4px 0 #202020" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: 16, background: "var(--pink-light)" }}>
              {[
                { title: "3 ways", note: "Video slot — add compressed 9:16 file" },
                { title: "Google vs ChatGPT", note: "Video slot — add compressed 9:16 file" },
              ].map((v) => (
                <div
                  key={v.title}
                  style={{
                    aspectRatio: "9/16",
                    border: "1.5px dashed var(--ink)",
                    borderRadius: 12,
                    background: "var(--cream)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    padding: 12,
                    textAlign: "center",
                  }}
                >
                  <span aria-hidden="true" style={{ width: 40, height: 40, borderRadius: "50%", border: "1.5px solid var(--ink)", background: "#fff", display: "grid", placeItems: "center", fontSize: 14 }}>
                    ▶
                  </span>
                  <span style={{ fontWeight: 700, fontSize: 13 }}>{v.title}</span>
                  <span style={{ fontSize: 12, color: "var(--ink-soft)" }}>{v.note}</span>
                </div>
              ))}
            </div>
            <figcaption style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap", padding: "12px 16px", borderTop: "1.5px solid var(--ink)", fontSize: 14 }}>
              <span style={{ fontWeight: 700 }}>AI promotional videos — two Pig episodes</span>
              <span style={{ padding: "2px 10px", border: "1.5px solid var(--ink)", borderRadius: 999, background: "var(--pink-light)", fontWeight: 700, fontSize: 12, whiteSpace: "nowrap" }}>Demo</span>
            </figcaption>
          </figure>

          <figure style={{ margin: 0, border: "1.5px solid var(--ink)", borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: "4px 4px 0 #202020" }}>
            <div style={{ padding: "20px 16px", background: "var(--cream)", display: "flex", flexDirection: "column", gap: 6 }}>
              {FLOW.map((f) => (
                <div key={f.n} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", border: "1.5px solid var(--ink)", borderRadius: 12, padding: "12px 14px", background: f.bg }}>
                    <span style={{ width: 28, height: 28, borderRadius: "50%", border: "1.5px solid var(--ink)", display: "grid", placeItems: "center", background: "#fff", fontWeight: 800, fontSize: 13, flex: "none" }}>
                      {f.n}
                    </span>
                    <span style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontWeight: 700, fontSize: 15 }}>{f.title}</span>
                      <span style={{ fontSize: 13, color: "var(--ink-soft)" }}>{f.text}</span>
                    </span>
                  </div>
                  {f.arrow && (
                    <span aria-hidden="true" style={{ textAlign: "center", fontWeight: 800, lineHeight: 1 }}>
                      ↓
                    </span>
                  )}
                </div>
              ))}
            </div>
            <figcaption style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap", padding: "12px 16px", borderTop: "1.5px solid var(--ink)", fontSize: 14 }}>
              <span style={{ fontWeight: 700 }}>Enquiry acknowledgement workflow</span>
              <span style={{ padding: "2px 10px", border: "1.5px solid var(--ink)", borderRadius: 999, background: "var(--pink-light)", fontWeight: 700, fontSize: 12, whiteSpace: "nowrap" }}>Sample workflow</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="pk-title" style={{ background: "var(--pink-light)", borderTop: "1.5px solid var(--ink)", borderBottom: "1.5px solid var(--ink)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(48px,7vw,88px) 20px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 16, marginBottom: 32 }}>
            <h2 id="pk-title" style={h2Style}>
              Three packages, for three different needs
            </h2>
            <Link href="/pricing" style={{ fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 4, minHeight: 44, display: "inline-flex", alignItems: "center" }}>
              Full pricing →
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", gap: 18 }}>
            {PACKAGES.map((p) => (
              <Link
                key={p.id}
                href="/pricing"
                className="card-link card-hover-lift"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  background: "#fff",
                  border: "1.5px solid var(--ink)",
                  borderRadius: 16,
                  padding: 24,
                  boxShadow: "4px 4px 0 #202020",
                }}
              >
                <span style={{ font: "800 26px/1.05 var(--font-display)", letterSpacing: "-0.02em", textTransform: "uppercase" }}>{p.name}</span>
                <span style={{ color: "var(--ink-soft)" }}>{p.tagline}</span>
                <span style={{ marginTop: 10, font: "800 40px/1 var(--font-display)", letterSpacing: "-0.03em" }}>{p.firstMonthLabel}</span>
                <span style={{ fontSize: 15 }}>first month · {p.ongoingLabel}</span>
              </Link>
            ))}
          </div>
          <p style={{ margin: "18px 0 0", fontSize: 14, color: "var(--ink-soft)" }}>{GLOBAL_EXCLUSIONS}</p>
        </div>
      </section>

      <section aria-labelledby="faq-title" style={{ maxWidth: 860, margin: "0 auto", padding: "clamp(48px,7vw,88px) 20px" }}>
        <h2 id="faq-title" style={{ ...h2Style, marginBottom: 28 }}>
          Short answers
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQS.map((q) => (
            <details key={q.q} style={{ border: "1.5px solid var(--ink)", borderRadius: 14, background: "#fff", padding: "0 18px" }}>
              <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, minHeight: 56, padding: "12px 0", cursor: "pointer", fontWeight: 700, fontSize: 18 }}>
                <span>{q.q}</span>
                <span
                  className="pig-faq-plus"
                  aria-hidden="true"
                  style={{ flex: "none", width: 28, height: 28, borderRadius: "50%", border: "1.5px solid var(--ink)", display: "grid", placeItems: "center", fontWeight: 800, transition: "transform .2s" }}
                >
                  +
                </span>
              </summary>
              <p style={{ margin: 0, padding: "0 0 18px", color: "var(--ink-soft)", textWrap: "pretty" }}>{q.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section aria-labelledby="cta-title" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px clamp(48px,7vw,88px)" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            alignItems: "flex-end",
            background: "var(--pink)",
            border: "1.5px solid var(--ink)",
            borderRadius: 24,
            padding: "clamp(24px,4vw,48px) clamp(20px,4vw,48px) 0",
            boxShadow: "6px 6px 0 #202020",
            overflow: "hidden",
          }}
        >
          <div style={{ flex: "1 1 320px", paddingBottom: "clamp(24px,4vw,48px)", minWidth: 0 }}>
            <h2 id="cta-title" style={{ margin: 0, font: "800 clamp(34px,5.5vw,68px)/0.95 var(--font-display)", letterSpacing: "-0.035em" }}>
              Ready when you are.
            </h2>
            <p style={{ margin: "14px 0 24px", maxWidth: 520, fontSize: 18 }}>
              Tell Pig your problem for a starting plan, or write to a human straight away.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link href="/ask-pig" className="btn btn-dark" style={{ border: "1.5px solid var(--ink)" }}>
                Ask Pig
              </Link>
              <Link href="/contact" className="btn btn-white-flat" style={{ border: "1.5px solid var(--ink)" }}>
                Contact
              </Link>
            </div>
          </div>
          <div style={{ flex: "0 0 auto", display: "flex", justifyContent: "center", alignItems: "flex-end", margin: "0 auto" }}>
            <img
              src="/assets/pig-10-cut.png"
              alt="Pig in a tie pointing toward you"
              width={297}
              height={590}
              loading="lazy"
              style={{ width: "clamp(120px,16vw,200px)", height: "auto", display: "block", marginBottom: -6 }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
