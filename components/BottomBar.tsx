"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomBar() {
  const pathname = usePathname();
  if (pathname === "/ask-pig") return null;

  return (
    <>
      <div
        className="show-mobile-block"
        aria-hidden="true"
        style={{ height: "calc(72px + env(safe-area-inset-bottom))" }}
      />
      <nav
        aria-label="Quick actions"
        className="show-mobile-grid"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 40,
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          padding: "10px 16px calc(10px + env(safe-area-inset-bottom))",
          background: "var(--cream)",
          borderTop: "1.5px solid var(--ink)",
        }}
      >
        <Link href="/ask-pig" className="btn btn-pink" style={{ minHeight: 48 }}>
          Ask Pig
        </Link>
        <Link href="/contact" className="btn btn-white-flat" style={{ minHeight: 48 }}>
          Contact
        </Link>
      </nav>
    </>
  );
}
