"use client"

import { useState } from "react"

type BrandLogoThumbProps = {
  name: string
  logoUrl: string
  size?: number
  className?: string
}

/** Rounded logo from URL with initials fallback if the image fails to load. */
export function BrandLogoThumb({ name, logoUrl, size = 56, className = "" }: BrandLogoThumbProps) {
  const [failed, setFailed] = useState(false)

  if (failed || !logoUrl?.trim()) {
    return (
      <span className={`font-serif font-semibold text-lg ${className}`}>
        {name.slice(0, 2).toUpperCase()}
      </span>
    )
  }

  return (
    <img
      src={logoUrl}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      referrerPolicy="no-referrer"
      className={`object-contain ${className}`}
      onError={() => setFailed(true)}
    />
  )
}
