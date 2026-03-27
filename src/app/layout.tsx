import type { Metadata } from "next";
import { Barlow, Oxanium } from "next/font/google";

import { getSiteContent } from "@/lib/content";
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

const siteContent = getSiteContent();

export const metadata: Metadata = {
  title: siteContent.brandName,
  description: siteContent.hero.subheadline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable} bg-background text-text antialiased`}>
        {children}
      </body>
    </html>
  );
}

