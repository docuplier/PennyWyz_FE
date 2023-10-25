import { useQuery } from "@tanstack/react-query";
import { API_URLS } from "../api-urls";
import { getQeuryStatus } from "./constants";
import { useInfiniteFetch } from "../hooks";

export const useGetProducts = ({
  search,
  enabled,
  country,
}: {
  search: string;
  enabled?: boolean;
  country: string;
}) => {
  const query = useInfiniteFetch<IProduct>({
    url: API_URLS.GET_PRODUCTS({ search, country }),
    enabled: enabled ? true : false,
  });

  return query;
};

export type IListProduct = {
  Product: {
    priceData: {
      price: number;
      lowerRange: number;
      upperRange: number;
      currency: string;
    };
    id: number;
    name: number;
    country: number;
    createdAt: string;
    updatedAt: string;
    categoryId: 1;
    subcategoryId: null;
  };
  createdAt: string;
  updatedAt: string;
  quantity: number;
  id: number;
  listId: string;
  productId: number;
};

export type IProduct = {
  priceData: {
    price: number;
    lowerRange: number;
    upperRange: number;
    currency: string;
  };
  id: number;
  name: number;
  country: number;
  createdAt: string;
  updatedAt: string;
  categoryId: 1;
  subcategoryId: null;
  listId: string;
  quantity: number;
  productId: number;
  listContentId: number;
  newUpdatedAt?: Date;
};
