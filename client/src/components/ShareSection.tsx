
import React from 'react';
import { Share, Facebook, Twitter, MessageCircle, Send } from 'lucide-react';

const ShareSection: React.FC = () => {
  const currentUrl = window.location.origin;
  const shareText = "Watch live football matches online with high-quality streams on KikaSports! ⚽";

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      bgColor: 'bg-black hover:bg-gray-800'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`,
      bgColor: 'bg-black hover:bg-gray-800'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`,
      bgColor: 'bg-black hover:bg-gray-800'
    },
    {
      name: 'Telegram',
      icon: Send,
      url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`,
      bgColor: 'bg-black hover:bg-gray-800'
    },
    {
      name: 'Share',
      icon: Share,
      url: '#',
      bgColor: 'bg-black hover:bg-gray-800',
      isNativeShare: true
    }
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'KikaSports - Live Football Streaming',
          text: shareText,
          url: currentUrl
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL to clipboard
      try {
        await navigator.clipboard.writeText(currentUrl);
        alert('Link copied to clipboard!');
      } catch (error) {
        console.log('Error copying to clipboard:', error);
      }
    }
  };

  const handleSocialShare = (url: string, isNativeShare?: boolean) => {
    if (isNativeShare) {
      handleNativeShare();
    } else {
      window.open(url, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
    }
  };

  return (
    <section className="mb-6 md:mb-8">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 md:p-6 border border-gray-200 text-center">
        <div className="mb-4 md:mb-6">
          <h2 className="text-gray-800 text-sm md:text-base font-semibold mb-1">
            Share KikaSports with Friends
          </h2>
          <p className="text-gray-600 text-xs md:text-sm">
            Help others discover the best live football streaming experience
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 md:gap-3">
          {shareLinks.map(social => {
            const IconComponent = social.icon;
            return (
              <button
                key={social.name}
                onClick={() => handleSocialShare(social.url, social.isNativeShare)}
                className={`group flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 ${social.bgColor} text-white shadow-md hover:shadow-lg`}
                type="button"
                aria-label={`Share on ${social.name}`}
              >
                <IconComponent className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShareSection;
