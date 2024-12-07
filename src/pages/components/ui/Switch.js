import { cva } from "cva";
import { forwardRef } from "react";

const switchStyles = cva({
  base: "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
  variants: {
    variant: {
      primary: "bg-background border border-primary dark:bg-dark-background",
      secondary: "bg-background border border-secondary dark:bg-dark-background",
      accent: "bg-background border border-accent dark:bg-dark-background"
    },
    state: {
      enabled: "",
      disabled: "opacity-50 cursor-not-allowed"
    }
  },
  defaultVariants: {
    variant: "primary",
    state: "enabled"
  }
});

const thumbStyles = cva({
  base: "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-gray-300 shadow-lg ring-0 transition duration-200 ease-in-out",
  variants: {
    position: {
      on: "translate-x-6",
      off: "translate-x-1"
    }
  },
  defaultVariants: {
    position: "off"
  }
});

const Switch = forwardRef(({
  checked = false,
  onChange,
  disabled = false,
  variant,
  className,
  "aria-label": ariaLabel,
  ...props
}, ref) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
      className={switchStyles({ 
        variant,
        state: disabled ? "disabled" : "enabled",
        className 
      })}
      ref={ref}
      {...props}
    >
      <span className="sr-only">{ariaLabel}</span>
      <span 
        className={thumbStyles({ 
          position: checked ? "on" : "off"
        })} 
      />
    </button>
  );
});

Switch.displayName = "Switch";

export { Switch };
