import { ReactNode } from "react";
import { internalAxios } from "./http";
import {
  QueryClient,
  QueryClientProvider,
  UseMutationOptions,
  useMutation,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const defaultQueryFn = async ({ queryKey }: { queryKey: any }) => {
  const { data } = await internalAxios.get(`${queryKey[0]}`);
  return data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      retry: 0,
      refetchOnWindowFocus: false,

      staleTime: 0,
      cacheTime: 5 * 60 * 1000,
      // staleTime: 5 * 60 * 1000,
      // refetchInterval: 5 * 60 * 1000, // 3 minutes
    },
  },
});

type IAppMutate = {
  url: string;
  method?: "POST" | "PATCH" | "DELETE" | "PUT";
  hasIdParams?: boolean;
} & UseMutationOptions;

export const ApiClientProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
};

export const useAppMutation = ({
  url,
  method = "POST",
  hasIdParams,
  ...rest
}: IAppMutate) => {
  return useMutation<any>({
    mutationFn: (data) =>
      internalAxios({
        method,
        url: !!hasIdParams
          ? `${url}${(data as any).idParams ?? (data as any).id}`
          : url,
        data,
      }),
    ...rest,
  });
};
