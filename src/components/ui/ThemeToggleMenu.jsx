// components/shared/ThemeToggleMenu.tsx
"use client"

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarRadioGroup,
  MenubarRadioItem,
} from "./menubar"
import { useContext, useEffect, useState } from "react"
import { Laptop, Moon, Sun } from "lucide-react"
import { ThemeContext } from "../../../context/ThemeContext"

export const ThemeToggleMenu = () => {
  const themeContext = useContext(ThemeContext)
  const [mounted, setMounted] = useState(false)

  if (!themeContext) return null
  const { mode, setMode } = themeContext

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const renderIcon = () => {
    if (mode === "light") return <Sun className="w-5 h-5" />
    if (mode === "dark") return <Moon className="w-5 h-5" />
    return <Laptop className="w-5 h-5" />
  }

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger
          className={`
            p-2 rounded-xl transition-colors border 
            shadow-sm 
            ${mode === "dark" 
              ? "bg-neutral-800 text-white " 
              : "bg-gray-100 text-black"}
          `}
        >
          {renderIcon()}
        </MenubarTrigger>

        <MenubarContent
          className={`mt-2 rounded-xl shadow-lg p-2 border 
            ${mode === "dark" 
              ? "bg-neutral-900 text-white border-neutral-700" 
              : "bg-white text-black border-gray-300"}
          `}
        >
          <MenubarRadioGroup value={mode} onValueChange={setMode}>
            <MenubarRadioItem
              value="light"
              className="flex gap-2 items-center px-3 py-2 rounded-md hover:bg-muted/30"
            >
              <Sun className="w-4 h-4" /> Light
            </MenubarRadioItem>
            <MenubarRadioItem
              value="dark"
              className="flex gap-2 items-center px-3 py-2 rounded-md hover:bg-muted/30"
            >
              <Moon className="w-4 h-4" /> Dark
            </MenubarRadioItem>
            <MenubarRadioItem
              value="system"
              className="flex gap-2 items-center px-3 py-2 rounded-md hover:bg-muted/30"
            >
              <Laptop className="w-4 h-4" /> System
            </MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
