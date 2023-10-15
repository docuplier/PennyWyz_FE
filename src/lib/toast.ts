import { TypeOptions, toast } from "react-toastify";

export type VToastProps = {
  title?: string;
  subText?: string;
  actionText?: string;
  action?: VoidFunction;
  type?: TypeOptions;
};

export const showToast = ({
  title,
  subText,
  type = "success",
  actionText,
  action,
}: VToastProps) => {
  // Map 'delete' type to 'warning' type

  //   const IconComponent = toasticons[type];

  return toast(title, {
    type,
  });
};
