"use client"

import React, { useContext } from "react"
import Link from "next/link";
import { ThemeContext } from "../../../context/ThemeContext";

interface MetricProps {
  icon: React.ReactNode
  alt: string
  value: string | number
  title: string
  href?: string
  textStyles?: string
  isAuthor?: boolean
}

const Metric = ({
  icon,
  alt,
  value,
  title,
  href,
  textStyles,
  isAuthor,
}: MetricProps) => {
  const theme = useContext(ThemeContext);
  const isDark = theme?.mode === "dark"

  const metricContent = (
    <div className="flex items-center gap-2">
      <span
        className={`w-5 h-5 flex items-center justify-center ${
          isDark ? "text-orange-500" : "text-orange-600"
        }`}
        title={alt}
      >
        {icon}
      </span>

      <p className={`${textStyles} flex items-center gap-1`}>
        {value}
        <span className={`small-regular line-clamp-1 ${isAuthor ? "max-sm:hidden" : ""}`}>
          {title}
        </span>
      </p>
    </div>
  )

  if (href) {
    return <Link href={href}>{metricContent}</Link>
  }

  return metricContent
}

export default Metric
