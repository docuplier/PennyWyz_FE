import { ReactNode } from "react";
import { Typography } from "./typography";
import { motion } from "framer-motion";

import { DeleteDialog, SwipeAction } from "./list-item";
import { useDialog } from "#/hooks/use-dialog";

const BTN_WIDTH = 150;

const MESSAGE_DELETE_ANIMATION = { height: 0, opacity: 0 };
const MESSAGE_DELETE_TRANSITION = {
  opacity: {
    transition: {
      duration: 0,
    },
  },
};

export type TAction = {
  action: VoidFunction;
  text: string;
};

export type TSwipeableCard = {
  leftAction?: TAction;
  rightAction?: TAction;
  children?: ReactNode;
  onClick?: VoidFunction;
  handleDelete?: VoidFunction;
};
export const SwipeableCard = ({
  leftAction,
  rightAction,
  children,
  onClick,
  handleDelete,
}: TSwipeableCard) => {
  const { open: openDeleteDialog, toggleDialog: toggleDeleteDialog } =
    useDialog();

  const handleDragEnd = (info: any) => {
    const dragDistance = info.offset.x;
    if (dragDistance < -BTN_WIDTH) {
      if (handleDelete) {
        toggleDeleteDialog();
      }
    }
    if (dragDistance > BTN_WIDTH) {
    }
  };

  return (
    <>
      <motion.section
        exit={MESSAGE_DELETE_ANIMATION}
        transition={MESSAGE_DELETE_TRANSITION}
        className="relative"
      >
        {leftAction && (
          <SwipeAction
            isRight={false}
            onClick={leftAction.action}
            className="rounded-l-[8px] bg-pennywyz-yellow-t2"
          >
            <Typography
              text={leftAction.text}
              className="text-white w-[80px] flex justify-center"
            />
          </SwipeAction>
        )}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, info) => {
            e.stopPropagation();
            handleDragEnd(info);
          }}
          onDragStart={(e) => {
            e.stopPropagation();
          }}
          className="w-full bg-pennywyz-ash-t1 rounded-[8px] pt-[6px] pb-[2px] px-[2px] relative z-30"
          onClick={onClick}
        >
          {children}
        </motion.div>
        {rightAction && (
          <SwipeAction className="rounded-r-[8px]" onClick={rightAction.action}>
            <Typography
              text={rightAction.text}
              className="text-white w-[60px] flex justify-center"
            />
          </SwipeAction>
        )}
        {!rightAction && !!handleDelete && (
          <SwipeAction className="rounded-r-[8px]" onClick={toggleDeleteDialog}>
            <Typography
              text="Delete"
              className="text-white w-[60px] flex justify-center"
            />
          </SwipeAction>
        )}
      </motion.section>
      {!!handleDelete && (
        <DeleteDialog
          open={openDeleteDialog}
          handleClose={toggleDeleteDialog}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};
