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
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Laptop, Moon, Sun } from "lucide-react"

export const ThemeToggleMenu = () => {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const renderIcon = () => {
    if (resolvedTheme === "light") return <Sun className="w-5 h-5" />
    if (resolvedTheme === "dark") return <Moon className="w-5 h-5" />
    return <Laptop className="w-5 h-5" />
  }

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="p-2 rounded hover:bg-muted">
          {renderIcon()}
        </MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value={theme} onValueChange={setTheme}>
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
