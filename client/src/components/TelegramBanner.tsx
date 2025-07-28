
import React, { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';

interface TelegramBannerProps {
  isVisible: boolean;
  onClose: () => void;
}

// Session management for telegram banner
const TELEGRAM_BANNER_KEY = 'telegram_banner_data';
const MAX_SHOWS_PER_SESSION = 2;
const RESET_TIME_MS = 60 * 60 * 1000; // 1 hour in milliseconds

interface TelegramBannerData {
  showCount: number;
  lastResetTime: number;
}

const getTelegramBannerData = (): TelegramBannerData => {
  const stored = localStorage.getItem(TELEGRAM_BANNER_KEY);
  if (!stored) {
    return { showCount: 0, lastResetTime: Date.now() };
  }
  
  try {
    const data = JSON.parse(stored) as TelegramBannerData;
    const now = Date.now();
    
    // Reset if more than 1 hour has passed
    if (now - data.lastResetTime > RESET_TIME_MS) {
      return { showCount: 0, lastResetTime: now };
    }
    
    return data;
  } catch {
    return { showCount: 0, lastResetTime: Date.now() };
  }
};

const updateTelegramBannerData = (data: TelegramBannerData) => {
  localStorage.setItem(TELEGRAM_BANNER_KEY, JSON.stringify(data));
};

const canShowTelegramBanner = (): boolean => {
  const data = getTelegramBannerData();
  return data.showCount < MAX_SHOWS_PER_SESSION;
};

const incrementTelegramBannerCount = () => {
  const data = getTelegramBannerData();
  data.showCount += 1;
  updateTelegramBannerData(data);
};

const TelegramBanner: React.FC<TelegramBannerProps> = ({ isVisible, onClose }) => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (isVisible && canShowTelegramBanner()) {
      setShouldShow(true);
      incrementTelegramBannerCount();
    } else {
      setShouldShow(false);
    }
  }, [isVisible]);

  const handleClose = () => {
    setShouldShow(false);
    onClose();
  };

  if (!shouldShow) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 max-w-md w-full border border-slate-700/50 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-sport-primary/20 p-3 rounded-full">
            <MessageCircle className="w-8 h-8 text-sport-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Join Our Community</h3>
            <p className="text-gray-300 text-sm">Get live match updates & more</p>
          </div>
        </div>

        {/* Simple Description */}
        <p className="text-gray-300 mb-6 leading-relaxed">
          Join thousands of football fans in our Telegram channel for live match alerts, 
          streaming links, and exclusive content.
        </p>

        {/* CTA Button */}
        <a
          href="https://t.me/+Zo7CoigxqRczMjRk"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-sport-primary hover:bg-sport-secondary text-white font-bold py-3 px-6 rounded-xl text-center transition-colors"
        >
          Join Telegram Channel
        </a>

        {/* Bottom Text */}
        <p className="text-center text-gray-400 text-xs mt-3">
          Free to join • No spam
        </p>
      </div>
    </div>
  );
};

export default TelegramBanner;
