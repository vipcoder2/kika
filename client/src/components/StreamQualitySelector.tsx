import React from "react";
import { Monitor, Smartphone, Wifi, Globe } from "lucide-react";

interface StreamOption {
  id: string;
  name: string;
  url: string;
  quality: "hd" | "sd" | "mobile";
  type: "hls" | "mobile-hls" | "iframe";
}

interface StreamQualitySelectorProps {
  streams: StreamOption[];
  activeStream: string;
  onStreamChange: (url: string, quality: "hd" | "sd" | "mobile", type: "hls" | "mobile-hls" | "iframe") => void;
  onMobileWarning?: () => void;
}

const StreamQualitySelector: React.FC<StreamQualitySelectorProps> = ({
  streams,
  activeStream,
  onStreamChange,
  onMobileWarning
}) => {
  if (streams.length === 0) {
    return null;
  }

  const handleStreamClick = (stream: StreamOption) => {
    console.log('Stream quality changed:', stream.name, stream.url, stream.quality, stream.type);

    // Check if it's a mobile stream being clicked on desktop
    const isMobile = window.innerWidth <= 768;
    if (stream.type === "mobile-hls" && !isMobile && onMobileWarning) {
      onMobileWarning();
      return;
    }
    onStreamChange(stream.url, stream.quality, stream.type);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "mobile-hls":
        return <Smartphone className="w-3 h-3" />;
      case "hls":
        return <Wifi className="w-3 h-3" />;
      case "iframe":
        return <Globe className="w-3 h-3" />;
      default:
        return <Monitor className="w-3 h-3" />;
    }
  };

  const getButtonStyle = (stream: StreamOption, isActive: boolean) => {
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

  // Group streams by type for better organization
  const groupedStreams = streams.reduce((acc, stream) => {
    if (!acc[stream.type]) {
      acc[stream.type] = [];
    }
    acc[stream.type].push(stream);
    return acc;
  }, {} as Record<string, StreamOption[]>);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "hls":
        return "HLS";
      case "mobile-hls":
        return "Mobile";
      case "iframe":
        return "Server";
      default:
        return "Other";
    }
  };

  return (
    <div className="space-y-3">
      {Object.entries(groupedStreams).map(([type, typeStreams]) => (
        <div key={type} className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-600 flex items-center gap-1.5 min-w-fit">
            {getTypeIcon(type)}
            {getTypeLabel(type)}:
            {type === "mobile-hls" && (
              <span className="text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full">
                Mobile Only
              </span>
            )}
          </span>
          
          <div className="flex flex-wrap gap-2">
            {typeStreams.map(stream => {
              const isActive = activeStream === stream.url;
              return (
                <button
                  key={stream.id}
                  onClick={() => handleStreamClick(stream)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 flex items-center gap-1.5 border ${getButtonStyle(stream, isActive)} hover:shadow-sm`}
                  type="button"
                >
                  <span className="font-medium">{stream.name}</span>
                  {stream.quality === "hd" && (
                    <span className="text-xs bg-black/10 px-1 py-0.5 rounded">HD</span>
                  )}
                  {stream.quality === "mobile" && (
                    <span className="text-xs">📱</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      
      <p className="text-xs text-gray-500 mt-2">
        Select the best source for your device and connection speed
      </p>
    </div>
  );
};

export default StreamQualitySelector;