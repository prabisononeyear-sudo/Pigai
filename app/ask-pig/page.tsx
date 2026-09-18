"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAdvisor } from "@/lib/advisor-context";
import PlanCard from "@/components/PlanCard";

const PIGS: Record<string, [string, string]> = {
  welcome: ["/assets/pig-06-cut.png", "Pig in a tie, ready to listen"],
  listening: ["/assets/pig-06-cut.png", "Pig in a tie, listening"],
  thinking: ["/assets/pig-03-cut.png", "Pig in a tie, working out a suggestion"],
  explain: ["/assets/pig-07-cut.png", "Pig in a tie, pleased with the plan"],
  point: ["/assets/pig-10-cut.png", "Pig in a tie, pointing to the next step"],
};

const LABELS: Record<string, string> = {
  problem: "Main problem",
  businessType: "Business type",
  hasWebsite: "Website",
  advertising: "Ads so far",
  setupBudget: "Setup budget",
  monthlyBudget: "Monthly budget",
};

export default function AskPigPage() {
  return (
    <Suspense fallback={null}>
      <AskPigInner />
    </Suspense>
  );
}

function AskPigInner() {
  const searchParams = useSearchParams();
  const advisor = useAdvisor();
  const { state } = advisor;
  const started = useRef(false);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const intro = searchParams.get("intro");
    if (state.messages.length === 0) {
      advisor.startConversation(intro || null);
    } else if (intro) {
      advisor.handleUser(intro);
    }
    // Runs once on mount only — see comment on the ref above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [pigSrc, pigAlt] = PIGS[state.pigMood] || PIGS.welcome;
  const isAI = state.mode === "ai";
  const hasPlan = !!state.plan;

  const selectFields: Record<string, string[]> = {
    hasWebsite: ["Yes, it works", "Yes, but it needs replacing", "No website yet", "Not sure"],
    advertising: ["Yes, currently running", "Tried before, stopped", "Never", "Not sure"],
    setupBudget: advisor.budgets.BUDGET_SETUP.map((b: { label: string }) => b.label),
    monthlyBudget: advisor.budgets.BUDGET_MONTHLY.map((b: { label: string }) => b.label),
  };
  const editFields = Object.keys(LABELS).map((k) => ({
    key: k,
    label: LABELS[k],
    value: state.ctx[k] || "",
    isSelect: !!selectFields[k],
    options: selectFields[k] ? ["", ...selectFields[k]] : [],
  }));

  const submit = () => {
    advisor.handleUser(draft);
    setDraft("");
  };

  const copyPlanLabel = state.copied === "plan" ? "Copied ✓" : "Copy plan";

  return (
    <div
      data-screen-label="Ask Pig"
      style={{ maxWidth: 820, margin: "0 auto", padding: "clamp(28px,5vw,56px) 16px 0", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 62px)" }}
    >
      <div style={{ display: "flex", gap: 16, alignItems: "flex-end", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 320px" }}>
          <h1 style={{ margin: 0, font: "800 clamp(36px,6.5vw,68px)/0.95 var(--font-display)", letterSpacing: "-0.04em" }}>
            Tell Pig what&rsquo;s slowing you down.
          </h1>
          <p style={{ margin: "14px 0 0", fontSize: "clamp(17px,1.8vw,19px)" }}>
            Get a practical starting plan for your business. No technical knowledge needed.
          </p>
        </div>
        <img src={pigSrc} alt={pigAlt} width={301} height={641} style={{ width: "clamp(80px,12vw,130px)", height: "auto", flex: "none", transition: "opacity .2s" }} />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", margin: "20px 0 0", fontSize: 14 }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 10px",
            border: "1.5px solid var(--ink)",
            borderRadius: 999,
            background: isAI ? "var(--pink)" : "var(--pink-light)",
            fontWeight: 700,
          }}
        >
          {isAI ? "Live AI advisor" : "Guided questionnaire"}
        </span>
        <span style={{ color: "var(--ink-soft)" }}>
          {isAI ? "Replies are drafted by an AI; prices come only from Pig.ai’s catalogue." : "Fixed questions, catalogue-based rules — no AI involved."}
        </span>
      </div>
      <p style={{ margin: "12px 0 0", padding: "10px 14px", border: "1.5px solid var(--ink)", borderRadius: 12, background: "#fff", fontSize: 14, color: "var(--ink-soft)" }}>
        {isAI ? "Your messages are processed by an AI service (Anthropic Claude) to draft replies. " : "No AI service is used in this mode; answers are matched by fixed rules. "}
        No account or email required. Your conversation stays in this browser tab and is not saved by
        Pig.ai; use Restart to clear it.
      </p>

      <div role="log" aria-live="polite" aria-relevant="additions" style={{ display: "flex", flexDirection: "column", gap: 14, padding: "24px 0 12px", flex: 1 }}>
        {state.messages.map((m, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column" }}>
            {m.kind === "pig" && (
              <div style={{ display: "flex", gap: 10, alignItems: "flex-end", maxWidth: "min(92%,640px)" }}>
                <span
                  aria-hidden="true"
                  style={{ flex: "none", width: 34, height: 34, borderRadius: "50%", border: "1.5px solid var(--ink)", background: "url(/assets/pig-06-cut.png) center 3px/36px auto no-repeat #F5A5B8" }}
                />
                <div style={{ background: "#fff", border: "1.5px solid var(--ink)", borderRadius: "16px 16px 16px 4px", padding: "12px 16px", boxShadow: "3px 3px 0 #202020", whiteSpace: "pre-wrap", textWrap: "pretty" }}>
                  {m.text}
                </div>
              </div>
            )}
            {m.kind === "user" && (
              <div style={{ alignSelf: "flex-end", maxWidth: "min(88%,560px)", background: "var(--pink)", border: "1.5px solid var(--ink)", borderRadius: "16px 16px 4px 16px", padding: "12px 16px", whiteSpace: "pre-wrap" }}>
                {m.text}
              </div>
            )}
            {m.kind === "plan" && (
              <PlanCard plan={m} onSendToContact={advisor.sendToContact} onCopyPlan={advisor.copyPlan} copyLabel={copyPlanLabel} />
            )}
          </div>
        ))}

        {state.loading && (
          <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }} aria-label="Pig is preparing a reply">
            <span aria-hidden="true" style={{ flex: "none", width: 34, height: 34, borderRadius: "50%", border: "1.5px solid var(--ink)", background: "url(/assets/pig-06-cut.png) center 3px/36px auto no-repeat #F5A5B8" }} />
            <div style={{ background: "#fff", border: "1.5px solid var(--ink)", borderRadius: "16px 16px 16px 4px", padding: "14px 16px", display: "flex", gap: 5, alignItems: "center" }}>
              <span style={{ fontSize: 14, color: "var(--ink-soft)", marginRight: 4 }}>Working out your plan</span>
              <span className="pig-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--ink)", animation: "pig-dots 1.2s infinite" }} />
              <span className="pig-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--ink)", animation: "pig-dots 1.2s .2s infinite" }} />
              <span className="pig-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--ink)", animation: "pig-dots 1.2s .4s infinite" }} />
            </div>
          </div>
        )}

        {state.error && (
          <div role="alert" style={{ border: "1.5px solid var(--ink)", borderRadius: 14, padding: "14px 16px", background: "var(--pink-light)", display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "space-between" }}>
            <span>{state.error}</span>
            <span style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button type="button" onClick={advisor.retry} className="btn btn-dark btn-sm">
                Try again
              </button>
              <button type="button" onClick={advisor.switchToGuided} className="btn btn-white btn-sm">
                Use guided questions
              </button>
            </span>
          </div>
        )}

        {state.options.length > 0 && !state.loading && (
          <div role="group" aria-label="Quick replies" style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingLeft: 44 }}>
            {state.options.map((text) => (
              <button key={text} type="button" onClick={() => advisor.handleUser(text)} className="chip">
                {text}
              </button>
            ))}
          </div>
        )}

        {state.editing && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              advisor.applyEdits();
            }}
            aria-label="Your answers"
            style={{ border: "1.5px solid var(--ink)", borderRadius: 16, padding: 16, background: "#fff", display: "grid", gap: 12 }}
          >
            <p style={{ margin: 0, fontWeight: 700 }}>Your answers — change anything, then update.</p>
            {editFields.map((f) => (
              <label key={f.key} style={{ display: "grid", gap: 4, fontSize: 14, fontWeight: 600 }}>
                <span>{f.label}</span>
                {f.isSelect ? (
                  <select
                    value={f.value}
                    onChange={(e) => advisor.setCtxField(f.key, e.target.value)}
                    style={{ minHeight: 44, padding: "0 12px", fontSize: 16, border: "1.5px solid var(--ink)", borderRadius: 10, background: "var(--cream)", color: "var(--ink)" }}
                  >
                    {f.options.map((op) => (
                      <option key={op} value={op}>
                        {op}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={f.value}
                    onChange={(e) => advisor.setCtxField(f.key, e.target.value)}
                    maxLength={300}
                    style={{ minHeight: 44, padding: "0 12px", fontSize: 16, border: "1.5px solid var(--ink)", borderRadius: 10, background: "var(--cream)", color: "var(--ink)" }}
                  />
                )}
              </label>
            ))}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button type="submit" className="btn btn-dark btn-sm">
                Update plan
              </button>
              <button type="button" onClick={advisor.toggleEditing} className="btn btn-white btn-sm">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      <div style={{ position: "sticky", bottom: 0, background: "var(--cream)", padding: "10px 0 calc(12px + env(safe-area-inset-bottom))", borderTop: "1.5px solid var(--ink)" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          style={{ display: "flex", gap: 8, alignItems: "flex-end" }}
        >
          <label htmlFor="chat-input" style={{ position: "absolute", left: -9999 }}>
            Your message
          </label>
          <textarea
            id="chat-input"
            rows={1}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            maxLength={600}
            placeholder={state.pendingKey === "problem" && !state.plan ? "Describe what's slowing you down…" : "Type your answer…"}
            disabled={state.loading}
            style={{ flex: 1, minHeight: 52, maxHeight: 140, padding: "14px 16px", fontSize: 17, lineHeight: 1.3, border: "1.5px solid var(--ink)", borderRadius: 14, background: "#fff", color: "var(--ink)", resize: "none" }}
          />
          <button
            type="submit"
            disabled={state.loading || !draft.trim()}
            aria-label="Send"
            className="btn btn-pink"
            style={{ flex: "none", width: 52, height: 52, padding: 0, fontSize: 20 }}
          >
            ↑
          </button>
        </form>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", marginTop: 8, fontSize: 14 }}>
          <button type="button" onClick={advisor.toggleEditing} className="btn-plain">
            Edit answers
          </button>
          <button type="button" onClick={advisor.restart} className="btn-plain">
            Restart
          </button>
          {hasPlan && (
            <button type="button" onClick={advisor.copyPlan} className="btn-plain">
              {copyPlanLabel}
            </button>
          )}
          <button type="button" onClick={advisor.toggleMode} className="btn-plain">
            {isAI ? "Use guided questions instead" : "Use live AI instead"}
          </button>
          <span style={{ marginLeft: "auto", color: "var(--ink-soft)" }}>{draft.length}/600</span>
        </div>
      </div>
    </div>
  );
}
