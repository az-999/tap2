import React from 'react';
import { css } from 'styled-components/macro';

import Text from '@/components/UI/Text';

import IllustrationBottomImg from '@/pages/Roadmap/Assets/IllustrationBottom.png';
import LetterIcon from '@/pages/Roadmap/Assets/LetterIcon';
import MMproIcon from '@/pages/Roadmap/Assets/MMproIcon';
import Checkmark from '@/pages/Roadmap/Assets/checkmark';
import Mmpro from '@/pages/Roadmap/Assets/mmpro';
import IllustrationTopImg from '@/pages/Roadmap/Assets/moon-top.png';
import {
  CheckmarkWrapper,
  CompanyWrapper,
  Container,
  FooterWrapper,
  IllustrationBottom,
  IllustrationTop,
  MainContainer,
  Point,
  PointsWrapper,
  TitleContainer,
} from '@/pages/Roadmap/styled';
import rootStore from '@/store';

type Points = {
  id: number;
  name: string;
  isReady: boolean;
  children?: Record<'name', string>[];
};

const points: Points[] = [
  {
    id: 1,
    name: 'Partnership with',
    isReady: true,
    children: [
      { name: 'Tonstakers' },
      { name: 'Tonkeeper' },
      { name: 'Getgems' },
      { name: 'Ston.fi' },
      { name: 'Trust Wallet' },
    ],
  },
  { id: 2, name: 'Tap, Farm, Boost, Task', isReady: true },
  { id: 3, name: 'Referral Points', isReady: true },
  { id: 4, name: 'Points to RWA NFT and NFT Voucher', isReady: true },
  { id: 5, name: 'Rewards from partners', isReady: true },
  { id: 6, name: 'The Open League', isReady: true },
  { id: 7, name: 'Pre-Market voucher MMPro Tokens', isReady: true },
  { id: 8, name: 'GameFi Staking and Farming', isReady: true },
  { id: 9, name: 'Games', isReady: false },
  { id: 10, name: 'Bump Tickets', isReady: false },
  { id: 11, name: 'Listing on Ston.fi Token Bump', isReady: false },
];

const Roadmap = () => {
  const {
    appVersionStore: { version },
  } = rootStore;

  return (
    <Container>
      <IllustrationTop src={IllustrationTopImg} rel="preload" />
      <IllustrationBottom src={IllustrationBottomImg} rel="preload" />
      <MainContainer>
        <TitleContainer>
          <div>
            <MMproIcon />
            <Text fontSize={12} fontWeight={600}>
              MMPro Bump
            </Text>

            <span id="beta-icon">Beta</span>
          </div>

          <Text fontSize={24} fontWeight={700}>
            Roadmap
          </Text>
        </TitleContainer>

        <PointsWrapper>
          {points.map((point) => (
            <Point key={point.id}>
              <div>
                <CheckmarkWrapper isActive={point.isReady}>
                  {point.isReady && <Checkmark />}
                </CheckmarkWrapper>
                <Text
                  fontSize={16}
                  fontWeight={400}
                  color={point.isReady ? '#fff' : 'rgba(255, 255, 255, .8)'}
                >
                  {point.name}
                </Text>

                {point.name === 'Bump Tickets' && (
                  <div id="pump-ticket-icon">
                    <LetterIcon />
                  </div>
                )}
              </div>

              <div>
                {point.children &&
                  point.children.map((item) => (
                    <Text fontSize={14} fontWeight={300} key={item.name}>
                      <span id="colored-dash">- </span>
                      {item.name}
                    </Text>
                  ))}
              </div>
            </Point>
          ))}
        </PointsWrapper>
      </MainContainer>

      <FooterWrapper>
        <CompanyWrapper>
          <Mmpro duration={1.5} />
          <a href="https://marketmaking.pro" target="_blank" rel="noreferrer">
            <Text fontSize={14} fontWeight={400}>
              marketmaking.pro
            </Text>
          </a>
        </CompanyWrapper>

        {version && (
          <Text
            fontSize={12}
            fontWeight={400}
            color="#fff"
            styledFragment={css`
              opacity: 0.3;
            `}
          >
            {`v.${version.version}`}
          </Text>
        )}
      </FooterWrapper>
    </Container>
  );
};

export default Roadmap;
