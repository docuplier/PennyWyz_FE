import { AlertDialog } from "#/components/reusables/alert-dialog";
import { ShareDialog } from "#/components/reusables/share-dialog";
import { useDialog } from "#/hooks/use-dialog";
import { ReactNode, createContext, useContext, useState } from "react";

export type TAlertDialog = {
  title?: string;
  iconType?: "success" | "error";
  content?: string | JSX.Element;
  onCloseCallBack?: VoidFunction;
};

type AlertDialogContexttype = {
  render: (props: Partial<TAlertDialog>) => void;
  openShareDialog: boolean;
  toggleShareDialog: () => void;
};

const AlertDialogContext = createContext<AlertDialogContexttype>(
  {} as AlertDialogContexttype
);

export function AlertDialogProvider({ children }: { children: ReactNode }) {
  const { open, toggleDialog } = useDialog();
  const [dialogState, setDialogState] = useState<TAlertDialog | null>(null);
  const { open: openShareDialog, toggleDialog: toggleShareDialog } =
    useDialog();

  const render = (data: TAlertDialog) => {
    setDialogState(data);
    toggleDialog();
  };

  return (
    <AlertDialogContext.Provider
      value={{
        render,
        openShareDialog,
        toggleShareDialog,
      }}
    >
      {children}
      <AlertDialog
        open={open && !!dialogState}
        handleClose={() => {
          dialogState?.onCloseCallBack?.();
          toggleDialog();
        }}
        data={dialogState as TAlertDialog}
      />
      <ShareDialog open={openShareDialog} handleClose={toggleShareDialog} />
    </AlertDialogContext.Provider>
  );
}

export const useAlertDialog = () => useContext(AlertDialogContext);
