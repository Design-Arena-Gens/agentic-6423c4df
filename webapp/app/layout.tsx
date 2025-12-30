import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agentic-6423c4df.vercel.app"),
  title: "Agentic Atelier",
  description:
    "A speculative workbench for fusing any ingredients into living blueprints.",
  keywords: [
    "idea generator",
    "creative tool",
    "speculative design",
    "next.js",
    "tailwindcss",
  ],
  openGraph: {
    title: "Agentic Atelier — Make Anything With Anything",
    description:
      "Spin up hybrid blueprints, remix ingredients, and craft impossible prototypes.",
    url: "https://agentic-6423c4df.vercel.app",
    siteName: "Agentic Atelier",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Agentic Atelier interface preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic Atelier",
    description:
      "A speculative canvas for making anything with anything. Remix, iterate, launch.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
