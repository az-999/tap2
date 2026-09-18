import { AxiosError } from 'axios';
import FontFaceObserver from 'fontfaceobserver';

import {
  ERROR_MESSAGE_SERVER_ERROR,
  ERROR_MESSAGE_TIMEOUT,
} from './services/constants/errorMessages';

const fonts = [
  {
    family: 'SF Pro Display',
    url: '/fonts/SF-Pro-Display-Light.otf',
  },
  {
    family: 'SF Pro Display',
    url: '/fonts/SF-Pro-Display-Medium.otf',
  },
  {
    family: 'SF Pro Display',
    url: '/fonts/SF-Pro-Display-Regular.otf',
  },
  {
    family: 'SF Pro Display',
    url: '/fonts/SF-Pro-Display-Semibold.otf',
  },
  {
    family: 'SF Pro Display',
    url: '/fonts/SF-Pro-Display-Bold.otf',
  },
  {
    family: 'SF Pro Display',
    url: '/fonts/SF-Pro-Display-Black.otf',
  },
];

function getApiUrl() {
  return process.env.REACT_APP_BOT_VERSION
    ? process.env.REACT_APP_BOT_VERSION === '1'
      ? process.env.REACT_APP_FIRST_API_URL
      : process.env.REACT_APP_SECOND_API_URL
    : process.env.REACT_APP_API_URL;
}

function formatNumber(num: number | null) {
  if (num === null || num === 0) {
    return '0';
  }

  if (num < 1000) {
    return num;
  } else if (num >= 1000 && num < 1_000_000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  } else if (num >= 1_000_000 && num < 1_000_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (num >= 1_000_000_000 && num < 1_000_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'Bn';
  } else if (num >= 1_000_000_000_000 && num < 1_000_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(1).replace(/\.0$/, '') + 'T';
  } else if (num >= 1_000_000_000_000_000 && num < 1_000_000_000_000_000_000) {
    return (num / 1_000_000_000_000_000).toFixed(1).replace(/\.0$/, '') + 'Q';
  }

  return String(num);
}

export function formatNumberWithSpaces(number: number) {
  // Преобразуем число в строку
  let numStr = number.toString();

  // Используем регулярное выражение для добавления пробелов каждые три цифры
  let formattedStr = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return formattedStr;
}

const padZero = (value: number) => {
  return value < 10 ? '0' + value : value;
};

function formatTime(timeInSeconds: number, isShortestView?: boolean) {
  // Вычисление дней, часов и минут оставшегося времени
  const days = Math.floor(timeInSeconds / 86400);
  timeInSeconds %= 86400; // Оставшиеся секунды после вычитания дней

  const hours = Math.floor(timeInSeconds / 3600);
  timeInSeconds %= 3600; // Оставшиеся секунды после вычитания часов

  const minutes = Math.floor(timeInSeconds / 60);
  timeInSeconds %= 60; // Оставшиеся секунды после вычитания минут

  const seconds = Math.floor(timeInSeconds);

  if (isShortestView)
    return days === 0
      ? `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`
      : `${days}:${padZero(hours)}:${padZero(minutes)}`;

  if (days === 0)
    return `${padZero(hours)}h:${padZero(minutes)}m:${padZero(seconds)}s`;

  // Форматирование времени в строку 'ДД:ЧЧ:ММ'
  return `${days}d:${padZero(hours)}h:${padZero(minutes)}m`;
}

function formatDailyTime(timeInSeconds: number) {
  if (timeInSeconds < 0) return '00h:00m';

  // Вычисление часов и минут оставшегося времени
  let hours = Math.floor(timeInSeconds / 3600);
  timeInSeconds %= 3600; // Оставшиеся секунды после вычитания часов

  let minutes = Math.floor(timeInSeconds / 60);

  // Форматирование времени в строку 'ЧЧ:ММ'
  return `${padZero(hours)}h:${padZero(minutes)}m`;
}

function formatComingSoonTime(timeInSeconds: number) {
  const hours = Math.floor(timeInSeconds / 3600);
  timeInSeconds %= 3600; // Оставшиеся секунды после вычитания часов

  const minutes = Math.floor(timeInSeconds / 60);
  timeInSeconds %= 60; // Оставшиеся секунды после вычитания минут

  const seconds = Math.floor(timeInSeconds);

  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function formatStakingTime(timeInSeconds: number): string {
  // Вычисление дней, часов и минут оставшегося времени
  const months = Math.floor(timeInSeconds / 2592000);
  timeInSeconds %= 2592000; // Оставшиеся секунды после вычитания месяцев

  const days = Math.floor(timeInSeconds / 86400);
  timeInSeconds %= 86400; // Оставшиеся секунды после вычитания дней

  const hours = Math.floor(timeInSeconds / 3600);
  timeInSeconds %= 3600; // Оставшиеся секунды после вычитания часов

  const minutes = Math.floor(timeInSeconds / 60);
  timeInSeconds %= 60; // Оставшиеся секунды после вычитания минут

  const seconds = Math.floor(timeInSeconds);

  // Форматирование
  if (months > 0) {
    return `${padZero(months)}m:${padZero(days)}d:${padZero(hours)}h:${padZero(minutes)}m`;
  }

  if (days > 0) {
    return `${padZero(days)}d:${padZero(hours)}h:${padZero(minutes)}m`;
  }

  if (hours > 0) {
    return `${padZero(hours)}h:${padZero(minutes)}m:${padZero(seconds)}s`;
  }

  return `${padZero(minutes)}m:${padZero(seconds)}s`;
}

function formatAirdropDailyTime(timeInSeconds: number): string {
  if (timeInSeconds < 0) return '00h:00m';

  // Вычисление часов и минут оставшегося времени
  let hours = Math.floor(timeInSeconds / 3600);
  timeInSeconds %= 3600; // Оставшиеся секунды после вычитания часов

  let minutes = Math.floor(timeInSeconds / 60);
  timeInSeconds %= 60; // Оставшиеся секунды после вычитания минут

  const seconds = Math.floor(timeInSeconds);

  return `${padZero(hours)}h:${padZero(minutes)}m:${padZero(seconds)}s`;
}

function getTimeNow() {
  return Math.floor(Date.now() / 1000);
}

function getErrorMessage(error: AxiosError) {
  if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
    return ERROR_MESSAGE_TIMEOUT;
  }
  if (error.response?.status.toString().startsWith('5')) {
    return ERROR_MESSAGE_SERVER_ERROR;
  }
}

function getShortOwnerAddress(address: string) {
  if (address.length < 8) return 'invalid address';

  const firstPart = address.slice(0, 4);
  const endPart = address.slice(-4);

  return `${firstPart}....${endPart}`;
}

function getShortNftAddress(address: string) {
  if (address.length < 24) return 'invalid address';

  const firstPart = address.slice(0, 12);
  const endPart = address.slice(-12);

  return `${firstPart}....${endPart}`;
}

function getShortCraftShipNftAddress(address: string) {
  const firstPart = address.slice(0, 8);
  const endPart = address.slice(-8);

  return `${firstPart}....${endPart}`;
}

function getFormattedDate(timestamp: number) {
  return new Date(timestamp).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function loadFonts() {
  const fontPromises = fonts.map((font) =>
    new FontFaceObserver(font.family).load().catch(() => {
      console.debug(`Font ${font.family} (path: ${font.url}) failed to load`);
      return Promise.reject(`Font ${font.family} failed to load`);
    }),
  );

  return Promise.all(fontPromises);
}

function roundUpToTwoDecimalPlaces(num: number) {
  return Math.ceil(num * 100) / 100;
}

export default Object.assign({
  getApiUrl,
  formatNumber,
  formatNumberWithSpaces,
  padZero,
  formatTime,
  formatDailyTime,
  formatStakingTime,
  formatAirdropDailyTime,
  formatComingSoonTime,
  getTimeNow,
  getErrorMessage,
  getShortOwnerAddress,
  getShortNftAddress,
  getShortCraftShipNftAddress,
  getFormattedDate,
  loadFonts,
  roundUpToTwoDecimalPlaces,
});
