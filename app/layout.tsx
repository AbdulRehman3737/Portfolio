import type { Metadata } from "next";
import { Courier_Prime, Inter, Special_Elite } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";

const specialElite = Special_Elite({
  variable: "--font-special-elite",
  subsets: ["latin"],
  weight: ["400"],
});

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Abdul Rehman — Case File",
  description:
    "Abdul Rehman — Senior Full-Stack Engineer. Case files: BioGenome and AspireFoundation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${specialElite.variable} ${courierPrime.variable} ${inter.variable} antialiased`}
      >
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
