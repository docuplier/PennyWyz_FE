import { CSRWrapper } from "#/components/layouts/CSRWrapper";
import { SwipeableCard } from "#/components/ui/swipeable-card";
import { Typography } from "#/components/ui/typography";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { TListGroup } from "./hooks/useListGroup";
import { getFormattedDate, getRangeFormmater } from "#/lib/utils";
import { useRouter } from "next/router";
import { useProductsContext } from "#/contexts/product-context";

type TListGroupContainer = {
  listGroup: TListGroup[];
  handleDeleteListGroup: (listGroupId: string) => void;
};

export const ListGroupContainer = ({
  listGroup,
  handleDeleteListGroup,
}: TListGroupContainer) => {
  const router = useRouter();
  const { countryToUse } = useProductsContext();

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
                  <Typography text={lg.itemsCount} size={10} />
                </div>
              </section>
              <section className="flex items-center justify-between w-full">
                <Typography text={getFormattedDate(lg.createdAt)} />
                <Typography
                  text={getRangeFormmater({
                    lowerRange: lg.price.lowerRange,
                    upperRange: lg.price.upperRange,
                    country: countryToUse,
                  })}
                />
              </section>
            </div>
          </SwipeableCard>
        ))}
      </AnimatePresence>
    </CSRWrapper>
  );
};
