import { format, parseISO } from "date-fns";

export const formatMatchDate = (date: string, time: string): string => {
  try {
    const dateTime = `${date}T${time}:00`;
    const parsedDate = parseISO(dateTime);
    return format(parsedDate, "EEE, MMM d, yyyy • h:mm a");
  } catch (error) {
    console.error("Error formatting date:", error);
    return `${date} ${time}`;
  }
};

export const isMatchLive = (date: string, time: string, status?: string): boolean => {
  if (status === "LIVE" || status === "HT") return true;

  const now = new Date();
  const matchDateTime = parseISO(`${date}T${time}`);
  const timeDiff = now.getTime() - matchDateTime.getTime();

  // Consider match live if it started within the last 2 hours
  return timeDiff >= 0 && timeDiff <= 2 * 60 * 60 * 1000;
};

export const isMatchFinished = (date: string, time: string, status?: string): boolean => {
  if (status === "FT" || status === "AET" || status === "PEN") return true;

  const now = new Date();
  const matchDateTime = parseISO(`${date}T${time}`);
  const timeDiff = now.getTime() - matchDateTime.getTime();

  // Consider match finished if it started more than 2 hours ago
  return timeDiff > 2 * 60 * 60 * 1000;
};

export const isMatchToday = (date: string): boolean => {
  const today = new Date();
  const matchDate = new Date(date);
  return (
    today.getDate() === matchDate.getDate() &&
    today.getMonth() === matchDate.getMonth() &&
    today.getFullYear() === matchDate.getFullYear()
  );
};

export const isMatchUpcoming = (date: string, time: string): boolean => {
  const now = new Date();
  const matchDate = new Date(`${date}T${time}:00Z`);
  return matchDate > now;
};