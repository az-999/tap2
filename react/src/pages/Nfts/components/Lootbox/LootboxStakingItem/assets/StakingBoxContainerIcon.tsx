import React from 'react';

const StakingBoxContainerIcon = () => {
  return (
    <svg
      width="360"
      height="334"
      viewBox="0 0 360 334"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="staking-box-container-icon"
    >
      <g filter="url(#filter0_di_5168_269)">
        <path
          d="M20 52C20 47.5817 23.5817 44 28 44H100H180H260H332C336.418 44 340 47.5817 340 52V105.5V167V282C340 286.418 336.418 290 332 290H228.669C227.525 290 226.395 289.755 225.353 289.28L217.847 285.861C216.805 285.387 215.675 285.141 214.53 285.141H143.336C142.192 285.141 141.061 285.387 140.02 285.861L132.513 289.28C131.472 289.755 130.341 290 129.197 290H28C23.5817 290 20 286.418 20 282V167V105.5V52Z"
          fill="#041212"
        />
        <path
          d="M140.642 287.226L140.02 285.861L140.642 287.226C141.488 286.841 142.407 286.641 143.336 286.641H214.53C215.46 286.641 216.379 286.841 217.225 287.226L224.732 290.645C225.968 291.209 227.311 291.5 228.669 291.5H332C337.247 291.5 341.5 287.247 341.5 282V167V105.5V52C341.5 46.7533 337.247 42.5 332 42.5H260H180H100H28C22.7533 42.5 18.5 46.7533 18.5 52V105.5V167V282C18.5 287.247 22.7533 291.5 28 291.5H129.197C130.556 291.5 131.899 291.209 133.135 290.645L140.642 287.226Z"
          stroke="#38F4F1"
          strokeWidth="3"
        />
      </g>
      <defs>
        <filter
          id="filter0_di_5168_269"
          x="-23.5"
          y="0.5"
          width="407"
          height="333"
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
            values="0 0 0 0 0.219608 0 0 0 0 0.956863 0 0 0 0 0.945098 0 0 0 0.67 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_5168_269"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_5168_269"
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
            values="0 0 0 0 0.219608 0 0 0 0 0.956863 0 0 0 0 0.945098 0 0 0 0.46 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_5168_269"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default StakingBoxContainerIcon;
