import React from 'react';

const SuccessIcon = () => {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_1216_361)">
        <circle cx="23" cy="23" r="9" fill="white" />
        <path
          d="M23 33C17.4771 33 13 28.5228 13 23C13 17.4771 17.4771 13 23 13C28.5228 13 33 17.4771 33 23C33 28.5228 28.5228 33 23 33ZM22.0026 27L29.0737 19.9289L27.6595 18.5147L22.0026 24.1716L19.1742 21.3431L17.76 22.7574L22.0026 27Z"
          fill="#33CC66"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1216_361"
          x="0.6"
          y="0.6"
          width="44.8"
          height="44.8"
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
            result="effect1_dropShadow_1216_361"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1216_361"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default SuccessIcon;
