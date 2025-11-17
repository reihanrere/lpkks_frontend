"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import type { VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./button-variants"
import { OrbitalLoader } from "@/components/ui/orbital-loader";
import { Spinner } from "@/components/ui/spinner";

function Button({
                  className,
                  variant,
                  size,
                  asChild = false,
                  isLoading = false,
                  children,
                  disabled,
                  ...props
                }: React.ComponentProps<"button"> &
                  VariantProps<typeof buttonVariants> & {
                  asChild?: boolean
                  isLoading?: boolean
                }
) {

  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size }),
        "relative flex items-center justify-center", // ensure center
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Spinner className={"size-[20px]"} />
          <span className="text-foreground/70">{children}</span>
        </div>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button }
export { buttonVariants }
