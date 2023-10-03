import { Button } from "#/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "#/components/ui/dialog";
import { useDialogProps } from "#/hooks/use-dialog";
import { cn } from "#/lib/utils";
import { cva } from "class-variance-authority";
import { ReactNode } from "react";

type CustomDialogType = {
  dialogFooter?: ReactNode;
  children: ReactNode;
  trigger?: ReactNode;
  dialogHeader?: string;
  open: boolean;
  handleClose: () => void;
  className?: string;
  bodyClassName?: string;
  size?: "sm" | "lg";
};

const dialogVariants = cva("", {
  variants: {
    size: {
      sm: "max-w-[350px]",
      lg: "",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export const CustomDialog = ({
  dialogFooter,
  children,
  trigger,
  dialogHeader,
  open,
  handleClose,
  className,
  bodyClassName,
  size,
}: CustomDialogType) => {
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={cn(
          "sm:max-w-[425px] rounded-[16px] p-0",
          className,
          dialogVariants({ size })
        )}
      >
        {dialogHeader && (
          <DialogHeader className="border-b p-[16px] text-left">
            <DialogTitle className="font-normal">{dialogHeader}</DialogTitle>
          </DialogHeader>
        )}
        <div className={cn("p-[24px] space-y-4", bodyClassName)}>
          <div className={cn(!dialogHeader && "pt-4")}>{children}</div>
          <DialogFooter className="flex justify-end  flex-row gap-2">
            {dialogFooter}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
