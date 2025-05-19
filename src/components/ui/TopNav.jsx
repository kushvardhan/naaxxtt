"use client"

import { useContext } from "react"
import { ThemeContext } from "../../../context/ThemeContext"
import Link from "next/link"
import { SignedIn, UserButton } from "@clerk/nextjs"
import { ThemeToggleMenu } from "./ThemeToggleMenu.tsx"

const TopNav = () => {
  const theme = useContext(ThemeContext)

  return (
    <nav
      className={`flex items-center justify-between fixed z-50 w-full gap-5 p-6 border-b sm:px-12 transition-colors ${
        theme.mode === "dark"
          ? "bg-zinc-900 text-white"
          : "bg-white text-black"
      }`}
    >
      <div className="flex items-center gap-1">
        <Link href="/" className="font-black font-mono font-spaceGrotesk text-4xl">
          <span>Next</span>
          <span className="text-orange-600 dark:text-orange-500">Flow</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggleMenu />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10 shadow-sm shadow-white/20 dark:shadow-white/30",
              },
              variables: { colorPrimary: "#ff7000" },
            }}
          />
        </SignedIn>
      </div>
    </nav>
  )
}

export default TopNav
