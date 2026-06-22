import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm",
        destructive: "bg-error text-error-btn-foreground hover:bg-error/90 shadow-sm",
        outline: "border border-border bg-background hover:bg-muted hover:text-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover shadow-sm",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        glow: "relative p-[1px] overflow-hidden rounded-full inline-flex items-center justify-center cursor-pointer select-none active:scale-[0.98] transition-transform duration-150",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    if (variant === "glow") {
      if (asChild) {
        const child = React.Children.only(props.children) as React.ReactElement<{ className?: string; children?: React.ReactNode }>
        return React.cloneElement(
          child,
          {
            className: cn(buttonVariants({ variant, size, className }), "!rounded-full !p-[1.5px]", child.props.className),
            ref,
            ...props,
            children: undefined,
          } as any,
          <>
            <span className="absolute top-1/2 left-1/2 w-[250%] aspect-square -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg,transparent_50%,var(--color-primary)_60%,var(--color-accent)_70%,transparent_80%)]" />
            <span className={cn(
              "inline-flex h-full w-full items-center justify-center gap-2 rounded-full bg-background text-sm font-medium text-foreground backdrop-blur-3xl transition-colors duration-200 hover:bg-muted/50",
              size === "sm" && "px-4 py-1.5",
              size === "lg" && "px-8 py-2.5",
              (size === "default" || !size) && "px-6 py-2"
            )}>
              {child.props.children}
            </span>
          </>
        )
      }
      return (
        <button
          className={cn(buttonVariants({ variant, size, className }), "!rounded-full !p-[1.5px]")}
          ref={ref}
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          <span className="absolute top-1/2 left-1/2 w-[250%] aspect-square -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg,transparent_50%,var(--color-primary)_60%,var(--color-accent)_70%,transparent_80%)]" />
          <span className={cn(
            "inline-flex h-full w-full items-center justify-center gap-2 rounded-full bg-background text-sm font-medium text-foreground backdrop-blur-3xl transition-colors duration-200 hover:bg-muted/50",
            size === "sm" && "px-4 py-1.5",
            size === "lg" && "px-8 py-2.5",
            (size === "default" || !size) && "px-6 py-2"
          )}>
            {props.children}
          </span>
        </button>
      )
    }
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
