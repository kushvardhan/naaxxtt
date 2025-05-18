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

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: globalThis.MouseEvent) {
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
            absolute right-0 mt-2 w-42 rounded-xl shadow-lg
            ${mode === "dark" ? "bg-neutral-900 text-white border border-neutral-700" : "bg-white text-black border border-gray-300"}
            z-50
          `}
          role="menu"
        >
          {options.map(({ value, label, icon }) => (
            <button
              key={value}
              onClick={() => {
                setMode(value)
                setOpen(false)
              }}
              className={`
                w-full flex items-center gap-2 px-4 py-2 text-left rounded-md
                transition-colors
                ${mode === value
                  ? mode === "dark"
                    ? "bg-neutral-700"
                    : "bg-gray-200"
                  : "hover:bg-muted/30"}
              `}
              role="menuitem"
            >
              {icon}
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
