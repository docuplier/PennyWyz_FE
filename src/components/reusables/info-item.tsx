import { Info } from "lucide-react";
import { Typography } from "../ui/typography";
import { ReactNode } from "react";

export const InfoItem = ({ text }: { text: string | ReactNode }) => {
  return (
    <div className="flex gap-2 items-center">
      <Info size={16} className="text-blue-500" />
      <Typography text={text} className="text-pennywyz-ash-t2" size={12} />
    </div>
  );
};
