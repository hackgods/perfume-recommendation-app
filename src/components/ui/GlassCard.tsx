import * as React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hover = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "glass-card",
        hover && "glass-card-hover",
        className
      )}
      {...props}
    />
  )
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
