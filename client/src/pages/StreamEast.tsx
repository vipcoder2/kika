
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Trophy, Users, Play, Monitor, Layers } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TelegramBanner from "../components/TelegramBanner";

const StreamEast = () => {
  const [showTelegramBanner, setShowTelegramBanner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTelegramBanner(true);
    }, 2000);
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
      title: "Crystal Clear Quality",
      description: "Advanced streaming technology ensures minimal lag and crystal-clear picture quality for premium viewing."
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Multi-Stream Feature",
      description: "Watch multiple matches simultaneously with our innovative multi-stream feature. Never miss any action."
    },
    {
      icon: <Play className="w-6 h-6" />,
      title: "Interactive Community",
      description: "Join our community of passionate football fans with interactive features and real-time chat during games."
    }
  ];

  return (
    <>
      <Helmet>
        <title>StreamEast Live - Football Streaming - KikaSports</title>
        <meta 
          name="description" 
          content="Watch premium football matches on StreamEast with crystal-clear quality and minimal lag. Stream Premier League, Champions League games with multi-stream feature and live chat." 
        />
        <link rel="canonical" href="https://kikasports.com/streameast" />
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
                      <Play className="w-6 h-6 text-red-600" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">StreamEast Live</h1>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">Premium live football streaming with advanced technology and exceptional quality.</p>
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
                    <h2 className="text-2xl font-bold text-gray-900">About StreamEast Live Streaming</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      StreamEast Live Streaming offers premium football content with exceptional quality and reliability. 
                      Experience live matches from top leagues including Premier League, Champions League, and international tournaments 
                      with our cutting-edge streaming technology.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Our advanced streaming technology ensures minimal lag and crystal-clear picture quality. 
                      StreamEast is committed to providing the best possible viewing experience for football enthusiasts who demand excellence.
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-900">StreamEast Features</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        Multi-Stream Technology
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Watch multiple matches simultaneously with our multi-stream feature. Never miss any action from your favorite 
                        competitions with StreamEast's comprehensive coverage and innovative viewing options.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        Community Features
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Join our community of passionate football fans and enjoy live matches with interactive features and real-time chat. 
                        Share the excitement with fellow supporters during every thrilling moment.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience Premium Football Streaming</h2>
                  <p className="text-gray-700 mb-6">
                    Join StreamEast for unparalleled football streaming quality and innovative features.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/" className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                      Start Streaming
                    </a>
                    <a href="/competitions" className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-medium transition-colors border border-gray-300">
                      View Competitions
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

export default StreamEast;
