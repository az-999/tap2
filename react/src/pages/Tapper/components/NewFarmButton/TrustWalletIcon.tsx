import React from 'react';

const TrustWalletIcon = () => {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11.5" cy="11.5" r="11.5" fill="white" />
      <g clipPath="url(#clip0_3466_64)">
        <mask
          id="mask0_3466_64"
          style={{ maskType: 'luminance' }}
          maskUnits="userSpaceOnUse"
          x="5"
          y="4"
          width="55"
          height="15"
        >
          <path d="M59.08 4H5V19H59.08V4Z" fill="white" />
        </mask>
        <g mask="url(#mask0_3466_64)">
          <path
            d="M5 6.16679L11.4994 4V19C6.85692 16.9998 5 13.1665 5 11.0002V6.16679Z"
            fill="#0500FF"
          />
          <path
            d="M17.9994 6.16679L11.5 4V19C16.1425 16.9998 17.9994 13.1665 17.9994 11.0002V6.16679Z"
            fill="url(#paint0_linear_3466_64)"
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_3466_64"
          x1="16.273"
          y1="2.9496"
          x2="11.1326"
          y2="18.7198"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.02" stopColor="#0000FF" />
          <stop offset="0.08" stopColor="#0094FF" />
          <stop offset="0.16" stopColor="#48FF91" />
          <stop offset="0.42" stopColor="#0094FF" />
          <stop offset="0.68" stopColor="#0038FF" />
          <stop offset="0.9" stopColor="#0500FF" />
        </linearGradient>
        <clipPath id="clip0_3466_64">
          <rect
            width="13"
            height="15"
            fill="white"
            transform="translate(5 4)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default TrustWalletIcon;
