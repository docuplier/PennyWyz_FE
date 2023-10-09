import * as React from "react";

import { cn } from "#/lib/utils";
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

export const SearchBar = ({
  navigationPath,
  placeholder = "Create a New List",
}: {
  navigationPath?: string;
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

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <div
            className="bg-pennywyz-ash-t1 p-[15px] rounded-[12px] relative"
            ref={ref}
          >
            <Command>
              <CommandInput
                onFocus={() => {
                  if (navigationPath) {
                    router.push(navigationPath);
                  }
                }}
                className="text-[16px]"
                // ref={searchRef}
                placeholder={placeholder}
                onValueChange={handleSearchValue}
                value={searchValue}
                onClick={() => {
                  setOpen(true);
                }}
              />
            </Command>
            <PlusIcon className="ml-2 w-[24px] shrink-0 opacity-50 text-pennywyz-yellow-t2 absolute top-1/2 -translate-y-1/2 right-[30px] " />
          </div>
        </PopoverAnchor>
        <PopoverContent
          className="max-w-full p-0 -translate-y-2 "
          style={{ width: `${selectWidth}px` }}
          autoFocus={false}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          <Command>
            <CommandEmpty>No product found.</CommandEmpty>
            <CommandGroup className="max-h-[300px] !h-full overflow-y-scroll ">
              {concatenatedData?.map((product) => (
                <CommandItem
                  key={product.id}
                  value={JSON.stringify(product)}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedProducts[product.id] ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {product.name}
                </CommandItem>
              ))}
              <div ref={scrollRef.ref}></div>
              {isFetchingNextPage && "Loading..."}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};
