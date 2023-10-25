import { NotAccessibleToAuthUsers } from "#/components/layouts/protectected-route";
import { NewList } from "#/components/views/lists/new-list";

export default function Lists() {
  return (
    <NotAccessibleToAuthUsers>
      <NewList />
    </NotAccessibleToAuthUsers>
  );
}
