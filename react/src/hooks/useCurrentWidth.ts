import { useEffect, useState } from 'react';

function getWidth() {
  return document.documentElement.clientWidth;
}

function useCurrentWidth() {
  let [screenWidth, setScreenWidth] = useState(getWidth());

  useEffect(() => {
    let timeoutId: number | NodeJS.Timeout = 0;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setScreenWidth(getWidth()), 50);
    };

    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return { screenWidth };
}

export default useCurrentWidth;
