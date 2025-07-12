import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from 'moment'

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