import { cva } from "cva";

const styles = cva({
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
})

export const Button = ({ children, ...props }) => {
  return <button className={styles({ variant: props.variant, size: props.size }) + " " + props.className} {...props} >{children}</button>;
}
