import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "nl-focus inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-[color,background-color,border-color,transform] duration-150 ease-[var(--ease-out-quart)] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] motion-reduce:active:scale-100",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover",
        pill: "bg-primary text-primary-foreground rounded-full hover:bg-primary-hover",
        "pill-inverse": "bg-card text-brand-deep rounded-full hover:bg-accent",
        outline:
          "bg-background border border-border text-foreground rounded-lg hover:bg-accent hover:border-cobalt-200",
        ghost:
          "bg-transparent text-muted-foreground rounded-lg hover:text-foreground",
      },
      size: {
        default: "h-auto px-[22px] py-3 text-sm",
        lg: "h-auto px-[30px] py-4 text-base",
        icon: "size-11 shrink-0 rounded-lg p-0",
        "icon-lg": "size-[52px] shrink-0 rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { Button, buttonVariants };
