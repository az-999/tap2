import React from 'react';

import DotIcon from '@/pages/Announcement/assets/DotIcon';
import image from '@/pages/Announcement/assets/announcement-13.png';
import {
  Content,
  Slide,
} from '@/pages/Announcement/components/ThirdSlide/styled';

const ThirdSlide = () => {
  return (
    <Slide>
      <img src={image} alt="" />

      <Content>
        <h5>Deploy Your NFT Spaceship in the Game!</h5>

        <ul>
          <li>
            <DotIcon />
            <span>
              Send your spaceship on expeditions to planetary stations.
            </span>
          </li>
          <li>
            <DotIcon />
            <span>
              Your spaceship will bring back resources in the form of NFT
              rewards, tokens, and other prizes.
            </span>
          </li>
          <li>
            <DotIcon />
            <span>
              Upgrade your spaceship by collecting more parts and earn even more
              rewards!
            </span>
          </li>
        </ul>
      </Content>
    </Slide>
  );
};

export default ThirdSlide;
