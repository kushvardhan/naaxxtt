import AboutClient from "@/components/Shared/AboutClient";
import type { Metadata } from "next";
import { generateMetadata } from "../../../../lib/seo";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";

export const metadata: Metadata = generateMetadata({
  title: "About NullFlow",
  description:
    "Learn about NullFlow - the modern Q&A platform for developers. Discover our mission, features, and meet the developer behind this innovative community platform.",
  keywords: [
    "about nullflow",
    "developer platform",
    "Q&A community",
    "Kush Vardhan",
    "developer tools",
    "coding community",
  ],
  url: "/about",
});

const AboutPage = () => {
  return (
    <div className="w-full h-[calc(100vh-130px)] overflow-y-scroll scrollbar-hidden">
      <AboutClient />
    </div>
  );
};

export default AboutPage;
