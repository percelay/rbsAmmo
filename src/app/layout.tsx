import type { Metadata } from "next";
import { Barlow, Oxanium } from "next/font/google";

import { Providers } from "@/app/providers";
import "@/styles/globals.css";

const displayFont = Oxanium({
  subsets: ["latin"],
  variable: "--font-oxanium",
  weight: ["500", "600", "700"],
});

const bodyFont = Barlow({
  subsets: ["latin"],
  variable: "--font-barlow",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "RBS Ammunition",
  description: "High-Quality Ammunition Built in Skagit Valley, WA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable} bg-background text-text antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
