import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "A human reads every message. Reach Pig.ai by email or Instagram, or send a short enquiry.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
