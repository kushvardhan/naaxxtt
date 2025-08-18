import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import Providers from "../../lib/Providers";
import { generateMetadata } from "../../lib/seo";
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

export const metadata: Metadata = generateMetadata({
  title: "Developer Q&A Community",
  description:
    "NullFlow is a modern, feature-rich Q&A platform for developers. Ask questions, share knowledge, and build your coding career with our vibrant community.",
  keywords: [
    "programming",
    "developer community",
    "Q&A",
    "coding help",
    "debugging",
    "software development",
    "null pointer",
    "stack overflow alternative",
  ],
});

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
        <meta
          name="developer"
          content="Kush Vardhan - kushvardhan39797@gmail.com"
        />
        <meta name="author" content="Kush Vardhan" />
        <meta name="contact" content="kushvardhan39797@gmail.com" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="canonical" href="https://nullflow.vercel.app" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateJsonLd(structuredData.website)}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateJsonLd(structuredData.organization)}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
        suppressHydrationWarning
      >
        <div suppressHydrationWarning>
          <Providers>{children}</Providers>

          {/* Developer Credit Footer */}
          <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-4 mt-auto">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Developed with ❤️ by{" "}
                <a
                  href="mailto:kushvardhan39797@gmail.com"
                  className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
                >
                  Kush Vardhan
                </a>{" "}
                • © 2024 NullFlow. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
