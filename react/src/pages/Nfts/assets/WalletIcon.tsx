import React from 'react';

interface WalletIconProps {
  fill?: string;
  opacity?: number;
}

const WalletIcon = ({ fill = '#fff', opacity = 0.2 }: WalletIconProps) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity={opacity}>
        <path
          d="M1.33643 6.49988H14.0031C14.3713 6.49988 14.6698 6.79835 14.6698 7.16654V13.8332C14.6698 14.2014 14.3713 14.4999 14.0031 14.4999H2.00309C1.63491 14.4999 1.33643 14.2014 1.33643 13.8332V6.49988ZM2.00309 2.49988H12.0031V5.16654H1.33643V3.16654C1.33643 2.79835 1.63491 2.49988 2.00309 2.49988ZM10.0031 9.83322V11.1666H12.0031V9.83322H10.0031Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};

export default WalletIcon;
