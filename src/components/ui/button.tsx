import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
} from "@/components/animate-ui/primitives/buttons/button"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[12px] text-sm font-medium transition-[box-shadow,_color,_background-color,_border-color] cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-[#c9184a] text-white hover:bg-[#c9184a]/90 hover:shadow-lg",
        primary: "bg-[#c9184a] text-white hover:bg-[#c9184a]/90 hover:shadow-lg",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline:
          "border border-white/40 bg-white/10 backdrop-blur-sm shadow-xs hover:bg-white/20 hover:text-foreground",
        secondary:
          "border border-white/40 bg-white/10 backdrop-blur-sm text-foreground hover:bg-white/20 hover:shadow-md",
        ghost:
          "hover:bg-white/10 hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-[12px] gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 rounded-[12px] px-8 text-base has-[>svg]:px-6",
        icon: "size-9 rounded-[12px]",
        "icon-sm": "size-8 rounded-[12px]",
        "icon-lg": "size-10 rounded-[12px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = ButtonPrimitiveProps &
  VariantProps<typeof buttonVariants> & {
    hoverScale?: number
    tapScale?: number
  }

function Button({
  className,
  variant = "default",
  size = "default",
  hoverScale = 1.02,
  tapScale = 0.95,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      hoverScale={hoverScale}
      tapScale={tapScale}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
