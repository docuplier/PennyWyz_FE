import { useInfiniteQuery } from "@tanstack/react-query";
import { internalAxios } from "../http";
import { useRef } from "react";

const PAGE_SIZE = 10;

export type TUsePaginatedFetch = {
  url: string;
  pageSize?: number | null;
  options?: Record<string, any>;
  enabled?: boolean;
};

export const usePaginatedFetch = <T>({
  url,
  pageSize,
  enabled = true,
}: TUsePaginatedFetch) => {
  const newPageSize = pageSize ?? PAGE_SIZE;
  const currenPageRef = useRef(1);
  const infiniteQuery = useInfiniteQuery(
    [url],
    async ({ pageParam = 1 }) => {
      const stringToUse = url?.includes("?") ? "&" : "?";
      const newUrl = `${url}${stringToUse}page=${pageParam}&limit=${newPageSize}`;
      const res = await internalAxios.get(newUrl);
      return res.data;
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.length >= PAGE_SIZE) {
          return (currenPageRef.current = currenPageRef.current + 1);
        }
      },
      getPreviousPageParam: (lastPage) => {
        const factor = currenPageRef.current > 1 ? -1 : 0;
        currenPageRef.current += factor;
      },
      enabled,
    }
  );

  const { data, fetchNextPage } = infiniteQuery;
  // console.log({ data, infiniteQuery });

  const concatenatedData: T[] = []
    .concat(...(data?.pages ?? [])?.map((data) => data?.data))
    .filter((e) => e != undefined);

  return {
    ...infiniteQuery,
    concatenatedData,
    handleNextPage: fetchNextPage,
    isLoadingInitialData: infiniteQuery.isFetching && !infiniteQuery.data,
  };
};

const getPaginatedData = ({
  data,
  keyToExtract,
  newPageSize,
}: {
  data: any;
  keyToExtract: string;
  newPageSize: number;
}) => {
  // const paginatedData = data?.pages[0];

  const extractedData = data?.[keyToExtract];
  const totalPages = data?.count || 10000;

  const isEmpty = extractedData?.length === 0;

  const lessThanPageSize = totalPages
    ? extractedData?.length < newPageSize
    : true;

  const canLoadMore = extractedData?.length === newPageSize;

  const isEndPage = isEmpty || lessThanPageSize;

  return {
    isEndPage,
    canLoadMore,
  };
};
