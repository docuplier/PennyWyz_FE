import { AnimatePresence } from "framer-motion";
import React from "react";
import { SearchBar } from "./search-bar";
import { IProduct, useGetProducts } from "#/http";
import { ListItem } from "./list-item";
import { useProductsContext } from "#/contexts/product-context";

export const SearchAndList = () => {
  const { selectedProducts } = useProductsContext();

  return (
    <div className="mt-[20px] space-y-2">
      <AnimatePresence>
        {Object.keys(selectedProducts).map((v) => (
          <ListItem key={v} handleDelete={() => console.log(v)} />
        ))}
      </AnimatePresence>
      {/* <SearchBar placeholder="New item" /> */}
    </div>
  );
};
