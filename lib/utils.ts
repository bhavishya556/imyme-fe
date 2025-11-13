import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from 'moment'
import exp from "constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString : string) {
    // Parse the string date using Moment.js
    const date = moment(dateString);
    // Format the date as "DD MMMM, YYYY"
    const formattedDate = date.format('DD MMMM, YYYY');
    return formattedDate;
}

export function cleanToken(token: string) {
  return token.substring(7).trim().replace("token=", "");
}