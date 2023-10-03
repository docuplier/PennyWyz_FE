import { ReactNode, useState } from "react";
import { CheckBox } from "./checkbox";
import { Typography } from "./typography";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "#/lib/utils";
import { CustomDialog } from "../reusables/custom-dialog";
import { useDialog } from "#/hooks/use-dialog";
import {
  LucideIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  PlusIcon,
} from "lucide-react";
import { Button } from "./button";

const BTN_WIDTH = 150;

const MESSAGE_DELETE_ANIMATION = { height: 0, opacity: 0 };
const MESSAGE_DELETE_TRANSITION = {
  opacity: {
    transition: {
      duration: 0,
    },
  },
};

export type ListItemProps = {
  handleDelete: () => void;
};
export const ListItem = ({ handleDelete }: ListItemProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { open, toggleDialog } = useDialog();
  const [isExpanded, setIsExpanded] = useState(false);
  const { open: openDeleteDialog, toggleDialog: toggleDeleteDialog } =
    useDialog();

  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = ({
    type,
  }: {
    type: "increment" | "decrement";
  }) => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
    }
  };

  const handleDragEnd = (info: any, messageId: any) => {
    const dragDistance = info.offset.x;
    if (dragDistance < -BTN_WIDTH) {
      toggleDeleteDialog();
    }
    if (dragDistance > BTN_WIDTH) {
      toggleDialog();
    }
  };

  return (
    <>
      <motion.section
        exit={MESSAGE_DELETE_ANIMATION}
        transition={MESSAGE_DELETE_TRANSITION}
        className="relative"
      >
        <SwipeAction
          isRight={false}
          onClick={toggleDialog}
          className="rounded-l-[8px] bg-pennywyz-yellow-t2"
        >
          <Typography
            text="Quantity"
            className="text-white w-[80px] flex justify-center"
          />
        </SwipeAction>
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            handleDragEnd(info, { item: "afa" });
            setIsExpanded(false);
          }}
          onDragStart={() => {
            setIsDragging(true);
          }}
          className="w-full bg-pennywyz-ash-t1 rounded-[8px] pt-[6px] pb-[2px] px-[2px] relative z-30"
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          <div className="flex items-center gap-[10px] px-[8px] ">
            <CheckBox id={"checkbox"} />
            <Typography text="Milo Instant Malt Chocolate Drinking Powder Tin 400g" />
            <div className="flex-none flex flex-col items-end gap-[5px]">
              <div className="w-[14px] h-[14px] rounded-full border flex justify-center items-center border-black">
                <Typography text="4" size={10} />
              </div>
              <Typography text="₦800 - ₦1,000" size={12} />
            </div>
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ type: "spring", duration: 0.6, bounce: 0 }}
              >
                <div className="w-full bg-white py-[10px] grid grid-cols-2 mt-[8px] rounded-b-[8px] !overflow-hidden">
                  <button className="text-[12px]" onClick={toggleDialog}>
                    Quantity
                  </button>
                  <button
                    onClick={toggleDeleteDialog}
                    className="text-[12px] text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <SwipeAction className="rounded-r-[8px]" onClick={toggleDeleteDialog}>
          <Typography
            text="Delete"
            className="text-white w-[60px] flex justify-center"
          />
        </SwipeAction>
      </motion.section>
      <QuantityDialog
        open={open}
        quantity={quantity}
        handleClose={toggleDialog}
        handleQuantityChange={handleQuantityChange}
      />
      <DeleteDialog
        open={openDeleteDialog}
        handleClose={toggleDeleteDialog}
        handleDelete={handleDelete}
      />
    </>
  );
};

export const DeleteDialog = ({
  open,
  handleClose,
  handleDelete,
}: {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}) => {
  return (
    <CustomDialog
      open={open}
      handleClose={handleClose}
      size="sm"
      dialogFooter={
        <>
          <Button variant={"outline"}>Cancel</Button>
          <Button
            onClick={() => {
              handleClose();
              handleDelete();
            }}
          >
            Delete
          </Button>
        </>
      }
    >
      <div className="mx-auto text-center">
        <section className="flex items-center gap-8 justify-center bg-pennywyz-yellow-t1 rounded-[4px] px-[24px] py-[10px] ">
          <Typography text="Are you sure you want to delete this item?" />
        </section>
      </div>
    </CustomDialog>
  );
};

export const QuantityDialog = ({
  open,
  handleClose,
  handleQuantityChange,
  quantity,
}: {
  open: boolean;
  handleClose: () => void;
  quantity: number;
  handleQuantityChange: ({ type }: { type: "increment" | "decrement" }) => void;
}) => {
  return (
    <CustomDialog open={open} handleClose={handleClose} size="sm">
      <Typography
        text="Quantity"
        size={16}
        className="mb-4 font-semibold text-center"
      />

      <section className="flex items-center justify-center gap-8">
        <QuantityActionIcon
          icon={MinusCircleIcon}
          onClick={() => handleQuantityChange({ type: "decrement" })}
        />
        <div className="w-[80px]  rounded-[8px] border border-pennywyz-ash-t1 p-[1rem] flex justify-center items-center">
          <Typography
            text={quantity?.toString()}
            className="text-pennywyz-ash-t2"
          />
        </div>
        <QuantityActionIcon
          icon={PlusCircleIcon}
          onClick={() => handleQuantityChange({ type: "increment" })}
        />
      </section>
      <div className="flex justify-center mt-[24px]">
        <Button>Apply</Button>
      </div>
    </CustomDialog>
  );
};

export const QuantityActionIcon = ({
  icon: Icon,
  onClick,
}: {
  icon: LucideIcon;
  onClick: () => void;
}) => (
  <button onClick={onClick}>
    <Icon
      className="w-[30px] h-[30px] text-pennywyz-yellow-t2"
      strokeWidth={1}
    />
  </button>
);

export const SwipeAction = ({
  children,
  className,
  isRight = true,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  isRight?: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      className={cn(
        `absolute flex items-center 
        bg-red-500  top-0 bottom-0 z-10  w-[150px]`,
        isRight ? "right-[4px] justify-end" : "left-[4px] justify-start",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};