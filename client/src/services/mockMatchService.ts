import { Match, CreateMatchData, UpdateMatchData } from '@/types/match';

// Mock data for testing
const mockMatches: Match[] = [
  {
    id: '1',
    clubs: {
      home: {
        name: 'Manchester United',
        logo: 'https://logos-world.net/wp-content/uploads/2020/06/Manchester-United-Logo.png'
      },
      away: {
        name: 'Liverpool',
        logo: 'https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png'
      }
    },
    competition: {
      id: 'pl',
      name: 'Premier League',
      matchday: 15
    },
    score: {
      home: 2,
      away: 1,
      status: 'LIVE',
      type: 'HOT'
    },
    kickoff: {
      date: '2024-01-15',
      time: '15:00',
      timezone: 'GMT'
    },
    venue: {
      name: 'Old Trafford',
      city: 'Manchester',
      country: 'England'
    },
    streams: {
      hls1: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      src1: 'https://example.com/stream1'
    }
  },
  {
    id: '2',
    clubs: {
      home: {
        name: 'Barcelona',
        logo: 'https://logos-world.net/wp-content/uploads/2020/06/Barcelona-Logo.png'
      },
      away: {
        name: 'Real Madrid',
        logo: 'https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-Logo.png'
      }
    },
    competition: {
      id: 'll',
      name: 'La Liga',
      matchday: 10
    },
    score: {
      home: 0,
      away: 0,
      status: 'Upcoming',
      type: 'HOT'
    },
    kickoff: {
      date: '2024-01-16',
      time: '20:00',
      timezone: 'CET'
    },
    venue: {
      name: 'Camp Nou',
      city: 'Barcelona',
      country: 'Spain'
    },
    streams: {
      hls1: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    }
  },
  {
    id: '3',
    clubs: {
      home: {
        name: 'Chelsea',
        logo: 'https://logos-world.net/wp-content/uploads/2020/06/Chelsea-Logo.png'
      },
      away: {
        name: 'Arsenal',
        logo: 'https://logos-world.net/wp-content/uploads/2020/06/Arsenal-Logo.png'
      }
    },
    competition: {
      id: 'pl',
      name: 'Premier League',
      matchday: 14
    },
    score: {
      home: 3,
      away: 2,
      status: 'FT',
      type: ''
    },
    kickoff: {
      date: '2024-01-14',
      time: '17:30',
      timezone: 'GMT'
    },
    venue: {
      name: 'Stamford Bridge',
      city: 'London',
      country: 'England'
    },
    streams: {
      hls1: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    }
  },
  {
    id: '4',
    clubs: {
      home: {
        name: 'Bayern Munich',
        logo: 'https://logos-world.net/wp-content/uploads/2020/06/Bayern-Munich-Logo.png'
      },
      away: {
        name: 'Borussia Dortmund',
        logo: 'https://logos-world.net/wp-content/uploads/2020/06/Borussia-Dortmund-Logo.png'
      }
    },
    competition: {
      id: 'bl',
      name: 'Bundesliga',
      matchday: 12
    },
    score: {
      home: 1,
      away: 0,
      status: 'LIVE',
      type: ''
    },
    kickoff: {
      date: '2024-01-15',
      time: '18:30',
      timezone: 'CET'
    },
    venue: {
      name: 'Allianz Arena',
      city: 'Munich',
      country: 'Germany'
    },
    streams: {
      hls1: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
    }
  }
];

let matches = [...mockMatches];
let nextId = 5;

export const mockMatchService = {
  // Get all matches
  async getAllMatches(): Promise<Match[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...matches]), 300);
    });
  },

  // Get match by ID
  async getMatchById(id: string): Promise<Match | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const match = matches.find(m => m.id === id);
        resolve(match || null);
      }, 200);
    });
  },

  // Get hot matches
  async getHotMatches(): Promise<Match[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const hotMatches = matches.filter(match => match.score.type === 'HOT');
        resolve(hotMatches);
      }, 300);
    });
  },

  // Get live matches
  async getLiveMatches(): Promise<Match[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const liveMatches = matches.filter(match => match.score.status === 'LIVE');
        resolve(liveMatches);
      }, 300);
    });
  },

  // Get upcoming matches
  async getUpcomingMatches(): Promise<Match[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const upcomingMatches = matches.filter(match => match.score.status === 'Upcoming');
        resolve(upcomingMatches);
      }, 300);
    });
  },

  // Get finished matches
  async getFinishedMatches(): Promise<Match[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const finishedMatches = matches.filter(match => match.score.status === 'FT');
        resolve(finishedMatches);
      }, 300);
    });
  },

  // Create match
  async createMatch(matchData: CreateMatchData): Promise<Match> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newMatch: Match = {
          id: nextId.toString(),
          ...matchData,
        };
        matches.push(newMatch);
        nextId++;
        resolve(newMatch);
      }, 500);
    });
  },

  // Update match
  async updateMatch(updateData: UpdateMatchData): Promise<Match> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = matches.findIndex(m => m.id === updateData.id);
        if (index === -1) {
          reject(new Error('Match not found'));
          return;
        }
        
        const { id, ...matchData } = updateData;
        const updatedMatch = { ...matches[index], ...matchData };
        matches[index] = updatedMatch;
        resolve(updatedMatch);
      }, 500);
    });
  },

  // Delete match
  async deleteMatch(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = matches.findIndex(m => m.id === id);
        if (index === -1) {
          reject(new Error('Match not found'));
          return;
        }
        
        matches.splice(index, 1);
        resolve();
      }, 300);
    });
  },
};