import { ReactNode } from "react";

export type TypographyType = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "span";
  text: string | ReactNode;
  size?: number;
  className?: string;
};

export const Typography = ({
  as = "p",
  text,
  size = 14,
  className,
}: TypographyType) => {
  const Comp = as;

  return (
    <Comp className={className} style={{ fontSize: `${size / 16}rem` }}>
      {text}
    </Comp>
  );
};
