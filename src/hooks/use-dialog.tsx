import { SetStateAction, useState } from "react";

export type useDialogProps = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  toggleDialog: () => void;
  setOpen: (value: SetStateAction<boolean>) => void;
};

export const useDialog = (): useDialogProps => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggleDialog = () => setOpen(!open);

  return { open, handleOpen, handleClose, toggleDialog, setOpen };
};
