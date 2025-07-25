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
  title: "NullFlow",
  description:
    "NullFlow is a developer community platform focused on solving coding problems and debugging efficiently. It connects programmers to share knowledge, find practical solutions, and collaborate to overcome coding challenges.",
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
