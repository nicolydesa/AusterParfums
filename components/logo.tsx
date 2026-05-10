import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  linkTo?: string
}

export function Logo({ size = "md", linkTo = "/" }: LogoProps) {
  const sizes = {
    sm: { icon: "w-7 h-7", text: "text-lg", leaf: "w-3.5 h-3.5" },
    md: { icon: "w-9 h-9", text: "text-xl", leaf: "w-4 h-4" },
    lg: { icon: "w-12 h-12", text: "text-2xl", leaf: "w-5 h-5" },
  }

  const { icon, text, leaf } = sizes[size]

  const LogoContent = () => (
    <div className="flex items-center gap-2.5">
      {/* Logo Icon - Stylized leaf/drop shape */}
      <div className={`${icon} relative`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Main drop/leaf shape */}
          <path
            d="M20 4C20 4 8 16 8 24C8 30.627 13.373 36 20 36C26.627 36 32 30.627 32 24C32 16 20 4 20 4Z"
            className="fill-primary"
          />
          {/* Inner leaf vein */}
          <path
            d="M20 12C20 12 14 20 14 25C14 28.314 16.686 31 20 31"
            className="stroke-primary-foreground/60"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Small accent */}
          <circle
            cx="17"
            cy="18"
            r="2"
            className="fill-primary-foreground/40"
          />
        </svg>
      </div>
      {/* Brand Name */}
      <span className={`font-serif ${text} font-semibold text-foreground tracking-tight`}>
        Verdara
      </span>
    </div>
  )

  if (linkTo) {
    return (
      <Link href={linkTo} className="flex items-center">
        <LogoContent />
      </Link>
    )
  }

  return <LogoContent />
}
