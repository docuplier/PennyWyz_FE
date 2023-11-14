import { cn } from "#/lib/utils";
import { cva } from "class-variance-authority";
import { ReactNode } from "react";
import Header from "./header";
import { useViewportSize } from "@mantine/hooks";
import { motion } from "framer-motion";

export const AppLayout = ({
  children,
  className,
  desktopHeader,
  mobileHeader,
  hasBackIcon,
  hasTopPadding = true,
}: {
  children: ReactNode;
  className?: string;
  desktopHeader?: ReactNode;
  mobileHeader?: ReactNode;
  hasBackIcon?: boolean;
  hasTopPadding?: boolean;
}) => {
  const { width } = useViewportSize();

  const isMobile = width < 700;

  return (
    <div className={cn(!isMobile ? " bg-pennywyz-yellow-t1" : "bg-white")}>
      <main className={cn("min-h-screen  flex flex-col ", className)}>
        <div className="hidden md:block">
          <Header hasBackIcon={hasBackIcon} />
          {desktopHeader}
        </div>
        <section
          className={cn(
            "flex md:pt-[20px] flex-1 md:flex-none justify-center ",
            !isMobile ? "items-center" : ""
          )}
        >
          <div
            className={cn(
              "bg-white mx-auto w-full  rounded-[24px]   white-container  max-h-screen overflow-scroll  ",
              isMobile
                ? `max-w-[700px] ${hasTopPadding ? "pt-[10px]" : ""}`
                : `max-w-[450px] ${hasTopPadding ? "py-[24px]" : "pb-[24px]"} `
            )}
          >
            <div className="max-w-[90%] mx-auto min-h-[260px]">
              <div className="sticky top-0 md:hidden z-[500] bg-white">
                <Header hasBackIcon={hasBackIcon} />
                {mobileHeader}
              </div>
              <motion.div
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 200, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              >
                {children}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
