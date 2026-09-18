import React, { useEffect, useState } from 'react';

import ErrorIcon from '@/components/Tooltip/assets/ErrorIcon';

import Text from '../UI/Text';
import InfoIcon from './assets/InfoIcon';
import { TooltipContainer } from './styled';

interface TooltipProps {
  message: string;
  index: number;
  removeTooltip: (index: number) => void;
  type?: 'info' | 'error';
}

const Tooltip = ({
  message,
  index,
  removeTooltip,
  type = 'info',
}: TooltipProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Показываем тултип через 100 мс
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 100);

    // Скрываем тултип через 5 секунд
    const hideTimer = setTimeout(() => {
      setIsActive(false);

      setTimeout(() => {
        removeTooltip(index);
      }, 500); // Время совпадает с длительностью анимации
    }, 5100); // 500 (задержка показа) + 5000 (время показа)

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <TooltipContainer $index={index} $isActive={isActive}>
      {type === 'info' && <InfoIcon />}
      {type === 'error' && <ErrorIcon />}
      <Text fontSize={14} fontWeight={600}>
        {message}
      </Text>
    </TooltipContainer>
  );
};

export default Tooltip;
