import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "#/components/ui/button";
import { Typography } from "#/components/ui/typography";
import { SearchBar } from "#/components/ui/search-bar";
import { ListItem } from "#/components/ui/list-item";
import { AppLayout } from "#/components/layouts/app-layout";
import { Hero } from "#/components/views/home/hero";
import { ListTitle } from "#/components/layouts/list-title";
import { TotalHeader } from "#/components/layouts/total-header";
import { InfoItem } from "#/components/reusables/info-item";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useProductsContext } from "#/contexts/product-context";
import { CSRWrapper } from "#/components/layouts/CSRWrapper";

export default function NewList() {
  const { selectedProducts } = useProductsContext();

  const [isExpandedId, setIsExpandedId] = useState<string | undefined>("");

  const handleExpansion = (expandedId: string) => {
    if (isExpandedId === expandedId) {
      setIsExpandedId("");
    } else {
      setIsExpandedId(expandedId);
    }
  };

  return (
    <>
      <AppLayout>
        <section className="space-y-[20px] mb-[20px] mt-[20px]">
          <ListTitle />
          <TotalHeader />
        </section>
        <div className="w-full">
          <div className="mt-[20px] space-y-2">
            <CSRWrapper>
              <AnimatePresence>
                {Object.values(selectedProducts).map((v) => (
                  <ListItem
                    key={v.id}
                    isExpandedId={isExpandedId}
                    handleExpansion={handleExpansion}
                    product={v}
                  />
                ))}
              </AnimatePresence>
            </CSRWrapper>
            <SearchBar placeholder="New item" />
          </div>
        </div>
        <div className="py-[20px] flex flex-col items-center gap-2 justify-center">
          <InfoItem text="Enter three or more characters to start suggesting" />
          <InfoItem text="Swipe Right to increase quantity & Left to delete" />
        </div>
      </AppLayout>
    </>
  );
}
