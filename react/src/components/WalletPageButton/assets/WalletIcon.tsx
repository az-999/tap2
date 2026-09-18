import React from 'react';

interface WalletIconProps {
  fill: string;
}

const WalletIcon = ({ fill }: WalletIconProps) => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.00195312 3.49988H9.50196C9.77811 3.49988 10.002 3.72373 10.002 3.99988V8.99988C10.002 9.27603 9.77811 9.49988 9.50196 9.49988H0.501953C0.225813 9.49988 0.00195312 9.27603 0.00195312 8.99988V3.49988ZM0.501953 0.499878H8.00196V2.49988H0.00195312V0.999878C0.00195312 0.723733 0.225813 0.499878 0.501953 0.499878ZM6.50196 5.99988V6.99988H8.00196V5.99988H6.50196Z"
        fill={fill}
      />
    </svg>
  );
};

export default WalletIcon;
