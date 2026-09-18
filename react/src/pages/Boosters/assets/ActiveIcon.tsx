import React from 'react';

const ActiveIcon = () => {
  return (
    <svg
      width="62"
      height="62"
      viewBox="0 0 62 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_739_107)">
        <circle cx="31" cy="27" r="12" fill="#33CC66" />
      </g>
      <path
        d="M26.2211 20.1724L27.1769 21.5379C25.4576 22.7437 24.3337 24.7406 24.3337 27C24.3337 30.6819 27.3184 33.6666 31.0003 33.6666C34.6822 33.6666 37.667 30.6819 37.667 27C37.667 24.7406 36.543 22.7437 34.8237 21.5379L35.7796 20.1724C37.9287 21.6796 39.3337 24.1757 39.3337 27C39.3337 31.6023 35.6027 35.3333 31.0003 35.3333C26.398 35.3333 22.667 31.6023 22.667 27C22.667 24.1757 24.0719 21.6796 26.2211 20.1724ZM30.167 27V18.6666H31.8337V27H30.167Z"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_d_739_107"
          x="0.1"
          y="0.1"
          width="61.8"
          height="61.8"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="9.45" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.2 0 0 0 0 0.8 0 0 0 0 0.4 0 0 0 0.85 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_739_107"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_739_107"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default ActiveIcon;
