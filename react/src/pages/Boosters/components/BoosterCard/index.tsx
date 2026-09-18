import { observer } from 'mobx-react-lite';

import Text from '@/components/UI/Text';

import {
  ContentWrapper,
  MainWrapper,
  PriceWrapper,
  StatusIconWrapper,
  StyledBackground,
  StyledPoint,
  TimeWrapper,
  TitleWrapper,
  Wrapper,
} from './styled';
import { Booster } from '@/pages/Boosters';
import ActiveIcon from '@/pages/Boosters/assets/ActiveIcon';
import DisabledIcon from '@/pages/Boosters/assets/DisabledIcon';
import MmoproIconSmall from '@/pages/Boosters/assets/MmoproIconSmall';
import backgroundBig from '@/pages/Boosters/assets/booster-background-big.png';
import backgroundSmall from '@/pages/Boosters/assets/booster-background-small.png';
import rootStore from '@/store';
import Utils from '@/utils';

interface BoosterCardProps {
  boosterData: Booster;
  onClick: () => void;
  isActive: boolean;
}

const BoosterCard = ({ boosterData, onClick, isActive }: BoosterCardProps) => {
  const { points, message, price, imgSrc, totalDuration } = boosterData;
  const {
    boostersStore: { boosterTime },
  } = rootStore;

  const isCardWide = points === 'x5';

  return (
    <Wrapper onClick={onClick}>
      <StyledBackground
        src={isCardWide ? backgroundBig : backgroundSmall}
        alt=""
        rel="preload"
      />
      <MainWrapper $isWide={isCardWide}>
        <StyledPoint src={imgSrc} alt="" $isWide={isCardWide} rel="preload" />

        <ContentWrapper $isWide={isCardWide} $isActive={isActive}>
          <TimeWrapper $isActive={isActive} $isWide={isCardWide}>
            <Text fontSize={12} fontWeight={700} color="#fff">
              {isActive
                ? Utils.formatTime(boosterTime)
                : Utils.formatTime(totalDuration)}
            </Text>
          </TimeWrapper>

          <TitleWrapper>
            <Text fontSize={14} fontWeight={700}>
              {message}
            </Text>
          </TitleWrapper>

          {!isActive && (
            <PriceWrapper>
              <Text fontSize={12} fontWeight={600}>
                Price
              </Text>
              <MmoproIconSmall />
              <Text fontSize={12} fontWeight={600}>
                {price.toLocaleString('ru-RU')}
              </Text>
            </PriceWrapper>
          )}
        </ContentWrapper>
      </MainWrapper>

      <StatusIconWrapper $isActive={isActive}>
        {isActive ? <ActiveIcon /> : <DisabledIcon />}
      </StatusIconWrapper>
    </Wrapper>
  );
};

export default observer(BoosterCard);
