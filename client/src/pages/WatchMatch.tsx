import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "wouter";
import { Helmet } from "react-helmet-async";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import LiveStreamViewer from "../components/LiveStreamViewer";
import StreamQualitySelector from "../components/StreamQualitySelector";
import TelegramBanner from "../components/TelegramBanner";
import { fetchMatches } from "../services/matchesService";
import { Match } from "../types/match";
import { useLanguage } from "../contexts/LanguageContext";
import { formatMatchDate } from "../utils/dateUtils";
import { Calendar, MapPin, Trophy, Star, Play, Clock, AlertTriangle, X, Theater, Minimize, Monitor, Smartphone, Wifi, Globe } from "lucide-react";
// import CountdownTimer from "../components/CountdownTimer";
import PollsVoting from "../components/PollsVoting";
// import { isMatchLive, getLocalDateTime } from "../utils/dateUtils";

// Extend Window interface for AdSense
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

// AdSense Banner Component - Clean white design
const AdSenseBanner = () => {
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [adHeight, setAdHeight] = useState(0);
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isMobile || !adRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { height } = entry.contentRect;
        setAdHeight(height);
      }
    });

    const adElement = adRef.current.querySelector('.adsbygoogle');
    if (adElement) {
      observer.observe(adElement);
    }

    return () => observer.disconnect();
  }, [isMobile, adLoaded]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const adElements = document.querySelectorAll('.main-ad-banner .adsbygoogle');
      const hasLoadedAd = Array.from(adElements).some(el => 
        el.getAttribute('data-adsbygoogle-status') === 'done'
      );

      if (!hasLoadedAd) {
        setAdError(true);
      } else {
        setAdLoaded(true);
      }
    }, 3000);

    if (typeof window !== 'undefined') {
      try {
        setTimeout(() => {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }, 100);
      } catch (err) {
        console.error('AdSense error:', err);
        setAdError(true);
      }
    }

    return () => clearTimeout(timer);
  }, [isMobile]);

  if (adError) {
    return null;
  }

  return (
    <div className="w-full mb-6">
      {isMobile && (
        <div 
          ref={adRef}
          className="main-ad-banner bg-gray-50 rounded-lg border border-gray-200 overflow-hidden relative flex justify-center items-center"
          style={{ 
            minHeight: adLoaded && adHeight > 0 ? `${adHeight}px` : '200px',
            height: adLoaded && adHeight > 0 ? 'auto' : '200px'
          }}
        >
          <div className="relative w-full flex justify-center">
            <ins 
              className="adsbygoogle block"
              style={{ 
                display: 'block',
                width: '100%',
                maxWidth: '400px'
              }}
              data-ad-client="ca-pub-9955658533931358"
              data-ad-slot="7180274959"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />

            {/* <div className="absolute bottom-2 left-2">
              <span className="text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
                Ad
              </span>
            </div> */}

            {!adLoaded && !adError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="animate-pulse text-gray-500 text-sm">Loading ad...</div>
              </div>
            )}
          </div>
        </div>
      )}

      {!isMobile && (
        <div className="main-ad-banner bg-gray-50 rounded-lg border border-gray-200 overflow-hidden relative flex justify-center items-center min-h-[250px]">
          <div className="relative w-full flex justify-center">
            <ins 
              className="adsbygoogle block"
              style={{ 
                display: 'block',
                width: '100%',
                maxWidth: '728px'
              }}
              data-ad-client="ca-pub-9955658533931358"
              data-ad-slot="7180274959"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />

            {/* <div className="absolute bottom-2 left-2">
              <span className="text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
                Ad
              </span>
            </div> */}

            {!adLoaded && !adError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="animate-pulse text-gray-500 text-sm">Loading ad...</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const WatchMatch = () => {
  const { id } = useParams<{ id: string; }>();
  const [match, setMatch] = useState<Match | null>(null);
  const [activeStreamUrl, setActiveStreamUrl] = useState<string>("");
  const [activeStreamQuality, setActiveStreamQuality] = useState<"hd" | "sd" | "mobile">("hd");
  const [activeStreamType, setActiveStreamType] = useState<"hls" | "mobile-hls" | "iframe">("hls");
  const [loading, setLoading] = useState(true);
  const [showTelegramBanner, setShowTelegramBanner] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [streamLoading, setStreamLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [theaterMode, setTheaterMode] = useState(false);

  useEffect(() => {
    const loadMatch = async () => {
      try {
        const matchesData = await fetchMatches();
        const foundMatch = matchesData.find(m => m.id === id);
        if (foundMatch) {
          setMatch(foundMatch);
          selectOptimalStream(foundMatch);
        }
      } catch (error) {
        console.error("Error loading match:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMatch();
  }, [id]);

  useEffect(() => {
    if (match && !loading) {
      const timer = setTimeout(() => {
        setShowTelegramBanner(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [match, loading]);

  const selectOptimalStream = (match: Match) => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile && match.streams.mhls1) {
      console.log('Setting initial mobile stream:', match.streams.mhls1);
      setActiveStreamUrl(match.streams.mhls1);
      setActiveStreamQuality("mobile");
      setActiveStreamType("mobile-hls");
    } else if (match.streams.hls1) {
      console.log('Setting initial HLS stream:', match.streams.hls1);
      setActiveStreamUrl(match.streams.hls1);
      setActiveStreamQuality("hd");
      setActiveStreamType("hls");
    } else if (match.streams.src1) {
      console.log('Setting initial iframe stream:', match.streams.src1);
      setActiveStreamUrl(match.streams.src1);
      setActiveStreamQuality("hd");
      setActiveStreamType("iframe");
    }
  };

  const handleStreamChange = (url: string, quality: "hd" | "sd" | "mobile", type: "hls" | "mobile-hls" | "iframe") => {
    console.log('Stream change requested:', { url, quality, type });

    setStreamLoading(true);
    if (type === "hls") {
      setLoadingMessage(`Loading HLS ${quality.toUpperCase()} stream...`);
    } else if (type === "mobile-hls") {
      setLoadingMessage(`Loading Mobile ${quality.toUpperCase()} stream...`);
    } else if (type === "iframe") {
      setLoadingMessage(`Loading ${quality === "hd" ? "server 1" : "server 2"}...`);
    }

    setTimeout(() => {
      setActiveStreamUrl(url);
      setActiveStreamQuality(quality);
      setActiveStreamType(type);
      setStreamLoading(false);
      setLoadingMessage("");
      console.log('Stream state updated to:', { url, quality, type });
    }, 800);
  };

  const handleMobileWarning = () => {
    setShowMobileWarning(true);
    setTimeout(() => {
      setShowMobileWarning(false);
    }, 3000);
  };

  const getAvailableStreams = () => {
    if (!match) return [];
    const streams = [];

    if (match.streams.hls1) {
      streams.push({
        id: "hls-hd",
        name: "server 1",
        url: match.streams.hls1,
        quality: "hd" as const,
        type: "hls" as const
      });
    }
    if (match.streams.hls2) {
      streams.push({
        id: "hls-sd",
        name: "server 2",
        url: match.streams.hls2,
        quality: "sd" as const,
        type: "hls" as const
      });
    }

    if (match.streams.mhls1) {
      streams.push({
        id: "mobile-hd",
        name: "server 1",
        url: match.streams.mhls1,
        quality: "mobile" as const,
        type: "mobile-hls" as const
      });
    }
    if (match.streams.mhls2) {
      streams.push({
        id: "mobile-sd",
        name: "server 2",
        url: match.streams.mhls2,
        quality: "mobile" as const,
        type: "mobile-hls" as const
      });
    }

    if (match.streams.src1) {
      streams.push({
        id: "iframe-1",
        name: "server 1",
        url: match.streams.src1,
        quality: "hd" as const,
        type: "iframe" as const
      });
    }
    if (match.streams.src2) {
      streams.push({
        id: "iframe-2",
        name: "server 2",
        url: match.streams.src2,
        quality: "sd" as const,
        type: "iframe" as const
      });
    }
    console.log('Available streams:', streams);
    return streams;
  };

  const toggleTheaterMode = () => {
    setTheaterMode(!theaterMode);
  };

  const getStreamTypeIcon = (type: string) => {
    switch (type) {
      case "mobile-hls":
        return <Smartphone className="w-3 h-3 md:w-4 md:h-4" />;
      case "hls":
        return <Wifi className="w-3 h-3 md:w-4 md:h-4" />;
      case "iframe":
        return <Globe className="w-3 h-3 md:w-4 md:h-4" />;
      default:
        return <Monitor className="w-3 h-3 md:w-4 md:h-4" />;
    }
  };

  const getStreamButtonStyle = (stream: any, isActive: boolean) => {
    if (isActive) {
      return "bg-red-500 text-white border-red-500 shadow-sm";
    }
    switch (stream.type) {
      case "mobile-hls":
        return "bg-white hover:bg-purple-50 text-purple-600 hover:text-purple-700 border-gray-200 hover:border-purple-300";
      case "hls":
        return "bg-white hover:bg-blue-50 text-blue-600 hover:text-blue-700 border-gray-200 hover:border-blue-300";
      case "iframe":
        return "bg-white hover:bg-green-50 text-green-600 hover:text-green-700 border-gray-200 hover:border-green-300";
      default:
        return "bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-700 border-gray-200 hover:border-gray-300";
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && theaterMode) {
        setTheaterMode(false);
      }
    };
    if (theaterMode) {
      document.addEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [theaterMode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading match...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Match not found</h2>
            <Link to="/" className="text-red-500 hover:text-red-600">
              Return to homepage
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Watch ${match.clubs.home.name} vs ${match.clubs.away.name} Live Stream HD Free Online`}</title>
        <meta name="description" content={`Watch ${match.clubs.home.name} vs ${match.clubs.away.name} live stream in HD quality for free. ${match.competition.name} match streaming online with multiple sources and real-time updates.`} />
        <link rel="canonical" href={`${window.location.origin}/watch/${id}`} />
        <meta name="keywords" content={`${match.clubs.home.name} vs ${match.clubs.away.name}, live stream, ${match.competition.name}, football streaming, watch online free, HD quality`} />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content={`Watch ${match.clubs.home.name} vs ${match.clubs.away.name} Live Stream HD`} />
        <meta property="og:description" content={`Watch ${match.clubs.home.name} vs ${match.clubs.away.name} live stream in HD quality for free. ${match.competition.name} match streaming online.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/watch/${id}`} />
        <meta property="og:image" content="https://i.ibb.co/sdC85N9X/Kikasports-cover.png" />
        <meta property="og:site_name" content="KoraSports" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Watch ${match.clubs.home.name} vs ${match.clubs.away.name} Live Stream HD`} />
        <meta name="twitter:description" content={`Watch ${match.clubs.home.name} vs ${match.clubs.away.name} live stream in HD quality for free. ${match.competition.name} match streaming online.`} />
        <meta name="twitter:image" content="https://i.ibb.co/sdC85N9X/Kikasports-cover.png" />
      </Helmet>

      <div className="min-h-screen bg-sport-background">
        <Navbar />

        {theaterMode && (
          <div className="fixed inset-0 bg-black z-50 flex flex-col">
            <div className="hidden md:flex items-center justify-between p-4 bg-black/80 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <img src={match.clubs.home.logo} alt={match.clubs.home.name} className="w-6 h-6 object-contain" />
                <span className="text-white font-medium text-sm">
                  {match.clubs.home.name} vs {match.clubs.away.name}
                </span>
                <img src={match.clubs.away.logo} alt={match.clubs.away.name} className="w-6 h-6 object-contain" />
                {match.score.status === "LIVE" && (
                  <div className="flex items-center gap-1 bg-red-500/20 px-2 py-1 rounded-full">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-400 font-medium text-xs">LIVE</span>
                  </div>
                )}
              </div>

              {match.score.status === "LIVE" && getAvailableStreams().length > 0 && (
                <div className="flex items-center gap-2">
                  {getAvailableStreams().map(stream => {
                    const isActive = activeStreamUrl === stream.url;
                    return (
                      <button
                        key={stream.id}
                        onClick={() => handleStreamChange(stream.url, stream.quality, stream.type)}
                        className={`px-3 py-1.5 text-xs rounded-lg transition-all duration-200 flex items-center gap-1.5 border ${
                          isActive ? 'bg-red-500 text-white border-red-500' : 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700'
                        }`}
                      >
                        {getStreamTypeIcon(stream.type)}
                        <span className="font-medium">{stream.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              <button
                onClick={toggleTheaterMode}
                className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/40 text-red-300 hover:text-white rounded-lg transition-all duration-200 border border-red-500/30 hover:border-red-500/60"
                title="Exit Theater Mode (Esc)"
              >
                <X className="w-4 h-4" />
                <span className="text-xs font-medium">Exit</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="min-h-full flex items-center justify-center p-4 md:p-8">
                <div className="w-full max-w-6xl mx-auto aspect-video">
                  <LiveStreamViewer 
                    match={match} 
                    streamUrl={activeStreamUrl} 
                    streamQuality={activeStreamQuality} 
                    streamType={activeStreamType} 
                  />
                </div>
              </div>
            </div>

            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/90 border-t border-gray-800 max-h-[40vh] overflow-y-auto">
              <div className="p-3 space-y-3">
                <div className="flex items-center justify-center gap-3">
                  <img src={match.clubs.home.logo} alt={match.clubs.home.name} className="w-5 h-5 object-contain" />
                  <span className="text-white font-medium text-sm">
                    {match.clubs.home.name} vs {match.clubs.away.name}
                  </span>
                  <img src={match.clubs.away.logo} alt={match.clubs.away.name} className="w-5 h-5 object-contain" />
                  {match.score.status === "LIVE" && (
                    <div className="flex items-center gap-1 bg-red-500/20 px-2 py-1 rounded-full">
                      <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-red-400 font-medium text-xs">LIVE</span>
                    </div>
                  )}
                </div>

                {match.score.status === "LIVE" && getAvailableStreams().length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {getAvailableStreams().map(stream => {
                      const isActive = activeStreamUrl === stream.url;
                      return (
                        <button
                          key={stream.id}
                          onClick={() => handleStreamChange(stream.url, stream.quality, stream.type)}
                          className={`px-3 py-2 text-xs rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 border ${
                            isActive ? 'bg-red-500 text-white border-red-500' : 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700'
                          }`}
                        >
                          {getStreamTypeIcon(stream.type)}
                          <span className="font-medium">{stream.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                <button
                  onClick={toggleTheaterMode}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-300 hover:text-white rounded-lg transition-all duration-200 border border-red-500/30 hover:border-red-500/60"
                  title="Exit Theater Mode (Esc)"
                >
                  <X className="w-4 h-4" />
                  <span className="font-medium">Exit</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {!theaterMode && (
          <>
            {streamLoading && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500 mx-auto mb-4"></div>
                  <p className="text-gray-800 font-medium">{loadingMessage}</p>
                </div>
              </div>
            )}

            {showMobileWarning && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg p-6 max-w-md w-full border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-orange-500" />
                    <h3 className="text-lg font-bold text-gray-800">Mobile Only Stream</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    This stream source is optimized for mobile devices only and may not work properly on desktop browsers.
                  </p>
                  <button 
                    onClick={() => setShowMobileWarning(false)} 
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
                  >
                    Got it
                  </button>
                </div>
              </div>
            )}

            <main className="container mx-auto px-4 py-6 max-w-7xl">
              <AdSenseBanner />

              <div className="mb-6">
                <div>
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    Watch Live : {match.clubs.home.name} vs {match.clubs.away.name}
                  </h1>
                  <p className="text-sm md:text-base text-gray-600">
                    Live Stream {match.clubs.home.name} vs {match.clubs.away.name} match online. Watch the latest football action and stay updated with live scores.
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <div className="lg:col-span-3">
                  <LiveStreamViewer 
                    match={match} 
                    streamUrl={activeStreamUrl} 
                    streamQuality={activeStreamQuality} 
                    streamType={activeStreamType} 
                  />
                </div>
              </div>

              {/* Polls & Voting Section - Moved under player */}
              <div className="mb-8">
                <PollsVoting match={match} />
              </div>

              {match.score.status === "LIVE" && (
                <div className="mb-8">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-3">
                        <Monitor className="w-5 h-5 text-red-500" />
                        <span>Stream Sources</span>
                      </h3>

                      <button
                        onClick={toggleTheaterMode}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg transition-all duration-200 border border-red-200 hover:border-red-300 self-start md:self-auto"
                        title="Enter Theater Mode"
                      >
                        <Theater className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="font-medium text-sm md:text-base">Theater Mode</span>
                      </button>
                    </div>

                    <StreamQualitySelector 
                      streams={getAvailableStreams()} 
                      activeStream={activeStreamUrl} 
                      onStreamChange={handleStreamChange} 
                      onMobileWarning={handleMobileWarning} 
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Star className="w-6 h-6 text-red-500" />
                    <span>Match Information</span>
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="text-gray-500 text-sm font-medium">Date & Time</p>
                        <p className="text-gray-800 font-medium">{formatMatchDate(match.kickoff.date, match.kickoff.time)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="text-gray-500 text-sm font-medium">Stadium</p>
                        <p className="text-gray-800 font-medium">{match.venue.name}</p>
                        <p className="text-gray-500 text-sm">{match.venue.city}, {match.venue.country}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Play className="w-6 h-6 text-red-500" />
                    <span>Live Streaming Details</span>
                  </h3>

                  <div className="space-y-4 text-gray-600">
                    <p className="leading-relaxed">
                      Experience the excitement of <strong className="text-gray-800">{match.clubs.home.name}</strong> vs <strong className="text-gray-800">{match.clubs.away.name}</strong> 
                      with our premium HD live streaming service. This {match.competition.name} match brings together two competitive teams 
                      at the prestigious {match.venue.name} stadium.
                    </p>
                    <p className="leading-relaxed">
                      Our streaming platform offers multiple viewing options including HD, SD, and mobile-optimized streams to ensure 
                      the best possible viewing experience on any device. Watch with real-time commentary and live match statistics 
                      for a complete football experience.
                    </p>
                    {match.score.status === "LIVE" && (
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <p className="text-red-600 font-semibold flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span>Live streaming is available now! Join thousands of fans watching online.</span>
                        </p>
                      </div>
                    )}
                    <p className="text-sm">
                      Looking for more matches? Check our <a href="/" className="text-red-500 hover:text-red-600 underline">homepage</a> for 
                      live games or browse our <a href="/schedule" className="text-red-500 hover:text-red-600 underline">fixture schedule</a> for 
                      upcoming matches.
                    </p>
                  </div>
                </div>
              </div>

              

              <section className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                  Premium Football Streaming Experience
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">HD Quality Streaming</h3>
                    <p className="leading-relaxed">
                      Watch {match.clubs.home.name} vs {match.clubs.away.name} in stunning high-definition quality with our adaptive streaming technology. 
                      Our platform automatically adjusts stream quality based on your internet connection for uninterrupted viewing.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Multiple Stream Sources</h3>
                    <p className="leading-relaxed">
                      Access backup streaming sources if one becomes unavailable. Our redundant system ensures you never miss crucial moments 
                      of the match, with instant switching between different stream qualities and sources.
                    </p>
                  </div>
                </div>
              </section>
            </main>

            <TelegramBanner isVisible={showTelegramBanner} onClose={() => setShowTelegramBanner(false)} />

            <Footer />
          </>
        )}
      </div>
    </>
  );
};

export default WatchMatch;