"use client"

import Link from "next/link"
import React from "react"

interface MetricProps {
  icon: React.ReactNode; // Now supports JSX icons like <Clock />
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
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
  const metricContent = (
    <>
      <span
        className="w-5 h-5 flex items-center justify-center text-orange-500"
        aria-label={alt}
        title={alt}
      >
        {icon}
      </span>

      <p className={`${textStyles} flex items-center justify-between gap-1`}>
        {value}
        <span
          className={`small-regular line-clamp-1 ${isAuthor ? "max-sm:hidden" : ""}`}
        >
          {title}
        </span>
      </p>
    </>
  )

  if (href) {
    return (
      <Link href={href} className="flex justify-between items-center gap-1">
        {metricContent}
      </Link>
    )
  }

  return <div className="flex items-center justify-between flex-wrap gap-1">{metricContent}</div>
}

export default Metric
