import React from 'react';

const BoxContainerIcon = () => {
  return (
    <svg
      width="360"
      height="227"
      viewBox="0 0 360 227"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="box-container-icon"
    >
      <g filter="url(#filter0_di_5167_251)">
        <path
          d="M20 92C20 87.5817 23.5817 84 28 84H332C336.418 84 340 87.5817 340 92V135C340 139.418 336.418 143 332 143H228.186C227.356 143 226.531 142.871 225.74 142.617L217.46 139.958C216.669 139.704 215.844 139.575 215.014 139.575H142.853C142.023 139.575 141.198 139.704 140.407 139.958L132.126 142.617C131.336 142.871 130.511 143 129.68 143H28C23.5817 143 20 139.418 20 135V92Z"
          fill="#3B4046"
        />
        <path
          d="M21.5 92C21.5 88.4102 24.4101 85.5 28 85.5H332C335.59 85.5 338.5 88.4102 338.5 92V135C338.5 138.59 335.59 141.5 332 141.5H228.186C227.512 141.5 226.841 141.395 226.199 141.189L217.918 138.53C216.979 138.228 216 138.075 215.014 138.075H142.853C141.867 138.075 140.887 138.228 139.948 138.53L131.668 141.189C131.025 141.395 130.355 141.5 129.68 141.5H28C24.4101 141.5 21.5 138.59 21.5 135V92Z"
          stroke="#38F4F1"
          strokeWidth="3"
        />
      </g>
      <defs>
        <filter
          id="filter0_di_5167_251"
          x="-64"
          y="0"
          width="488"
          height="227"
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
          <feGaussianBlur stdDeviation="42" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.219608 0 0 0 0 0.956863 0 0 0 0 0.945098 0 0 0 0.67 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_5167_251"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_5167_251"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="23.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.219608 0 0 0 0 0.956863 0 0 0 0 0.945098 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_5167_251"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default BoxContainerIcon;
