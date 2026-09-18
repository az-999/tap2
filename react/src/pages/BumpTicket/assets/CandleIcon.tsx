import React from 'react';

const CandleIcon = () => {
  return (
    <svg
      width="13"
      height="94"
      viewBox="0 0 13 94"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="5" y="4" width="3" height="81" rx="0.25" fill="#097B2F" />
      <path
        d="M6 4L7 4L7 0.25C7 0.111929 6.88807 1.17832e-07 6.75 1.3658e-07L6.25 2.04472e-07C6.11193 2.2322e-07 6 0.111929 6 0.25L6 4Z"
        fill="#097B2F"
      />
      <g filter="url(#filter0_d_1969_601)">
        <path
          d="M5 5.25C5 5.11193 5.11193 5 5.25 5H7.75C7.88807 5 8 5.11193 8 5.25V85.75C8 85.8881 7.88807 86 7.75 86H5.25C5.11193 86 5 85.8881 5 85.75V5.25Z"
          fill="#2EFF73"
          id="candle-dash"
        />
      </g>
      <path
        d="M7 85L6 85L6 88.75C6 88.8881 6.11193 89 6.25 89L6.75 89C6.88807 89 7 88.8881 7 88.75L7 85Z"
        fill="#2EFF73"
      />
      <defs>
        <filter
          id="filter0_d_1969_601"
          x="0.8"
          y="0.8"
          width="11.4"
          height="89.4"
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
          <feGaussianBlur stdDeviation="2.1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.180392 0 0 0 0 1 0 0 0 0 0.45098 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1969_601"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1969_601"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default CandleIcon;
