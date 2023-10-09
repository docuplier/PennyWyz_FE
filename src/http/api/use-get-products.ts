import { useQuery } from "@tanstack/react-query";
import { API_URLS } from "../api-urls";
import { getQeuryStatus } from "./constants";
import { useInfiniteFetch } from "../hooks";

export const useGetProducts = ({
  search,
  enabled,
}: {
  search: string;
  enabled?: boolean;
}) => {
  const query = useInfiniteFetch<IProduct>({
    url: API_URLS.GET_PRODUCTS({ search }),
    enabled: enabled ? true : false,
  });

  return query;
};

export type IProduct = {
  pricedata: {
    price: number;
    lowerrange: number;
    upperrange: number;
    currency: string;
  };
  id: number;
  name: number;
  country: number;
  createdat: "2023-10-08T16:09:09.893Z";
  updatedat: "2023-10-08T16:09:09.893Z";
  categoryid: 1;
  subcategoryid: null;
  quantity: number;
};
