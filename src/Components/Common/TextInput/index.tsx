import { InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

const TextInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className={classNames(styles.inputContainer, props.className)}>
      <input
        {...props}
        className={classNames(styles.input)}
        type={props.type || "text"}
        placeholder=""
      />
      <label className={styles.label}>{props.placeholder}</label>
    </div>
  );
};

export default TextInput;
