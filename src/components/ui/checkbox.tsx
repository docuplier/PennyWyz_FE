import { ChangeEventHandler } from "react";
import styles from "./checkbox.module.css";

export type CheckboxProps = {
  id: string;
  onChange?: ChangeEventHandler;
  checked?: boolean;
};

export const CheckBox = ({ id, onChange, checked = false }: CheckboxProps) => {
  return (
    <div className={styles.checkbox}>
      <input type="checkbox" id={id} onChange={onChange} checked={checked} />
      <label htmlFor={id}></label>
    </div>
  );
};
