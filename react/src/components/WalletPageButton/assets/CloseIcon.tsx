import React from 'react';

interface CloseIconProps {
  fill: string;
}

const CloseIcon = ({ fill }: CloseIconProps) => {
  return (
    <svg
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.1716 6.9993L0.221799 2.0496L1.636 0.635403L8 6.9993L1.636 13.3633L0.2218 11.9491L5.1716 6.9993Z"
        fill={fill}
      />
    </svg>
  );
};

export default CloseIcon;
