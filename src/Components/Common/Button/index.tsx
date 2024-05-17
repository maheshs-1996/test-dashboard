import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

export type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  name: string;
  icon?: JSX.Element | JSX.Element[];
  iconPosition?: "left" | "right";
  variant?: "primary" | "secondary";
};

const Button = ({
  name,
  icon,
  className,
  iconPosition = "left",
  variant = "primary",
  ...rest
}: BtnProps) => {
  return (
    <button
      className={classNames(styles.button, className, styles[variant])}
      {...rest}
    >
      {icon && iconPosition === "left" ? icon : null}
      {name}
      {icon && iconPosition === "right" ? icon : null}
    </button>
  );
};

export default Button;
