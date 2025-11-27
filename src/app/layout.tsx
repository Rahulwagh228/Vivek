import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/main.scss";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "John Doe | Public Figure & Philanthropist",
  description: "Award-winning speaker, philanthropist, and thought leader dedicated to making a positive impact on communities around the globe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
