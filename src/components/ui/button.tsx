import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-base font-medium whitespace-nowrap tracking-normal transition-all duration-150 ease-out outline-none select-none focus-visible:outline-2 focus-visible:outline-brand-red focus-visible:outline-offset-2 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-linear-to-b from-brand-red to-brand-red-hover text-white shadow-[0_4px_14px_rgba(222,3,2,0.22)] outline-2 -outline-offset-2 outline-white/20 hover:from-brand-red-hover hover:to-brand-red-hover hover:bg-brand-red-hover hover:shadow-[0_6px_20px_rgba(222,3,2,0.32)]",
        outline:
          "border border-black/[0.12] bg-white text-brand-navy hover:bg-neutral-100 hover:text-brand-navy shadow-xs",
        secondary:
          "bg-neutral-100 text-brand-navy hover:bg-neutral-200 border border-black/[0.04]",
        ghost:
          "text-brand-navy hover:text-brand-red hover:bg-red-10/40",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40",
        link: "text-brand-red underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-11 min-h-[44px] sm:h-12 sm:min-h-[48px] gap-2 px-6 sm:px-7 text-sm sm:text-base font-medium",
        xs: "h-8 min-h-[32px] gap-1.5 px-3.5 text-xs font-medium",
        sm: "h-10 min-h-[40px] gap-2 px-5 text-sm font-medium",
        lg: "h-12 min-h-[48px] gap-2.5 px-7 text-base font-medium",
        icon: "size-10 min-h-[40px] min-w-[40px] rounded-full",
        "icon-xs": "size-8 rounded-full",
        "icon-sm": "size-9 rounded-full",
        "icon-lg": "size-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
