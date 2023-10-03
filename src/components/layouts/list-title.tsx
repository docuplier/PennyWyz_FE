import { PencilLine, Share2Icon } from "lucide-react";
import { useState } from "react";

export const ListTitle = () => {
  const [value, setValue] = useState();
  const [width, setWidth] = useState(5);

  const handleKeyDown = (evt: any) => {
    setWidth(evt.target.value.length);

    if (evt.target.value.length < 2) {
      setWidth(1);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <section className="flex  items-center gap-3">
        <input
          placeholder="Untitled"
          style={{ width: width - 1 + "ch", minWidth: "6ch" }}
          autoFocus
          onBlur={handleKeyDown}
          value={value}
          onKeyDown={handleKeyDown}
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
