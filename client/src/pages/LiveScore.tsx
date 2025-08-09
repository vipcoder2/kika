
import React, { useEffect, useState, useRef } from "react";
import { Sidebar } from '@/components/Layout/Sidebar';
import { Header } from '@/components/Layout/Header';
import { Link } from 'wouter';
import { Facebook, Twitter, Instagram, TrendingUp, Activity } from 'lucide-react';

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

export default function LiveScore() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Load the live score widget script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://ls.soccersapi.com/widget/res/w_default/widget.js';
    script.async = true;

    // Clean up any existing widget
    const existingWidget = document.getElementById('ls-widget');
    if (existingWidget) {
      existingWidget.innerHTML = '';
    }

    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto">

          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 md:py-8">
             <AdSenseBanner />
            {/* Live Score Widget */}
            <div className="bg-white rounded-xl shadow-sm border p-4 md:p-6 mb-8">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">Live Scores Widget</h2>
              </div>
              <div className="w-full overflow-x-auto">
                <div id="ls-widget" data-w="w_default" className="livescore-widget min-h-[400px]"></div>
              </div>
            </div>

            {/* About Live Scores Section */}
            <div className="bg-white rounded-xl shadow-sm border p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">About Live Scores</h2>
              
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">⚽</span>
                    </div>
                    Real-Time Updates
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Get instant updates on football matches from top leagues including Premier League, 
                    La Liga, Serie A, Bundesliga, and Champions League. Our live score system provides 
                    real-time goal alerts, yellow and red cards, and match statistics.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">📊</span>
                    </div>
                    Comprehensive Coverage
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Follow matches from over 100 leagues and tournaments worldwide. From major 
                    European competitions to local leagues, we cover it all. Get detailed match 
                    information including lineups, substitutions, and match events.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">📱</span>
                    </div>
                    Mobile Friendly
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Access live scores on any device. Our responsive design ensures you can follow 
                    your favorite teams whether you're on desktop, tablet, or mobile. Never miss 
                    a goal or important match event.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">🏆</span>
                    </div>
                    League Tables & Stats
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    View updated league tables, fixtures, and results. Get detailed statistics 
                    for teams and players including goals, assists, clean sheets, and much more. 
                    Track your team's progress throughout the season.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 md:p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Why Choose Our Live Scores?</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-blue-800">Fast & Accurate Updates</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-blue-800">Global League Coverage</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-blue-800">User-Friendly Interface</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">KK</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">KikaSports</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Your premier destination for live football streaming
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Quick Links</h4>
                <div className="space-y-2 text-sm">
                  <Link href="/" className="text-gray-600 hover:text-gray-900 block">
                    Home
                  </Link>
                  <Link href="/about" className="text-gray-600 hover:text-gray-900 block">
                    About Us
                  </Link>
                  <Link href="/contact" className="text-gray-600 hover:text-gray-900 block">
                    Contact Us
                  </Link>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Legal</h4>
                <div className="space-y-2 text-sm">
                  <Link href="/privacy" className="text-gray-600 hover:text-gray-900 block">
                    Privacy Policy
                  </Link>
                  <Link href="/disclaimer" className="text-gray-600 hover:text-gray-900 block">
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
              <p className="text-sm text-gray-500">© 2025 KikaSports. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
