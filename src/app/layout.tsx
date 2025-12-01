import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/main.scss";
import { MouseFollower } from "@/components";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Vivek Sonawane",
  description: "Award-winning speaker, public <figure></figure>, and thought leader dedicated to making a positive impact on communities around the globe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <MouseFollower />
        {children}
      </body>
    </html>
  );
}
