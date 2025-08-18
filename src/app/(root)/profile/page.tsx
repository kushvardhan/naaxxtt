import ProfileClient from "@/components/Shared/ProfileClient";
import { currentUser } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUserInfo } from "../../../../lib/actions/user.action";
import { generateMetadata } from "../../../../lib/seo";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";

export const metadata: Metadata = generateMetadata({
  title: "My Profile",
  description:
    "Manage your NullFlow profile, view your activity, and customize your developer experience.",
  keywords: [
    "profile",
    "user dashboard",
    "developer profile",
    "account settings",
    "user activity",
  ],
  url: "/profile",
});

export default async function ProfilePage() {
  try {
    const user = await currentUser();

    if (!user) {
      redirect("/sign-in");
    }

    // Get user data from database
    const userInfo = await getUserInfo({ userId: user.id });

    if (!userInfo || !userInfo.user) {
      redirect("/sign-in");
    }

    // Map the data to match ProfileClient interface
    const profileData = {
      user: {
        _id: userInfo.user._id.toString(),
        clerkId: userInfo.user.clerkId,
        name: userInfo.user.name,
        username: userInfo.user.username,
        email: userInfo.user.email,
        image: userInfo.user.image,
        about: userInfo.user.about,
        location: userInfo.user.location,
        portfolioWebsite: userInfo.user.portfolioWebsite,
        reputation: userInfo.user.reputation,
        joinedAt: userInfo.user.joinedAt.toISOString(),
      },
      totalQuestions: userInfo.totalQuestions,
      totalAnswers: userInfo.totalAnswers,
      badges: userInfo.badgeCounts,
      reputation: userInfo.reputation,
    };

    return (
      <div className="w-full h-[calc(100vh-120px)] mt-20 overflow-y-scroll scrollbar-hidden flex flex-col">
        <ProfileClient userInfo={profileData} />
      </div>
    );
  } catch (error) {
    console.error("Error in profile page:", error);
    redirect("/sign-in");
  }
}
