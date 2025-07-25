import React, { useState, useRef, useEffect } from "react";
import { Maximize, Minimize, PictureInPicture, Play, Pause, Volume2, VolumeX } from "lucide-react";

declare global {
  interface Window {
    Hls: any;
  }
}

interface WebVideoPlayerProps {
  src: string;
  title: string;
  streamQuality: "hd" | "sd" | "mobile";
  streamType?: "hls" | "mobile-hls" | "iframe";
}

const WebVideoPlayer: React.FC<WebVideoPlayerProps> = ({ src, title, streamQuality, streamType = "hls" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(false);
  const [hlsInstance, setHlsInstance] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const isHlsStream = streamType === "hls" || streamType === "mobile-hls";
  const isIframeStream = streamType === "iframe";
  
  console.log('WebVideoPlayer initialized:', { src, streamType, isHlsStream, isIframeStream });
  
  // Show/hide controls
  const handleMouseMove = () => {
    if (isHlsStream) {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  // Setup video player
  useEffect(() => {
    if (!src) return;

    const setupPlayer = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (hlsInstance) {
          hlsInstance.destroy();
          setHlsInstance(null);
        }

        if (isIframeStream) {
          console.log('Setting up iframe player with src:', src);
          // For iframe streams, we just need to wait a bit for load
          const timer = setTimeout(() => {
            console.log('Iframe player ready');
            setIsLoading(false);
          }, 2000);
          return () => clearTimeout(timer);
        }

        if (isHlsStream && videoRef.current) {
          const video = videoRef.current;
          video.pause();
          setIsPlaying(false);

          // Check for native HLS support
          if (video.canPlayType('application/vnd.apple.mpegurl')) {
            console.log('Using native HLS support');
            video.src = src;
            video.load();
            setIsLoading(false);
            return;
          }

          // Load HLS.js
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
            console.log('Using HLS.js for web');
            
            const hls = new window.Hls({
              enableWorker: false,
              lowLatencyMode: false,
              startLevel: -1,
              debug: false
            });

            hls.loadSource(src);
            hls.attachMedia(video);

            hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
              console.log('Web HLS manifest parsed');
              setIsLoading(false);
            });

            hls.on(window.Hls.Events.ERROR, (event: any, data: any) => {
              console.error('Web HLS error:', data);
              if (data.fatal) {
                setError(`Stream error: ${data.details || 'Unknown error'}`);
                setIsLoading(false);
              }
            });

            setHlsInstance(hls);
          } else {
            setError("Your browser doesn't support HLS streaming.");
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error('Web player setup error:', error);
        setError('Failed to load video player.');
        setIsLoading(false);
      }
    };

    setupPlayer();

    return () => {
      if (hlsInstance) {
        hlsInstance.destroy();
      }
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [src, isHlsStream, isIframeStream]);

  // Video event handlers
  useEffect(() => {
    if (!isHlsStream || !videoRef.current) return;

    const video = videoRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleCanPlay = () => setIsLoading(false);
    const handleError = () => {
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
  }, [isHlsStream]);

  // Iframe load handler
  useEffect(() => {
    if (!isIframeStream || !iframeRef.current) return;

    const handleLoad = () => {
      console.log('Iframe loaded successfully');
      setIsLoading(false);
    };
    
    const handleError = () => {
      console.log('Iframe load error');
      setIsLoading(false);
    };
    
    const iframe = iframeRef.current;
    
    iframe.addEventListener('load', handleLoad);
    iframe.addEventListener('error', handleError);
    
    return () => {
      iframe.removeEventListener('load', handleLoad);
      iframe.removeEventListener('error', handleError);
    };
  }, [isIframeStream]);

  const handlePlayPause = async () => {
    if (!videoRef.current || !isHlsStream) return;
    
    try {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        await videoRef.current.play();
      }
    } catch (error) {
      setError('Playback failed. Please try again.');
    }
  };

  const handleMute = () => {
    if (videoRef.current && isHlsStream) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  const handlePictureInPicture = async () => {
    if (!videoRef.current || !isHlsStream) return;

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (error) {
      setError('Picture-in-Picture is not supported.');
    }
  };

  // Monitor fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl border border-gray-700"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isHlsStream && setShowControls(false)}
    >
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-white/90 text-base font-medium">
            {isIframeStream ? 'Loading iframe player...' : 'Loading stream...'}
          </p>
        </div>
      )}
      
      {/* Error overlay */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/90 z-20">
          <p className="text-white text-lg font-semibold mb-4">Stream Error</p>
          <p className="text-white/80 text-sm mb-6 text-center px-4">{error}</p>
        </div>
      )}
      
      {/* HLS Video */}
      {isHlsStream && (
        <video
          ref={videoRef}
          className="w-full h-full bg-black"
          controls={false}
          preload="metadata"
          playsInline
          muted={isMuted}
          onClick={handlePlayPause}
        />
      )}
      
      {/* Iframe Player */}
      {isIframeStream && (
        <iframe
          ref={iframeRef}
          src={src}
          title= "KikaSports"
          className="w-full h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      )}
      
      {/* Title overlay */}
      {!isLoading && !error && (
        <div className={`absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/70 to-transparent transition-opacity duration-300 ${(isHlsStream && showControls) || isIframeStream ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-white text-lg font-bold bg-black/30 inline-block px-4 py-2 rounded-xl backdrop-blur-sm">
            KikaSports.com
          </h2>
        </div>
      )}
      
      {/* Controls overlay - only for HLS streams */}
      {isHlsStream && !isLoading && !error && (
        <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={handlePlayPause}
                className="p-3 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-sm"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              
              <button 
                onClick={handleMute}
                className="p-3 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-sm"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              {/* <button 
                onClick={handlePictureInPicture}
                className="p-3 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-sm"
              >
                <PictureInPicture className="w-4 h-4" />
              </button> */}
              
              <button 
                onClick={handleFullscreen}
                className="p-3 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-sm"
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Play overlay for HLS when paused */}
      {isHlsStream && !isPlaying && !isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30" onClick={handlePlayPause}>
          <div className="p-6 bg-black/60 rounded-full backdrop-blur-sm">
            <Play className="w-8 h-8 text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default WebVideoPlayer;