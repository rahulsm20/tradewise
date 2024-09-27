import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatToLocalCurrency(
  amount: number,
  locale = "en-US",
  currency = "USD"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}

export const weiToEth = (
  wei: string,
  returnType?: "string" | "number"
): string | number => {
  const bigIntWei = BigInt(wei);
  const ether = bigIntWei / BigInt(1e18); // Get the whole number part
  const remainder = bigIntWei % BigInt(1e18); // Get the remainder
  const decimal = remainder.toString().padStart(18, "0"); // Convert remainder to a string and pad with leading zeros
  if (returnType === "number") {
    return parseFloat(`${ether}.${decimal.slice(0, 6)}`); // Concatenate and limit decimals
  }
  return `${ether}.${decimal.slice(0, 6)}`; // Concatenate and limit decimals
};
