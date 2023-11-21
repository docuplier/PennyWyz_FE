import { useAlertDialog } from "#/contexts/alert-dialog-context";
import { useAuthContext } from "#/contexts/auth-context";
import { debounce } from "#/lib/utils";
import { PencilLine, Share2Icon } from "lucide-react";
import { useState } from "react";

export const ListTitle = ({
  initialValue,
  handleSaveTitle,
  canEdit = false,
}: {
  initialValue: string;
  handleSaveTitle: (title: string) => void;
  canEdit?: boolean;
}) => {
  const { toggleShareDialog } = useAlertDialog();
  const [value, setValue] = useState(initialValue ?? "");
  const { isAuthenticated, openAuthDialog } = useAuthContext();

  const handleKeyDown = (evt: any) => {
    setValue(evt.target.value);
  };

  return (
    <div className="flex items-center justify-between">
      <section className="flex items-center gap-3">
        <input
          placeholder="Untitled"
          style={{ width: value.length - 1 + "ch", minWidth: "6ch" }}
          onBlur={handleKeyDown}
          value={value}
          // onKeyDown={handleKeyDown}
          onChange={(e) => {
            handleKeyDown(e);
            if (e.target.value.length >= 3) {
              handleSaveTitle(e.target.value);
            }
          }}
          disabled={!canEdit}
          className="border-none bg-transparent foucs:border-none focus:outline-none text-[24px] "
        />
        {canEdit ? (
          <PencilLine size={20} className="text-pennywyz-ash-t2" />
        ) : null}
      </section>
      <section>
        <button>
          <Share2Icon
            size={20}
            onClick={() =>
              isAuthenticated ? toggleShareDialog() : openAuthDialog()
            }
          />
        </button>
      </section>
    </div>
  );
};
