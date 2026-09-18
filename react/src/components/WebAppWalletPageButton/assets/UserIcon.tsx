import React from 'react';

const UserIcon = ({ fill }: { fill: string }) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.99512 11C1.99512 8.79085 3.78598 7 5.99512 7C8.20427 7 9.99512 8.79085 9.99512 11H1.99512ZM5.99512 6.5C4.33762 6.5 2.99512 5.1575 2.99512 3.5C2.99512 1.8425 4.33762 0.5 5.99512 0.5C7.65262 0.5 8.99512 1.8425 8.99512 3.5C8.99512 5.1575 7.65262 6.5 5.99512 6.5Z"
        fill={fill}
      />
    </svg>
  );
};

export default UserIcon;
