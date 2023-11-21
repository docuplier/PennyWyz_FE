import { PennyWyzLogo } from "#/assets/svgs/pennywyz-logo";
import React, { useState } from "react";
import { Typography } from "../ui/typography";
import { MenuIcon, User2, UserCircle, UserIcon } from "lucide-react";
import { useAuthContext } from "#/contexts/auth-context";
import { cn } from "#/lib/utils";
import Link from "next/link";
import { Gb, Ng, Us } from "react-flags-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { CSRWrapper } from "./CSRWrapper";
import { BackIcon } from "../ui/back-icon";
import { useProductsContext } from "#/contexts/product-context";
import { cx } from "class-variance-authority";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Header = ({
  className,
  hasBackIcon,
}: {
  className?: string;
  hasBackIcon?: boolean;
}) => {
  const { openAuthDialog, isAuthenticated, logout } = useAuthContext();
  const { handleSelectedCountry, selectedCountry } = useProductsContext();

  return (
    <>
      <div
        className={cn(
          "pt-[20px] flex justify-between items-center md:container",
          className
        )}
      >
        <div className="flex items-center gap-1 ">
          {hasBackIcon && <BackIcon />}
          <Link
            href={isAuthenticated ? "/all-lists" : "/"}
            className="flex items-center gap-2"
          >
            <div className="!flex-none">
              <PennyWyzLogo />
            </div>
            <Typography
              text="PennyWyz"
              size={24}
              as="h3"
              className="font-semibold"
            />
          </Link>
        </div>
        <section className="flex items-center gap-2">
          <div className="z-[60]">
            <Popover>
              <PopoverTrigger>
                <CountrySelectButton icon={selectedCountry.icon} />
              </PopoverTrigger>

              <PopoverContent className="mt-[4px]">
                <div className="border p-[10px] bg-white space-y-[15px] rounded-[8px] shadow-md ">
                  {COUNTRY_LIST.map((c) => (
                    <CountrySelectButton
                      icon={c.icon}
                      key={c.value}
                      onClick={() => handleSelectedCountry(c)}
                      isSelected={c.value === selectedCountry.value}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <CSRWrapper>
            {isAuthenticated ? (
              <UserProfileDropdown logoutUser={logout} />
            ) : (
              <button
                onClick={openAuthDialog}
                // disabled={isAuthenticated ? LogOut:  }
                className="w-[24px] h-[24px] rounded-full flex justify-center items-center bg-pennywyz-yellow-t2 "
              >
                <UserIcon size={14} strokeWidth={3} />
              </button>
            )}
          </CSRWrapper>
          {/* <button>
            <MenuIcon className="text-pennywyz-yellow-t2" size={24} />
          </button> */}
        </section>
      </div>
    </>
  );
};

export default Header;

const UserProfileDropdown = ({ logoutUser }: { logoutUser: VoidFunction }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="w-[24px] h-[24px] rounded-full flex justify-center items-center  bg-gradient-to-r  from-pennywyz-green to-pennywyz-yellow-t2">
          <User2 size={14} strokeWidth={3} color="white" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer" onClick={logoutUser}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const CountrySelectButton = ({
  icon: Icon,
  onClick,
  isSelected,
}: {
  icon: CountryFlagImgProp;
  onClick?: VoidFunction;
  isSelected?: boolean;
}) => {
  return (
    <div
      className={cx(
        isSelected && "bg-pennywyz-yellow-t1 ",
        "p-[5px] rounded cursor-pointer"
      )}
    >
      <div
        onClick={onClick}
        className={cx(
          `h-[24px] w-[24px] rounded-full border-[2px] border-pennywyz-yellow-t2  overflow-hidden
         flex items-center relative
             `
        )}
      >
        <Icon className="object-cover w-full h-full scale-150" />
      </div>
    </div>
  );
};

export const COUNTRY_LIST: CountryListProps[] = [
  {
    value: "NG",
    icon: Ng,
  },
  {
    value: "UK",
    icon: Gb,
  },
  // {
  //   value: "US",
  //   icon: Us,
  // },
];

export type CountryListProps = {
  value: string;
  icon: CountryFlagImgProp;
};

export type CountryFlagImgProp = any;
