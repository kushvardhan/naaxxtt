"use client"

import React, { useState, useContext, useEffect, useRef } from "react"
import { Moon, Laptop } from "lucide-react"
import { SunIcon as SolidSun } from "@heroicons/react/24/solid"
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
    { value: "light", label: "Light", icon: SolidSun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Laptop },
  ]

const getDotStyle = (value: string) => {
  if (value === "dark")
    return "bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.8)]"
  if (value === "light")
    return "bg-orange-500 shadow-[0_0_8px_2px_rgba(249,115,22,0.7)]"
  return "bg-gray-900 shadow-[0_0_6px_2px_rgba(107,114,128,0.9)]"
}


  const getIcon = () => {
    const iconProps = "w-5 h-5 text-orange-600"
    if (mode === "light") return <SolidSun className={iconProps} />
    if (mode === "dark") return <Moon className="w-5 h-5 fill-orange-600 stroke-none" />
    return <Laptop className="w-5 h-5 fill-orange-600 stroke-none" />
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
        {getIcon()}
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
          {options.map(({ value, label, icon: Icon }) => {
            const isSelected = mode === value
            const iconClass = `w-4 h-4 ${isSelected ? "text-orange-600 fill-orange-600 stroke-none" : ""}`
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
                  <Icon className={iconClass} />
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
