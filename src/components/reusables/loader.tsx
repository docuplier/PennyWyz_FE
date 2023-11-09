import { cx } from "class-variance-authority";
import React from "react";
import { Typography } from "../ui/typography";

export const Loader = ({
  color = "orange",
  fullWidth = false,
  className,
  loaderText,
}: {
  color?: string;
  fullWidth?: boolean;
  className?: string;
  loaderText?: string;
}) => {
  return (
    <div
      className={cx(
        "py-[5px] flex items-center justify-center flex-col gap-[20px]",
        fullWidth && "h-full",
        className
      )}
    >
      <span
        className="bigPageLoader"
        style={{ "--color": color } as any}
      ></span>
      {loaderText && (
        <Typography text={loaderText} size={14} className="font-bold" />
      )}
    </div>
  );
};
