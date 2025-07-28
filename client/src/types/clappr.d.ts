
declare global {
  interface Window {
    Clappr: {
      Player: new (options: {
        source: string;
        parentId: HTMLElement;
        width: string;
        height: string;
        autoPlay: boolean;
        mute: boolean;
        playback?: {
          hlsjsConfig?: {
            enableWorker: boolean;
          };
        };
      }) => {
        on: (event: string, callback: () => void) => void;
      };
      Events: {
        PLAYER_READY: string;
        PLAYER_ERROR: string;
      };
    };
  }
}

export {};
