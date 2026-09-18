import React from 'react';

type MmproProps = {
  isFarming?: boolean;
  isInProgress?: boolean;
  className?: string;
};

const Mmpro = ({ isFarming, isInProgress, className }: MmproProps) => {
  return (
    <svg
      className={className ? className : ''}
      width="77"
      height="156"
      viewBox="0 0 77 156"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={{ transition: 'all 0.8s ease' }}
        d="M68.9831 53.9786V34.6873H67.8644V53.9786H59.661L47.1695 66.4067V29.308H39.1525V0H38.0339V29.308H29.8305V66.4067L17.339 53.9786H9.13559V34.6873H8.01695V53.9786H0V103.876H8.01695V130.958H9.13559V103.876H17.339V74.5684L29.8305 86.9964V118.53H38.0339V156H39.1525V118.53H47.1695V86.9964L59.661 74.5684V103.876H67.8644V130.958H68.9831V103.876H77V53.9786H68.9831Z"
        fill={isInProgress || isFarming ? '#2EFF73' : '#3C6'}
      />
    </svg>
  );
};

export default Mmpro;
