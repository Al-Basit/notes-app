import { type ClassValue, clsx } from "clsx"
import moment from "moment";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function truncateString(str: string, num: number): string {
  // Check if the string length is greater than the specified number
  if (str.length > num) {
    // Return the truncated string with ellipsis
    return str.slice(0, num) + '...';
  }
  // Return the original string if no truncation is needed
  return str;
}

export function stripHtmlTags(htmlContent:string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  return doc.body.textContent || "";
}

export function formatDateRange(startDate: string, endDate: string) {
  const startFormatted = moment(startDate).format("MMM DD, YYYY")
  const endFormatted = moment(endDate).format("MMM DD, YYYY")

  return `${startFormatted} - ${endFormatted}`
}

export const formatToTwoDecimals = (value: number | string): string => {
  return parseFloat(value as string).toFixed(2);
};

