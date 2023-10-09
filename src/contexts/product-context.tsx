import { IProduct, useGetProducts } from "#/http";
import { AppStorage } from "#/lib/appStorage";
import React, { ReactNode, createContext, useContext, useMemo } from "react";

export type ProductsContextType = {
  handleSearchValue: (search: string) => void;
  handleSelect: (currentValue: string) => void;
  getProducts: ReturnType<typeof useGetProducts>;
  open: boolean;
  setOpen: any;
  selectedProducts: { [key in string]: IProduct };
  searchValue: string;
  selectedProductsArray: IProduct[];
  selectedProductsTotal: number;
  handleQuantityChange: ({
    productId,
    type,
  }: {
    productId: string;
    type: "increment" | "decrement";
  }) => void;
  handleProductDelete: ({ productId }: { productId: string }) => void;
};

const ProductsContext = createContext<ProductsContextType>(
  {} as ProductsContextType
);

const SEARCH_SUGGESTION_LENGTH = 3;

const { getFromStore, clearStore, addToStore } = AppStorage();

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [searchValue, setSearchValue] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const [selectedProducts, setSelectedProducts] = React.useState<{
    [key in string]: IProduct;
  }>(getFromStore("USER_PRODUCTS") ?? {});

  const selectedProductsArray = useMemo(() => {
    return Object.values(selectedProducts);
  }, [selectedProducts]);

  const selectedProductsTotal = useMemo(() => {
    return selectedProductsArray.reduce((acc, curr) => {
      acc += curr?.quantity * curr?.pricedata?.price || 0;
      return acc;
    }, 0);
  }, [selectedProductsArray]);

  const isEnabled = searchValue?.trim().length >= SEARCH_SUGGESTION_LENGTH;

  const getProducts = useGetProducts({
    search: searchValue,
    enabled: isEnabled,
  });

  const handleSelect = (currentValue: string) => {
    const parsedProduct = JSON.parse(currentValue) as IProduct;
    const duplicatedProducts = { ...selectedProducts };
    const isPresent = duplicatedProducts[parsedProduct.id];

    if (isPresent) {
      delete duplicatedProducts[parsedProduct.id];
      addToStore("USER_PRODUCTS", duplicatedProducts);
      setSelectedProducts(duplicatedProducts);
    } else {
      const newProducts = {
        ...duplicatedProducts,
        [parsedProduct.id]: { ...parsedProduct, quantity: 1 },
      };
      addToStore("USER_PRODUCTS", newProducts);
      setSelectedProducts(newProducts);
    }
    setOpen(false);
  };

  const handleSearchValue = (search: string) => {
    if (search.trim().length > 0) {
      if (!open) setOpen(true);
    } else {
      setOpen(false);
    }

    setSearchValue(search?.trim());
  };

  const handleQuantityChange = ({
    productId,
    type,
  }: {
    productId: string;
    type: "increment" | "decrement";
  }) => {
    const newProducts = { ...selectedProducts };

    const selectedProduct = newProducts[productId];
    if (type === "increment") {
      selectedProduct.quantity += 1;
    } else {
      selectedProduct.quantity =
        selectedProduct.quantity <= 1
          ? selectedProduct.quantity
          : selectedProduct.quantity - 1;
    }
    addToStore("USER_PRODUCTS", newProducts);
    setSelectedProducts(newProducts);
  };

  const handleProductDelete = ({ productId }: { productId: string }) => {
    const newProducts = { ...selectedProducts };
    delete newProducts[productId];
    addToStore("USER_PRODUCTS", newProducts);
    setSelectedProducts(newProducts);
  };

  return (
    <ProductsContext.Provider
      value={{
        handleSearchValue,
        searchValue,
        handleSelect,
        getProducts,
        open,
        setOpen,
        selectedProducts,
        selectedProductsArray,
        selectedProductsTotal,
        handleQuantityChange,
        handleProductDelete,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useProductsContext = () => useContext(ProductsContext);
