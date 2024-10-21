import { ComponentPropsWithRef, ReactNode } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center dark:text-white whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-zinc-300",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90",
        destructive:
          "bg-red-500 text-zinc-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90",
        outline:
          "border border-zinc-200 bg-white shadow-sm hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
        secondary:
          "bg-zinc-100 text-zinc-900 shadow-sm hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80",
        ghost: "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
        link: "text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50",

        primary:
          "bg-blue-600 hover:bg-blue-700 text-blue-100 hover:text-white",
        warning:
          "bg-yellow-500 hover:bg-yellow-600 text-orange-100 hover:text-white",
        danger:
          "bg-red-500 hover:bg-red-600 text-orange-100 hover:text-white",
        inverse:
          "bg-gray-600 hover:bg-gray-700 text-blue-100 hover:text-white",
        success:
          "bg-green-600 hover:bg-green-700 text-teal-100 hover:text-white",
        purple:
          "bg-indigo-700 hover:bg-indigo-800 text-white",
        // default:
        //   "bg-gray-500 hover:bg-gray-600",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        smallIcon: "h-6 w-6 p-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = ComponentPropsWithRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    children: ReactNode;
  };

const Button = ({
  children,
  className,
  variant,
  type = "button",
  size,
  ...rest
}: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} type={type} {...rest}>
      {children}
    </button>
  );
};

Button.displayName = "Button"

export { Button, buttonVariants }
