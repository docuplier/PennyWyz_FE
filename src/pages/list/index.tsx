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
import { useProductsContext } from "#/contexts/product-context";
import { CSRWrapper } from "#/components/layouts/CSRWrapper";
import { NewList } from "#/components/views/lists/new-list";

export default function Lists() {
  return (
    <>
      <NewList />
    </>
  );
}
