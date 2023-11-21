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
  useRef,
} from "react";
import { useHydrationContext } from "./hydration-provider";
import { COUNTRY_LIST, CountryListProps } from "#/components/layouts/header";
import { formatNumberToCurrency, getRangeFormmater } from "#/lib/utils";
import { useRouter } from "next/router";
import { useAuthContext } from "./auth-context";
import { useDebouncedValue } from "@mantine/hooks";
import useReactGA from "#/http/hooks/useReactGA";

export type ProductsContextType = {
  handleSearchValue: (search: string) => void;
  handleSelect: (currentValue: IProduct) => void;
  getProducts: ReturnType<typeof useGetProducts>;
  open: boolean;
  setOpen: any;
  selectedProducts: { [key in string]: IProduct };
  searchValue: string;
  selectedProductsArray: IProduct[];
  selectedProductsTotal: string;
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
  handleSelectedCountry: (country: CountryListProps) => void;
  selectedCountry: CountryListProps;
  isListOwner: boolean;
  isFetchingList: boolean;
  handleCheckProduct: ({ productId }: { productId: string }) => void;
  countryToUse: string;
  isOnPublicListPage: boolean;
};

const ProductsContext = createContext<ProductsContextType>(
  {} as ProductsContextType
);

const SEARCH_SUGGESTION_LENGTH = 3;

const { getFromStore, clearStore, addToStore } = AppStorage();

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [searchValue, setSearchValue] = React.useState("");

  const [debouncedSearchValue] = useDebouncedValue(searchValue, 500);

  const { isAuthenticated, openAuthDialog } = useAuthContext();

  const params = useParams();
  const router = useRouter();

  const hasShownRegisterPopup = useRef(false);

  const acceptedListGroupRoute = ["/list/[id]", "/list/public/[id]"].includes(
    router.pathname
  );

  const isOnPublicListPage = ["/list/public/[id]"].includes(router.pathname);

  const listGroupId = acceptedListGroupRoute ? (params?.id as string) : "";

  const hasListGroupId = !!listGroupId;
  const { hydrated } = useHydrationContext();

  const [selectedProducts, setSelectedProducts] = React.useState<{
    [key in string]: IProduct;
  }>({});

  const [selectedCountry, setSelectedCountry] =
    React.useState<CountryListProps>(COUNTRY_LIST[0]);

  const { eventTrack } = useReactGA();

  const {
    getDbListQuery,
    updateListItemMutation,
    addListItemMutation,
    deleteListItemMutation,
    handleUpdateListGroup,
    dbListGroupQuery,
    isListOwner,
  } = useHandleListItem(listGroupId);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (hydrated) {
        if (
          hasListGroupId &&
          !dbListGroupQuery.isFetching &&
          acceptedListGroupRoute
        ) {
          setSelectedProducts(getDbListQuery());
        } else if (!acceptedListGroupRoute) {
          if (isAuthenticated) {
            setSelectedProducts({});
          } else {
            setSelectedProducts(getFromStore("USER_PRODUCTS") ?? {});
          }
        }
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasListGroupId, dbListGroupQuery.isFetching, hydrated]);

  const initalListGroupName = dbListGroupQuery?.data?.data?.name || "Untitled";
  const [open, setOpen] = React.useState(false);

  const selectedProductsArray = useMemo(() => {
    return sortWithUpdatedAtAndChecked(Object.values(selectedProducts));
  }, [selectedProducts]);

  const countryToUse =
    dbListGroupQuery?.data?.data?.country ??
    selectedProductsArray[0]?.country ??
    selectedCountry.value;

  const selectedProductsTotal = useMemo(() => {
    const mappedTotal = selectedProductsArray.reduce(
      (acc, curr) => {
        acc.lowerRange += curr?.quantity * curr?.priceData?.lowerRange || 0;
        acc.upperRange += curr?.quantity * curr?.priceData?.upperRange || 0;
        return acc;
      },
      { lowerRange: 0, upperRange: 0 }
    );

    return getRangeFormmater({
      upperRange: mappedTotal.upperRange,
      lowerRange: mappedTotal.lowerRange,
      country: countryToUse,
    });
  }, [selectedProductsArray]);

  const isEnabled =
    debouncedSearchValue?.trim().length >= SEARCH_SUGGESTION_LENGTH;

  // For auth user, we use the list group country
  // For non auth user, we use the country of the first item
  // if non auth user delete all list, we fall back to the country selected

  const getProducts = useGetProducts({
    search: debouncedSearchValue,
    country: countryToUse,
    enabled: isEnabled,
  });

  const handleSelectedCountry = (country: CountryListProps) => {
    setSelectedCountry(country);
  };

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
          createdAt: new Date().toISOString(),
        },
      };
      if (hasListGroupId) {
        addListItemMutation.mutate(
          {
            quantity: 1,
            productId: parsedProduct.id,
            listId: params.id,
          } as any,
          {
            onSuccess: (data) => {
              dbListGroupQuery.refetch();
            },
          }
        );
      } else {
        addToStore("USER_PRODUCTS", newProducts);
        setSelectedProducts(newProducts);
      }
      eventTrack({
        category: "LIST",
        label: "PRODUCT_ADDED",
        action: hasListGroupId
          ? `Added ${parsedProduct.name} to List:${listGroupId}`
          : `Added ${parsedProduct.name} to List`,
      });
    }
    setSearchValue("");
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

  const handleCheckProduct = ({ productId }: { productId: string }) => {
    const newProducts = { ...selectedProducts };
    const selectedProduct = newProducts[productId];

    const checkValue = selectedProduct.checked ? false : true;

    selectedProduct.checked = checkValue;

    if (hasListGroupId) {
      updateListItemMutation.mutate({
        idParams: `/${selectedProduct.listContentId}`,
        checked: checkValue,
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

  useEffect(() => {
    const showPopup =
      selectedProductsArray.length >= 3 &&
      !hasShownRegisterPopup.current &&
      !isAuthenticated &&
      isOnPublicListPage;

    if (showPopup) {
      openAuthDialog();
      hasShownRegisterPopup.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProductsArray.length, isAuthenticated]);

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
        handleSelectedCountry,
        selectedCountry,
        isListOwner,
        isFetchingList: dbListGroupQuery.isLoading && !!isAuthenticated,
        handleCheckProduct,
        countryToUse,
        isOnPublicListPage,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useProductsContext = () => useContext(ProductsContext);

const sortWithUpdatedAtAndChecked = (product: IProduct[]) =>
  [...product].sort((a, b) => {
    if (a.checked && !b.checked) {
      return 1;
    } else if (!a.checked && b.checked) {
      return -1;
    }

    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    // Compare the dates in descending order
    if (dateA > dateB) return 1;
    if (dateA < dateB) return -1;
    return 0;
  });
