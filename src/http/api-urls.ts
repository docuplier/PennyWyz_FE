export const API_URLS = {
  GET_PRODUCTS: ({ search }: { search: string }) => {
    return `/products/?search=${search}`;
  },
};
