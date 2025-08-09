import React, { useEffect, useState, useRef } from "react";
import { useRoute } from "wouter";
import {
  ArrowLeft,
  Share2,
  MapPin,
  Calendar,
  Trophy,
  Clock,
  Users,
  Facebook,
  Twitter,
  Instagram,
  MessageCircle,
  Play,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMatch, useMatches } from "@/hooks/useMatches";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { collection, addDoc, query, onSnapshot, where, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Assuming you have initialized firebase and exported db

declare global {
  interface Window {
    jwplayer: any;
    matchId: string; // For PWA
    matchDetails: any; // For PWA
  }
}



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




export default function MatchDetails() {
  const [, params] = useRoute("/match/:id");
  const matchId = params?.id;
  

  const [countdown, setCountdown] = useState<string>("");
  const [playerInitialized, setPlayerInitialized] = useState(false);
  const [selectedStream, setSelectedStream] = useState<string>("");
  const [playerType, setPlayerType] = useState<"jwplayer" | "iframe">(
    "jwplayer",
  );
  const [playerInstance, setPlayerInstance] = useState<any>(null);
  const [pollData, setPollData] = useState<{ votes: { home: number; draw: number; away: number } } | null>(null);
  const [userVote, setUserVote] = useState<string | null>(null); // 'home', 'draw', 'away'

  const { data: match, isLoading, error } = useMatch(matchId || "");
  const { data: allMatches } = useMatches();

  // Match status variables - declare early to avoid lexical declaration errors
  const isLive = match?.score.status === "LIVE";
  const isUpcoming = match?.score.status === "Upcoming";
  const isFinished = match?.score.status === "FT";

  // Store match details for PWA
  useEffect(() => {
    if (match) {
      window.matchId = match.id;
      window.matchDetails = match;
    }
  }, [match]);

  // PWA Service Worker Registration
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('ServiceWorker registration successful with scope:', registration.scope);
        })
        .catch((err) => {
          console.log('ServiceWorker registration failed:', err);
        });
    }
  }, []);

  // Handle timezone conversion for kickoff time
  const convertToLocalTime = (kickoffTime: string, kickoffDate: string): string => {
    const dateTimeString = `${kickoffDate}T${kickoffTime}:00`;
    try {
      const date = new Date(dateTimeString);
      return date.toLocaleString();
    } catch (e) {
      console.error("Error converting date/time:", e);
      return `${kickoffDate} ${kickoffTime}`; // Fallback
    }
  };

  // Related matches (live and upcoming)
  const relatedMatches =
    allMatches
      ?.filter(
        (m) =>
          m.id !== matchId &&
          (m.score.status === "LIVE" || m.score.status === "Upcoming"),
      )
      ?.slice(0, 3) || [];

  // Initialize JWPlayer
  useEffect(() => {
    if (!match || isUpcoming || isFinished) return;

    const initializePlayer = () => {
      try {
        if (window.jwplayer && playerType === "jwplayer" && selectedStream) {
          // Clean up existing player first
          if (playerInstance) {
            try {
              playerInstance.remove();
            } catch (e) {
              console.log("Player cleanup error:", e);
            }
            setPlayerInstance(null);
          }

          window.jwplayer.key = "eNFaXCjyURVoCCGiHp7HTQ3hDhE/AfL0g8VE1fRbL84=";

          const container = document.getElementById("jwplayer-container");
          if (container && selectedStream) {
            const player = window.jwplayer("jwplayer-container").setup({
              height: "100%",
              width: "100%",
              autostart: false,
              file: selectedStream,
              aspectratio: "16:9",
              controls: true,
              displaytitle: false, // Removed team names
              stretching: "uniform",
              primary: "html5",
              preload: "metadata",
              hlshtml: true,
            });

            player.on('ready', () => {
              console.log('JWPlayer is ready');
              setPlayerInitialized(true);
            });

            player.on('error', (error: any) => {
              console.log('JWPlayer error:', error);
            });

            setPlayerInstance(player);
          }
        }
      } catch (error) {
        console.error("Error setting up player:", error);
      }
    };

    // Set initial stream if none selected
    if (!selectedStream && match.streams) {
      const firstStream = match.streams.hls1 || match.streams.hls2 || match.streams.src1 || match.streams.src2;
      if (firstStream) {
        const streamType = (match.streams.hls1 || match.streams.hls2) ? "jwplayer" : "iframe";
        setSelectedStream(firstStream);
        setPlayerType(streamType);
      }
    }

    if (window.jwplayer) {
      initializePlayer();
    } else if (playerType === "jwplayer" && !isUpcoming && !isFinished) {
      // Remove any existing script first
      const existingScript = document.querySelector('script[src*="jwplayer.js"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement("script");
      script.src = "https://fle-rvd0i9o8-moo.com/player/jw8_26/jwplayer.js?v=5.0.2";
      script.onload = () => {
        console.log("JWPlayer script loaded successfully");
        initializePlayer();
      };
      script.onerror = (error) => {
        console.error("Failed to load JWPlayer script:", error);
      };
      document.head.appendChild(script);
    }

    return () => {
      if (playerInstance) {
        try {
          playerInstance.remove();
        } catch (e) {
          console.log("Player cleanup error:", e);
        }
        setPlayerInstance(null);
      }
    };
  }, [match, playerType, selectedStream, isUpcoming, isFinished]);

  // Update player source when stream changes
  useEffect(() => {
    if (playerInstance && selectedStream && playerType === "jwplayer") {
      try {
        playerInstance.load({
          file: selectedStream,
          // Removed team names from title
        });
        console.log('Stream changed to:', selectedStream);
      } catch (e) {
        console.log("JWPlayer load error:", e);
      }
    }
  }, [selectedStream, playerInstance, playerType, match]);

  // Countdown timer for upcoming matches
  useEffect(() => {
    if (!match || match.score.status !== "Upcoming") return;

    const updateCountdown = () => {
      const matchDateTimeString = `${match.kickoff.date}T${match.kickoff.time}:00`;
      try {
        const matchDate = new Date(matchDateTimeString);
        const now = new Date();
        const diff = matchDate.getTime() - now.getTime();

        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          );
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        } else {
          setCountdown("Match has started");
        }
      } catch (e) {
        console.error("Error calculating countdown:", e);
        setCountdown("Invalid date");
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(interval);
  }, [match]);

  // Polls logic
  useEffect(() => {
    if (!matchId) return;

    const pollsCollection = collection(db, "polls");
    const matchPollsQuery = query(pollsCollection, where("matchId", "==", matchId));

    const unsubscribe = onSnapshot(matchPollsQuery, (snapshot) => {
      if (!snapshot.empty) {
        const pollData = snapshot.docs[0].data() as { votes: { home: number; draw: number; away: number } };
        setPollData(pollData);
        // Check if user already voted
        const storedVote = localStorage.getItem(`match_${matchId}_vote`);
        if (storedVote) {
          setUserVote(storedVote);
        }
      } else {
        setPollData({ votes: { home: 0, draw: 0, away: 0 } });
        setUserVote(null);
        localStorage.removeItem(`match_${matchId}_vote`);
      }
    }, (error) => {
      console.error("Error fetching poll data:", error);
    });

    return () => {
      unsubscribe();
      localStorage.removeItem(`match_${matchId}_vote`);
    };
  }, [matchId]);

  const getTotalVotes = () => {
    if (!pollData) return 0;
    return pollData.votes.home + pollData.votes.draw + pollData.votes.away;
  };

  const getPercentage = (votes: number): number => {
    const totalVotes = getTotalVotes();
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  const vote = async (choice: "home" | "draw" | "away") => {
    if (!matchId || isFinished || userVote) return;

    try {
      const pollsCollection = collection(db, "polls");
      const matchPollsQuery = query(pollsCollection, where("matchId", "==", matchId));

      const { getDocs, updateDoc } = await import("firebase/firestore");
      const querySnapshot = await getDocs(matchPollsQuery);

      if (!querySnapshot.empty) {
        const pollDoc = querySnapshot.docs[0];
        const pollRef = doc(db, "polls", pollDoc.id);
        const currentVotes = pollDoc.data().votes;

        const newVotes = { ...currentVotes };
        newVotes[choice] += 1;

        await updateDoc(pollRef, { votes: newVotes });
        setUserVote(choice);
        localStorage.setItem(`match_${matchId}_vote`, choice);
      } else {
        const docRef = await addDoc(pollsCollection, {
          matchId: matchId,
          votes: {
            home: choice === 'home' ? 1 : 0,
            draw: choice === 'draw' ? 1 : 0,
            away: choice === 'away' ? 1 : 0,
          },
          createdAt: new Date(),
        });
        setUserVote(choice);
        localStorage.setItem(`match_${matchId}_vote`, choice);
        console.log("New poll created with ID:", docRef.id);
      }
    } catch (error) {
      console.error("Error voting:", error);
    }
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case "LIVE":
        return "bg-red-500 text-white";
      case "FT":
        return "bg-gray-500 text-white";
      case "Upcoming":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  // const handleShare = (platform: string) => {
  //   const url = window.location.href;
  //   const text = `Watch ${match?.clubs.home.name || 'Match'} vs ${match?.clubs.away.name || 'Match'} live on KikaSports!`;

  //   switch (platform) {
  //     case "facebook":
  //       window.open(
  //         `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  //         "_blank",
  //       );
  //       break;
  //     case "twitter":
  //       window.open(
  //         `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  //         "_blank",
  //       );
  //       break;
  //     case "whatsapp":
  //       window.open(
  //         `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
  //         "_blank",
  //       );
  //       break;
  //     case "telegram":
  //       window.open(
  //         `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  //         "_blank",
  //       );
  //       break;
  //     case "copy":
  //       navigator.clipboard.writeText(url).then(() => {
  //         console.log("Link copied to clipboard!");
  //       });
  //       break;
  //     default:
  //       navigator.clipboard.writeText(url);
  //   }
  // };

  const handleStreamChange = (
    streamUrl: string,
    type: "jwplayer" | "iframe",
  ) => {
    if (!streamUrl || streamUrl.trim() === "") return;

    if (playerInstance) {
      try {
        playerInstance.remove();
        setPlayerInstance(null);
      } catch (e) {
        console.log("Player cleanup error:", e);
      }
    }

    if (type === "jwplayer" && !window.jwplayer) {
      setPlayerInitialized(false);
      setSelectedStream(streamUrl);
      setPlayerType(type);

      const existingScript = document.querySelector('script[src*="jwplayer.js"]');
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://fle-rvd0i9o8-moo.com/player/jw8_26/jwplayer.js?v=5.0.2";
        script.onload = () => {
          console.log("JWPlayer script loaded for stream change");
        };
        script.onerror = (error) => {
          console.error("Failed to load JWPlayer script:", error);
        };
        document.head.appendChild(script);
      }
    } else {
      setPlayerInitialized(false);
      setSelectedStream(streamUrl);
      setPlayerType(type);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading match details...</p>
        </div>
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-gray-600 text-lg mb-4">Match not found</p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const availableStreams = [
    {
      name: "server 1",
      url: match.streams?.hls1,
      type: "jwplayer" as const,
      icon: Radio,
    },
    {
      name: "server 2",
      url: match.streams?.hls2,
      type: "jwplayer" as const,
      icon: Radio,
    },
    {
      name: "Stream 1",
      url: match.streams?.src1,
      type: "iframe" as const,
      quality: "SD",
      icon: Play,
    },
    {
      name: "Stream 2",
      url: match.streams?.src2,
      type: "iframe" as const,
      quality: "SD",
      icon: Play,
    },
  ].filter((stream) => stream.url && stream.url.trim() !== "");

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">KK</span>
                </div>
                <div className="text-xl font-bold text-gray-900">KikaSports</div>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-900"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="text-gray-600 hover:text-gray-900"
              >
                Privacy
              </Link>
              <Link
                href="/disclaimer"
                className="text-gray-600 hover:text-gray-900"
              >
                Disclaimer
              </Link>
            </nav>
          </div>
        </div>
      </header>
      

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-6">

         <AdSenseBanner />
        {/* Match Header - Mobile Optimized */}
        <div className="bg-white rounded-lg p-3 md:p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  className={cn(
                    "text-xs px-2 py-0.5 flex-shrink-0",
                    getStatusColor(match.score.status)
                  )}
                >
                  {isLive && (
                    <div className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse" />
                  )}
                  {match.score.status}
                </Badge>
                <span className="text-gray-600 text-xs truncate">
                  {match.competition.name}
                </span>
              </div>

              <h1 className="text-base md:text-xl font-bold text-gray-900 mb-2">
                {match.clubs.home.name} vs {match.clubs.away.name}
              </h1>

              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <span>{convertToLocalTime(match.kickoff.time, match.kickoff.date).split(',')[0]}</span>
                <span>•</span>
                <span>{convertToLocalTime(match.kickoff.time, match.kickoff.date).split(',')[1].trim().split(' ')[0]}{' '}{convertToLocalTime(match.kickoff.time, match.kickoff.date).split(',')[1].trim().split(' ')[1]}</span>
              </div>
            </div>

            {/* Desktop Score Display Only */}
            {(isLive || isFinished) && (
              <div className="hidden md:flex text-2xl font-bold text-gray-900">
                {/* {match.score.home} - {match.score.away} */}
              </div>
            )}
          </div>
        </div>
        

        {/* Player Container */}
        <Card>
          <CardContent className="p-0">
            <div
              className="relative bg-black rounded-lg overflow-hidden"
              style={{ aspectRatio: "16/9" }}
            >
              {/* Telegram Button */}
              <button
                onClick={() => window.open('https://t.me/+qoQyfKPAqgcxN2U0', '_blank')}
                className="absolute top-3 right-3 z-30 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors"
                title="Join our Telegram channel"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121L9.864 13.626l-2.72-.918c-.59-.2-.602-.59.125-.874l10.64-4.102c.49-.18.918.114.755.874z"/>
                </svg>
              </button>

              <div className="absolute inset-0 flex items-center justify-center">
                {playerType === "jwplayer" && !isUpcoming && !isFinished ? (
                  <div id="jwplayer-container" className="w-full h-full"></div>
                ) : (
                  selectedStream && !isUpcoming && !isFinished && (
                    <iframe
                      src={selectedStream}
                      className="w-full h-full border-0"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  )
                )}
              </div>

              {/* Overlays for non-live matches */}
              {isUpcoming && (
                <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <Calendar className="w-8 md:w-12 h-8 md:h-12 mx-auto mb-3 md:mb-4 text-red-500" />
                    <h3 className="text-lg md:text-2xl font-bold mb-2">Coming Soon</h3>
                    <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">
                      Stream will begin when the match starts.
                    </p>
                    {countdown && (
                      <div className="flex items-center justify-center space-x-2 text-sm md:text-lg font-medium">
                        <Clock className="w-4 md:w-5 h-4 md:h-5" />
                        <span>{countdown}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {isFinished && (
                <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <Trophy className="w-8 md:w-12 h-8 md:h-12 mx-auto mb-3 md:mb-4 text-yellow-500" />
                    <h3 className="text-lg md:text-2xl font-bold mb-2">Match Ended</h3>
                    <p className="text-gray-300 text-sm md:text-base">
                      Final Score: {match.score.home} - {match.score.away}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stream Sources - Redesigned */}
        {availableStreams.length > 0 && !isUpcoming && !isFinished && (
          <Card className="bg-white shadow-sm border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <Radio className="w-3 h-3 text-white" />
                </div>
                <h3 className="text-sm font-medium text-gray-900">Stream Sources</h3>
                <span className="text-xs text-gray-500 ml-auto">Choose your preferred quality</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableStreams.map((stream, index) => {
                  const isSelected = selectedStream === stream.url;
                  const StreamIcon = stream.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleStreamChange(stream.url, stream.type)}
                      className={cn(
                        "p-3 rounded-xl transition-all duration-200 flex flex-col items-center gap-2 border-2",
                        isSelected
                          ? "bg-blue-50 border-blue-400 shadow-md"
                          : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        isSelected ? "bg-blue-500" : "bg-gray-400"
                      )}>
                        <StreamIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-center">
                        <div className={cn(
                          "text-xs font-medium mb-1",
                          isSelected ? "text-blue-700" : "text-gray-700"
                        )}>
                          {stream.name}
                        </div>
                        <Badge 
                          variant={isSelected ? "default" : "secondary"}
                          className={cn(
                            "text-xs px-2 py-0",
                            isSelected ? "bg-blue-500" : "bg-gray-400"
                          )}
                        >
                          {stream.quality}
                        </Badge>
                      </div>
                      {isSelected && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Match Prediction Section - Redesigned for mobile */}
        {(isLive || isUpcoming) && (
          <Card className="bg-white shadow-sm border">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <Users className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                </div>
                <h3 className="text-xs md:text-sm font-medium text-gray-900">Match Poll</h3>
                <span className="text-xs text-gray-500 ml-auto hidden md:block">Cast your prediction</span>
              </div>

              <div className="text-center text-xs md:text-sm text-gray-700 mb-3 md:mb-4">
                Who will win? {match?.clubs.home.name} vs {match?.clubs.away.name}
              </div>

              {/* Mobile: Horizontal layout with smaller logos */}
              <div className="md:hidden">
                <div className="flex items-center justify-between gap-2 mb-3">
                  {/* Home Team Vote */}
                  <button
                    onClick={() => vote('home')}
                    disabled={isFinished || !!userVote}
                    className={cn(
                      "flex-1 p-3 rounded-xl transition-all duration-200 flex flex-col items-center gap-2",
                      userVote === 'home'
                        ? "bg-blue-100 border-2 border-blue-400"
                        : "bg-blue-50 hover:bg-blue-100 border border-gray-200",
                      (isFinished || !!userVote) && "opacity-60 cursor-not-allowed"
                    )}
                  >
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-white flex items-center justify-center shadow-sm">
                      {match?.clubs.home.logo ? (
                        <img
                          src={match.clubs.home.logo}
                          alt={match.clubs.home.name}
                          className="w-6 h-6 object-contain"
                        />
                      ) : (
                        <div className="w-6 h-6 bg-red-500 rounded" />
                      )}
                    </div>
                    <span className="text-xs font-medium text-gray-900 text-center leading-tight">
                      {match?.clubs.home.name.length > 8 
                        ? match.clubs.home.name.substring(0, 8) + '...'
                        : match?.clubs.home.name}
                    </span>
                    <span className="text-xs font-bold text-blue-600">
                      {getPercentage(pollData?.votes.home || 0)}%
                    </span>
                  </button>

                  {/* Draw Vote */}
                  <button
                    onClick={() => vote('draw')}
                    disabled={isFinished || !!userVote}
                    className={cn(
                      "flex-1 p-3 rounded-xl transition-all duration-200 flex flex-col items-center gap-2",
                      userVote === 'draw'
                        ? "bg-yellow-100 border-2 border-yellow-400"
                        : "bg-yellow-50 hover:bg-yellow-100 border border-gray-200",
                      (isFinished || !!userVote) && "opacity-60 cursor-not-allowed"
                    )}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-400 flex items-center justify-center shadow-sm">
                      <span className="text-white font-bold text-sm">=</span>
                    </div>
                    <span className="text-xs font-medium text-gray-900">Draw</span>
                    <span className="text-xs font-bold text-yellow-600">
                      {getPercentage(pollData?.votes.draw || 0)}%
                    </span>
                  </button>

                  {/* Away Team Vote */}
                  <button
                    onClick={() => vote('away')}
                    disabled={isFinished || !!userVote}
                    className={cn(
                      "flex-1 p-3 rounded-xl transition-all duration-200 flex flex-col items-center gap-2",
                      userVote === 'away'
                        ? "bg-red-100 border-2 border-red-400"
                        : "bg-red-50 hover:bg-red-100 border border-gray-200",
                      (isFinished || !!userVote) && "opacity-60 cursor-not-allowed"
                    )}
                  >
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-white flex items-center justify-center shadow-sm">
                      {match?.clubs.away.logo ? (
                        <img
                          src={match.clubs.away.logo}
                          alt={match.clubs.away.name}
                          className="w-6 h-6 object-contain"
                        />
                      ) : (
                        <div className="w-6 h-6 bg-blue-500 rounded" />
                      )}
                    </div>
                    <span className="text-xs font-medium text-gray-900 text-center leading-tight">
                      {match?.clubs.away.name.length > 8 
                        ? match.clubs.away.name.substring(0, 8) + '...'
                        : match?.clubs.away.name}
                    </span>
                    <span className="text-xs font-bold text-red-600">
                      {getPercentage(pollData?.votes.away || 0)}%
                    </span>
                  </button>
                </div>
              </div>

              {/* Desktop: Grid layout */}
              <div className="hidden md:grid grid-cols-3 gap-2 mb-4">
                {/* Home Team Vote */}
                <button
                  onClick={() => vote('home')}
                  disabled={isFinished || !!userVote}
                  className={cn(
                    "p-4 rounded-xl transition-all duration-200 flex flex-col items-center gap-2",
                    userVote === 'home'
                      ? "bg-blue-100 border-2 border-blue-400"
                      : "bg-blue-50 hover:bg-blue-100 border border-gray-200",
                    (isFinished || !!userVote) && "opacity-60 cursor-not-allowed"
                  )}
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-white flex items-center justify-center shadow-sm">
                    {match?.clubs.home.logo ? (
                      <img
                        src={match.clubs.home.logo}
                        alt={match.clubs.home.name}
                        className="w-8 h-8 object-contain"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-red-500 rounded" />
                    )}
                  </div>
                  <span className="text-xs font-medium text-gray-900 truncate max-w-full">
                    {match?.clubs.home.name}
                  </span>
                  <span className="text-xs font-bold text-blue-600">
                    {getPercentage(pollData?.votes.home || 0)}%
                  </span>
                </button>

                {/* Draw Vote */}
                <button
                  onClick={() => vote('draw')}
                  disabled={isFinished || !!userVote}
                  className={cn(
                    "p-4 rounded-xl transition-all duration-200 flex flex-col items-center gap-2",
                    userVote === 'draw'
                      ? "bg-yellow-100 border-2 border-yellow-400"
                      : "bg-yellow-50 hover:bg-yellow-100 border border-gray-200",
                    (isFinished || !!userVote) && "opacity-60 cursor-not-allowed"
                  )}
                >
                  <div className="w-12 h-12 rounded-lg bg-gray-400 flex items-center justify-center shadow-sm">
                    <span className="text-white font-bold text-lg">=</span>
                  </div>
                  <span className="text-xs font-medium text-gray-900">Draw</span>
                  <span className="text-xs font-bold text-yellow-600">
                    {getPercentage(pollData?.votes.draw || 0)}%
                  </span>
                </button>

                {/* Away Team Vote */}
                <button
                  onClick={() => vote('away')}
                  disabled={isFinished || !!userVote}
                  className={cn(
                    "p-4 rounded-xl transition-all duration-200 flex flex-col items-center gap-2",
                    userVote === 'away'
                      ? "bg-red-100 border-2 border-red-400"
                      : "bg-red-50 hover:bg-red-100 border border-gray-200",
                    (isFinished || !!userVote) && "opacity-60 cursor-not-allowed"
                  )}
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-white flex items-center justify-center shadow-sm">
                    {match?.clubs.away.logo ? (
                      <img
                        src={match.clubs.away.logo}
                        alt={match.clubs.away.name}
                        className="w-8 h-8 object-contain"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-blue-500 rounded" />
                    )}
                  </div>
                  <span className="text-xs font-medium text-gray-900 truncate max-w-full">
                    {match?.clubs.away.name}
                  </span>
                  <span className="text-xs font-bold text-red-600">
                    {getPercentage(pollData?.votes.away || 0)}%
                  </span>
                </button>
              </div>

              {userVote && (
                <div className="text-center py-2 px-3 bg-green-50 border border-green-200 rounded-lg mb-2">
                  <p className="text-xs text-green-700">
                    ✓ You voted for{' '}
                    <span className="font-semibold">
                      {userVote === 'home' ? match?.clubs.home.name :
                       userVote === 'draw' ? 'Draw' :
                       match?.clubs.away.name}
                    </span>
                  </p>
                </div>
              )}

              <div className="text-xs text-gray-500 text-center">
                {getTotalVotes()} total votes
              </div>
            </CardContent>
          </Card>
        )}

        {/* Social Media Share Section */}
        {/* <div className="bg-gray-100 border-b">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
            <div className="text-center">

              <div className="flex items-center justify-center space-x-3">
                <button
                  onClick={() => handleShare("facebook")}
                  className="w-9 h-9 bg-black rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-4 h-4 text-white" />
                </button>

                <button
                  onClick={() => handleShare("twitter")}
                  className="w-9 h-9 bg-black rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-4 h-4 text-white" />
                </button>

                <button
                  onClick={() => handleShare("whatsapp")}
                  className="w-9 h-9 bg-black rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                  aria-label="Share on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                </button>

                <button
                  onClick={() => handleShare("telegram")}
                  className="w-9 h-9 bg-black rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                  aria-label="Share on Telegram"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121L9.864 13.626l-2.72-.918c-.59-.2-.602-.59.125-.874l10.64-4.102c.49-.18.918.114.755.874z"/>
                  </svg>
                </button>

                <button
                  onClick={() => handleShare("copy")}
                  className="w-9 h-9 bg-black rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                  aria-label="Copy link"
                >
                  <Share2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div> */}


        {/* Match Info */}
        <Card>
          <CardContent className="p-3">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Match Details</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Competition:</span>
                <span className="font-medium">{match.competition.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{convertToLocalTime(match.kickoff.time, match.kickoff.date).split(',')[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{convertToLocalTime(match.kickoff.time, match.kickoff.date).split(',')[1].trim().split(' ')[0]}{' '}{convertToLocalTime(match.kickoff.time, match.kickoff.date).split(',')[1].trim().split(' ')[1]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Venue:</span>
                <span className="font-medium">{match.venue.name}</span>
              </div>
   
              {isFinished && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Final Score:</span>
                  <span className="font-bold text-lg text-gray-900">{match.score.home} - {match.score.away}</span>
                </div>
              )}
            </div>

            {/* Match Status */}
            {isUpcoming && countdown && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border">
                <div className="text-center">
                  <p className="text-blue-800 text-sm font-medium mb-1">
                    Starts in: {countdown}
                  </p>
                </div>
              </div>
            )}

            {isLive && (
              <div className="mt-4 p-3 bg-red-50 rounded-lg border">
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                    <span className="text-red-800 font-medium text-sm">LIVE NOW</span>
                  </div>
                </div>
              </div>
            )}

            {isFinished && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
                <div className="text-center">
                  <span className="text-gray-800 font-medium text-sm">Match Ended</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Other Matches */}
        {relatedMatches.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Other Live & Upcoming Matches
              </h3>
              <div className="space-y-3">
                {relatedMatches.map((relatedMatch) => (
                  <Link
                    key={relatedMatch.id}
                    href={`/match/${relatedMatch.id}`}
                  >
                    <div className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {relatedMatch.clubs.home.name} vs{" "}
                            {relatedMatch.clubs.away.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {convertToLocalTime(relatedMatch.kickoff.time, relatedMatch.kickoff.date).split(',')[0]} {' '}
                            {convertToLocalTime(relatedMatch.kickoff.time, relatedMatch.kickoff.date).split(',')[1].trim().split(' ')[0]}{' '}{convertToLocalTime(relatedMatch.kickoff.time, relatedMatch.kickoff.date).split(',')[1].trim().split(' ')[1]}
                          </p>
                        </div>
                        <Badge
                          className={cn(
                            "text-xs",
                            getStatusColor(relatedMatch.score.status),
                          )}
                        >
                          {relatedMatch.score.status}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

                 <AdSenseBanner />

      </div>

      {/* Footer with PWA and Multi-language/Timezone Support */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">KK</span>
                </div>
                <span className="text-xl font-bold text-gray-900">
                  KikaSports
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Your premier destination for live football streaming
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gray-900 block"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-900 block"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-gray-900 block"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Legal</h4>
              <div className="space-y-2 text-sm">
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-gray-900 block"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/disclaimer"
                  className="text-gray-600 hover:text-gray-900 block"
                >
                  Disclaimer
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-600 cursor-pointer" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
                <Instagram className="w-5 h-5 text-gray-400 hover:text-pink-600 cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center">
            {/* PWA Add to Home Screen Alert */}
            <div className="inline-block p-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg mb-4 text-sm flex items-center gap-2 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm1 2a1 1 0 00-1 1v10h12V6a1 1 0 00-1-1H4zm7.5 1.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1zM9.5 7a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1zM9.5 9a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1zM9.5 11a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1z" clipRule="evenodd"/>
              </svg>
              <span>
                Add KikaSports to your home screen for the best experience!
              </span>
            </div>

            <p className="text-sm text-gray-500">
              © 2025 KikaSports. All rights reserved.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Kickoff times are shown in your local timezone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}