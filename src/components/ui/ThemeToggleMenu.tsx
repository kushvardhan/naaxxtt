"use client"

import React, { useState, useContext, useEffect, useRef } from "react"
import { Sun, Moon, Laptop } from "lucide-react"
import { ThemeContext } from "../../../context/ThemeContext"

export const ThemeToggleMenu = () => {
  const themeContext = useContext(ThemeContext)
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  if (!themeContext) return null
  const { mode, setMode } = themeContext

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setMounted(true)
  }, [])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  if (!mounted) return null

  const options = [
    { value: "light", label: "Light", icon: <Sun className="w-4 h-4" /> },
    { value: "dark", label: "Dark", icon: <Moon className="w-4 h-4" /> },
    { value: "system", label: "System", icon: <Laptop className="w-4 h-4" /> },
  ]

  const currentIcon = () => {
    if (mode === "light") return <Sun className="w-5 h-5" />
    if (mode === "dark") return <Moon className="w-5 h-5" />
    return <Laptop className="w-5 h-5" />
  }

  const getDotStyle = (value: string) => {
    if (value === "dark")
      return "bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.8)]"
    if (value === "light")
      return "bg-blue-500 shadow-[0_0_8px_2px_rgba(59,130,246,0.8)]"
    return "bg-gray-900 shadow-[0_0_6px_2px_rgba(107,114,128,0.9)]"
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className={`
          p-2 rounded-xl flex items-center justify-center
          shadow-md border transition-colors
          ${mode === "dark" ? "bg-neutral-900 border-gray-500 text-white" : "bg-white border-gray-300 text-black"}
          hover:shadow-lg
        `}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {currentIcon()}
      </button>

      {open && (
        <div
          className={`
            absolute right-0 mt-2 w-44 rounded-xl shadow-lg z-50
            ${mode === "dark"
              ? "bg-neutral-900 text-white border border-neutral-700"
              : "bg-white text-black border border-gray-300"}
          `}
          role="menu"
        >
          {options.map(({ value, label, icon }) => {
            const isSelected = mode === value
            return (
              <button
                key={value}
                onClick={() => {
                  setMode(value)
                  setOpen(false)
                }}
                className={`
                  w-full flex items-center justify-between px-4 py-2 rounded-md
                  transition-colors hover:bg-muted/30
                  ${isSelected ? "bg-transparent" : ""}
                `}
                role="menuitem"
              >
                <div className="flex items-center gap-2">
                  {icon}
                  <span>{label}</span>
                </div>
                {isSelected && (
                  <span className={`w-2 h-2 rounded-full ml-4 ${getDotStyle(value)}`} />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
