"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/ask-pig", label: "Ask Pig" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLink = (item: (typeof NAV_ITEMS)[number], mobile: boolean) => {
    const current = pathname === item.href;
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={current ? "page" : undefined}
        onClick={() => setMenuOpen(false)}
        className="nav-link"
        style={mobile ? { minHeight: 48, fontSize: 18 } : undefined}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--cream)",
        borderBottom: "1.5px solid var(--ink)",
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          minHeight: 60,
        }}
      >
        <Link
          href="/"
          aria-label="Pig.ai home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "var(--ink)",
            minHeight: 44,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1.5px solid var(--ink)",
              background:
                "url(/assets/pig-06-cut.png) center 3px/38px auto no-repeat #F5A5B8",
              flex: "none",
            }}
          />
          <span
            style={{
              font: "800 24px/1 var(--font-display)",
              letterSpacing: "-0.03em",
            }}
          >
            Pig.ai
          </span>
        </Link>

        <nav aria-label="Main" className="show-desktop-flex" style={{ gap: 4, alignItems: "center" }}>
          {NAV_ITEMS.map((item) => navLink(item, false))}
        </nav>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Link href="/ask-pig" className="btn btn-pink btn-sm">
            Ask Pig
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Menu"
            className="show-mobile-flex"
            style={{
              width: 44,
              height: 44,
              border: "1.5px solid var(--ink)",
              borderRadius: 12,
              background: "#fff",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: "block",
                width: 18,
                height: 2,
                background: "var(--ink)",
                boxShadow: "0 -6px 0 #202020, 0 6px 0 #202020",
              }}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="show-mobile-flex"
          style={{
            borderTop: "1.5px solid var(--ink)",
            background: "#fff",
            padding: "8px 16px 16px",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {NAV_ITEMS.map((item) => navLink(item, true))}
        </nav>
      )}
    </header>
  );
}
