import AboutClient from "@/components/Shared/AboutClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About NullPointer | Developer Community Platform",
  description:
    "Learn about NullPointer, the premier developer community platform. Discover our mission to connect programmers, share knowledge, and build the future of software development together.",
  keywords: [
    "about nullpointer",
    "developer community",
    "programming platform",
    "software development",
    "tech community",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

const AboutPage = () => {
  return (
    <div className="w-full h-[calc(100vh-130px)] overflow-y-scroll scrollbar-hidden">
      <AboutClient />
    </div>
  );
};

export default AboutPage;
