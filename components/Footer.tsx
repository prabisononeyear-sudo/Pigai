"use client";

import Link from "next/link";
import { useState } from "react";
import { CONTACT } from "@/lib/catalogue";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/ask-pig", label: "Ask Pig" },
  { href: "/contact", label: "Contact" },
];

const MODAL_CONTENT: Record<string, [string, string[]]> = {
  privacy: [
    "Privacy",
    [
      "What we collect: only what you type. The Ask Pig conversation is kept in your browser tab's memory and is not stored by Pig.ai; closing the tab or pressing Restart clears it.",
      "AI processing: when the live advisor is on, your messages are sent to an AI service (Anthropic's Claude) to draft replies and a plan. Prices and service scope are never decided by the AI — they come from Pig.ai's fixed catalogue.",
      "Contact: emailing or messaging us on Instagram shares whatever you choose to include. We use it only to reply to you. Ask us to delete it at any time by email.",
      "We do not ask for passwords, payment details or other sensitive data, and we do not use tracking cookies on this site.",
      "Contact: " + CONTACT.email,
    ],
  ],
  disclosures: [
    "Service disclosures",
    [
      "Pig.ai is a human-run agency based in Nepal, serving clients remotely. The Pig advisor helps you plan; the owner reviews every plan and delivers the work. Nothing on this site is a booking or a contract until the owner confirms scope in writing.",
      "Prices shown are Pig.ai service fees. They exclude hosting, domain renewals after year one, paid tools or software, usage fees, advertising spend paid to platforms, and applicable taxes.",
      "Advertising services depend on your account eligibility, authorised access and platform capabilities. Pig.ai is not an official partner of OpenAI or Meta. Paid ads are separate from organic recommendations; organic mentions cannot be promised.",
      "AI promotional videos are AI-generated; a synthetic presenter is never presented as a real customer testimonial. Competitor-ad research uses only publicly visible ads.",
      "We make no guaranteed claims about revenue, leads or time saved. Demonstration work on this site is labelled as concept or demo material and does not represent paying clients.",
    ],
  ],
};

export default function Footer() {
  const [modal, setModal] = useState<string | null>(null);
  const content = modal ? MODAL_CONTENT[modal] : null;

  return (
    <>
      <footer style={{ borderTop: "1.5px solid var(--ink)", background: "#fff" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "36px 20px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))",
            gap: 28,
            fontSize: 15,
          }}
        >
          <div style={{ display: "grid", gap: 8, alignContent: "start" }}>
            <span style={{ font: "800 28px/1 var(--font-display)", letterSpacing: "-0.03em" }}>
              Pig.ai
            </span>
            <p style={{ margin: 0, color: "var(--ink-soft)", textWrap: "pretty" }}>
              Practical AI help for your small business. A human-run agency based in
              Nepal, serving clients remotely.
            </p>
          </div>
          <nav aria-label="Footer" style={{ display: "grid", gap: 2, alignContent: "start" }}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  minHeight: 40,
                  display: "inline-flex",
                  alignItems: "center",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div style={{ display: "grid", gap: 2, alignContent: "start" }}>
            <a
              href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("Pig.ai enquiry")}`}
              style={{ minHeight: 40, display: "inline-flex", alignItems: "center", wordBreak: "break-all" }}
            >
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ minHeight: 40, display: "inline-flex", alignItems: "center" }}
            >
              Instagram {CONTACT.instagramHandle}
            </a>
          </div>
          <div style={{ display: "grid", gap: 2, alignContent: "start" }}>
            <button type="button" onClick={() => setModal("privacy")} className="btn-plain" style={{ padding: 0, textAlign: "left", fontSize: 15 }}>
              Privacy
            </button>
            <button type="button" onClick={() => setModal("disclosures")} className="btn-plain" style={{ padding: 0, textAlign: "left", fontSize: 15 }}>
              Service disclosures
            </button>
            <p style={{ margin: "8px 0 0", color: "var(--ink-soft)" }}>© 2026 Pig.ai</p>
          </div>
        </div>
      </footer>

      {content && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 60,
            background: "rgba(32,32,32,.55)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: 16,
          }}
          onClick={() => setModal(null)}
        >
          <div
            style={{
              width: "min(100%,640px)",
              maxHeight: "85vh",
              overflow: "auto",
              background: "#fff",
              border: "1.5px solid var(--ink)",
              borderRadius: 20,
              padding: 24,
              boxShadow: "6px 6px 0 #202020",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <h2 id="modal-title" style={{ margin: 0, font: "800 26px/1.1 var(--font-display)", letterSpacing: "-0.02em" }}>
                {content[0]}
              </h2>
              <button
                type="button"
                onClick={() => setModal(null)}
                aria-label="Close"
                style={{
                  width: 44,
                  height: 44,
                  border: "1.5px solid var(--ink)",
                  borderRadius: 12,
                  background: "var(--pink-light)",
                  fontSize: 20,
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>
            <div style={{ display: "grid", gap: 10, fontSize: 16 }}>
              {content[1].map((p, i) => (
                <p key={i} style={{ margin: 0, textWrap: "pretty" }}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
