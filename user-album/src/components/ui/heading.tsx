import { cn } from "../../lib/utils"
import { type VariantProps, cva } from "class-variance-authority"
import { type HTMLAttributes, forwardRef } from "react"

const headingVariants = cva("font-bold leading-tight tracking-tighter", {
  variants: {
    size: {
      "4xl": "text-4xl md:text-5xl lg:text-6xl",
      "3xl": "text-3xl md:text-4xl lg:text-5xl",
      "2xl": "text-2xl md:text-3xl lg:text-4xl",
      xl: "text-xl md:text-2xl lg:text-3xl",
      lg: "text-lg md:text-xl lg:text-2xl",
      default: "text-base md:text-lg lg:text-xl",
      sm: "text-sm md:text-base lg:text-lg",
      xs: "text-xs md:text-sm lg:text-base",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(({ className, size, as = "h2", ...props }, ref) => {
  const Comp = as
  return <Comp ref={ref} className={cn(headingVariants({ size, className }))} {...props} />
})
Heading.displayName = "Heading"

export { Heading, headingVariants }
