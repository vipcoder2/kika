import { format, parseISO } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

export const getUserTimezone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const formatTimeWithTimezone = (date: string, time: string): string => {
  try {
    const matchDateTime = parseISO(`${date}T${time}`);
    const userTimezone = getUserTimezone();
    const zonedTime = utcToZonedTime(matchDateTime, userTimezone);
    return format(zonedTime, 'HH:mm');
  } catch (error) {
    return time;
  }
};

export const formatMatchDateWithTimezone = (date: string, time: string): string => {
  try {
    const matchDateTime = parseISO(`${date}T${time}`);
    const userTimezone = getUserTimezone();
    const zonedTime = utcToZonedTime(matchDateTime, userTimezone);
    return format(zonedTime, 'EEE, MMM d');
  } catch (error) {
    return date;
  }
};

export const getTimezoneAbbreviation = (): string => {
  try {
    const timezone = getUserTimezone();
    const now = new Date();
    const timeZoneOffset = now.getTimezoneOffset();
    const offsetHours = Math.abs(timeZoneOffset / 60);
    const offsetMins = Math.abs(timeZoneOffset % 60);
    const sign = timeZoneOffset <= 0 ? '+' : '-';
    return `UTC${sign}${offsetHours.toString().padStart(2, '0')}:${offsetMins.toString().padStart(2, '0')}`;
  } catch (error) {
    return 'UTC';
  }
};