import { UseQueryResult } from "@tanstack/react-query";

export const getQeuryStatus = <T = any>(query: UseQueryResult) => {
  const isFetchingInitialData = query?.isFetching && !query?.data;

  return {
    ...query,
    data: (query?.data as any)?.data as T,
    isFetchingInitialData,
  };
};
