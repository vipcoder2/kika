import React, { useState, useRef, useEffect } from "react";
import { Maximize, Minimize, Play, Pause, Volume2, VolumeX } from "lucide-react";

declare global {
  interface Window {
    Hls: any;
  }
}

interface MobileVideoPlayerProps {
  src: string;
  title: string;
}

const MobileVideoPlayer: React.FC<MobileVideoPlayerProps> = ({ src, title }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(true);
  const [hlsInstance, setHlsInstance] = useState<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Auto-hide controls
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showControls && isPlaying) {
      timer = setTimeout(() => setShowControls(false), 4000);
    }
    return () => clearTimeout(timer);
  }, [showControls, isPlaying]);

  // Setup HLS player
  useEffect(() => {
    if (!src || !videoRef.current) return;

    const setupPlayer = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (hlsInstance) {
          hlsInstance.destroy();
          setHlsInstance(null);
        }

        const video = videoRef.current!;
        video.pause();
        setIsPlaying(false);

        // Check for native HLS support (iOS Safari)
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
          console.log('Using native HLS support');
          video.src = src;
          video.load();
          setIsLoading(false);
          return;
        }

        // Load HLS.js for other browsers
        if (!window.Hls) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/hls.js@1';
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load HLS.js'));
            document.head.appendChild(script);
          });
        }

        if (window.Hls && window.Hls.isSupported()) {
          console.log('Using HLS.js for mobile');
          
          const hls = new window.Hls({
            enableWorker: false,
            lowLatencyMode: false,
            backBufferLength: 10,
            maxBufferLength: 20,
            maxMaxBufferLength: 40,
            startLevel: -1,
            capLevelToPlayerSize: true,
            debug: false
          });

          hls.loadSource(src);
          hls.attachMedia(video);

          hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
            console.log('Mobile HLS manifest parsed');
            setIsLoading(false);
          });

          hls.on(window.Hls.Events.ERROR, (event: any, data: any) => {
            console.error('Mobile HLS error:', data);
            if (data.fatal) {
              setError(`Stream error: ${data.details || 'Unknown error'}`);
              setIsLoading(false);
            }
          });

          setHlsInstance(hls);
        } else {
          setError("Your browser doesn't support video streaming.");
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Mobile player setup error:', error);
        setError('Failed to load video player.');
        setIsLoading(false);
      }
    };

    setupPlayer();

    return () => {
      if (hlsInstance) {
        hlsInstance.destroy();
      }
    };
  }, [src]);

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      console.log('Mobile video playing');
      setIsPlaying(true);
    };

    const handlePause = () => {
      console.log('Mobile video paused');
      setIsPlaying(false);
      setShowControls(true);
    };

    const handleCanPlay = () => {
      console.log('Mobile video can play');
      setIsLoading(false);
    };

    const handleError = (e: Event) => {
      console.error('Mobile video error:', e);
      setError('Video playback error occurred.');
      setIsLoading(false);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, []);

  // FIXED: Android fullscreen implementation
  const handleFullscreen = async () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    
    try {
      if (isFullscreen) {
        // Exit fullscreen
        console.log('Exiting fullscreen');
        
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        } else if ((document as any).webkitFullscreenElement) {
          await (document as any).webkitExitFullscreen();
        } else if ((video as any).webkitDisplayingFullscreen) {
          (video as any).webkitExitFullscreen();
        }
        
        setIsFullscreen(false);
        return;
      }

      // Enter fullscreen - Android Chrome specific implementation
      console.log('Entering fullscreen on mobile');
      
      // Try video element fullscreen first (works best on Android)
      if (video.requestFullscreen) {
        console.log('Using video.requestFullscreen() for Android');
        await video.requestFullscreen();
        setIsFullscreen(true);
        return;
      }

      // Webkit fallback for older Android browsers
      if ((video as any).webkitRequestFullscreen) {
        console.log('Using video.webkitRequestFullscreen() for Android');
        await (video as any).webkitRequestFullscreen();
        setIsFullscreen(true);
        return;
      }

      // iOS Safari specific
      if ((video as any).webkitEnterFullscreen) {
        console.log('Using webkitEnterFullscreen for iOS');
        (video as any).webkitEnterFullscreen();
        setIsFullscreen(true);
        return;
      }

      console.log('No fullscreen API available');
      
    } catch (error) {
      console.error('Fullscreen error:', error);
      setError('Fullscreen mode is not supported');
    }
  };

  // Monitor fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const video = videoRef.current;
      if (!video) return;

      const isCurrentlyFullscreen = !!(
        document.fullscreenElement === video ||
        (document as any).webkitFullscreenElement === video ||
        (video as any).webkitDisplayingFullscreen
      );
      
      console.log('Fullscreen state changed:', isCurrentlyFullscreen);
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    
    const video = videoRef.current;
    if (video) {
      video.addEventListener('webkitbeginfullscreen', () => setIsFullscreen(true));
      video.addEventListener('webkitendfullscreen', () => setIsFullscreen(false));
    }

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handlePlayPause = async () => {
    if (!videoRef.current) return;
    
    try {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        await videoRef.current.play();
      }
    } catch (error) {
      console.error('Playback error:', error);
      setError('Playback failed. Please try again.');
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleInteraction = () => {
    setShowControls(true);
  };

  return (
    <div 
      className="relative w-full aspect-video bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl border border-gray-700"
      onTouchStart={handleInteraction}
      onClick={handleInteraction}
    >
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-white/90 text-base font-medium">Loading stream...</p>
        </div>
      )}
      
      {/* Error overlay */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/90 z-20">
          <p className="text-white text-lg font-semibold mb-4">Stream Error</p>
          <p className="text-white/80 text-sm mb-6 text-center px-4">{error}</p>
        </div>
      )}
      
      {/* Video element */}
      <video
        ref={videoRef}
        className="w-full h-full bg-black"
        controls={false}
        preload="metadata"
        playsInline
        webkit-playsinline="true"
        muted={isMuted}
        onClick={handlePlayPause}
      />
      
      {/* Title overlay */}
      {!isLoading && src && !error && (
        <div className={`absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/70 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-white text-lg font-bold bg-black/30 inline-block px-4 py-2 rounded-xl backdrop-blur-sm">
            {title}
          </h2>
        </div>
      )}
      
      {/* Mobile controls */}
      {!isLoading && src && !error && (
        <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={handlePlayPause}
                className="p-4 bg-white hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-sm"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              
              <button 
                onClick={handleMute}
                className="p-4 bg-white hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-sm"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={handleFullscreen} 
                className="p-4 bg-white hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-sm"
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Play overlay when paused */}
      {!isPlaying && !isLoading && !error && src && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30" onClick={handlePlayPause}>
          <div className="p-6 bg-white rounded-full backdrop-blur-sm">
            <Play className="w-8 h-8 text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileVideoPlayer;