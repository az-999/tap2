import React from 'react';

const LoadingIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 100 100"
      overflow="visible"
      fill="#33cc66"
      stroke="none"
    >
      <defs>
        <rect
          id="loader"
          x="46.5"
          y="40"
          width="7"
          height="20"
          rx="2"
          ry="2"
          transform="translate(0 -30)"
        />
      </defs>
      <use xlinkHref="#loader" transform="rotate(36 50 50)">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1s"
          begin="0.10s"
          repeatCount="indefinite"
        ></animate>
      </use>
      <use xlinkHref="#loader" transform="rotate(72 50 50)">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1s"
          begin="0.20s"
          repeatCount="indefinite"
        ></animate>
      </use>
      <use xlinkHref="#loader" transform="rotate(108 50 50)">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1s"
          begin="0.30s"
          repeatCount="indefinite"
        ></animate>
      </use>
      <use xlinkHref="#loader" transform="rotate(144 50 50)">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1s"
          begin="0.40s"
          repeatCount="indefinite"
        ></animate>
      </use>
      <use xlinkHref="#loader" transform="rotate(180 50 50)">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1s"
          begin="0.50s"
          repeatCount="indefinite"
        ></animate>
      </use>
      <use xlinkHref="#loader" transform="rotate(216 50 50)">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1s"
          begin="0.60s"
          repeatCount="indefinite"
        ></animate>
      </use>
      <use xlinkHref="#loader" transform="rotate(252 50 50)">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1s"
          begin="0.70s"
          repeatCount="indefinite"
        ></animate>
      </use>
      <use xlinkHref="#loader" transform="rotate(288 50 50)">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1s"
          begin="0.80s"
          repeatCount="indefinite"
        ></animate>
      </use>
      <use xlinkHref="#loader" transform="rotate(324 50 50)">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1s"
          begin="0.90s"
          repeatCount="indefinite"
        ></animate>
      </use>
      <use xlinkHref="#loader" transform="rotate(360 50 50)">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1s"
          begin="1.00s"
          repeatCount="indefinite"
        ></animate>
      </use>
    </svg>
  );
};

export default LoadingIcon;
