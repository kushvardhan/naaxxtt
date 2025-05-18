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
import { ThemeContext } from "../../../context/ThemeContext";

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
        <MenubarTrigger className="p-2 rounded hover:bg-muted">
          {renderIcon()}
        </MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value={mode} onValueChange={setMode}>
            <MenubarRadioItem value="light" className="flex gap-2 items-center">
              <Sun className="w-4 h-4" /> Light
            </MenubarRadioItem>
            <MenubarRadioItem value="dark" className="flex gap-2 items-center">
              <Moon className="w-4 h-4" /> Dark
            </MenubarRadioItem>
            <MenubarRadioItem value="system" className="flex gap-2 items-center">
              <Laptop className="w-4 h-4" /> System
            </MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
