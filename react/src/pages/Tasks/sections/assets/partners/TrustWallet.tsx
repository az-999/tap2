import React from 'react';

const TrustWallet = () => {
  return (
    <svg
      width="47"
      height="47"
      viewBox="0 0 47 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3616_315)">
        <circle cx="23.5" cy="23.5" r="23.5" fill="white" />
        <g clipPath="url(#clip1_3616_315)">
          <mask
            id="mask0_3616_315"
            style={{ maskType: 'luminance' }}
            maskUnits="userSpaceOnUse"
            x="9"
            y="8"
            width="121"
            height="32"
          >
            <path d="M129.64 8H9V40H129.64V8Z" fill="white" />
          </mask>
          <g mask="url(#mask0_3616_315)">
            <path
              d="M9 12.6225L23.4987 8V40C13.1424 35.733 9 27.5552 9 22.9337V12.6225Z"
              fill="#0500FF"
            />
            <path
              d="M37.9987 12.6225L23.5 8V40C33.8564 35.733 37.9987 27.5552 37.9987 22.9337V12.6225Z"
              fill="url(#paint0_linear_3616_315)"
            />
          </g>
        </g>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_3616_315"
          x1="34.1474"
          y1="5.75915"
          x2="23.5734"
          y2="39.6805"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.02" stopColor="#0000FF" />
          <stop offset="0.08" stopColor="#0094FF" />
          <stop offset="0.16" stopColor="#48FF91" />
          <stop offset="0.42" stopColor="#0094FF" />
          <stop offset="0.68" stopColor="#0038FF" />
          <stop offset="0.9" stopColor="#0500FF" />
        </linearGradient>
        <clipPath id="clip0_3616_315">
          <rect width="47" height="47" fill="white" />
        </clipPath>
        <clipPath id="clip1_3616_315">
          <rect
            width="29"
            height="32"
            fill="white"
            transform="translate(9 8)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default TrustWallet;
