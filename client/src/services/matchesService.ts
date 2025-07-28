
import { Match } from "../types/match";

const GOOGLE_DRIVE_API_URL = "https://www.googleapis.com/drive/v3/files/1KMNMacr7lkJ2KF9wBvsfnOvIGtiqkSu9?alt=media&key=AIzaSyAo2Jg5N-t3-tl3D2NSJr7KQJ7V1J2QQcc";

export const fetchMatches = async (): Promise<Match[]> => {
  try {
    const response = await fetch(GOOGLE_DRIVE_API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'max-age=300'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const matches: Match[] = await response.json();
    return matches;
  } catch (error) {
    console.error("Error fetching matches:", error);
    return [];
  }
};
