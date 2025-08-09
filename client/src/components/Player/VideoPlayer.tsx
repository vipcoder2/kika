
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { Match } from '@/types/match';

interface VideoPlayerProps {
  match: Match;
  isOpen: boolean;
  onClose: () => void;
}

interface StreamSource {
  name: string;
  url: string;
  type: 'hls' | 'iframe';
}

// Declare HLS types
declare global {
  interface Window {
    Hls: any;
  }
}

export function VideoPlayer({ match, isOpen, onClose }: VideoPlayerProps) {
  const [currentSource, setCurrentSource] = useState<StreamSource | null>(null);
  const [sources, setSources] = useState<StreamSource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hlsInstance, setHlsInstance] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Auto-hide controls
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showControls && isPlaying) {
      timer = setTimeout(() => setShowControls(false), 4000);
    }
    return () => clearTimeout(timer);
  }, [showControls, isPlaying]);

  useEffect(() => {
    if (!isOpen || !match) return;

    // Prepare available stream sources
    const availableSources: StreamSource[] = [];

    // Prioritize HLS streams
    if (match.streams?.hls1) {
      availableSources.push({
        name: 'HLS Stream 1',
        url: match.streams.hls1,
        type: 'hls',
      });
    }

    if (match.streams?.hls2) {
      availableSources.push({
        name: 'HLS Stream 2',
        url: match.streams.hls2,
        type: 'hls',
      });
    }

    if (match.streams?.src1) {
      availableSources.push({
        name: 'Stream 1',
        url: match.streams.src1,
        type: 'iframe',
      });
    }

    if (match.streams?.src2) {
      availableSources.push({
        name: 'Stream 2',
        url: match.streams.src2,
        type: 'iframe',
      });
    }

    setSources(availableSources);

    // Set default source (prioritize HLS1)
    if (availableSources.length > 0) {
      const defaultSource = availableSources.find(s => s.type === 'hls') || availableSources[0];
      setCurrentSource(defaultSource);
    }
  }, [isOpen, match]);

  // Setup HLS player when source changes
  useEffect(() => {
    if (!currentSource || !isOpen) return;

    if (currentSource.type === 'hls') {
      setupHLSPlayer(currentSource.url);
    } else {
      // Clean up HLS player if switching to iframe
      cleanupHLSPlayer();
      setIsLoading(false);
      setError(null);
    }
  }, [currentSource, isOpen]);

  const cleanupHLSPlayer = () => {
    if (hlsInstance) {
      try {
        hlsInstance.destroy();
      } catch (error) {
        console.warn('Error destroying HLS instance:', error);
      } finally {
        setHlsInstance(null);
      }
    }
  };

  const setupHLSPlayer = async (streamUrl: string) => {
    if (!videoRef.current) {
      console.error('Video element not available');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Clean up existing player
      cleanupHLSPlayer();

      const video = videoRef.current;
      video.pause();
      setIsPlaying(false);

      console.log('HLSPlayer: Setting up for URL:', streamUrl);

      // Check for native HLS support (iOS Safari)
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        console.log('Using native HLS support');
        video.src = streamUrl;
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
        console.log('Using HLS.js for desktop');
        
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

        hls.loadSource(streamUrl);
        hls.attachMedia(video);

        hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
          console.log('HLS manifest parsed');
          setIsLoading(false);
        });

        hls.on(window.Hls.Events.ERROR, (event: any, data: any) => {
          console.error('HLS error:', data);
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
      console.error('HLS player setup error:', error);
      setError('Failed to load video player.');
      setIsLoading(false);
    }
  };

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      console.log('HLS video playing');
      setIsPlaying(true);
    };

    const handlePause = () => {
      console.log('HLS video paused');
      setIsPlaying(false);
      setShowControls(true);
    };

    const handleCanPlay = () => {
      console.log('HLS video can play');
      setIsLoading(false);
    };

    const handleError = (e: Event) => {
      console.error('HLS video error:', e);
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

  // Fullscreen handling
  const handleFullscreen = async () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    
    try {
      if (isFullscreen) {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        } else if ((document as any).webkitFullscreenElement) {
          await (document as any).webkitExitFullscreen();
        }
        setIsFullscreen(false);
        return;
      }

      if (video.requestFullscreen) {
        await video.requestFullscreen();
        setIsFullscreen(true);
      } else if ((video as any).webkitRequestFullscreen) {
        await (video as any).webkitRequestFullscreen();
        setIsFullscreen(true);
      }
      
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  // Monitor fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const video = videoRef.current;
      if (!video) return;

      const isCurrentlyFullscreen = !!(
        document.fullscreenElement === video ||
        (document as any).webkitFullscreenElement === video
      );
      
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

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

  const handleSourceChange = (source: StreamSource) => {
    if (source.url === currentSource?.url) return;

    console.log('Switching to source:', source);
    setIsLoading(true);
    setError(null);
    
    // Always cleanup before switching
    cleanupHLSPlayer();
    
    // Set new source
    setCurrentSource(source);
  };

  // Cleanup on unmount or close
  useEffect(() => {
    return () => {
      cleanupHLSPlayer();
    };
  }, []);

  // Clean up when modal closes
  useEffect(() => {
    if (!isOpen) {
      cleanupHLSPlayer();
      setIsPlaying(false);
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div className="relative w-full h-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 text-2xl"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Video Player Container */}
        <div className="absolute inset-0">
          {currentSource ? (
            currentSource.type === 'hls' ? (
              <div 
                className="relative w-full h-full bg-black"
                onMouseMove={handleInteraction}
                onClick={handleInteraction}
              >
                {/* Error overlay */}
                {error && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/90 z-20">
                    <p className="text-white text-lg font-semibold mb-4">Stream Error</p>
                    <p className="text-white/80 text-sm mb-6 text-center px-4">{error}</p>
                    <Button
                      onClick={() => {
                        setError(null);
                        if (currentSource) {
                          setupHLSPlayer(currentSource.url);
                        }
                      }}
                      className="bg-white text-black hover:bg-gray-200"
                    >
                      Retry
                    </Button>
                  </div>
                )}

                {/* Loading overlay */}
                {isLoading && !error && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-30">
                    <div className="text-white text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                      <p>Loading stream...</p>
                    </div>
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
                {!error && (
                  <div className={`absolute top-16 left-0 right-0 p-6 bg-gradient-to-b from-black/70 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-white text-lg font-bold bg-black/30 inline-block px-4 py-2 rounded-xl backdrop-blur-sm">
                      {match.clubs?.home?.name} vs {match.clubs?.away?.name}
                    </h2>
                  </div>
                )}
                
                {/* Controls */}
                {!error && (
                  <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={handlePlayPause}
                          className="p-4 bg-white hover:bg-gray-100 text-black rounded-full transition-colors"
                        >
                          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                        </button>
                        <button
                          onClick={handleMute}
                          className="p-4 bg-white hover:bg-gray-100 text-black rounded-full transition-colors"
                        >
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={handleFullscreen}
                          className="p-4 bg-white hover:bg-gray-100 text-black rounded-full transition-colors"
                          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                        >
                          {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Play overlay when paused */}
                {!isPlaying && !isLoading && !error && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50" onClick={handlePlayPause}>
                    <div className="p-6 bg-white rounded-full backdrop-blur-sm">
                      <Play className="w-8 h-8 text-black" />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <iframe
                key={currentSource.url} // Force remount when URL changes
                ref={iframeRef}
                src={currentSource.url}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
                style={{ zIndex: 1 }}
              />
            )
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white z-20">
              <div className="text-center">
                <Play className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-xl">No stream available</p>
                <p className="text-sm text-gray-300 mt-2">Stream sources not configured</p>
              </div>
            </div>
          )}
        </div>

        {/* Stream Controls */}
        {sources.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 z-40">
            <div className="flex items-center justify-between text-white">
              <div>
                <h3 className="text-lg font-semibold">
                  {match.clubs?.home?.name} vs {match.clubs?.away?.name}
                </h3>
                <p className="text-sm text-gray-300">{match.competition?.name}</p>
              </div>
              <div className="flex items-center space-x-2">
                {sources.map((source, index) => (
                  <Button
                    key={`${source.type}-${source.url}-${index}`}
                    onClick={() => handleSourceChange(source)}
                    variant={currentSource?.url === source.url ? 'default' : 'secondary'}
                    size="sm"
                    disabled={isLoading}
                    className={
                      currentSource?.url === source.url
                        ? 'bg-orange-500 hover:bg-orange-600 text-white'
                        : 'bg-gray-600 hover:bg-gray-500 text-white'
                    }
                  >
                    {source.name}
                    {isLoading && currentSource?.url === source.url && (
                      <div className="ml-2 w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
