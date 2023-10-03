import { cn } from "#/lib/utils";
import { cva } from "class-variance-authority";
import { ReactNode } from "react";
import Header from "./header";

export const AppLayout = ({
  children,
  className,
  desktopHeader,
  mobileHeader,
}: {
  children: ReactNode;
  className?: string;
  desktopHeader?: ReactNode;
  mobileHeader?: ReactNode;
}) => {
  return (
    <main
      className={cn(
        "bg-pennywyz-yellow-t1  min-h-screen container flex flex-col ",
        className
      )}
    >
      <div className="hidden md:block">
        <Header />
        {desktopHeader}
      </div>
      <section className="flex md:pt-[20px] flex-1 md:flex-none justify-center items-center">
        <div className="max-w-[24rem] bg-white mx-auto w-full  rounded-[24px] py-[24px] overflow-hidden">
          <div className="max-w-[90%] mx-auto min-h-[260px]">
            <div className="md:hidden">
              <Header />
              {mobileHeader}
            </div>
            {children}
          </div>
        </div>
      </section>
    </main>
  );
};
