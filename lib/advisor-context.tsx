"use client";

import { createContext, useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  classifyProblem,
  nextQuestion,
  recommend,
  buildPlanView,
  QUESTIONS,
  BUDGET_SETUP,
  BUDGET_MONTHLY,
  CONTACT,
} from "@/lib/catalogue";

export type Ctx = Record<string, string>;

export type PlanLine = { id: string; name: string; setup: number; monthly: number; deliverables: string[]; priceLabel: string };
export type PlanView = {
  understood: string;
  tryNow: string;
  unsupported: string | null;
  lines: PlanLine[];
  hasLines: boolean;
  noLines: boolean;
  quoteRequired: { name: string; from: number; fromLabel: string }[];
  note: string | null;
  cheaper: string | null;
  setupLabel: string;
  monthlyLabel: string;
  partial: boolean;
  thirdParty: string;
  review: string;
};

export type ChatEntry =
  | { kind: "pig"; text: string }
  | { kind: "user"; text: string }
  | ({ kind: "plan" } & PlanView);

export type ContactFields = {
  name: string;
  business: string;
  preferred: string;
  problem: string;
  website: string;
  budget: string;
};

type State = {
  messages: ChatEntry[];
  ctx: Ctx;
  options: string[];
  pendingKey: string | null;
  mode: "ai" | "guided";
  loading: boolean;
  error: string | null;
  editing: boolean;
  plan: PlanView | null;
  brief: string;
  pigMood: "welcome" | "listening" | "thinking" | "explain" | "point";
  copied: string | null;
  contact: ContactFields;
};

const CATEGORY_LABELS: Record<string, string> = {
  website: "a website question",
  followup: "a follow-up and admin question",
  video: "a video and content question",
  enquiries: "a question about getting more enquiries",
  app: "a question about tracking things in an app",
  chatgpt: "a ChatGPT advertising question",
  unsupported: "something outside what we offer — I'll be honest about that at the end",
  unknown: "something I want to understand a little better",
};

const initialState: State = {
  messages: [],
  ctx: {},
  options: [],
  pendingKey: null,
  mode: "ai",
  loading: false,
  error: null,
  editing: false,
  plan: null,
  brief: "",
  pigMood: "welcome",
  copied: null,
  contact: { name: "", business: "", preferred: "Email", problem: "", website: "", budget: "" },
};

function fallbackCopy(text: string) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
  } catch {
    /* no-op: clipboard unsupported */
  }
  document.body.removeChild(ta);
}

/**
 * All state here mirrors the original design's single class-component instance:
 * every action function below closes over the *current render's* `state` (like
 * `this.state` in a class) and pushes a fully-computed next state with setState.
 * Deliberately not memoized with useCallback/useMemo — this is a low-traffic chat
 * widget, and closing over fresh `state` each render avoids stale-closure bugs
 * that functional (prev =>) updates would invite once async steps are involved.
 */
export function useAdvisorState() {
  const [state, setState] = useState<State>(initialState);
  const router = useRouter();
  const lastUserText = useRef<string | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const producePlanGuided = (intent: Parameters<typeof buildPlanView>[0], ctx: Ctx, base: State) => {
    const { view, brief } = buildPlanView(intent, ctx);
    setState({
      ...base,
      ctx,
      pendingKey: null,
      plan: view,
      brief,
      pigMood: "explain",
      options: [],
      messages: [
        ...base.messages,
        { kind: "pig", text: "Here is your suggested plan. You can edit your answers, or send it straight to a human at Pig.ai." },
        { kind: "plan", ...view },
      ],
    });
  };

  const continueGuided = (ctx: Ctx, acknowledge: boolean, base: State) => {
    const next = nextQuestion(ctx);
    if (next) {
      const ack = acknowledge ? `Got it — sounds like ${CATEGORY_LABELS[ctx.category] || CATEGORY_LABELS.unknown}. ` : "";
      const opts = next.options.includes("Not sure") ? next.options : [...next.options, "Not sure"];
      setState({
        ...base,
        ctx,
        pendingKey: next.key,
        pigMood: "listening",
        options: opts,
        messages: [...base.messages, { kind: "pig", text: ack + next.ask }],
      });
    } else {
      producePlanGuided(recommend(ctx), ctx, base);
    }
  };

  const guidedStep = (text: string, base: State) => {
    const ctx: Ctx = { ...base.ctx };
    const key = base.pendingKey || (ctx.problem ? null : "problem");
    if (key) ctx[key] = text;
    else ctx.problem = (ctx.problem ? ctx.problem + " " : "") + text;
    if (key === "problem" || !key) {
      const cls = classifyProblem(ctx.problem);
      ctx.category = cls.category;
      ctx.unsupportedReason = cls.reason || "";
    }
    continueGuided(ctx, key === "problem", base);
  };

  const aiStep = async (base: State) => {
    setState({ ...base, loading: true, error: null, pigMood: "thinking" });
    const history = base.messages
      .filter((m) => m.kind === "pig" || m.kind === "user")
      .map((m) => ({ role: m.kind === "user" ? ("user" as const) : ("assistant" as const), content: (m as { text: string }).text }));
    if (history[0] && history[0].role === "assistant") history.shift();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const res = await fetch("/api/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, ctx: base.ctx }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const json = await res.json().catch(() => null);

      if (!res.ok || !json) {
        const detail =
          json && typeof json.error === "string" && json.error.trim()
            ? json.error.trim()
            : "Pig couldn't reach the AI service just now.";
        console.error("[advisor] request failed", res.status, json);
        setState((prev) => ({
          ...prev,
          loading: false,
          pigMood: "listening",
          error: `${detail} [${res.status}] Your message is kept — try again, or switch to the guided questions.`,
        }));
        return;
      }

      if (json.kind === "plan") {
        setState((prev) => ({
          ...prev,
          ctx: json.ctx,
          loading: false,
          pendingKey: null,
          plan: json.plan,
          brief: json.brief,
          pigMood: "explain",
          options: [],
          messages: [...prev.messages, ...(json.reply ? [{ kind: "pig" as const, text: json.reply as string }] : []), { kind: "plan" as const, ...json.plan }],
        }));
      } else {
        setState((prev) => ({
          ...prev,
          ctx: json.ctx,
          loading: false,
          pigMood: "listening",
          options: json.quickReplies || [],
          messages: [...prev.messages, { kind: "pig", text: json.reply }],
        }));
      }
    } catch (e) {
      clearTimeout(timeout);
      const aborted = e instanceof DOMException && e.name === "AbortError";
      const msg = aborted
        ? "Pig took too long to answer. Your message is kept — try again, or switch to the guided questions."
        : "Pig couldn't be reached — the connection failed. Your message is kept — try again, or switch to the guided questions.";
      setState((prev) => ({ ...prev, loading: false, error: msg, pigMood: "listening" }));
    }
  };

  const startConversation = (initial: string | null) => {
    lastUserText.current = null;
    const first = QUESTIONS[0];
    const base: State = {
      ...initialState,
      contact: state.contact,
      messages: [{ kind: "pig", text: "Hi, I'm Pig. Tell me what's slowing you down and I'll suggest a practical place to start — no jargon, no sign-up." }],
      options: initial ? [] : first.options,
      pendingKey: "problem",
      mode: state.mode,
    };
    setState(base);
    if (initial) handleUser(initial, base);
  };

  const handleUser = (rawText: string, base: State = state) => {
    const text = (rawText || "").trim().slice(0, 600);
    if (!text || base.loading) return;
    lastUserText.current = text;
    const next: State = { ...base, messages: [...base.messages, { kind: "user", text }], options: [], error: null };
    if (base.mode === "ai") void aiStep(next);
    else guidedStep(text, next);
  };

  const restart = () => startConversation(null);

  const retry = () => {
    if (state.mode === "ai") void aiStep(state);
    else setState({ ...state, error: null });
  };

  const switchToGuided = () => {
    const ctx: Ctx = { ...state.ctx };
    const last = lastUserText.current;
    if (!ctx.problem && last) {
      ctx.problem = last;
      const cls = classifyProblem(last);
      ctx.category = cls.category;
      ctx.unsupportedReason = cls.reason || "";
    }
    const base: State = {
      ...state,
      mode: "guided",
      error: null,
      loading: false,
      messages: [...state.messages, { kind: "pig", text: "Switching to guided questions — same catalogue, same prices, just a fixed set of questions." }],
    };
    continueGuided(ctx, false, base);
  };

  const toggleMode = () => {
    if (state.mode === "ai") {
      switchToGuided();
    } else {
      setState({
        ...state,
        mode: "ai",
        error: null,
        options: ["Make my plan", "Not sure"],
        messages: [...state.messages, { kind: "pig", text: "Back to live AI. Tell me anything else about your situation, or say “make my plan”." }],
      });
    }
  };

  const toggleEditing = () => setState({ ...state, editing: !state.editing });

  const setCtxField = (key: string, value: string) => setState({ ...state, ctx: { ...state.ctx, [key]: value } });

  const applyEdits = () => {
    const ctx: Ctx = { ...state.ctx };
    if (ctx.problem) {
      const cls = classifyProblem(ctx.problem);
      ctx.category = cls.category;
      ctx.unsupportedReason = cls.reason || "";
    }
    if (state.mode === "guided") {
      continueGuided(ctx, false, { ...state, ctx, editing: false, messages: [...state.messages, { kind: "pig", text: "Thanks — updating with your changes." }] });
    } else {
      lastUserText.current = "Updated answers";
      const summary = Object.entries(ctx)
        .filter(([k]) => !["category", "unsupportedReason"].includes(k))
        .map(([k, v]) => `${k} = ${v}`)
        .join("; ");
      const base: State = {
        ...state,
        ctx,
        editing: false,
        messages: [...state.messages, { kind: "user", text: `I updated my answers: ${summary}. Please update the plan.` }],
        options: [],
      };
      void aiStep(base);
    }
  };

  const sendToContact = () => {
    const c = state.contact;
    const contact: ContactFields = {
      ...c,
      problem: c.problem || state.ctx.problem || "",
      business: c.business || (state.ctx.businessType && state.ctx.businessType !== "Other" ? state.ctx.businessType : ""),
      budget:
        c.budget ||
        [state.ctx.setupBudget && `Setup ${state.ctx.setupBudget}`, state.ctx.monthlyBudget && `monthly ${state.ctx.monthlyBudget}`].filter(Boolean).join(", "),
    };
    setState({ ...state, contact, pigMood: "point" });
    router.push("/contact");
  };

  const setContactField = (key: keyof ContactFields, value: string) => setState({ ...state, contact: { ...state.contact, [key]: value } });

  const setBrief = (value: string) => setState({ ...state, brief: value });

  const fullBrief = () => {
    const c = state.contact;
    const head = [
      c.name && `Name: ${c.name}`,
      c.business && `Business: ${c.business}`,
      `Preferred contact: ${c.preferred}`,
      c.problem && `Problem: ${c.problem}`,
      c.website && `Website: ${c.website}`,
      c.budget && `Budget: ${c.budget}`,
    ]
      .filter(Boolean)
      .join("\n");
    return [head, state.brief].filter(Boolean).join("\n\n");
  };

  const copyText = (text: string, key: string) => {
    const done = () => {
      setState((prev) => ({ ...prev, copied: key }));
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setState((prev) => ({ ...prev, copied: null })), 2000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, () => {
        fallbackCopy(text);
        done();
      });
    } else {
      fallbackCopy(text);
      done();
    }
  };

  const copyPlan = () => copyText(state.brief, "plan");
  const copyBrief = () => copyText(fullBrief(), "brief");
  const copyEmail = () => copyText(CONTACT.email, "email");

  return {
    state,
    startConversation,
    handleUser: (text: string) => handleUser(text),
    restart,
    retry,
    switchToGuided,
    toggleMode,
    toggleEditing,
    setCtxField,
    applyEdits,
    sendToContact,
    setContactField,
    setBrief,
    fullBrief,
    copyPlan,
    copyBrief,
    copyEmail,
    budgets: { BUDGET_SETUP, BUDGET_MONTHLY },
  };
}

type AdvisorApi = ReturnType<typeof useAdvisorState>;
const AdvisorContext = createContext<AdvisorApi | null>(null);

export function AdvisorProvider({ children }: { children: React.ReactNode }) {
  const api = useAdvisorState();
  return <AdvisorContext.Provider value={api}>{children}</AdvisorContext.Provider>;
}

export function useAdvisor() {
  const ctx = useContext(AdvisorContext);
  if (!ctx) throw new Error("useAdvisor must be used within AdvisorProvider");
  return ctx;
}
