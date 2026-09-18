import { useState } from 'react';

type ImageSize = { width: number; height: number } | null;

export const useGetUserAvatarSize = () => {
  const [imageSize, setImageSize] = useState<ImageSize>(null);

  const getImageSize = async (src: string): Promise<ImageSize> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = () => {
        reject(new Error('Ошибка загрузки изображения'));
      };
      img.src = src;
    });
  };

  const fetchAvatarSize = async (src: string) => {
    try {
      const size = await getImageSize(src);
      setImageSize(size);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    fetchAvatarSize,
    isAvatarExist: imageSize && imageSize.height > 20 && imageSize.width > 20,
  };
};
