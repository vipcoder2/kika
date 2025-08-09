import React, { useEffect, useState, useRef } from "react";
import { Flame, Radio, Calendar, X } from 'lucide-react';
import { Sidebar } from '@/components/Layout/Sidebar';
import { Header } from '@/components/Layout/Header';
import { MatchSection } from '@/components/Match/MatchSection';
import { VideoPlayer } from '@/components/Player/VideoPlayer';
import { useHotMatches, useLiveMatches, useUpcomingMatches, useFinishedMatches } from '@/hooks/useMatches';
import { Match } from '@/types/match';

import { Link } from "wouter";
import {
  ArrowLeft,
  Share2,
  MapPin,
  Trophy,
  Clock,
  Users,
  Facebook,
  Twitter,
  Instagram,
  MessageCircle,
  Play,
} from "lucide-react";



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



export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [showTelegramPopup, setShowTelegramPopup] = useState(false);

  // Show Telegram popup once per session
  useEffect(() => {
    const hasShownPopup = sessionStorage.getItem('telegramPopupShown');
    if (!hasShownPopup) {
      const timer = setTimeout(() => {
        setShowTelegramPopup(true);
        sessionStorage.setItem('telegramPopupShown', 'true');
      }, 2000); // Show after 2 seconds
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleTelegramClick = () => {
    window.open('https://t.me/+qoQyfKPAqgcxN2U0', '_blank');
    setShowTelegramPopup(false);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Watch live football matches on KikaSports!`;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank",
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
          "_blank",
        );
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
          "_blank",
        );
        break;
      case "telegram":
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
          "_blank",
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url).then(() => {
          // You could add a toast notification here if you have one
          console.log("Link copied to clipboard!");
        });
        break;
      default:
        navigator.clipboard.writeText(url);
    }
  };


  const { data: hotMatches, isLoading: hotLoading, error: hotError } = useHotMatches();
  const { data: liveMatches, isLoading: liveLoading, error: liveError } = useLiveMatches();
  const { data: upcomingMatches, isLoading: upcomingLoading, error: upcomingError } = useUpcomingMatches();
  const { data: finishedMatches, isLoading: finishedLoading, error: finishedError } = useFinishedMatches();

  // Log errors for debugging
  if (hotError) console.error('Hot matches error:', hotError);
  if (liveError) console.error('Live matches error:', liveError);
  if (upcomingError) console.error('Upcoming matches error:', upcomingError);
  if (finishedError) console.error('Finished matches error:', finishedError);

  // Combine all matches for "All Matches" section
  const allMatches = [
    ...(upcomingMatches || []),
    ...(finishedMatches || []),
  ].sort((a, b) => new Date(b.kickoff.date).getTime() - new Date(a.kickoff.date).getTime());

  const handleWatchMatch = (match: Match) => {
    setSelectedMatch(match);
    setPlayerOpen(true);
  };

  return (
    
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={() => setSidebarOpen(true)} />
        

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 lg:p-6 space-y-8">

 <AdSenseBanner />
          {/* Social Media Share Section */}
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-0">
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Share KikaSports with Friends
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  Help others discover the best live football streaming experience
                </p>
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
          </div>

          
          {(!liveLoading && liveMatches && liveMatches.length > 0) && (
            <MatchSection
              title="Live Matches"
              matches={liveMatches}
              icon={<Radio className="w-6 h-6 text-green-500 mr-3" />}
              isLoading={liveLoading}
              error={liveError}
            />
          )}

          {(!hotLoading && hotMatches && hotMatches.length > 0) && (
            <MatchSection
              title="Hot Matches"
              matches={hotMatches}
              icon={<Flame className="w-6 h-6 text-red-500 mr-3" />}
              isLoading={hotLoading}
              error={hotError}
            />
          )}

          {(!upcomingLoading && upcomingMatches && upcomingMatches.length > 0) && (
            <MatchSection
              title="All Matches"
              matches={allMatches}
              icon={<Calendar className="w-6 h-6 text-blue-500 mr-3" />}
              isLoading={upcomingLoading || finishedLoading}
              error={upcomingError || finishedError}
            />
          )}

          {(!finishedLoading && finishedMatches && finishedMatches.length > 0) && (
               <MatchSection
                title="Finished Matches"
                matches={finishedMatches}
                icon={<Calendar className="w-6 h-6 text-blue-500 mr-3" />}
                isLoading={finishedLoading}
                error={finishedError}
              />
          )}

          {/* No matches available message */}
          { !liveLoading && !hotLoading && !upcomingLoading && !finishedLoading &&
           ((liveMatches?.length || 0) === 0 &&
           (hotMatches?.length || 0) === 0 &&
           (upcomingMatches?.length || 0) === 0 &&
           (finishedMatches?.length || 0) === 0) && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Matches Available</h3>
              <p className="text-gray-600">There are no matches available at the moment. Check back later for updates.</p>
            </div>
          )}
        </main>
        

        {/* About and FAQ Sections Container */}
        <div className="max-w-6xl mx-auto px-4 lg:px mt-16 space-y-8" >
          {/* About Section */}
          <section className="bg-white rounded-xl shadow-sm border p-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">About KikaSports</h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Your premier destination for live football streaming with high-quality coverage and comprehensive match information.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  Bringing football fans closer to the action with high-quality live streams and comprehensive coverage worldwide.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⭐</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What We Offer</h3>
                <p className="text-gray-600 leading-relaxed">
                  High-quality streams of football matches from around the world with detailed calendars and match information.
                </p>
              </div>
              
              <div className="text-center md:col-span-2 lg:col-span-1">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Coverage</h3>
                <p className="text-gray-600 leading-relaxed">
                  Covering major leagues and competitions including Premier League, Champions League, and many more.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-white rounded-xl shadow-sm border p-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 text-lg">
                Find answers to the most common questions about our platform
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">?</span>
                    How can I watch matches?
                  </h3>
                  <p className="text-gray-600">Simply browse our live matches section and click "Watch Now" on any active stream to start viewing.</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">🏆</span>
                    Which leagues are covered?
                  </h3>
                  <p className="text-gray-600">We cover major European leagues including Premier League, La Liga, Bundesliga, Serie A, and Champions League.</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">📱</span>
                    Mobile compatibility?
                  </h3>
                  <p className="text-gray-600">Yes! Our platform is fully responsive and works seamlessly on mobile phones, tablets, and desktop computers.</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">🔧</span>
                    Stream not working?
                  </h3>
                  <p className="text-gray-600">Try refreshing the page or switching to an alternative stream source. Most matches have multiple streaming options.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        {/* <div className="max-w-6xl mx-auto">
          <footer className="bg-gradient-to-br from-primary to-blue-900 text-white rounded-xl shadow-lg p-8 mt-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-2xl font-bold">66Sports</span>
                    <p className="text-sm text-gray-300">Live Football Streaming</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Your premier destination for live football streaming. Experience matches from around the world with high-quality streams and comprehensive coverage.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="m12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.222.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4 text-white">Quick Links</h4>
                <ul className="space-y-3">
                  <li><a href="/" className="text-gray-300 hover:text-secondary transition-colors flex items-center"><span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>Home</a></li>
                  <li><a href="/about" className="text-gray-300 hover:text-secondary transition-colors flex items-center"><span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>About</a></li>
                  <li><a href="/faq" className="text-gray-300 hover:text-secondary transition-colors flex items-center"><span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>FAQ</a></li>
                  <li><a href="/contact" className="text-gray-300 hover:text-secondary transition-colors flex items-center"><span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>Contact</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4 text-white">Legal</h4>
                <ul className="space-y-3">
                  <li><a href="/privacy" className="text-gray-300 hover:text-secondary transition-colors flex items-center"><span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>Privacy Policy</a></li>
                  <li><a href="/disclaimer" className="text-gray-300 hover:text-secondary transition-colors flex items-center"><span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>Disclaimer</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-secondary transition-colors flex items-center"><span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>Terms of Service</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-300 text-sm">&copy; 2024 66Sports. All rights reserved.</p>
              <p className="text-gray-400 text-xs mt-2 md:mt-0">Made with ❤️ for football fans worldwide</p>
            </div>
          </footer>
        </div> */}


         {/* Footer */}
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
                Stream live football HD on KikaSports. Free soccer streaming, live football TV today & football match coverage. Your go-to live sports TV destination.
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
                  href="/live-scores"
                  className="text-gray-600 hover:text-gray-900 block"
                >
                  Live Scores
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
            <p className="text-sm text-gray-500">
              © 2025 KikaSports. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      </div>

      {/* Video Player Modal */}
      {selectedMatch && (
        <VideoPlayer
          match={selectedMatch}
          isOpen={playerOpen}
          onClose={() => {
            setPlayerOpen(false);
            setSelectedMatch(null);
          }}
        />
      )}

      {/* Telegram Popup */}
      {showTelegramPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden transform transition-all">
            <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
              <button
                onClick={() => setShowTelegramPopup(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121L9.864 13.626l-2.72-.918c-.59-.2-.602-.59.125-.874l10.64-4.102c.49-.18.918.114.755.874z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Join Our Channel!</h3>
                  <p className="text-blue-100 text-sm">Stay updated with live matches</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6 text-center">
                Get instant notifications for live matches, updates, and exclusive content on our Telegram channel.
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleTelegramClick}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121L9.864 13.626l-2.72-.918c-.59-.2-.602-.59.125-.874l10.64-4.102c.49-.18.918.114.755.874z"/>
                  </svg>
                  <span>Join Telegram Channel</span>
                </button>
                <button
                  onClick={() => setShowTelegramPopup(false)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}