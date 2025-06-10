import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from 'moment-timezone'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export async function fakeFetchData(ms: number = 10000) {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Fetched Data from Server"), ms);
  });
}

export function formatDate(dateStr: string, isEndTime = false) {

  let dateObj: moment.Moment;

  if (isEndTime) {
    dateObj = moment(dateStr, 'DD/MM/YYYY').endOf('day');
  } else {
    dateObj = moment(dateStr, 'DD/MM/YYYY').startOf('day');
  }

  const formattedDate = dateObj.format('YYYY-MM-DD HH:mm:ss');
  return formattedDate;
}


export function debounce<F extends (...args: any[]) => any>(
  func: F,
  timeout = 300
): (...args: Parameters<F>) => void {
  let timer: NodeJS.Timeout | undefined;
  return (...args: Parameters<F>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), timeout);
  };
}

export const formatPhoneNumber = (phone: any) => {
  if (!phone) return "";
  const phoneDigits = phone.replace(/\D/g, "");

  const formattedPhone = phoneDigits.replace(
    /(\d{3})(\d{3})(\d{4})/,
    "$1-$2-$3"
  );

  return formattedPhone;
};