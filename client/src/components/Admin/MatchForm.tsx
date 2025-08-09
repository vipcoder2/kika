import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreateMatchData, Match } from '@/types/match';

const matchSchema = z.object({
  homeTeam: z.string().min(1, 'Home team is required'),
  awayTeam: z.string().min(1, 'Away team is required'),
  homeLogo: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  awayLogo: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  competitionName: z.string().min(1, 'Competition name is required'),
  competitionId: z.string().min(1, 'Competition ID is required'),
  matchday: z.coerce.number().min(1, 'Matchday must be 1 or greater'),
  status: z.enum(['LIVE', 'FT', 'Upcoming']),
  homeScore: z.coerce.number().min(0, 'Score must be 0 or greater'),
  awayScore: z.coerce.number().min(0, 'Score must be 0 or greater'),
  type: z.enum(['HOT', 'REGULAR']).optional(),
  kickoffDate: z.string().min(1, 'Kickoff date is required'),
  kickoffTime: z.string().min(1, 'Kickoff time is required'),
  venueName: z.string().min(1, 'Venue name is required'),
  venueCity: z.string().min(1, 'Venue city is required'),
  venueCountry: z.string().min(1, 'Venue country is required'),
  src1: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  src2: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  hls1: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  hls2: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  mhls1: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  mhls2: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

type MatchFormData = z.infer<typeof matchSchema>;

interface MatchFormProps {
  match?: Match;
  onSubmit: (data: CreateMatchData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const competitions = [
  { id: 'epl', name: 'Premier League' },
  { id: 'ucl', name: 'Champions League' },
  { id: 'laliga', name: 'La Liga' },
  { id: 'seriea', name: 'Serie A' },
  { id: 'bundesliga', name: 'Bundesliga' },
];

export function MatchForm({ match, onSubmit, onCancel, isLoading }: MatchFormProps) {
  const form = useForm<MatchFormData>({
    resolver: zodResolver(matchSchema),
    defaultValues: {
      homeTeam: match?.clubs.home.name || '',
      awayTeam: match?.clubs.away.name || '',
      homeLogo: match?.clubs.home.logo || '',
      awayLogo: match?.clubs.away.logo || '',
      competitionName: match?.competition.name || '',
      competitionId: match?.competition.id || '',
      matchday: match?.competition.matchday || 1,
      status: match?.score.status || 'Upcoming',
      homeScore: match?.score.home || 0,
      awayScore: match?.score.away || 0,
      type: match?.score.type || 'REGULAR',
      kickoffDate: match?.kickoff.date || '',
      kickoffTime: match?.kickoff.time || '',
      venueName: match?.venue.name || '',
      venueCity: match?.venue.city || '',
      venueCountry: match?.venue.country || '',
      src1: match?.streams.src1 || '',
      src2: match?.streams.src2 || '',
      hls1: match?.streams.hls1 || '',
      hls2: match?.streams.hls2 || '',
      mhls1: match?.streams.mhls1 || '',
      mhls2: match?.streams.mhls2 || '',
    },
  });

  const handleSubmit = (data: MatchFormData) => {
    const matchData = {
      clubs: {
        home: {
          name: data.homeTeam,
          logo: data.homeLogo || '',
        },
        away: {
          name: data.awayTeam,
          logo: data.awayLogo || '',
        },
      },
      streams: {
        src1: data.src1 || '',
        src2: data.src2 || '',
        hls1: data.hls1 || '',
        hls2: data.hls2 || '',
        mhls1: data.mhls1 || '',
        mhls2: data.mhls2 || '',
      },
      score: {
        home: data.homeScore,
        away: data.awayScore,
        status: data.status,
        ...(data.type === 'HOT' && { type: data.type }),
      },
      competition: {
        id: data.competitionId,
        name: data.competitionName,
        matchday: data.matchday,
      },
      kickoff: {
        date: data.kickoffDate,
        time: data.kickoffTime,
        timezone: 'GMT',
      },
      venue: {
        name: data.venueName,
        city: data.venueCity,
        country: data.venueCountry,
      },
    };

    onSubmit(matchData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Team Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="homeTeam"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Home Team Name</FormLabel>
                <FormControl>
                  <Input placeholder="Arsenal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="awayTeam"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Away Team Name</FormLabel>
                <FormControl>
                  <Input placeholder="Chelsea" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="homeLogo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Home Team Logo URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/logo.png" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="awayLogo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Away Team Logo URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/logo.png" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Competition Information */}
        <div className="grid md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="competitionName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Competition Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Premier League" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="competitionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Competition ID</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., epl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="matchday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matchday</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 34" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        {/* Match Status and Score */}
        <div className="grid md:grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                    <SelectItem value="LIVE">Live</SelectItem>
                    <SelectItem value="FT">Finished</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="homeScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Home Score</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="awayScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Away Score</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value || "REGULAR"}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="REGULAR">Regular</SelectItem>
                    <SelectItem value="HOT">Hot Match</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Kickoff Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="kickoffDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kickoff Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="kickoffTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kickoff Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Venue Information */}
        <div className="grid md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="venueName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Venue Name</FormLabel>
                <FormControl>
                  <Input placeholder="Emirates Stadium" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="venueCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Venue City</FormLabel>
                <FormControl>
                  <Input placeholder="London" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="venueCountry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Venue Country</FormLabel>
                <FormControl>
                  <Input placeholder="England" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Stream Sources */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Stream Sources</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="hls1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HLS Stream 1</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/stream.m3u8" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hls2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HLS Stream 2</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/stream2.m3u8" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="src1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Iframe Stream 1</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/embed" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="src2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Iframe Stream 2</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/embed2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex space-x-3 pt-6 border-t">
          <Button
            type="submit"
            className="flex-1 bg-secondary hover:bg-orange-600"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : match ? 'Update Match' : 'Create Match'}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}