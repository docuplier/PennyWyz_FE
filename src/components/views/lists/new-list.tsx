import { Typography } from "#/components/ui/typography";
import { SearchBar } from "#/components/ui/search-bar";
import { ListItem } from "#/components/ui/list-item";
import { AppLayout } from "#/components/layouts/app-layout";
import { ListTitle } from "#/components/layouts/list-title";
import { TotalHeader } from "#/components/layouts/total-header";
import { InfoItem, InfoItemSecondary } from "#/components/reusables/info-item";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useProductsContext } from "#/contexts/product-context";
import { CSRWrapper } from "#/components/layouts/CSRWrapper";
import { debounce } from "#/lib/utils";
import { BackIcon } from "#/components/ui/back-icon";
import { useAuthContext } from "#/contexts/auth-context";

export const NewList = () => {
  const {
    selectedProductsArray,
    initalListGroupName,
    handleUpdateListGroup,
    listGroupId,
  } = useProductsContext();

  const { isAuthenticated } = useAuthContext();

  const debouncedFunction = debounce({ func: handleUpdateListGroup });

  const [isExpandedId, setIsExpandedId] = useState<string>("");

  const handleExpansion = (expandedId: string) => {
    if (isExpandedId === expandedId) {
      setIsExpandedId("");
    } else {
      setIsExpandedId(expandedId);
    }
  };

  return (
    <>
      <AppLayout hasBackIcon>
        <section className="space-y-[20px] mb-[20px] mt-[20px]">
          <ListTitle
            initialValue={initalListGroupName}
            key={initalListGroupName}
            handleSaveTitle={(name: string) =>
              debouncedFunction({ name, listGroupId })
            }
          />
          <TotalHeader />
        </section>
        {isAuthenticated && (
          <div>
            <InfoItemSecondary text="Verify your email to save your list" />
          </div>
        )}
        <div className="w-full">
          <div className="mt-[10px] space-y-2">
            <CSRWrapper>
              <AnimatePresence>
                {selectedProductsArray.map((v) => (
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
};
