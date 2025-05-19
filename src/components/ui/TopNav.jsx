"use client"

import { useContext } from "react"
import { ThemeContext } from "../../../context/ThemeContext"
import Link from "next/link"
import { SignedIn, UserButton } from "@clerk/nextjs"
import { ThemeToggleMenu } from "./ThemeToggleMenu.tsx"
import MobileNav from "./MobileNav.tsx"

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

      <div className="flex items-center gap-4 font-mono">
        <ThemeToggleMenu />
<SignedIn>
  <UserButton
    afterSignOutUrl="/"
    appearance={{
      elements: {
        userButtonAvatarBox: `h-14 w-14 rounded-full overflow-hidden shadow-sm shadow-white/20 ${
          theme.mode === 'dark' ? 'bg-zinc-800 text-white shadow-lg shadow-yellow-700 border-1 border-zinc-500' : 'bg-zinc-200 text-black'
        }`,
        userButtonAvatarImage: `object-cover`,
      },
      variables: {
        colorPrimary: "#ff7000",
      },
    }}
  />
</SignedIn>
    <MobileNav/>
      </div>
    </nav>
  )
}

export default TopNav
