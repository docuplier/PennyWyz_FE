import { SearchBar } from "#/components/ui/search-bar";
import { AppLayout } from "#/components/layouts/app-layout";
import { Hero } from "#/components/views/home/hero";
import { useState } from "react";

export default function Home() {
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
          <SearchBar navigationPath="list" />
        </div>
      </AppLayout>
    </>
  );
}
