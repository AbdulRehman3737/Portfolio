import type { Metadata } from "next";
import { Archivo_Black, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({
  variable: "--font-telemetry-display",
  subsets: ["latin"],
  weight: "400",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-telemetry-mono",
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
      <body className={`${archivoBlack.variable} ${ibmPlexMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
