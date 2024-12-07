import { cva } from "cva";

const buttonStyles = cva({
  base: "relative overflow-hidden rounded-lg transition duration-300 ease-in-out",
  variants: {
    variant: {
      primary: "bg-primary dark:bg-dark-primary text-dark-text dark:text-dark-background",
      secondary: "hover:bg-secondary dark:hover:bg-dark-accent text-text dark:text-dark-text"
    },
    size: {
      md: "py-2 px-8",
      lg: "py-3 px-12"
    }
  },
  defaultVariants: {
    variant: "primary",
    size: "md"
  }
});

export const Button = ({ 
  children, 
  variant,
  size,
  className,
  ...props 
}) => {
  const classes = buttonStyles({ 
    variant, 
    size,
    className 
  });

  return (
    <button 
      className={classes} 
      {...props}
    >
      {children}
    </button>
  );
};
