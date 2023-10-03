import * as React from "react";

import { cn } from "#/lib/utils";
import { Button } from "#/components/ui/button";
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

const frameworks = [
  {
    value: "next.js",
    label: "Milo Instant Chocolate Drinking Powder Tin 400g",
  },
  {
    value: "sveltekit",
    label: "Milo Instant Chocolate Drinking Powder Tin 400g",
  },
  {
    value: "nuxt.js",
    label: "Milo Instant Chocolate Drinking Powder Tin 400g",
  },
];

export const SearchBar = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [searchValue, setSearchValue] = React.useState("");
  const searchRef = React.useRef<any>();

  const handleSearchValue = (search: string) => {
    if (!open) {
      setOpen(true);
    }

    setSearchValue(search);
  };

  const ref = React.useRef<any>();

  const selectWidth = ref.current?.clientWidth || 300;

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
                autoFocus
                ref={searchRef}
                placeholder="Search framework..."
                onValueChange={handleSearchValue}
                value={searchValue}
              />
            </Command>
            <PlusIcon className="ml-2 w-[24px] shrink-0 opacity-50 text-pennywyz-yellow-t2 absolute top-1/2 -translate-y-1/2 right-[30px] " />
            {/* <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="!max-w-full w-full mx-auto ring-pennywyz-ash-t1 justify-between border-none hover:bg-white rounded-8px p-[12px] text-left"
          >
            {value
              ? frameworks.find((framework) => framework.value === value)?.label
              : "Select framework..."}

            <PlusIcon className="ml-2 w-[24px] shrink-0 opacity-50 text-pennywyz-yellow-t2 " />
          </Button> */}
          </div>
        </PopoverAnchor>
        <PopoverContent
          className=" max-w-full p-0 -translate-y-2"
          style={{ width: `${selectWidth}px` }}
          autoFocus={false}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          <Command>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    console.log({ currentValue });
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};
