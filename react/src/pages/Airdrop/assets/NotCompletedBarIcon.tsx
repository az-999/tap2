import React from 'react';

const NotCompletedBarIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle opacity="0.1" cx="10" cy="10" r="10" fill="#3B4046" />
    <path
      opacity="0.2"
      d="M10 17C6.134 17 3 13.866 3 10C3 6.134 6.134 3 10 3C13.866 3 17 6.134 17 10C17 13.866 13.866 17 10 17ZM10 15.6C13.0928 15.6 15.6 13.0928 15.6 10C15.6 6.9072 13.0928 4.4 10 4.4C6.9072 4.4 4.4 6.9072 4.4 10C4.4 13.0928 6.9072 15.6 10 15.6ZM9.30182 12.8L6.33199 9.83018L7.32195 8.84017L9.30182 10.8201L13.2617 6.8603L14.2516 7.85025L9.30182 12.8Z"
      fill="white"
    />
  </svg>
);

export default NotCompletedBarIcon;
