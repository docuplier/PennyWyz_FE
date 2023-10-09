import { IProduct } from "#/http";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const delayInSeconds = (seconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export const getPriceRange = (price: IProduct["pricedata"]) => {
  const lowRange = formatNumberToCurrency({ number: price.lowerrange });
  const highRange = formatNumberToCurrency({ number: price.upperrange });
  return `${lowRange} - ${highRange}`;
};

export const formatNumberToCurrency = ({
  number,
  currencyCode = "NGN",
  precision = 0,
  language = "en-US",
  removeCurrency = true,
  currencyElement = "₦",
}: {
  number: string | number;
  currencyCode?: string;
  precision?: number;
  language?: string;
  removeCurrency?: boolean;
  currencyElement?: string;
}): string => {
  const formatter = new Intl.NumberFormat(language, {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: precision ? 2 : 20,
  });

  let value = Number(number);

  if (isNaN(value)) {
    value = 0;
  }

  let result = formatter.format(value);

  if (removeCurrency) {
    result = result.replace(/[^0-9.,]+/g, currencyElement || "");
  }

  return result;
};
