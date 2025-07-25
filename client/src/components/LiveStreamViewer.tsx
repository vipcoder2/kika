import React, { useState, useEffect } from "react";
import { Match } from "../types/match";
import MobileVideoPlayer from "./MobileVideoPlayer";
import WebVideoPlayer from "./WebVideoPlayer";
import { PlayCircle, Calendar, Clock } from "lucide-react";
interface LiveStreamViewerProps {
  match: Match;
  streamUrl: string;
  streamQuality: "hd" | "sd" | "mobile";
  streamType?: "hls" | "mobile-hls" | "iframe";
}
const LiveStreamViewer: React.FC<LiveStreamViewerProps> = ({
  match,
  streamUrl,
  streamQuality,
  streamType = "hls"
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const title = `${match.clubs.home.name} vs ${match.clubs.away.name}`;
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  console.log('LiveStreamViewer props:', {
    streamUrl,
    streamQuality,
    streamType,
    isMobile
  });

  // Show overlay for finished matches
  if (match.score.status === "FT") {
    return <div className="relative w-full aspect-video bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl border border-gray-700">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/90 backdrop-blur-sm">
          <div className="text-center p-8">
            <PlayCircle className="w-10 h-10 text-gray-500 mx-auto mb-6" />
            <h3 className="font-bold text-white mb-3 text-lg">Match Completed</h3>
            <p className="text-gray-400 text-sm">This match has ended. Check our schedule for upcoming games.</p>
          </div>
        </div>
      </div>;
  }

  // Show overlay for upcoming matches
  if (match.score.status === "Upcoming") {
    return <div className="relative w-full aspect-video bg-black from-sport-primary/20 to-sport-secondary/20 rounded-3xl overflow-hidden shadow-2xl border border-sport-primary/30">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black backdrop-blur-sm">
          <div className="text-center p-8">
            <Calendar className="w-10 h-10 text-sport-primary mx-auto mb-6" />
            <h3 className="font-bold text-white mb-3 text-lg">Coming Soon</h3>
            <p className="text-gray-300 mb-4 text-sm">Stream will begin when the match starts.</p>
            <div className="flex items-center justify-center gap-2 text-sport-accent">
              <Clock className="w-5 h-5 text-white" />
              <span className="font-bold text-white ">{match.kickoff.time}</span>
            </div>
          </div>
        </div>
      </div>;
  }

  // No stream available
  if (!streamUrl) {
    return <div className="relative w-full aspect-video bg-black from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl border border-gray-700">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <PlayCircle className="w-10 h-10 text-white mx-auto mb-6" />
          <p className="text-white text-lg font-semibold">No Stream Available</p>
          <p className="text-white text-sm mt-2">Please try selecting a different quality below.</p>
        </div>
      </div>;
  }

  // Determine which player to use based on stream type and device
  const shouldUseMobilePlayer = streamType === "mobile-hls" || isMobile && streamType !== "iframe";
  console.log('Player selection:', {
    shouldUseMobilePlayer,
    streamType,
    isMobile
  });
  const PlayerComponent = shouldUseMobilePlayer ? <MobileVideoPlayer src={streamUrl} title={title} /> : <WebVideoPlayer src={streamUrl} title={title} streamQuality={streamQuality} streamType={streamType} />;
  return <div className="space-y-4 my-0">
      {PlayerComponent}
      
      {/* Simple text for Android users on mobile */}
      {isMobile && <p className="text-center text-gray-400 px-4 text-xs">
          Android users: Use Firefox or Phoenix browser for streaming. Chrome may not support our links.
        </p>}
    </div>;
};
export default LiveStreamViewer;