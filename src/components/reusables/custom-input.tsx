import { Label } from "@radix-ui/react-label";
import { Input, InputProps } from "../ui/input";

export type CustomInputProps = {
  label?: string;
} & InputProps;

export const CustomInput = ({ label, ...rest }: CustomInputProps) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {label && (
        <Label htmlFor={rest?.id} className="text-[14px] !font-light">
          {label}
        </Label>
      )}
      <Input {...rest} />
    </div>
  );
};
