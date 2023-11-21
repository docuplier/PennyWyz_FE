import * as React from "react";

import { cn, toCamel } from "#/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "#/components/ui/command";
import { Popover, PopoverContent } from "#/components/ui/popover";
import { Check, PlusIcon } from "lucide-react";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { useRouter } from "next/router";
import { useProductsContext } from "#/contexts/product-context";
import { Loader } from "../reusables/loader";
import { InfoItem } from "../reusables/info-item";

export const SearchBar = ({
  navigationPath,
  navigationAction,
  placeholder = "Create a New List",
}: {
  navigationPath?: string;
  navigationAction?: VoidFunction;
  placeholder?: string;
}) => {
  const ref = React.useRef<any>();
  const selectWidth = ref.current?.clientWidth || 300;
  const {
    open,
    setOpen,
    handleSearchValue,
    searchValue,
    getProducts,
    handleSelect,
    selectedProducts,
  } = useProductsContext();
  const {
    paginatedFetch: { concatenatedData, isFetchingNextPage },
    scrollRef,
  } = getProducts;

  const router = useRouter();

  React.useEffect(() => {
    handleSearchValue("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  return (
    <div className="sticky bottom-0 z-[50] ">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <div
            className={cn(
              "bg-pennywyz-ash-t1 p-[15px] rounded-[12px] relative",
              !!navigationAction && "cursor-pointer"
            )}
            ref={ref}
          >
            <Command>
              <CommandInput
                onFocus={() => {
                  if (navigationAction) {
                    navigationAction?.();
                  } else if (navigationPath) {
                    router.push(navigationPath);
                  }
                }}
                className={cn(
                  "text-[16px]",
                  !!navigationAction && "cursor-pointer"
                )}
                // ref={searchRef}
                placeholder={placeholder}
                onValueChange={handleSearchValue}
                value={!!navigationAction ? "" : searchValue}
                onClick={() => {
                  setOpen(true);
                }}
              />
            </Command>
            <PlusIcon className="ml-2 w-[24px] shrink-0 opacity-50 text-pennywyz-yellow-t2 absolute top-1/2 -translate-y-1/2 right-[30px] " />
          </div>
        </PopoverAnchor>
        <PopoverContent
          className="max-w-full p-0 -translate-y-2 z-[500] "
          style={{ width: `${selectWidth}px` }}
          autoFocus={false}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          <Command>
            {!concatenatedData.length ? (
              <CommandEmpty>
                <InfoItem
                  text="Start typing to see product suggestions"
                  className="justify-center py-2"
                />
              </CommandEmpty>
            ) : null}
            {concatenatedData.length ? (
              <CommandGroup className="h-[200px]  overflow-y-scroll ">
                <InfoItem
                  text="Please scroll to show more"
                  className="justify-center py-2"
                />
                {concatenatedData?.map((product, index) => {
                  const isSelected = !!selectedProducts[product.id];
                  return (
                    <CommandItem
                      key={product.id}
                      value={product.id?.toString()}
                      onSelect={() => {
                        handleSelect(product);
                      }}
                      className={cn(
                        isSelected && "bg-pennywyz-yellow-t2 bg-opacity-50 ",
                        "text-[12px]"
                      )}
                    >
                      {product.name}
                    </CommandItem>
                  );
                })}
                <div ref={scrollRef.ref}></div>
                {isFetchingNextPage && <Loader />}
              </CommandGroup>
            ) : null}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
