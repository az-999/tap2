import React from 'react';

const CompletedIcon = () => {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_692_851)">
        <circle cx="28" cy="28" r="13.5" fill="white" />
        <path
          d="M28 43C19.7157 43 13 36.2842 13 28C13 19.7157 19.7157 13 28 13C36.2842 13 43 19.7157 43 28C43 36.2842 36.2842 43 28 43ZM26.5039 34L37.1105 23.3934L34.9893 21.2721L26.5039 29.7574L22.2613 25.5146L20.14 27.6361L26.5039 34Z"
          fill="#33CC66"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_692_851"
          x="0.6"
          y="0.6"
          width="54.8"
          height="54.8"
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
          <feOffset />
          <feGaussianBlur stdDeviation="6.2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.2 0 0 0 0 0.8 0 0 0 0 0.4 0 0 0 0.6 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_692_851"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_692_851"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default CompletedIcon;
