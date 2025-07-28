import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import Providers from "../../lib/Providers";
import "../../style/prism.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NullFlow | Developer Q&A Community",
  description:
    "NullFlow is a developer community platform focused on solving coding problems and debugging efficiently. It connects programmers to share knowledge, find practical solutions, and collaborate to overcome coding challenges.",
  keywords: [
    "programming",
    "developer community",
    "Q&A",
    "coding help",
    "software development",
    "debugging",
    "null pointer",
    "stack overflow alternative",
  ],
  authors: [{ name: "NullFlow Team" }],
  creator: "NullFlow",
  publisher: "NullFlow",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.svg", sizes: "16x16", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
          suppressHydrationWarning
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
        suppressHydrationWarning
      >
        <div suppressHydrationWarning>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
