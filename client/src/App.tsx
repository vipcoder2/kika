import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./contexts/LanguageContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LiveMatches from "./pages/LiveMatches";
import LiveScore from "./pages/LiveScore";
import Schedule from "./pages/Schedule";
import Competitions from "./pages/Competitions";
import WatchMatch from "./pages/WatchMatch";
import About from "./pages/About";
import YallaShoot from "./pages/YallaShoot";
import Score808 from "./pages/Score808";
import StreamEast from "./pages/StreamEast";
import TotalSportek from "./pages/TotalSportek";
import Hesgoal from "./pages/Hesgoal";
import KoraLive from "./pages/KoraLive";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Disclaimer from "./pages/Disclaimer";
import FAQ from "./pages/FAQ";
import ContactUs from "./pages/ContactUs";
import TermsOfService from "./pages/TermsOfService";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Whitelist our legitimate video players
    const LEGITIMATE_ORIGINS = [
      window.location.origin,
      'https://cdn.jsdelivr.net',
      'blob:'
    ];

    // Flag to track legitimate HLS usage
    (window as any).__LEGITIMATE_HLS__ = true;

    // Enhanced anti-sniffer protection targeting NeatDownloadManager and similar extensions
    const initAntiSnifferProtection = () => {
      // 1. Detect and block NeatDownloadManager and similar extensions
      const blockDownloadManagerExtensions = () => {
        const suspiciousExtensions = [
          'neat-download-manager',
          'neatdownloadmanager',
          'video-downloadhelper',
          'stream-detector',
          'm3u8-sniffer',
          'hls-downloader',
          'video-downloader',
          'stream-recorder',
          'media-sniffer',
          'network-sniffer',
          'download-manager',
          'internet-download-manager',
          'idm-integration',
          'eagleget',
          'free-download-manager'
        ];

        // Check for extension APIs and signatures
        if ((window as any).chrome && (window as any).chrome.runtime) {
          try {
            // Block extension communication
            (window as any).chrome.runtime.sendMessage = undefined;
            (window as any).chrome.runtime.onMessage = undefined;
            (window as any).chrome.runtime.connect = undefined;
            (window as any).chrome.runtime.onConnect = undefined;
            console.log('%c🚫 Blocked extension communication APIs', 'color: red;');
          } catch (e) {}
        }

        // Block extension-injected scripts
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
          const src = script.getAttribute('src') || '';
          if (suspiciousExtensions.some(pattern => src.toLowerCase().includes(pattern))) {
            script.remove();
            console.log('%c🚫 Blocked suspicious download manager script:', 'color: red;', src);
          }
        });

        // Detect NeatDownloadManager specific signatures
        if ((window as any).ndm || (window as any).NeatDM || (window as any).downloadManager) {
          console.log('%c🚨 SECURITY BREACH DETECTED!', 'color: red; font-size: 24px; font-weight: bold; background: yellow;');
          console.log('%c⚠️ Unauthorized access attempt logged', 'color: orange; font-size: 18px;');
          (window as any).__DEBUG_MODE__ = true;

          // Neutralize the extension
          delete (window as any).ndm;
          delete (window as any).NeatDM;
          delete (window as any).downloadManager;
        }
      };

      // 2. Enhanced XMLHttpRequest and Fetch protection against download managers
      const originalXHR = window.XMLHttpRequest;
      const originalFetch = window.fetch;

      // Create a proper constructor function for XMLHttpRequest
      function ProtectedXMLHttpRequest(this: XMLHttpRequest) {
        const xhr = new originalXHR();
        const originalOpen = xhr.open;

        xhr.open = function(method: string, url: string | URL, ...args: any[]) {
          const urlStr = url.toString();
          const stack = new Error().stack || '';

          // Block download manager requests for media files
          if (urlStr.includes('.m3u8') || urlStr.includes('.ts') || urlStr.includes('.mp4') || urlStr.includes('.webm')) {
            const isFromDownloadManager = stack.includes('ndm') || 
                                        stack.includes('NeatDM') || 
                                        stack.includes('downloadManager') ||
                                        stack.includes('extension') ||
                                        !stack.includes('WebVideoPlayer') && !stack.includes('MobileVideoPlayer');

            const isLegitimate = LEGITIMATE_ORIGINS.some(origin => 
              urlStr.startsWith(origin) || urlStr.startsWith('blob:')
            ) && (window as any).__LEGITIMATE_HLS__;

            if (!isLegitimate || isFromDownloadManager) {
              console.log('%c🚫 Blocked suspicious media request from download manager:', 'color: red;', urlStr);
              throw new Error('Unauthorized media access detected');
            }
          }

          return originalOpen.call(this, method, url, ...args);
        };

        return xhr;
      }

      // Properly set up prototype chain and static properties
      Object.setPrototypeOf(ProtectedXMLHttpRequest.prototype, originalXHR.prototype);
      Object.setPrototypeOf(ProtectedXMLHttpRequest, originalXHR);

      // Define static properties using Object.defineProperty to avoid read-only errors
      Object.defineProperty(ProtectedXMLHttpRequest, 'UNSENT', {
        value: originalXHR.UNSENT,
        writable: false,
        enumerable: true,
        configurable: false
      });
      Object.defineProperty(ProtectedXMLHttpRequest, 'OPENED', {
        value: originalXHR.OPENED,
        writable: false,
        enumerable: true,
        configurable: false
      });
      Object.defineProperty(ProtectedXMLHttpRequest, 'HEADERS_RECEIVED', {
        value: originalXHR.HEADERS_RECEIVED,
        writable: false,
        enumerable: true,
        configurable: false
      });
      Object.defineProperty(ProtectedXMLHttpRequest, 'LOADING', {
        value: originalXHR.LOADING,
        writable: false,
        enumerable: true,
        configurable: false
      });
      Object.defineProperty(ProtectedXMLHttpRequest, 'DONE', {
        value: originalXHR.DONE,
        writable: false,
        enumerable: true,
        configurable: false
      });

      window.XMLHttpRequest = ProtectedXMLHttpRequest as any;

      // Enhanced Fetch protection
      window.fetch = function(input: RequestInfo | URL, init?: RequestInit) {
        const url = input.toString();
        const stack = new Error().stack || '';

        if (url.includes('.m3u8') || url.includes('.ts') || url.includes('.mp4') || url.includes('.webm')) {
          const isFromDownloadManager = stack.includes('ndm') || 
                                      stack.includes('NeatDM') || 
                                      stack.includes('downloadManager') ||
                                      stack.includes('extension') ||
                                      !stack.includes('WebVideoPlayer') && !stack.includes('MobileVideoPlayer');

          const isLegitimate = LEGITIMATE_ORIGINS.some(origin => 
            url.startsWith(origin) || url.startsWith('blob:')
          ) && (window as any).__LEGITIMATE_HLS__;

          if (!isLegitimate || isFromDownloadManager) {
            console.log('%c🚫 Blocked suspicious fetch request from download manager:', 'color: red;', url);
            return Promise.reject(new Error('Unauthorized media access detected'));
          }
        }

        return originalFetch.call(this, input, init);
      };

      // 3. Block access to Hls.js and other media libraries for unauthorized scripts
      const protectMediaLibraries = () => {
        let originalHls = (window as any).Hls;

        // Only define property if it doesn't exist or is configurable
        if (!(window as any).Hls || Object.getOwnPropertyDescriptor(window, 'Hls')?.configurable !== false) {
          try {
            Object.defineProperty(window, 'Hls', {
              get: function() {
                const stack = new Error().stack || '';
                const isFromDownloadManager = stack.includes('ndm') || 
                                            stack.includes('NeatDM') || 
                                            stack.includes('downloadManager') ||
                                            stack.includes('extension');

                if (isFromDownloadManager || !(window as any).__LEGITIMATE_HLS__) {
                  console.log('%c🚫 Blocked access to Hls', 'color: red; font-weight: bold;');
                  return undefined;
                }

                return originalHls;
              },
              set: function(value) {
                // Only allow setting from legitimate sources
                const stack = new Error().stack || '';
                if (!stack.includes('cdn.jsdelivr.net') && !stack.includes('WebVideoPlayer') && !stack.includes('MobileVideoPlayer')) {
                  console.log('%c🚫 Blocked unauthorized Hls.js injection', 'color: red;');
                  return;
                }
                originalHls = value;
              },
              configurable: true
            });
          } catch (e) {
            console.warn('Could not protect Hls property:', e);
          }
        }
      };

      // 4. Enhanced video element protection
      const protectVideoElements = () => {
        const originalPlay = HTMLMediaElement.prototype.play;
        const originalLoad = HTMLMediaElement.prototype.load;
        const originalGetAttribute = Element.prototype.getAttribute;

        HTMLMediaElement.prototype.play = function() {
          const stack = new Error().stack || '';
          const isFromDownloadManager = stack.includes('ndm') || 
                                      stack.includes('NeatDM') || 
                                      stack.includes('downloadManager') ||
                                      stack.includes('extension');

          if (isFromDownloadManager) {
            console.log('%c🚫 Blocked unauthorized video play from download manager', 'color: red;');
            return Promise.reject(new Error('Unauthorized video access'));
          }

          return originalPlay.call(this);
        };

        // Protect src attribute access
        Object.defineProperty(HTMLMediaElement.prototype, 'src', {
          get: function() {
            const stack = new Error().stack || '';
            const isFromDownloadManager = stack.includes('ndm') || 
                                        stack.includes('NeatDM') || 
                                        stack.includes('downloadManager') ||
                                        stack.includes('extension');

            if (isFromDownloadManager) {
              console.log('%c🚫 Blocked src access from download manager', 'color: red;');
              return '';
            }

            return this.getAttribute('src') || '';
          },
          set: function(value) {
            const stack = new Error().stack || '';
            if (stack.includes('WebVideoPlayer') || stack.includes('MobileVideoPlayer') || (window as any).__LEGITIMATE_HLS__) {
              this.setAttribute('src', value);
            } else {
              console.log('%c🚫 Blocked unauthorized src modification', 'color: red;');
            }
          }
        });
      };

      // 5. Monitor for download manager DOM mutations
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              const element = node as Element;

              // Check for download manager injected elements
              if (element.tagName === 'SCRIPT' || element.tagName === 'DIV' || element.tagName === 'IFRAME') {
                const content = element.textContent || '';
                const className = element.className || '';
                const id = element.id || '';

                const downloadManagerSignatures = [
                  'ndm', 'NeatDM', 'downloadManager', 'download-manager',
                  'video-downloader', 'stream-detector', 'm3u8-sniffer'
                ];

                const isSuspicious = downloadManagerSignatures.some(sig => 
                  content.includes(sig) || className.includes(sig) || id.includes(sig)
                );

                if (isSuspicious) {
                  element.remove();
                  console.log('%c🚫 Removed download manager injected element', 'color: red;');
                  (window as any).__DEBUG_MODE__ = true;
                }
              }
            }
          });
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      // 6. Enhanced developer tools detection for download managers
      let devToolsDetected = false;
      const detectDevTools = () => {
        const threshold = 160;

        if (
          window.outerHeight - window.innerHeight > threshold ||
          window.outerWidth - window.innerWidth > threshold
        ) {
          if (!devToolsDetected) {
            devToolsDetected = true;
            console.clear();
            console.log('%c🚨 SECURITY ALERT: Developer tools detected!', 'color: red; font-size: 24px; font-weight: bold; background: yellow;');
            console.log('%c⚠️ DEBUG MODE ACTIVATED', 'color: red; font-size: 18px;');

            (window as any).__DEBUG_MODE__ = true;
            (window as any).__DEV_TOOLS_DETECTED__ = new Date().toISOString();

            // Temporarily disable legitimate HLS flag to block download managers
            (window as any).__LEGITIMATE_HLS__ = false;
            setTimeout(() => {
              (window as any).__LEGITIMATE_HLS__ = true;
            }, 5000);
          }
        } else {
          devToolsDetected = false;
        }
      };

      // 7. Console monitoring for download manager activity
      const originalConsoleLog = console.log;
      console.log = function(...args: any[]) {
        const message = args.join(' ');
        const downloadManagerTerms = ['m3u8', 'manifest', 'segment', '.ts', 'hls', 'ndm', 'downloadManager'];

        if (downloadManagerTerms.some(term => message.toLowerCase().includes(term))) {
          const stack = new Error().stack || '';
          if (!stack.includes('WebVideoPlayer') && !stack.includes('MobileVideoPlayer')) {
            console.warn('%c🚫 Suspicious console activity detected', 'color: orange;');
            (window as any).__DEBUG_MODE__ = true;
          }
        }

        return originalConsoleLog.apply(this, args);
      };

      // Execute protection functions
      blockDownloadManagerExtensions();
      protectMediaLibraries();
      protectVideoElements();

      // Continuous monitoring
      setInterval(detectDevTools, 1000);
      setInterval(blockDownloadManagerExtensions, 3000);
    };

    // Disable keyboard shortcuts including dev tools
    const disableDevTools = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'U') ||
        (e.ctrlKey && e.key === 'A') || // Disable Ctrl+A (Select All)
        (e.ctrlKey && e.key === 'C') || // Disable Ctrl+C (Copy)
        (e.ctrlKey && e.key === 'V') || // Disable Ctrl+V (Paste)
        (e.ctrlKey && e.key === 'X') || // Disable Ctrl+X (Cut)
        (e.ctrlKey && e.key === 'S') || // Disable Ctrl+S (Save)
        (e.ctrlKey && e.key === 'P')    // Disable Ctrl+P (Print)
      ) {
        e.preventDefault();
        console.log('%c🚨 DEBUG MODE ACTIVATED - Security breach detected!', 'color: red; font-size: 20px; font-weight: bold;');
        (window as any).__DEBUG_MODE__ = true;
        (window as any).__SECURITY_BREACH__ = new Date().toISOString();
        return false;
      }
    };

    // Disable right-click context menu
    const disableRightClick = (e: MouseEvent) => {
      e.preventDefault();
      console.log('%c🚫 Right-click disabled', 'color: red;');
      (window as any).__DEBUG_MODE__ = true;
      return false;
    };

    // Disable text selection
    const disableSelection = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Disable drag and drop
    const disableDragDrop = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable copy event
    const disableCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      console.log('%c🚫 Copy operation blocked', 'color: red;');
      return false;
    };

    // Disable paste event
    const disablePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      console.log('%c🚫 Paste operation blocked', 'color: red;');
      return false;
    };

    // Disable cut event
    const disableCut = (e: ClipboardEvent) => {
      e.preventDefault();
      console.log('%c🚫 Cut operation blocked', 'color: red;');
      return false;
    };

    // Add CSS to disable text selection
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      
      /* Allow selection for input fields and textareas */
      input, textarea, [contenteditable="true"] {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }
      
      /* Disable image dragging */
      img {
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        user-drag: none !important;
        pointer-events: none !important;
      }
      
      /* Disable link dragging */
      a {
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        user-drag: none !important;
      }
    `;
    document.head.appendChild(style);

    // Initialize all protections
    initAntiSnifferProtection();

    // Add event listeners for security
    document.addEventListener('keydown', disableDevTools);
    document.addEventListener('contextmenu', disableRightClick);
    document.addEventListener('selectstart', disableSelection);
    document.addEventListener('dragstart', disableDragDrop);
    document.addEventListener('drop', disableDragDrop);
    document.addEventListener('copy', disableCopy);
    document.addEventListener('paste', disablePaste);
    document.addEventListener('cut', disableCut);

    // Additional protection: Disable F12 and other shortcuts on window
    window.addEventListener('keydown', disableDevTools);

    // Block common shortcuts that might be used for inspection
    document.addEventListener('keydown', (e) => {
      // Block Ctrl+Shift+I (DevTools)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
      }
      // Block Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
      }
      // Block Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
      }
      // Block Ctrl+Shift+C (Element Inspector)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
      }
    });

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', disableDevTools);
      document.removeEventListener('contextmenu', disableRightClick);
      document.removeEventListener('selectstart', disableSelection);
      document.removeEventListener('dragstart', disableDragDrop);
      document.removeEventListener('drop', disableDragDrop);
      document.removeEventListener('copy', disableCopy);
      document.removeEventListener('paste', disablePaste);
      document.removeEventListener('cut', disableCut);
      window.removeEventListener('keydown', disableDevTools);
      
      // Remove the style element
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Router>
            <Switch>
              <Route path="/" component={Index} />
              <Route path="/live" component={LiveMatches} />
              <Route path="/live-score" component={LiveScore} />
              <Route path="/schedule" component={Schedule} />
              <Route path="/competitions" component={Competitions} />
              <Route path="/watch/:id" component={WatchMatch} />
              <Route path="/about" component={About} />
              <Route path="/yalla-shoot" component={YallaShoot} />
              <Route path="/score808" component={Score808} />
              <Route path="/streameast" component={StreamEast} />
              <Route path="/totalsportek" component={TotalSportek} />
              <Route path="/hesgoal" component={Hesgoal} />
              <Route path="/kora-live" component={KoraLive} />
              <Route path="/privacy-policy" component={PrivacyPolicy} />
              <Route path="/disclaimer" component={Disclaimer} />
              <Route path="/faq" component={FAQ} />
              <Route path="/contact-us" component={ContactUs} />
              <Route path="/terms-of-service" component={TermsOfService} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </TooltipProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;