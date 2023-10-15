import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

export const BackIcon = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="bg-pennywyz-yellow-t1 w-[30px] h-[30px] rounded-full flex items-center justify-center"
    >
      <ChevronLeft />
    </button>
  );
};
