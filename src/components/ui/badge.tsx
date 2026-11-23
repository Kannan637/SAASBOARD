import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-tight whitespace-nowrap shrink-0 transition-colors select-none [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-brand-navy text-white shadow-2xs",
        secondary:
          "border-black/[0.06] bg-neutral-100 text-brand-navy",
        outline:
          "border-black/[0.1] bg-white/90 text-brand-navy backdrop-blur-xs",
        success:
          "border-emerald-500/25 bg-emerald-500/12 text-emerald-700",
        info:
          "border-sky-500/25 bg-sky-500/12 text-sky-700",
        warning:
          "border-orange-500/25 bg-orange-500/12 text-orange-700",
        live:
          "border-red-500/30 bg-red-600 text-white shadow-2xs",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
