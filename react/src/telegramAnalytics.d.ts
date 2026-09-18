type TelegramAnalytics = {
  init: ({ token, appName }: { token: string; appName: string }) => void;
};

interface Window {
  telegramAnalytics: TelegramAnalytics;
}
