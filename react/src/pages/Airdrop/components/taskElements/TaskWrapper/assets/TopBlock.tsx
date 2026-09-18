import React from 'react';

const TopBlock = () => (
  <svg
    width="140"
    height="34"
    viewBox="0 0 140 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    id="top-task-block"
  >
    <g
      clipPath="url(#bgblur_0_7571_102_clip_path)"
      data-figma-skip-parse="true"
    >
      <foreignObject x="-10" y="-10" width="160" height="54">
        <div
          style={{
            backdropFilter: 'blur(5px)',
            height: '100%',
            width: '100%',
          }}
        ></div>
      </foreignObject>
    </g>
    <path
      data-figma-bg-blur-radius="10"
      d="M112.986 3.38379L140 34H0V10C0 4.47715 4.47715 0 10 0H105.487C108.356 0 111.087 1.23239 112.986 3.38379Z"
      fill="#0E1010CC"
    />
    <defs>
      <clipPath id="bgblur_0_7571_102_clip_path">
        <path d="M112.986 3.38379L140 34H0V10C0 4.47715 4.47715 0 10 0H105.487C108.356 0 111.087 1.23239 112.986 3.38379Z" />
      </clipPath>
    </defs>
  </svg>
);

export default TopBlock;
