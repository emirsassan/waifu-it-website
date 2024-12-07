import { cva } from "cva";
import { forwardRef } from "react";

const inputStyles = cva({
  base: "rounded-lg border transition-colors duration-200 focus:outline-none",
  variants: {
    variant: {
      default: "border-secondary dark:bg-dark-background text-text dark:text-dark-text focus:border-primary dark:focus:border-dark-primary",
    },
    size: {
      sm: "px-2 py-1.5 text-sm",
      md: "px-2 py-2",
      lg: "px-2 py-3 text-lg"
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800",
    },
    full: {
      true: "w-full"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    disabled: false,
    full: false
  }
});

const Input = forwardRef(({
  className,
  variant,
  size,
  error,
  disabled,
  full,
  type = "text",
  ...props
}, ref) => {
  // override variant 
  const finalVariant = error ? "error" : variant;

  return (
    <input
      ref={ref}
      type={type}
      className={inputStyles({ 
        variant: finalVariant, 
        size,
        disabled,
        full,
        className 
      })}
      disabled={disabled}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
