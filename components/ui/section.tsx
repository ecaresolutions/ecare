import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  padding?: "none" | "sm" | "md" | "lg" | "xl"
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, as: Component = "section", padding = "md", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          {
            "py-0": padding === "none",
            "py-8 sm:py-12": padding === "sm",
            "py-12 sm:py-20": padding === "md",
            "py-16 sm:py-28": padding === "lg",
            "py-24 sm:py-36": padding === "xl",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Section.displayName = "Section"

export { Section }
