import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { generateMetadata } from "../../../../lib/seo";
import ProfileClient from "@/components/Shared/ProfileClient";
import { getUserById } from "../../../../lib/actions/user.action";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";

export const metadata: Metadata = generateMetadata({
  title: "My Profile",
  description: "Manage your NullFlow profile, view your activity, and customize your developer experience.",
  keywords: ["profile", "user dashboard", "developer profile", "account settings", "user activity"],
  url: "/profile"
});

export default async function ProfilePage() {
  try {
    const user = await currentUser();
    
    if (!user) {
      redirect("/sign-in");
    }

    // Get user data from database
    const userInfo = await getUserById({ userId: user.id });
    
    if (!userInfo) {
      redirect("/sign-in");
    }

    return (
      <div className="flex w-full flex-col">
        <ProfileClient userInfo={userInfo} />
      </div>
    );
  } catch (error) {
    console.error("Error in profile page:", error);
    redirect("/sign-in");
  }
}
