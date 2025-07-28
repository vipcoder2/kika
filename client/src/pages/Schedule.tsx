import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Trophy, Users, Calendar } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MatchCard from "../components/MatchCard";
import TelegramBanner from "../components/TelegramBanner";
import { fetchMatches } from "../services/matchesService";
import { Match } from "../types/match";
import { format, parseISO, addDays } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useLanguage } from "../contexts/LanguageContext";

const Schedule = () => {
  const { t } = useLanguage();
  const [matches, setMatches] = useState<Match[]>([]);
  const [groupedMatches, setGroupedMatches] = useState<Record<string, Match[]>>({});
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTelegramBanner, setShowTelegramBanner] = useState(false);

  // Create sidebar data structure matching the homepage layout
  const leagues = [
    { id: "uefa-cl", name: "UEFA Champions League" },
    { id: "uefa-el", name: "UEFA Europa League" },
    { id: "premier", name: "Premier League" },
    { id: "la-liga", name: "La Liga" },
    { id: "serie-a", name: "Serie A" },
    { id: "pro-league", name: "Pro League" },
    { id: "eredivisie", name: "Eredivisie" },
    { id: "fa-cup", name: "FA Cup" }
  ];

  const teams = [
    { id: "man-city", name: "Manchester City" },
    { id: "man-utd", name: "Manchester United" },
    { id: "chelsea", name: "Chelsea" },
    { id: "bayern", name: "Bayern München" },
    { id: "bayer", name: "Bayer Leverkusen" },
    { id: "napoli", name: "Napoli" },
    { id: "inter", name: "Inter" },
    { id: "marseille", name: "Marseille" },
    { id: "psg", name: "Paris Saint Germain" },
    { id: "real", name: "Real Madrid" }
  ];

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const matchesData = await fetchMatches();
        setMatches(matchesData);

        // Group by date
        const grouped = matchesData.reduce<Record<string, Match[]>>((acc, match) => {
          const date = match.kickoff.date;
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(match);
          return acc;
        }, {});

        setGroupedMatches(grouped);

        // Filter by competition if a tab is selected
        if (selectedTab === "all") {
          setFilteredMatches(matchesData);
        } else {
          setFilteredMatches(
            matchesData.filter((match) => match.competition.id === selectedTab)
          );
        }
      } catch (error) {
        console.error("Error loading matches:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, [selectedTab]);

  // Show Telegram banner after matches load
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowTelegramBanner(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Get unique competition IDs for filtering
  const competitions = Array.from(
    new Set(matches.map((match) => match.competition.id))
  );

  // Get competition name from ID
  const getCompetitionName = (id: string): string => {
    const match = matches.find((m) => m.competition.id === id);
    return match ? match.competition.name : id;
  };

  // Format date for display
  const formatDateHeader = (dateString: string): string => {
    try {
      const date = parseISO(dateString);
      const today = new Date();
      const tomorrow = addDays(today, 1);

      if (format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")) {
        return "Today";
      } else if (format(date, "yyyy-MM-dd") === format(tomorrow, "yyyy-MM-dd")) {
        return "Tomorrow";
      }

      return format(date, "EEEE, MMMM d");
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-sport-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sport-primary mx-auto mb-4"></div>
            <p className="text-sport-text-light">Loading schedule...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Football Match Schedule & Fixtures - KikaSports</title>
        <meta name="description" content="Complete football match schedule and fixtures for today and upcoming games. Find kick-off times, competition details, and team information for Premier League, Champions League and all major tournaments." />
        <link rel="canonical" href={`${window.location.origin}/schedule`} />
        <meta name="keywords" content="football fixtures, match schedule, today's games, upcoming matches, Premier League fixtures, Champions League schedule, football calendar" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Football Match Schedule & Fixtures" />
        <meta property="og:description" content="Complete football match schedule and fixtures for today and upcoming games. Find kick-off times, competition details, and team information for all major leagues and tournaments." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/schedule`} />
        <meta property="og:image" content="https://i.ibb.co/sdC85N9X/Kikasports-cover.png" />
        <meta property="og:site_name" content="kikasports" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Football Match Schedule & Fixtures" />
        <meta name="twitter:description" content="Complete football match schedule and fixtures for today and upcoming games. Find kick-off times, competition details, and team information for all major leagues and tournaments." />
        <meta name="twitter:image" content="https://i.ibb.co/sdC85N9X/Kikasports-cover.png" />


      </Helmet>

      <div className="min-h-screen bg-sport-background">
        <Navbar />

        <div className="flex max-w-7xl mx-auto">
          {/* Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block w-64 bg-sport-sidebar p-4 min-h-screen border-r border-sport-border">
            {/* Leagues Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-sport-primary" />
                <h2 className="font-semibold text-sport-text">Leagues</h2>
              </div>
              <ul className="space-y-1">
                {leagues.map(league => (
                  <li key={league.id}>
                    <a href="#" className="flex items-center gap-2 px-3 py-2 text-sm text-sport-text-light hover:text-sport-primary hover:bg-sport-card rounded-lg transition-colors">
                      <Trophy className="w-4 h-4" />
                      {league.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Teams Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-sport-primary" />
                <h2 className="font-semibold text-sport-text">Teams</h2>
              </div>
              <ul className="space-y-1">
                {teams.map(team => (
                  <li key={team.id}>
                    <a href="#" className="flex items-center gap-2 px-3 py-2 text-sm text-sport-text-light hover:text-sport-primary hover:bg-sport-card rounded-lg transition-colors">
                      <div className="w-4 h-4 bg-sport-border rounded-full"></div>
                      {team.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="p-4 lg:p-6">
              {/* Page Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-sport-text">Schedule & Fixtures</span>
                  <Calendar className="w-6 h-6 text-sport-primary" />
                </div>
                <p className="text-sport-text-light">Complete schedule of today's matches and upcoming fixtures from all major competitions</p>
              </div>

              <Tabs defaultValue="all" onValueChange={setSelectedTab} className="w-full">
                <TabsList className="bg-sport-card border border-sport-border mb-6 overflow-x-auto flex flex-nowrap max-w-full">
                  <TabsTrigger value="all" className="flex-shrink-0 text-sport-text data-[state=active]:bg-sport-primary data-[state=active]:text-white">All Competitions</TabsTrigger>
                  {competitions.map((comp) => (
                    <TabsTrigger key={comp} value={comp} className="flex-shrink-0 text-sport-text data-[state=active]:bg-sport-primary data-[state=active]:text-white">
                      {getCompetitionName(comp)}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value={selectedTab} className="mt-0">
                  {filteredMatches.length === 0 ? (
                    <div className="bg-sport-card border border-sport-border rounded-xl p-8 text-center">
                      <Calendar className="w-12 h-12 text-sport-text-light mx-auto mb-4" />
                      <p className="text-sport-text-light mb-2">No matches found for this competition.</p>
                      <p className="text-sm text-sport-text-light">
                        Try selecting a different competition or check our <a href="/" className="text-sport-primary hover:underline">homepage</a> for live matches.
                      </p>
                    </div>
                  ) : (
                    Object.entries(
                      filteredMatches.reduce<Record<string, Match[]>>((acc, match) => {
                        const date = match.kickoff.date;
                        if (!acc[date]) {
                          acc[date] = [];
                        }
                        acc[date].push(match);
                        return acc;
                      }, {})
                    )
                      .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
                      .map(([date, dateMatches]) => (
                        <div key={date} className="mb-8">
                          <h2 className="text-xl font-bold mb-4 text-sport-text border-b border-sport-border pb-2">
                            {formatDateHeader(date)}
                          </h2>
                          <div className="space-y-3">
                            {dateMatches.map((match) => (
                              <MatchCard key={match.id} match={match} variant="thin" />
                            ))}
                          </div>
                        </div>
                      ))
                  )}
                </TabsContent>
              </Tabs>
              
            </div>
          </main>
        </div>

        {/* Telegram Banner */}
        <TelegramBanner 
          isVisible={showTelegramBanner} 
          onClose={() => setShowTelegramBanner(false)} 
        />

        <Footer />
      </div>
    </>
  );
};

export default Schedule;