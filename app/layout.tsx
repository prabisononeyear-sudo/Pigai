import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomBar from "@/components/BottomBar";
import { AdvisorProvider } from "@/lib/advisor-context";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-display",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pig-ai.example.com"),
  title: {
    default: "Pig.ai — Practical AI help for your small business",
    template: "%s — Pig.ai",
  },
  description:
    "Practical AI help for your small business. Affordable websites, automations, content and ads — tell Pig what you need help with.",
  openGraph: {
    title: "Pig.ai — Practical AI help for your small business",
    description:
      "Affordable websites, automations, content and ads for small businesses. Tell Pig what's slowing you down.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${figtree.variable}`}>
      <body>
        <AdvisorProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main" style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
          <BottomBar />
        </AdvisorProvider>
      </body>
    </html>
  );
}
