export interface Club {
  name: string;
  logo: string;
}

export interface Score {
  home: number;
  away: number;
  status: string; // "FT" (Full Time), "LIVE", "" (Upcoming)
  type?: string;
}

export interface Competition {
  id: string;
  name: string;
  matchday: number;
}

export interface Kickoff {
  date: string;
  time: string;
  timezone: string;
}

export interface Venue {
  name: string;
  city: string;
  country: string;
}

export interface Streams {
  src1: string;
  src2: string;
  hls1: string;
  hls2: string;
  mhls1: string;
  mhls2: string;
}

export interface Match {
  id: string;
  clubs: {
    home: Club;
    away: Club;
  };
  streams: Streams;
  score: Score;
  competition: Competition;
  kickoff: Kickoff;
  venue: Venue;
}

export interface Highlight {
  title: string;
  competition: string;
  thumbnail: string;
  embed: string;
  date: string;
  url: string;
}