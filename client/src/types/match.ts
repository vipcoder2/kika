export interface Match {
  id: string;
  clubs: {
    home: {
      name: string;
      logo: string;
    };
    away: {
      name: string;
      logo: string;
    };
  };
  streams: {
    src1?: string;
    src2?: string;
    hls1?: string;
    hls2?: string;
    mhls1?: string;
    mhls2?: string;
  };
  score: {
    home: number;
    away: number;
    status: 'LIVE' | 'FT' | 'Upcoming';
    type?: 'HOT';
  };
  competition: {
    id: string;
    name: string;
    matchday: number;
  };
  kickoff: {
    date: string;
    time: string;
    timezone: string;
  };
  venue: {
    name: string;
    city: string;
    country: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateMatchData {
  clubs: {
    home: {
      name: string;
      logo: string;
    };
    away: {
      name: string;
      logo: string;
    };
  };
  streams: {
    src1?: string;
    src2?: string;
    hls1?: string;
    hls2?: string;
    mhls1?: string;
    mhls2?: string;
  };
  score: {
    home: number;
    away: number;
    status: 'LIVE' | 'FT' | 'Upcoming';
    type?: 'HOT';
  };
  competition: {
    id: string;
    name: string;
    matchday: number;
  };
  kickoff: {
    date: string;
    time: string;
    timezone: string;
  };
  venue: {
    name: string;
    city: string;
    country: string;
  };
}

export interface UpdateMatchData extends Partial<CreateMatchData> {
  id: string;
}