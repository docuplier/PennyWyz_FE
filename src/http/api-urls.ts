export const API_URLS = {
  GET_PRODUCTS: ({ search, country }: { search: string; country: string }) => {
    return `/products/?search=${search}&country=${country}`;
  },

  // AUTH
  LOGIN: "/users/login",
  // AUTH
  SIGN_UP: "/users",

  //LIST-GROUP
  GET_ALL_LIST_GROUP: ({ country }: { country: string }) =>
    `/lists?country=${country}&page=1&limt=10`,
  CREATE_LIST_GROUP: "/lists",
  UPDATE_LIST_GROUP: `/lists`,
  DELETE_LIST_GROUP: `/lists`,
  GET_SINGLE_LIST_GROUP: (id: string) => `/lists/${id}`,

  // list-item
  GET_ALL_LIST_CONTENTS: (listId: string) => `/list-contents?listId=${listId}`,
  ADD_LIST_ITEM: `/list-contents`,
  UPDATE_LIST_ITEM: `/list-contents`,
  DELETE_LIST_ITEM: (listId: string) => `/list-contents/${listId}`,
};
