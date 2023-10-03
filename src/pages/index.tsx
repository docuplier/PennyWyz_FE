import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "#/components/ui/button";
import { Typography } from "#/components/ui/typography";
import { SearchBar } from "#/components/ui/search-bar";
import { ListItem } from "#/components/ui/list-item";
import { AppLayout } from "#/components/layouts/app-layout";
import { Hero } from "#/components/views/home/hero";
import { ListTitle } from "#/components/layouts/list-title";
import { TotalHeader } from "#/components/layouts/total-header";
import { InfoItem } from "#/components/reusables/info-item";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [listItem, setListItem] = useState([1, 2, 3]);

  const handleDelete = (selectedItem: number) => {
    console.log({ selectedItem });
    const undeletedList = listItem.filter((item) => item !== selectedItem);
    setListItem(undeletedList);
  };

  return (
    <>
      <AppLayout
        desktopHeader={
          <div className="pt-[38px]">
            <Hero isDesktop />
          </div>
        }
        mobileHeader={<Hero />}
      >
        <div className="w-full">
          <SearchBar navigationPath="new-list" />
        </div>
      </AppLayout>
    </>
  );
}
