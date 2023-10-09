import React from "react";
import { TUsePaginatedFetch, usePaginatedFetch } from "./use-paginated-fetch";
import { useInView } from "react-intersection-observer";

export const useInfiniteFetch = <T>(props: TUsePaginatedFetch) => {
  const scrollRef = useInView();

  const paginatedFetch = usePaginatedFetch<T>(props);

  React.useEffect(() => {
    if (scrollRef.inView) {
      props.enabled && paginatedFetch.handleNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollRef.inView, props.enabled]);

  return {
    scrollRef,
    paginatedFetch,
  };
};
