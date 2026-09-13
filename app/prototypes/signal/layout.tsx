import type { Metadata } from "next";
import { Unbounded, Sora, JetBrains_Mono } from "next/font/google";
import "./signal.css";

const unbounded = Unbounded({
  variable: "--font-signal-display",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const sora = Sora({
  variable: "--font-signal-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-signal-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Signal — prototype",
  robots: { index: false, follow: false },
};

export default function SignalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${unbounded.variable} ${sora.variable} ${jetbrainsMono.variable}`}>
      {children}
    </div>
  );
}
