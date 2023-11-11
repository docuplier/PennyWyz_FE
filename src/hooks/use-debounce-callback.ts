import React, { useRef } from "react";

export const useDebouceCallback = () => {
  const ref = useRef<any | undefined>();

  const debounce = ({
    callback,
    time = 500,
  }: {
    callback: VoidFunction;
    time?: number;
  }) => {
    clearTimeout(ref?.current);
    ref.current = setTimeout(() => {
      callback?.();
    }, time);
  };

  return {
    debounce,
  };
};
