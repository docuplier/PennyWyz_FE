import { ProtectedRoute } from "#/components/layouts/protectected-route";
import { NewList } from "#/components/views/lists/new-list";

export default function ListWithId() {
  return (
    <ProtectedRoute>
      <NewList />;
    </ProtectedRoute>
  );
}
