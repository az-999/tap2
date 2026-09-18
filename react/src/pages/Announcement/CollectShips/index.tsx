import React from 'react';

import Text from '@/components/UI/Text';

import {
  BottomContainer,
  Button,
  ContentContainer,
  ContentWrapperContainer,
  GradientBlock,
  Image,
  Slide,
} from '@/pages/Announcement/CollectShips/styled';
import ShipsIcon from '@/pages/Announcement/assets/ShipsIcon';
import imageSrc from '@/pages/Announcement/assets/collect-ships-bg.png';

const CollectShips = () => {
  return (
    <Slide>
      <Image src={imageSrc} alt="" />
      <ContentContainer>
        <div>
          <ContentWrapperContainer>
            <Text fontSize={24} fontWeight={700}>
              Collect NFT Ships and
            </Text>
            <Text fontSize={24} fontWeight={700}>
              Parts <span id="extra-highlights">for bigger rewards!</span>
            </Text>
          </ContentWrapperContainer>

          <ContentWrapperContainer>
            <Text fontSize={12} fontWeight={500}>
              Assemble <span id="green-highlights">high-level ships</span> and
              parts to earn valuable rewards and airdrops for ownership in the
              future
            </Text>
          </ContentWrapperContainer>

          <GradientBlock>
            <Text fontSize={10} fontWeight={600}>
              Join NFT trading and grow your collection to earn even more!
            </Text>
          </GradientBlock>
        </div>
        <BottomContainer>
          <Button>
            <span>
              <ShipsIcon />
            </span>
            Merge ships
          </Button>
          <Button>Combine parts</Button>
        </BottomContainer>
      </ContentContainer>
    </Slide>
  );
};

export default CollectShips;
