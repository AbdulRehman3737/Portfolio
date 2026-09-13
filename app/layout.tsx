import type { Metadata } from "next";
import { Unbounded, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  title: "Abdul Rehman — Senior Full-Stack Engineer",
  description:
    "Abdul Rehman — Senior Full-Stack Engineer with 5+ years building and shipping React + NestJS applications. Portfolio, experience, and projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${unbounded.variable} ${sora.variable} ${jetbrainsMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
