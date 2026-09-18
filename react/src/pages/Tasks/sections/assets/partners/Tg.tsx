import React from 'react';

type TgProps = {
  opacity: number;
};

const Tg = ({ opacity }: TgProps) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity={opacity}>
        <path
          d="M11.1999 20.692L5.40897 18.7945C4.15736 18.3915 4.14992 17.4874 5.68921 16.8379L28.2521 7.6887C29.5607 7.1263 30.3048 7.83686 29.8806 9.60848L26.0375 28.6422C25.77 29.9963 24.992 30.3187 23.9145 29.6938L18.0011 25.1004L15.245 27.8927C14.9617 28.1796 14.7313 28.4261 14.2974 28.4879C13.8632 28.5495 13.5053 28.4147 13.2451 27.6591L11.2292 20.6725L11.1999 20.692Z"
          fill="#33CC66"
        />
      </g>
    </svg>
  );
};

export default Tg;
