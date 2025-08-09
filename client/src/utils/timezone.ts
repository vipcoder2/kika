
export function getUserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function convertToUserTimezone(date: string, time: string, sourceTimezone: string = 'GMT'): {
  localDate: string;
  localTime: string;
  timezone: string;
} {
  try {
    // Create a date string in the source timezone
    const dateTimeString = `${date}T${time}:00`;
    const sourceDate = new Date(dateTimeString + (sourceTimezone === 'GMT' ? 'Z' : ''));
    
    // Get user's timezone
    const userTimezone = getUserTimezone();
    
    // Convert to user's local time
    const localDate = sourceDate.toLocaleDateString('en-CA'); // YYYY-MM-DD format
    const localTime = sourceDate.toLocaleTimeString('en-GB', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    return {
      localDate,
      localTime,
      timezone: userTimezone,
    };
  } catch (error) {
    console.error('Error converting timezone:', error);
    return {
      localDate: date,
      localTime: time,
      timezone: sourceTimezone,
    };
  }
}

export function formatRelativeTime(date: string, time: string, sourceTimezone: string = 'GMT'): string {
  try {
    const dateTimeString = `${date}T${time}:00`;
    const sourceDate = new Date(dateTimeString + (sourceTimezone === 'GMT' ? 'Z' : ''));
    const now = new Date();
    
    const diffMs = sourceDate.getTime() - now.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMinutes < 60 && diffMinutes > -60) {
      return diffMinutes > 0 ? `in ${diffMinutes}m` : `${Math.abs(diffMinutes)}m ago`;
    } else if (diffHours < 24 && diffHours > -24) {
      return diffHours > 0 ? `in ${diffHours}h` : `${Math.abs(diffHours)}h ago`;
    } else {
      return diffDays > 0 ? `in ${diffDays}d` : `${Math.abs(diffDays)}d ago`;
    }
  } catch (error) {
    return '';
  }
}
