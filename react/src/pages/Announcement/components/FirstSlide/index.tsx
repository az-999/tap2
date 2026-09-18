import React from 'react';

import ArrowIcon from '@/pages/Announcement/assets/ArrowIcon';
import DotIcon from '@/pages/Announcement/assets/DotIcon';
import image from '@/pages/Announcement/assets/announcement-11.png';
import {
  Content,
  Slide,
} from '@/pages/Announcement/components/FirstSlide/styled';

const FirstSlide = () => {
  return (
    <Slide>
      <img src={image} alt="" />

      <Content>
        <h5>Assemble Your NFT Spaceship Soon!</h5>
        <h6>
          Earn tokens, NFTs, and other valuable prizes from our partners by
          owning your ship!
        </h6>
        <p>Why you can't miss this:</p>
        <ul>
          <li>
            <DotIcon />
            <div>
              <span>Unique Opportunity</span>
              <span>
                Be the first to get NFT ship parts, and their value will
                significantly increase in the future.
              </span>
            </div>
          </li>
          <li>
            <DotIcon />
            <div>
              <span>Future Benefits</span>
              <span>
                In the future, you can exchange these NFTs for Bump tokens.
              </span>
            </div>
          </li>
        </ul>

        <p>
          How to get a ship?{' '}
          <span>
            <ArrowIcon />
          </span>
        </p>
      </Content>
    </Slide>
  );
};

export default FirstSlide;
