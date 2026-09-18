import React, { useEffect, useState } from 'react';

import { ANIMATION_DURATION } from '@/store/const';

interface MmproProps {
  duration?: number;
}

const Mmpro = ({ duration = 5 }: MmproProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalSteps = 125;
    const intervalTime = ANIMATION_DURATION / (totalSteps * duration);

    let interval = setInterval(() => {
      setProgress((prev) => (prev < totalSteps ? prev + 1 : totalSteps));
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  // Периметр круга (2 * π * r), где r = 20 (радиус круга)
  const circleLength = 2 * Math.PI * 20;
  const strokeDasharray = `${(progress / 100) * circleLength} ${circleLength}`;

  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        opacity="0.2"
        cx="22"
        cy="22"
        r="20"
        stroke="#33CC66"
        strokeWidth="3"
      />
      <circle
        cx="22"
        cy="22"
        r="20"
        stroke="#33CC66"
        strokeWidth="2"
        strokeDasharray={strokeDasharray}
      />
      <path
        d="M26.7506 18.3044V15.3365H26.5763V18.3044H25.2978L23.3511 20.2164V14.5089H22.1017V10H21.9274V14.5089H20.6489V20.2164L18.7022 18.3044H17.4237V15.3365H17.2494V18.3044H16V25.981H17.2494V30.1474H17.4237V25.981H18.7022V21.4721L20.6489 23.3841V28.2354H21.9274V34H22.1017V28.2354H23.3511V23.3841L25.2978 21.4721V25.981H26.5763V30.1474H26.7506V25.981H28V18.3044H26.7506Z"
        fill="#33CC66"
      />
    </svg>
  );
};

export default Mmpro;
