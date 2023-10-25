import { Typography } from "./typography";

export const TextDivider = ({ text }: { text: string }) => {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <div className="w-full border-b border-pennywyz-ash-t2"></div>
      <Typography
        text={text}
        size={12}
        className="absolute bg-white px-[10px] text-pennywyz-ash-t2"
      />
    </div>
  );
};
