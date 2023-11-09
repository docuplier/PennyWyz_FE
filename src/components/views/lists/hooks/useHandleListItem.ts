import {
  IListProduct,
  IProduct,
  TSingleListGroup,
  useAppMutation,
} from "#/http";
import { API_URLS } from "#/http/api-urls";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../auth/hooks/useAuth";
import { useAuthContext } from "#/contexts/auth-context";
import { TListGroup } from "../../all-lists/hooks/useListGroup";
import { useEffect, useState } from "react";

export const useHandleListItem = (listGroupId: string) => {
  const { isAuthenticated, authUser } = useAuthContext();
  const enableQuery = !!listGroupId;

  // const dbListQuery = useQuery<{ data: IListProduct[] }>(
  //   [API_URLS.GET_ALL_LIST_CONTENTS(listGroupId)],
  //   {
  //     enabled: enableQuery ? true : false,
  //   }
  // );

  const dbListGroupQuery = useQuery<{ data: TSingleListGroup }>(
    [API_URLS.GET_SINGLE_LIST_GROUP(listGroupId)],
    {
      enabled: enableQuery ? true : false,
    }
  );

  const addListItemMutation = useAppMutation({ url: API_URLS.ADD_LIST_ITEM });
  const updateListItemMutation = useAppMutation({
    url: API_URLS.UPDATE_LIST_ITEM,
    hasIdParams: true,
    method: "PUT",
  });
  const deleteListItemMutation = useAppMutation({
    url: API_URLS.UPDATE_LIST_ITEM,
    hasIdParams: true,
    method: "DELETE",
  });

  const updateListGroupMutation = useAppMutation({
    url: API_URLS.UPDATE_LIST_GROUP,
    hasIdParams: true,
    method: "PUT",
  });

  const getDbListQuery = () => {
    return (dbListGroupQuery.data?.data?.ListContents ?? [])?.reduce(
      (acc, curr) => {
        const { categoryId, subcategoryId, country, name } = curr.Product;
        acc[curr.Product.id] = {
          priceData: curr.Product.priceData,
          categoryId,
          subcategoryId,
          country,
          createdAt: curr.createdAt,
          listId: curr.listId,
          quantity: curr.quantity,
          name,
          id: curr.id,
          updatedAt: curr.updatedAt,
          listContentId: curr.id,
          productId: curr.Product.id,
        };

        return acc;
      },
      {} as { [key in string]: IProduct }
    );
  };

  const handleUpdateListGroup = ({
    name,
    listGroupId,
  }: {
    name: string;
    listGroupId: string;
  }) => {
    updateListGroupMutation.mutate({
      idParams: `/${listGroupId}`,
      name,
    } as any);
  };

  const isListOwner = dbListGroupQuery?.data?.data?.userId === authUser?.id;

  return {
    getDbListQuery,
    // dbListQuery,
    addListItemMutation,
    updateListItemMutation,
    deleteListItemMutation,
    handleUpdateListGroup,
    dbListGroupQuery,
    isListOwner,

    // updateListItemMutation,
    // deleteListItemMutation,
  };
};
