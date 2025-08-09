import { Flame, Radio, Clock, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Match } from '@/types/match';

interface StatsCardsProps {
  matches: Match[] | undefined;
}

export function StatsCards({ matches }: StatsCardsProps) {
  const stats = {
    total: matches?.length || 0,
    live: matches?.filter(m => m.score.status === 'LIVE').length || 0,
    upcoming: matches?.filter(m => m.score.status === 'Upcoming').length || 0,
    hot: matches?.filter(m => m.score.type === 'HOT').length || 0,
  };

  const cards = [
    {
      title: 'Total Matches',
      value: stats.total,
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Live Matches',
      value: stats.live,
      icon: Radio,
      color: 'text-green-500',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Upcoming',
      value: stats.upcoming,
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Hot Matches',
      value: stats.hot,
      icon: Flame,
      color: 'text-red-500',
      bgColor: 'bg-red-100',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-lg lg:text-2xl font-bold text-primary">{card.value}</p>
                </div>
                <div className={`w-8 h-8 lg:w-12 lg:h-12 ${card.bgColor} rounded-full flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 lg:w-6 lg:h-6 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
