import { useProductsContext } from "#/contexts/product-context";
import { formatNumberToCurrency } from "#/lib/utils";
import { Typography } from "../ui/typography";

export const TotalHeader = () => {
  const { selectedProductsArray, selectedProductsTotal } = useProductsContext();

  const totalText =
    selectedProductsArray.length === 1
      ? `1 Item`
      : `${selectedProductsArray.length} Items`;
  return (
    <div className="flex items-center justify-between">
      <Typography text={totalText} size={12} suppressHydrationWarning />
      <section className="flex items-center gap-2">
        <Typography text="Total Budget" size={12} />
        <Typography
          text={selectedProductsTotal}
          size={16}
          suppressHydrationWarning
        />
      </section>
    </div>
  );
};
