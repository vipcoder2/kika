import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Trophy, Users, TrendingUp, X } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TelegramBanner from "../components/TelegramBanner";

// Extend Window interface for AdSense
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

// Sticky Bottom Ad Component - Centered and hides on failure
const StickyBottomAd = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Set a timeout to check if ad loaded
    const timer = setTimeout(() => {
      const adElements = document.querySelectorAll('.sticky-bottom-ad .adsbygoogle');
      const hasLoadedAd = Array.from(adElements).some(el => 
        el.getAttribute('data-adsbygoogle-status') === 'done'
      );
      
      if (!hasLoadedAd) {
        setAdError(true);
        setIsVisible(false); // Hide the entire section when ad fails
      } else {
        setAdLoaded(true);
      }
    }, 3000);

    // Initialize AdSense for sticky bottom ad
    if (typeof window !== 'undefined') {
      try {
        setTimeout(() => {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }, 100);
      } catch (err) {
        console.error('Sticky Bottom AdSense error:', err);
        setAdError(true);
        setIsVisible(false); // Hide the entire section on error
      }
    }

    return () => clearTimeout(timer);
  }, [isVisible]);

  // Hide if ad failed to load or user closed it
  if (!isVisible || adError) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-700/50 shadow-2xl">
      <div className="sticky-bottom-ad relative flex justify-center items-center">
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-1 right-1 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition-colors duration-200"
          aria-label="Close ad"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Ad Container - Centered */}
        <div className="relative flex justify-center items-center w-full">
          <ins 
            className="adsbygoogle"
            style={{ 
              display: 'inline-block',
              width: isMobile ? '320px' : '650px',
              height: '70px'
            }}
            data-ad-client="ca-pub-9955658533931358"
            data-ad-slot="7159925780"
          />

          {/* Loading state */}
          {!adLoaded && !adError && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 min-h-[70px]">
              <div className="animate-pulse text-gray-400 text-sm">Loading ad...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Updated AdSense Banner Component - Responsive and centered
const AdSenseBanner = () => {
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [adHeight, setAdHeight] = useState(0);
  const adRef = useRef(null);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Monitor ad size changes for mobile responsiveness
  useEffect(() => {
    if (!isMobile || !adRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { height } = entry.contentRect;
        setAdHeight(height);
      }
    });

    // const adElement = adRef.current.querySelector('.adsbygoogle');
    // if (adElement) {
    //   observer.observe(adElement);
    // }

    return () => observer.disconnect();
  }, [isMobile, adLoaded]);

  useEffect(() => {
    // Set a timeout to check if ad loaded
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

    // Initialize AdSense
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

  // Hide the entire section if ad failed to load
  if (adError) {
    return null;
  }

  return (
    <div className="w-full mb-5">
      {/* Mobile Ad - Responsive to ad size */}
      {isMobile && (
        <div 
          ref={adRef}
          className="main-ad-banner bg-slate-900 rounded-xl border border-slate-700/50 overflow-hidden relative flex justify-center items-center"
          style={{ 
            minHeight: adLoaded && adHeight > 0 ? `${adHeight}px` : '200px',
            height: adLoaded && adHeight > 0 ? 'auto' : '200px'
          }}
        >
          {/* Ad Container - Centered and responsive */}
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
            
            {/* Ad Label - Bottom left */}
            <div className="absolute bottom-2 left-2">
              <span className="text-xs text-gray-400 bg-black/60 px-2 py-1 rounded">
                Ad
              </span>
            </div>
            
            {/* Loading state */}
            {!adLoaded && !adError && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80">
                <div className="animate-pulse text-gray-300 text-sm">Loading ad...</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Desktop Ad - Centered */}
      {!isMobile && (
        <div className="main-ad-banner bg-slate-900 rounded-xl border border-slate-700/50 overflow-hidden relative flex justify-center items-center min-h-[250px]">
          {/* Ad Container - Centered */}
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
            
            {/* Ad Label - Bottom left */}
            <div className="absolute bottom-2 left-2">
              <span className="text-xs text-gray-400 bg-black/60 px-2 py-1 rounded">
                Ad
              </span>
            </div>
            
            {/* Loading state */}
            {!adLoaded && !adError && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80">
                <div className="animate-pulse text-gray-300 text-sm">Loading ad...</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};



const LiveScore = () => {
  const widgetRef = useRef(null);
  const [showTelegramBanner, setShowTelegramBanner] = useState(false);

  // Show Telegram banner after widget loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTelegramBanner(true);
    }, 3000);
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

  useEffect(() => {
    // Clean up any existing scripts first
    const existingScripts = document.querySelectorAll('script[src*="soccersapi.com"]');
    existingScripts.forEach(script => script.remove());

    // Clean up any existing widgets
    const existingWidgets = document.querySelectorAll('.livescore-widget');
    existingWidgets.forEach(widget => {
      if (widget !== widgetRef.current) {
        widget.innerHTML = '';
      }
    });

    // Load the widget script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://ls.soccersapi.com/widget/res/wo_w9136_6846ecf56ae6f/widget.js';
    script.async = true;

    script.onload = () => {
      setTimeout(() => {
        if (widgetRef.current) {
          window.dispatchEvent(new Event('resize'));
        }
      }, 1000);
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Add a resize handler to help with widget responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (widgetRef.current) {
        const event = new Event('resize');
        window.dispatchEvent(event);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Helmet>
        <title>Live Football Scores and Results - KikaSports</title>
        <meta name="description" content="Get live football scores, real-time match updates, and instant results from Premier League, Champions League, La Liga, Serie A, and international competitions. Updated every minute." />
        <link rel="canonical" href={`${window.location.origin}/live-score`} />
         <meta name="keywords" content="live football scores, real time scores, match results, Premier League scores, Champions League results, football livescore" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Live Football Scores and Results" />
        <meta property="og:description" content="Get live football scores, real-time match updates, and instant results from all major leagues and competitions worldwide." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/live-score`} />
        <meta property="og:image" content="https://i.ibb.co/sdC85N9X/Kikasports-cover.png" />
        <meta property="og:site_name" content="kikasports" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Live Football Scores and Results" />
        <meta name="twitter:description" content="Get live football scores, real-time match updates, and instant results from all major leagues and competitions worldwide." />
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
                  <span className="text-2xl font-bold text-sport-text">Live Scores</span>
                  <TrendingUp className="w-6 h-6 text-sport-primary" />
                </div>
                <p className="text-sport-text-light">Real-time football scores and match updates from leagues worldwide</p>
              </div>

               {/* AdSense Banner - Right below header */}
              <AdSenseBanner />

              {/* Widget Container */}
              <div className="bg-sport-card border border-sport-border rounded-xl overflow-hidden">
                <div 
                  ref={widgetRef}
                  id="ls-widget" 
                  data-w="wo_w9136_6846ecf56ae6f" 
                  className="livescore-widget w-full min-h-[600px]"
                  style={{
                    width: '100%',
                    minHeight: '600px',
                    height: 'auto',
                    overflow: 'hidden'
                  }}
                >
                  {/* Loading placeholder */}
                  <div className="flex items-center justify-center min-h-[400px] text-sport-text-light">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sport-primary mx-auto mb-4"></div>
                      <p>Loading live scores...</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              {/* Additional Information */}
<div className="mt-6 bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-Time Football Coverage</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Major League Coverage</h3>
      <p className="text-gray-700 leading-relaxed">
        Follow live scores from the world's top football leagues including English Premier League, Spanish La Liga,
        Italian Serie A, German Bundesliga, French Ligue 1, and international competitions.
      </p>
    </div>
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-Time Updates</h3>
      <p className="text-gray-700 leading-relaxed">
        Get instant notifications for goals, cards, substitutions, and other key match events.
        Our system updates every minute to keep you informed about every moment of the action.
      </p>
    </div>
  </div>
  <div className="mt-6 text-center bg-gray-50 border border-gray-200 rounded-lg p-4">
    <p className="text-gray-700">
      Looking for live streaming? Check out our <a href="/" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">live football streaming</a> section
      or browse upcoming matches in our <a href="/schedule" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">fixture schedule</a>.
    </p>
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

         <StickyBottomAd />

        <Footer />
      </div>

      {/* Additional CSS to ensure widget displays properly */}
      <style>{`
        .livescore-widget iframe {
          width: 100% !important;
          min-height: 800px !important;
          height: auto !important;
          border: none !important;
        }

        .livescore-widget > div {
          width: 100% !important;
          min-height: 600px !important;
        }

        /* Force widget to be responsive */
        #ls-widget * {
          max-width: 100% !important;
        }
      `}</style>
    </>
  );
};

export default LiveScore;