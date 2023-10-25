import { Info } from "lucide-react";
import { Typography } from "../ui/typography";
import { ReactNode } from "react";

export const InfoItem = ({ text }: { text: string | ReactNode }) => {
  return (
    <div className="flex items-center gap-2">
      <Info size={16} className="text-blue-500" />
      <Typography text={text} className="text-pennywyz-ash-t2" size={12} />
    </div>
  );
};
export const InfoItemSecondary = ({ text }: { text: string | ReactNode }) => {
  return (
    <div className="flex items-center gap-2 bg-[#3448F0] px-[12px] py-[16px] rounded-[8px]">
      <Info size={16} className="text-white" />
      <Typography text={text} className="text-white" size={12} />
    </div>
  );
};
