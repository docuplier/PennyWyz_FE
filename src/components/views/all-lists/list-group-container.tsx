import { CSRWrapper } from "#/components/layouts/CSRWrapper";
import { SwipeableCard } from "#/components/ui/swipeable-card";
import { Typography } from "#/components/ui/typography";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { TListGroup } from "./hooks/useListGroup";
import { getFormattedDate } from "#/lib/utils";
import { useRouter } from "next/router";

type TListGroupContainer = {
  listGroup: TListGroup[];
  handleDeleteListGroup: (listGroupId: string) => void;
};

export const ListGroupContainer = ({
  listGroup,
  handleDeleteListGroup,
}: TListGroupContainer) => {
  const router = useRouter();

  return (
    <CSRWrapper>
      <AnimatePresence>
        {listGroup.map((lg) => (
          <SwipeableCard
            key={lg.id}
            onClick={() => router.push(`/list/${lg.id}`)}
            handleDelete={() => handleDeleteListGroup(lg.id)}
          >
            <div className=" gap-[10px] px-[12px] ">
              <section className="flex items-center justify-between w-full">
                <Typography text={lg.name} />
                <div className="w-[14px] h-[14px] rounded-full border flex justify-center items-center border-black">
                  <Typography text={3} size={10} />
                </div>
              </section>
              <section className="flex items-center justify-between w-full">
                <Typography text={getFormattedDate(lg.createdAt)} />
                <Typography text="₦150,000" />
              </section>
            </div>
          </SwipeableCard>
        ))}
      </AnimatePresence>
    </CSRWrapper>
  );
};
