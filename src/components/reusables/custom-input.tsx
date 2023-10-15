import { Label } from "@radix-ui/react-label";
import { Input, InputProps } from "../ui/input";
import { Typography } from "../ui/typography";

export type CustomInputProps = {
  label?: string;
  register?: any;
  errorMessage?: string;
  rules?: any;
} & InputProps;

export const CustomInput = ({
  label,
  errorMessage,
  ...rest
}: CustomInputProps) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {label && (
        <Label htmlFor={rest?.id} className="text-[14px] !font-light">
          {label}
        </Label>
      )}
      <Input {...rest} />
      {errorMessage && (
        <Typography
          size={12}
          className="font-light  text-pennywyz-red mt-[-6px]"
          text={errorMessage ? (errorMessage as string) : " "}
        />
      )}
    </div>
  );
};
