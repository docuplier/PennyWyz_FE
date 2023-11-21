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
import { Loader } from "#/components/reusables/loader";

export const NewList = () => {
  const {
    selectedProductsArray,
    initalListGroupName,
    handleUpdateListGroup,
    listGroupId,
    isListOwner,
    isFetchingList,
    isOnPublicListPage,
  } = useProductsContext();

  const { isAuthenticated, authUser } = useAuthContext();

  const debouncedFunction = debounce({ func: handleUpdateListGroup });

  const [isExpandedId, setIsExpandedId] = useState<string>("");

  const handleExpansion = (expandedId: string) => {
    if (isExpandedId === expandedId) {
      setIsExpandedId("");
    } else {
      setIsExpandedId(expandedId);
    }
  };

  const canEdit = isListOwner && !isOnPublicListPage;

  return (
    <>
      <AppLayout hasBackIcon hasTopPadding={false}>
        {isFetchingList ? (
          <Loader className="h-[300px]" />
        ) : (
          <>
            <section className="space-y-[20px] mb-[20px] pt-[20px] sticky top-0 z-[50] bg-white">
              {
                <ListTitle
                  initialValue={initalListGroupName}
                  handleSaveTitle={(name: string) => {
                    if (isAuthenticated) {
                      debouncedFunction({ name, listGroupId });
                    }
                  }}
                  canEdit={canEdit}
                />
              }
              <TotalHeader />
            </section>
            {isAuthenticated && !authUser?.isVerified ? (
              <div>
                <InfoItemSecondary text="Verify your email to save your list" />
              </div>
            ) : null}
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
                        canEdit={canEdit}
                      />
                    ))}
                  </AnimatePresence>
                </CSRWrapper>
                {canEdit ? <SearchBar placeholder="New item" /> : null}
              </div>
            </div>
            {canEdit ? (
              <div className="py-[20px] flex flex-col items-center gap-2 justify-center">
                <InfoItem text="Enter three or more characters to start suggesting" />
                <InfoItem text="Swipe Right to increase quantity & Left to delete" />
              </div>
            ) : null}
          </>
        )}
      </AppLayout>
    </>
  );
};
