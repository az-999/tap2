import React from 'react';

import DotIcon from '@/pages/Announcement/assets/DotIcon';
import image from '@/pages/Announcement/assets/announcement-22.png';
import {
  Content,
  Slide,
} from '@/pages/Announcement/components/NftSecSlide/styled';

const NftSecSlide = () => {
  return (
    <Slide>
      <img src={image} alt="" />

      <Content>
        <h5>Our NFT Store is Now Open!</h5>

        <ul>
          <li>
            <div>
              <div id="nav-bar-button">Marketplace</div>
              <div id="nav-bar-button-disabled">BUMP Store</div>
              <div id="nav-bar-button-disabled">My NFTs</div>
            </div>
            <div>
              <DotIcon />
              <span>
                Secondary NFT sales between users, with the ability to set your
                own price and sell
              </span>
            </div>
          </li>
          <li>
            <div>
              <div id="nav-bar-button-disabled">Marketplace</div>
              <div id="nav-bar-button">BUMP Store</div>
              <div id="nav-bar-button-disabled">My NFTs</div>
            </div>
            <div>
              <DotIcon />
              <span>
                Direct NFT sales from BUMP developers, including announcements
                and new collections
              </span>
            </div>
          </li>
          <li>
            <div>
              <div id="nav-bar-button-disabled">Marketplace</div>
              <div id="nav-bar-button-disabled">BUMP Store</div>
              <div id="nav-bar-button">My NFTs</div>
            </div>
            <div>
              <DotIcon />
              <span>User-owned NFTs available for sale</span>
            </div>
          </li>
        </ul>
      </Content>
    </Slide>
  );
};

export default NftSecSlide;
