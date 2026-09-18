import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask Pig — get a starting plan",
  description: "Tell Pig what's slowing your business down and get a practical starting plan, no sign-up needed.",
};

export default function AskPigLayout({ children }: { children: React.ReactNode }) {
  return children;
}
