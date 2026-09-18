import React from 'react';

const WithdrawBg = () => {
  return (
    <svg
      width="408"
      height="405"
      viewBox="0 0 408 405"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="withdraw-bg-icon"
    >
      <g filter="url(#filter0_di_5565_9843)">
        <path
          d="M44 52C44 47.5817 47.5817 44 52 44H124H204H284H356C360.418 44 364 47.5817 364 52V105.5V167V353C364 357.418 360.418 361 356 361H252.669C251.525 361 250.395 360.755 249.353 360.28L241.847 356.861C240.805 356.387 239.675 356.141 238.53 356.141H167.336C166.192 356.141 165.061 356.387 164.02 356.861L156.513 360.28C155.472 360.755 154.341 361 153.197 361H52C47.5817 361 44 357.418 44 353V167V105.5V52Z"
          fill="#0C1A10"
        />
        <path
          d="M157.135 361.645L156.513 360.28L157.135 361.645L164.642 358.226C165.488 357.841 166.407 357.641 167.336 357.641H238.53C239.46 357.641 240.379 357.841 241.225 358.226L248.732 361.645L249.353 360.28L248.732 361.645C249.968 362.209 251.311 362.5 252.669 362.5H356C361.247 362.5 365.5 358.247 365.5 353V167V105.5V52C365.5 46.7533 361.247 42.5 356 42.5H284H204H124H52C46.7533 42.5 42.5 46.7533 42.5 52V105.5V167V353C42.5 358.247 46.7533 362.5 52 362.5H153.197C154.556 362.5 155.899 362.209 157.135 361.645Z"
          stroke="#33CC66"
          strokeWidth="3"
        />
      </g>
      <defs>
        <filter
          id="filter0_di_5565_9843"
          x="0.5"
          y="0.5"
          width="407"
          height="404"
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
          <feGaussianBlur stdDeviation="20.25" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.2 0 0 0 0 0.8 0 0 0 0 0.4 0 0 0 0.67 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_5565_9843"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_5565_9843"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="23.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.2 0 0 0 0 0.8 0 0 0 0 0.4 0 0 0 0.46 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_5565_9843"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default WithdrawBg;
