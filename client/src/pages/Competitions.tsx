import React, { useState, useEffect } from "react";
import { Trophy, Star, Calendar, Users, TrendingUp, Clock, Award } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TelegramBanner from "../components/TelegramBanner";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../contexts/LanguageContext";

const Competitions = () => {
  const { t } = useLanguage();
  const [showTelegramBanner, setShowTelegramBanner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTelegramBanner(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

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

  const competitions = [
    {
      id: 1,
      name: "Premier League",
      country: "England",
      season: "2024/25",
      teams: 20,
      matches: 380
    },
    {
      id: 2,
      name: "La Liga",
      country: "Spain", 
      season: "2024/25",
      teams: 20,
      matches: 380
    },
    {
      id: 3,
      name: "Serie A",
      country: "Italy",
      season: "2024/25", 
      teams: 20,
      matches: 380
    },
    {
      id: 4,
      name: "Bundesliga",
      country: "Germany",
      season: "2024/25",
      teams: 18,
      matches: 306
    },
    {
      id: 5,
      name: "Ligue 1",
      country: "France",
      season: "2024/25",
      teams: 18,
      matches: 306
    },
    {
      id: 6,
      name: "Champions League",
      country: "Europe",
      season: "2024/25",
      teams: 32,
      matches: 125
    },
    {
      id: 7,
      name: "Europa League",
      country: "Europe",
      season: "2024/25",
      teams: 32,
      matches: 125
    },
    {
      id: 8,
      name: "Conference League",
      country: "Europe",
      season: "2024/25",
      teams: 32,
      matches: 141
    }
  ];

  return (
    <>
      <Helmet>
        <title>Football Competitions Live Streams - KikaSports</title>
        <meta name="description" content="Watch live football streams from major competitions including Premier League, Champions League, La Liga, Serie A, Bundesliga, and European tournaments. Free streaming with HD quality." />
        <link rel="canonical" href={`${window.location.origin}/competitions`} />
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
                  <span className="text-2xl font-bold text-sport-text">Football Competitions</span>
                  <Trophy className="w-6 h-6 text-sport-primary" />
                </div>
                <p className="text-sport-text-light">Watch live streams from the world's top football competitions. Follow your favorite teams across leagues and tournaments.</p>
              </div>

              {/* Competitions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {competitions.map((competition) => (
                  <div
                    key={competition.id}
                    className="bg-sport-card border border-sport-border rounded-xl p-6 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-12 h-12 bg-sport-primary rounded-full flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-sport-text text-center mb-3">
                      {competition.name}
                    </h3>

                    <div className="space-y-2 text-sm text-sport-text-light">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          Country:
                        </span>
                        <span className="text-sport-text font-medium">{competition.country}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Season:
                        </span>
                        <span className="text-sport-text font-medium">{competition.season}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Teams:</span>
                        <span className="text-sport-text font-medium">{competition.teams}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Matches:</span>
                        <span className="text-sport-text font-medium">{competition.matches}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* About section */}
              <div className="bg-sport-card border border-sport-border rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-3">About Football Competitions</h2>
                <div className="space-y-4 text-gray-300">
                  <p className="leading-relaxed text-gray-300">
                    Experience the excitement of world-class football with live streaming coverage of major competitions. 
                    From domestic leagues like the Premier League, La Liga, and Serie A to international tournaments 
                    like the Champions League and Europa League, we bring you comprehensive coverage of the beautiful game.
                  </p>
                  <p className="leading-relaxed text-gray-300">
                    Follow your favorite teams throughout the season and never miss a crucial match with our reliable 
                    streaming platform. Whether it's the intensity of Champions League nights or the passion of 
                    domestic rivalries, we have you covered.
                  </p>
                  <div className="text-center pt-4">
                    <p className="text-gray-300">
                      Ready to watch? Check out <a href="/" className="text-sport-primary hover:underline">today's live matches</a> or 
                      view the <a href="/schedule" className="text-sport-primary hover:underline">upcoming schedule</a>.
                    </p>
                  </div>
                </div>
              </div>
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

export default Competitions;