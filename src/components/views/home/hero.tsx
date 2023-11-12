import { Typography } from "#/components/ui/typography";
import { cn } from "#/lib/utils";

export const Hero = ({ isDesktop }: { isDesktop?: boolean }) => {
  return (
    <section
      className={cn(
        "text-center  mx-auto space-y-[6px] py-[30px] ",
        isDesktop ? "max-w-[450px]" : "max-w-[300px]"
      )}
    >
      <Typography
        text="Make a Shopping List"
        size={24}
        as="h1"
        className="font-semibold"
      />
      <Typography
        as="h2"
        text={
          <>
            Get
            <span className="font-bold"> real time price updates </span>
            on over 100,000 items to help you
            <span className="font-bold"> plan better </span>
            and
            <span className="font-bold"> shop cheaper</span>
          </>
        }
        size={16}
        // className="!mt-0"
      />
    </section>
  );
};
