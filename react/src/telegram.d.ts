type Telegram = {
  WebApp: {
    initData: string;
    initDataUnsafe: { user: { id: number | string } };
    version: string;
    platform: string;
    colorScheme: string;
    themeParams: object;
    isExpanded: boolean;
    viewportHeight: number;
    viewportStableHeight: number;
    headerColor: string;
    backgroundColor: string;
    isClosingConfirmationEnabled: boolean;
    isVerticalSwipesEnabled: boolean;
    expand: () => void;
    ready: () => void;
    openLink: (link: string) => void;
    openTelegramLink: (link: string) => void;
    HapticFeedback: {
      impactOccurred: (
        style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft',
      ) => void;
    };
    onEvent: (eventType: string, eventHandler: () => void) => void;
    offEvent: (eventType: string, eventHandler: () => void) => void;
    sendData: (data: string) => void;
    switchInlineQuery: (query: string, chooseChatTypes?: string[]) => void;
  };
};

interface Window {
  Telegram: Telegram;
}
