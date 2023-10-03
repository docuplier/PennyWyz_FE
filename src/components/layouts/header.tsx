import { PennyWyzLogo } from "#/assets/svgs/pennywyz-logo";
import React from "react";
import { Typography } from "../ui/typography";
import { MenuIcon, UserIcon } from "lucide-react";
import { useDialog } from "#/hooks/use-dialog";
import { useAuthContext } from "#/contexts/auth-context";
import { AuthViewEnums } from "../views/auth/auth-dialog";
import { cn } from "#/lib/utils";

const Header = ({ className }: { className?: string }) => {
  const { openAuthDialog } = useAuthContext();

  return (
    <>
      <div
        className={cn("pt-[20px] flex justify-between items-center", className)}
      >
        <section className="flex items-center gap-2">
          <PennyWyzLogo />
          <Typography
            text="PennyWyz"
            size={24}
            as="h3"
            className="font-semibold"
          />
        </section>
        <section className="flex items-center gap-2">
          <button
            onClick={() => openAuthDialog()}
            className="w-[24px] h-[24px] rounded-full bg-pennywyz-yellow-t1 flex items-center justify-center "
          >
            <UserIcon size={14} strokeWidth={3} />
          </button>
          <button>
            <MenuIcon className="text-pennywyz-yellow-t2" size={24} />
          </button>
        </section>
      </div>
    </>
  );
};

export default Header;
