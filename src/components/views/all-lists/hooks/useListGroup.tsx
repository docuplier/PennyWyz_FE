import { useAppMutation } from "#/http";
import { API_URLS } from "#/http/api-urls";
import { getQeuryStatus } from "#/http/api/constants";
import { DayJs } from "#/lib";
import { generateRandomCharacters } from "#/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export type TListGroup = {
  name: string;
  userId: string;
  id: string;
  updatedAt: string;
  createdAt: string;
};

export const useListGroup = () => {
  const data = useQuery<{ data: TListGroup[] }>(
    [API_URLS.GET_ALL_LIST_GROUP],
    {}
  );

  const router = useRouter();

  const listGroupQuery = getQeuryStatus(data);
  const createListGroupMutaion = useAppMutation({
    url: API_URLS.CREATE_LIST_GROUP,
  });

  const deleteListGroupMutation = useAppMutation({
    url: API_URLS.DELETE_LIST_GROUP,
    hasIdParams: true,
    method: "DELETE",
  });

  const creatNewListGroup = () => {
    const newDate = DayJs().format("DD/MM/YY");

    const listName = `${newDate}-${generateRandomCharacters(3)}`;

    createListGroupMutaion.mutate({ name: listName } as any, {
      onSuccess: (data) => {
        const newListGroup = data?.data?.data as TListGroup;

        router.push(`/list/${newListGroup.id}`);
      },
    });
  };

  const handleDeleteListGroup = (listGroupId: string) => {
    deleteListGroupMutation.mutate({ idParams: `/${listGroupId}` } as any, {
      onSuccess: () => {
        listGroupQuery.refetch();
      },
    });
  };

  return {
    listGroupQuery,
    listGroup: (listGroupQuery?.data ?? []) as TListGroup[],
    creatNewListGroup,
    handleDeleteListGroup,
  };
};
