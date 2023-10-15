import { Typography } from "#/components/ui/typography";
import { SearchBar } from "#/components/ui/search-bar";
import { AppLayout } from "#/components/layouts/app-layout";
import { AnimatePresence } from "framer-motion";
import { CSRWrapper } from "#/components/layouts/CSRWrapper";
import { SwipeableCard } from "#/components/ui/swipeable-card";
import { ListGroupContainer } from "#/components/views/all-lists/list-group-container";
import { useListGroup } from "#/components/views/all-lists/hooks/useListGroup";

export default function AllLists() {
  const { creatNewListGroup, listGroup, handleDeleteListGroup } =
    useListGroup();

  return (
    <>
      <AppLayout>
        <section className="space-y-[20px] mb-[20px] mt-[20px]">
          <Typography
            text="All Lists"
            size={24}
            className="font-bold"
            as="h3"
          />
        </section>
        <div className="w-full">
          <div className="mt-[20px] space-y-2">
            <ListGroupContainer
              listGroup={listGroup}
              handleDeleteListGroup={handleDeleteListGroup}
            />
            <SearchBar
              placeholder="New List"
              navigationAction={creatNewListGroup}
            />
          </div>
        </div>
      </AppLayout>
    </>
  );
}
