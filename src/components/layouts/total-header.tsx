import { Typography } from "../ui/typography";

export const TotalHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <Typography text="6 Items" size={12} />
      <section className="flex items-center gap-2">
        <Typography text="Total Budget" size={12} />
        <Typography text="₦50,000" size={16} />
      </section>
    </div>
  );
};
