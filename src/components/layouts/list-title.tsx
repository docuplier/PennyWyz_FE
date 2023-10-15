import { debounce } from "#/lib/utils";
import { PencilLine, Share2Icon } from "lucide-react";
import { useState } from "react";

export const ListTitle = ({
  initialValue,
  handleSaveTitle,
}: {
  initialValue: string;
  handleSaveTitle: (title: string) => void;
}) => {
  const [value, setValue] = useState(initialValue);

  const handleKeyDown = (evt: any) => {
    setValue(evt.target.value);
    if (evt.target.value.length >= 3) {
      handleSaveTitle(value);
    }
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
          onChange={handleKeyDown}
          className="border-nne foucs:border-none focus:outline-none text-[24px] "
        />
        <PencilLine size={20} className="text-pennywyz-ash-t2" />
      </section>
      <section>
        <button>
          <Share2Icon size={20} />
        </button>
      </section>
    </div>
  );
};
