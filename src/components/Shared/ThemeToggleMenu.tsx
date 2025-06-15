"use client";

import { SunIcon as SolidSun } from "@heroicons/react/24/solid";
import { Laptop, Moon } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

export const ThemeToggleMenu = () => {
  const themeContext = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!themeContext || !themeContext.mounted || !mounted) {
    return (
      <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-8 rounded"></div>
    );
  }
  const { mode, setMode } = themeContext;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  if (!mounted) return null;

  const options = [
    { value: "light", label: "Light", icon: SolidSun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Laptop },
  ];

  const getDotStyle = (value: string) => {
    if (value === "dark")
      return "bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.8)]";
    if (value === "light")
      return "bg-blue-500 shadow-[0_0_8px_2px_rgba(59,130,246,0.7)]";
    return "bg-gray-900 shadow-[0_0_6px_2px_rgba(107,114,128,0.9)]";
  };

  const getIcon = () => {
    const iconProps = "w-5 h-5 text-orange-600";
    if (mode === "light") return <SolidSun className={iconProps} />;
    if (mode === "dark")
      return <Moon className="w-5 h-5 fill-orange-600 stroke-none" />;
    return <Laptop className="w-5 h-5 fill-orange-600 stroke-none" />;
  };

  return (
    <div
      className="relative inline-block text-left font-mono"
      ref={dropdownRef}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md border transition-colors
    ${
      mode === "dark"
        ? "bg-neutral-900 border-gray-500 text-white"
        : "bg-white border-gray-300 text-black"
    }
    hover:shadow-lg
    w-8 h-8 sm:w-10 sm:h-10
  `}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {getIcon()}
      </button>

      {open && (
        <div
          className={`absolute right-0 mt-2 w-36 sm:w-44 rounded-lg sm:rounded-xl shadow-lg z-50 hover:cursor-pointer  
    ${
      mode === "dark"
        ? "bg-neutral-900 text-white border border-neutral-700"
        : "bg-white text-black border border-gray-300"
    }
  `}
          role="menu"
        >
          {options.map(({ value, label, icon: Icon }) => {
            const isSelected = mode === value;
            const iconClass = `w-4 h-4 ${
              isSelected ? "text-orange-600 fill-orange-600 stroke-none" : ""
            }`;
            const labelClass = isSelected ? "text-orange-600 font-medium" : "";

            return (
              <button
                key={value}
                onClick={() => {
                  setMode(value);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2 rounded-md transition-colors
                  hover:bg-muted/30 ${isSelected ? "bg-transparent" : ""}
                `}
                role="menuitem"
              >
                <div className="flex items-center gap-2">
                  <Icon className={iconClass} />
                  <span className={labelClass}>{label}</span>
                </div>
                {isSelected && (
                  <span
                    className={`w-2 h-2 rounded-full ml-4 ${getDotStyle(
                      value
                    )}`}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
