import React, { FC } from 'react';

const Info: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.00033 11.8333C2.77866 11.8333 0.166992 9.22159 0.166992 5.99996C0.166992 2.7783 2.77866 0.166626 6.00033 0.166626C9.22196 0.166626 11.8337 2.7783 11.8337 5.99996C11.8337 9.22159 9.22196 11.8333 6.00033 11.8333ZM5.41699 7.74996V8.91663H6.58366V7.74996H5.41699ZM5.41699 3.08329V6.58329H6.58366V3.08329H5.41699Z"
        fill="white"
      />
    </svg>
  );
};

export default Info;
