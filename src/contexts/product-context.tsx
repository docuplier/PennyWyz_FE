import { useHandleListItem } from "#/components/views/lists/hooks/useHandleListItem";
import { IProduct, useGetProducts } from "#/http";
import { AppStorage } from "#/lib/appStorage";
import { useParams } from "next/navigation";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useHydrationContext } from "./hydration-provider";

export type ProductsContextType = {
  handleSearchValue: (search: string) => void;
  handleSelect: (currentValue: IProduct) => void;
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
  initalListGroupName: string;
  handleUpdateListGroup: ({
    name,
    listGroupId,
  }: {
    name: string;
    listGroupId: string;
  }) => void;
  listGroupId: string;
};

const ProductsContext = createContext<ProductsContextType>(
  {} as ProductsContextType
);

const SEARCH_SUGGESTION_LENGTH = 1;

const { getFromStore, clearStore, addToStore } = AppStorage();

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [searchValue, setSearchValue] = React.useState("");

  const params = useParams();

  const listGroupId = params?.id as string;

  const hasListGroupId = !!listGroupId;
  const { hydrated } = useHydrationContext();

  const [selectedProducts, setSelectedProducts] = React.useState<{
    [key in string]: IProduct;
  }>({});
  const [initalListGroupName, setInitialListGroupName] =
    React.useState("Untitled");

  const {
    dbListQuery,
    getDbListQuery,
    updateListItemMutation,
    addListItemMutation,
    deleteListItemMutation,
    handleUpdateListGroup,
    dbListGroupQuery,
  } = useHandleListItem(listGroupId);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (hydrated) {
        if (hasListGroupId && !dbListQuery.isFetching) {
          setSelectedProducts(getDbListQuery());
        }
        if (!hasListGroupId) {
          setSelectedProducts(getFromStore("USER_PRODUCTS") ?? {});
        }
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasListGroupId, dbListQuery.isFetching, hydrated]);

  useEffect(() => {
    if (listGroupId) {
      if (!dbListGroupQuery.isFetching && dbListGroupQuery?.data?.data?.name) {
        setInitialListGroupName(dbListGroupQuery?.data?.data?.name);
      }
    }
  }, [listGroupId, dbListGroupQuery.isFetching]);

  const [open, setOpen] = React.useState(false);

  const selectedProductsArray = useMemo(() => {
    return sortWithUpdatedAt(Object.values(selectedProducts));
  }, [selectedProducts]);

  const selectedProductsTotal = useMemo(() => {
    return selectedProductsArray.reduce((acc, curr) => {
      acc += curr?.quantity * curr?.priceData?.price || 0;
      return acc;
    }, 0);
  }, [selectedProductsArray]);

  const isEnabled = searchValue?.trim().length >= SEARCH_SUGGESTION_LENGTH;

  const getProducts = useGetProducts({
    search: searchValue,
    enabled: isEnabled,
  });

  const handleSelect = async (parsedProduct: IProduct) => {
    const duplicatedProducts = { ...selectedProducts };
    const isPresent = duplicatedProducts[parsedProduct.id];

    if (isPresent) {
      const deletedProduct = duplicatedProducts[parsedProduct.id];
      if (hasListGroupId) {
        deleteListItemMutation.mutate({
          idParams: `/${deletedProduct.listContentId}`,
        } as any);
      } else {
        addToStore("USER_PRODUCTS", duplicatedProducts);
      }
      delete duplicatedProducts[parsedProduct.id];
      setSelectedProducts(duplicatedProducts);
    } else {
      const newProducts = {
        ...duplicatedProducts,
        [parsedProduct.id]: {
          ...parsedProduct,
          quantity: 1,
          productId: parsedProduct.id,
        },
      };
      if (hasListGroupId) {
        await addListItemMutation.mutate(
          {
            quantity: 1,
            productId: parsedProduct.id,
            listId: params.id,
          } as any,
          {
            onSuccess: () => {
              dbListQuery.refetch();
            },
          }
        );
      } else {
        addToStore("USER_PRODUCTS", newProducts);
        setSelectedProducts(newProducts);
      }
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

    if (hasListGroupId) {
      updateListItemMutation.mutate({
        idParams: `/${selectedProduct.listContentId}`,
        quantity: selectedProduct.quantity,
      } as any);
    } else {
      addToStore("USER_PRODUCTS", newProducts);
    }
    setSelectedProducts(newProducts);
  };

  const handleProductDelete = ({ productId }: { productId: string }) => {
    const newProducts = { ...selectedProducts };
    const deletedProduct = newProducts[productId];
    if (hasListGroupId) {
      if (hasListGroupId) {
        deleteListItemMutation.mutate({
          idParams: `/${deletedProduct.listContentId}`,
        } as any);
      }
    } else {
      addToStore("USER_PRODUCTS", newProducts);
    }
    delete newProducts[productId];
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
        selectedProducts: selectedProducts,
        selectedProductsArray,
        selectedProductsTotal,
        handleQuantityChange,
        handleProductDelete,
        initalListGroupName,
        listGroupId,
        handleUpdateListGroup,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useProductsContext = () => useContext(ProductsContext);

const sortWithUpdatedAt = (product: IProduct[]) =>
  [...product].sort((a, b) => {
    const dateA = new Date(a.updatedAt);
    const dateB = new Date(b.updatedAt);

    // Compare the dates in descending order
    if (dateA > dateB) return 1;
    if (dateA < dateB) return -1;
    return 0;
  });
