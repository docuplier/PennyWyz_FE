import { IProduct } from "#/http";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DayJs } from ".";

const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

export const isProduction = () => environment === "production";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const delayInSeconds = (seconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export const getPriceRange = (
  price: IProduct["priceData"],
  country: string
) => {
  const currencyData =
    GET_CURRENCY_DETAILS[
      country.toUpperCase() as keyof typeof GET_CURRENCY_DETAILS
    ] ?? GET_CURRENCY_DETAILS.NG;

  const lowRange = formatNumberToCurrency({
    number: price.lowerRange,
    ...currencyData,
  });
  const highRange = formatNumberToCurrency({
    number: price.upperRange,
    ...currencyData,
  });
  return `${lowRange} - ${highRange}`;
};

const GET_CURRENCY_DETAILS = {
  NG: {
    currencyCode: "NGN",
    language: "en-us",
    removeCurrency: true,
    precision: 0,
  },
  UK: {
    currencyCode: "GBP",
    language: "en-GB",
    removeCurrency: false,
    precision: 2,
  },
};

export const formatNumberToCurrency = ({
  number,
  currencyCode = "NGN",
  precision,
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
    maximumFractionDigits: precision ?? 8,
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

export const getDecodedToken = (token: string) => {
  if (!token) return null;
  var base64Url = token.split(".")[1];
  var base64 = base64Url?.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const getFormattedDate = (date: string) => {
  return date ? DayJs(date).format("MM/DD/YY") : "";
};

export const toCamel = (o: any) => {
  var newO: any, origKey, newKey, value;
  if (o instanceof Array) {
    return o.map(function (value) {
      if (typeof value === "object") {
        value = toCamel(value);
      }
      return value;
    });
  } else {
    newO = {};
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = (
          origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey
        ).toString();
        value = o[origKey];
        if (
          value instanceof Array ||
          (value !== null && value.constructor === Object)
        ) {
          value = toCamel(value);
        }
        newO[newKey] = value;
      }
    }
  }
  return newO;
};

export const debounce = ({
  func,
  wait = 1000,
}: {
  func: any;
  wait?: number;
}) => {
  let timeout: any;

  return function executedFunction(...args: any[]) {
    const later = () => {
      timeout = null;

      // Execute the callback
      func(...args);
    };

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
  };
};

export const generateRandomCharacters = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
};

export const getRangeFormmater = ({
  upperRange,
  lowerRange,
  country,
}: {
  upperRange: number;
  lowerRange: number;
  country: string;
}) => {
  const currencyData =
    GET_CURRENCY_DETAILS[
      country?.toUpperCase() as keyof typeof GET_CURRENCY_DETAILS
    ] ?? GET_CURRENCY_DETAILS.NG;

  return `${formatNumberToCurrency({
    number: lowerRange,
    ...currencyData,
  })} - ${formatNumberToCurrency({ number: upperRange, ...currencyData })}`;
};

export const getWindow = () =>
  typeof window !== "undefined" ? window : undefined;
