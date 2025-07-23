import AboutClient from "@/components/Shared/AboutClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NullPointer | About Us",
  description:
    "Learn about NullPointer - A community-driven platform for developers to share knowledge, ask questions, and grow together.",
};

const AboutPage = () => {
  return (
    <div className="w-full h-[calc(100vh-130px)] mt-20 overflow-y-scroll scrollbar-hidden">
      <AboutClient />
    </div>
  );
};

export default AboutPage;
