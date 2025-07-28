
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Trophy, Users, Play, Monitor, Zap } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TelegramBanner from "../components/TelegramBanner";

const Score808 = () => {
  const [showTelegramBanner, setShowTelegramBanner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTelegramBanner(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

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

  const features = [
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Real-Time Scores",
      description: "Get instant score updates and live match statistics for all major football competitions worldwide."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast Updates",
      description: "Lightning-fast updates with real-time notifications for goals, cards, and match events as they happen."
    },
    {
      icon: <Play className="w-6 h-6" />,
      title: "Live Streaming",
      description: "Watch live matches with integrated score tracking and detailed match statistics in one platform."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Score808 - Live Football Scores & Streaming | Real-time Updates</title>
        <meta name="description" content="Score808 provides live football scores, streaming, and real-time match updates. Follow your favorite teams with instant notifications and HD quality streams." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="flex max-w-7xl mx-auto">
          <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 p-4 min-h-screen">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-red-500" />
                <h2 className="font-semibold text-gray-900">Leagues</h2>
              </div>
              <ul className="space-y-1">
                {leagues.map(league => (
                  <li key={league.id}>
                    <a href="#" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50 rounded-lg transition-colors">
                      <Trophy className="w-4 h-4" />
                      {league.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-red-500" />
                <h2 className="font-semibold text-gray-900">Teams</h2>
              </div>
              <ul className="space-y-1">
                {teams.map(team => (
                  <li key={team.id}>
                    <a href="#" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                      {team.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <main className="flex-1">
            <div className="p-4 lg:p-6">
              <div className="mb-8">
                <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-50 text-red-500 rounded-lg">
                      <Trophy className="w-6 h-6 text-red-600" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Score808</h1>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">The most comprehensive platform for live football scores and streaming. Get real-time updates, detailed statistics, and HD quality streams for matches from around the globe.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-8">
                <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-900">About Score808 Live Streaming</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Score808 Live brings you the best football streaming experience with comprehensive coverage of all major leagues and tournaments. 
                      Watch live matches from Premier League, Champions League, La Liga, and more with integrated live scores and match statistics.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Our platform offers multiple streaming qualities to accommodate different internet speeds, ensuring smooth playback for all users 
                      regardless of their connection. From HD to standard definition, Score808 ensures optimal viewing experience for everyone.
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-900">Score808 Features</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        Real-Time Updates
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Stay updated with live scores, match statistics, and real-time updates while watching your favorite teams. 
                        Score808 provides an all-in-one football viewing experience with comprehensive match data.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        Cross-Platform Access
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Access Score808 Live from any device - desktop, mobile, or tablet. Our responsive design ensures optimal viewing experience 
                        across all platforms, allowing you to watch football anywhere, anytime.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience Live Football with Score808</h2>
                  <p className="text-gray-700 mb-6">
                    Join the Score808 community for premium football streaming with integrated live scores and statistics.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/" className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                      Watch Live Football
                    </a>
                    <a href="/live-score" className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-medium transition-colors border border-gray-300">
                      Live Scores
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        <TelegramBanner 
          isVisible={showTelegramBanner} 
          onClose={() => setShowTelegramBanner(false)} 
        />

        <Footer />
      </div>
    </>
  );
};

export default Score808;
