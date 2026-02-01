import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BUILDRIFT - Proof of Real Builders",
  description: "Convert Web3 events into verifiable builder reputation. Not just attendance.",
  keywords: ["Web3", "events", "builders", "reputation", "verification", "hackathon", "developer"],
  authors: [{ name: "BUILDRIFT" }],
  creator: "BUILDRIFT",
  publisher: "BUILDRIFT",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://buildrift.com",
    title: "BUILDRIFT - Proof of Real Builders",
    description: "Convert Web3 events into verifiable builder reputation. Not just attendance.",
    siteName: "BUILDRIFT",
  },
  twitter: {
    card: "summary_large_image",
    title: "BUILDRIFT - Proof of Real Builders",
    description: "Convert Web3 events into verifiable builder reputation. Not just attendance.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
