import { CustomDialog } from "#/components/reusables/custom-dialog";
import { useRouter } from "next/router";
import { Typography } from "../ui/typography";
import { TAlertDialog } from "#/contexts/alert-dialog-context";
import { SuccessIcon } from "#/assets/svgs/success-icon";
import { ErrorIcon } from "#/assets/svgs/error-icon";

export const AlertDialog = ({
  open,
  handleClose,
  data,
}: {
  open: boolean;
  handleClose: () => void;
  data: TAlertDialog;
}) => {
  if (!data) return;
  const { content, iconType, title } = data;
  return (
    <CustomDialog
      open={open}
      handleClose={handleClose}
      className="max-w-[350px]"
      bodyClassName="pt-0"
      preventOutsideClose
    >
      <section className="flex flex-col justify-center gap-4 py-[30px]">
        {title && (
          <Typography
            text={title}
            className="text-[24px] font-semibold text-center"
            size={24}
          />
        )}
        <div className="flex items-center justify-center w-full mb-[24px]">
          {iconType && Icons[iconType]}
        </div>
        {content && (
          <div className="bg-pennywyz-yellow-t1 p-[12px]">{content}</div>
        )}
      </section>
    </CustomDialog>
  );
};

const Icons = {
  success: <SuccessIcon />,
  error: <ErrorIcon />,
};
