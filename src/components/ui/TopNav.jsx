// components/shared/TopNav.tsx
"use client"
import { useContext } from "react"
import { ThemeContext } from "../../../context/ThemeContext"
import Link from "next/link"
import { SignedIn, UserButton } from "@clerk/nextjs"
import { ThemeToggleMenu } from "./ThemeToggleMenu"

const TopNav = () => {

  const theme = useContext(ThemeContext);

  return (
    <nav className={`flex items-center justify-between fixed z-50 w-full gap-5 p-6 ${theme.mode === "dark" ? "bg-black text-white" : "bg-white text-black"} text-foreground border-b sm:px-12`}>
      <div className="flex items-center gap-1">
        <Link href="/" className="font-black font-spaceGrotesk text-4xl">
          <span>Next</span>
          <span className="text-orange-600 dark:text-orange-500">Flow</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggleMenu  />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: { avatarBox: "h-10 w-10" },
              variables: { colorPrimary: "#ff7000" },
            }}
          />
        </SignedIn>
      </div>
    </nav>
  )
}

export default TopNav
