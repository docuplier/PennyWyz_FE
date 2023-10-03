import styles from "./checkbox.module.css";

export type CheckboxProps = {
  id: string;
};

export const CheckBox = ({ id }: CheckboxProps) => {
  return (
    <div className={styles.checkbox}>
      <input type="checkbox" id={id} />
      <label htmlFor={id}></label>
    </div>
  );
};
