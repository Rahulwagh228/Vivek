import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Serif_Devanagari } from "next/font/google";
import "@/styles/main.scss";
import { MouseFollower } from "@/components";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const devanagari = Noto_Serif_Devanagari({ 
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vivek Sonawane — Aspiring Lok Sabha Candidate",
  description: "Official website of Vivek Sonawane — Community leader, youth icon, and aspiring Lok Sabha candidate dedicated to building a stronger, more prosperous India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${devanagari.variable} antialiased`}>
        <MouseFollower />
        {children}
      </body>
    </html>
  );
}
