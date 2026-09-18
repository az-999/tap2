import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { observer } from 'mobx-react-lite';
import React from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

import Text from '@/components/UI/Text';

import {
  CheckmarkWrapper,
  Col,
  ConfettiWrapper,
  IsOverContainer,
  MeetSafeConnectContainer,
  Price,
  Ratio,
  RightAngle,
  Row,
  StepsContainer,
  TapMinerContainer,
  TextRow,
  Title,
  TitleContainer,
  Wrapper,
} from './styled';
import Telegram from '@/pages/Friends/Assets/Telegram';
import ResolvedCheckmark from '@/pages/Tapper/Assets/ResolvedCheckmark';
import blockSportImg from '@/pages/Tasks/sections/assets/partners/Blocksport.png';
import BullsBg from '@/pages/Tasks/sections/assets/partners/Bulls-bg';
import hbbImg from '@/pages/Tasks/sections/assets/partners/HBB.png';
import hamstersPADImg from '@/pages/Tasks/sections/assets/partners/HamstersPAD.png';
import IsOverIcon from '@/pages/Tasks/sections/assets/partners/IsOverIcon';
import JoinIcon from '@/pages/Tasks/sections/assets/partners/JoinIcon';
import MmoproIconSmall from '@/pages/Tasks/sections/assets/partners/MmoproIconSmall';
import Noracle from '@/pages/Tasks/sections/assets/partners/Noracle';
import OgcIcon from '@/pages/Tasks/sections/assets/partners/OgcIcon';
import PlayIcon from '@/pages/Tasks/sections/assets/partners/PlayIcon';
import seedImg from '@/pages/Tasks/sections/assets/partners/SEED.png';
import safeInWayImg from '@/pages/Tasks/sections/assets/partners/SafeInWay.png';
import safeShieldImg from '@/pages/Tasks/sections/assets/partners/SafeShield.png';
import simpleImg from '@/pages/Tasks/sections/assets/partners/Simple.png';
import TimeTonIcon from '@/pages/Tasks/sections/assets/partners/TimeTonIcon';
import TonkeeperIcon from '@/pages/Tasks/sections/assets/partners/TonkeeperIcon';
import TonstakersTelegram from '@/pages/Tasks/sections/assets/partners/TonstakersTelegram';
import TonstakersTwitter from '@/pages/Tasks/sections/assets/partners/TonstakersTwitter';
import TrendingIcon from '@/pages/Tasks/sections/assets/partners/TrendingIcon';
import TrustWallet from '@/pages/Tasks/sections/assets/partners/TrustWallet';
import Twitter from '@/pages/Tasks/sections/assets/partners/TwitterIcon';
import UnresolvedCheckmark from '@/pages/Tasks/sections/assets/partners/UnresolvedCheckmark';
import wormFare from '@/pages/Tasks/sections/assets/partners/WF_short_logo@4x.png';
import WalletIcon from '@/pages/Tasks/sections/assets/partners/WalletIcon';
import YouTube from '@/pages/Tasks/sections/assets/partners/YouTube';
import artificaImg from '@/pages/Tasks/sections/assets/partners/artifica.png';
import bitgetImg from '@/pages/Tasks/sections/assets/partners/bitget.png';
import boomImg from '@/pages/Tasks/sections/assets/partners/boomCoin.png';
import boomsImg from '@/pages/Tasks/sections/assets/partners/booms.png';
import bullRunCornerBg from '@/pages/Tasks/sections/assets/partners/bull-run-corner.png';
import bullRubImage from '@/pages/Tasks/sections/assets/partners/bull-run-logo.png';
import bullsBg from '@/pages/Tasks/sections/assets/partners/bulls-bg.png';
import catsImg from '@/pages/Tasks/sections/assets/partners/cats.png';
import cuberiumImg from '@/pages/Tasks/sections/assets/partners/cuberium.png';
import bullsImg from '@/pages/Tasks/sections/assets/partners/extraBulls.png';
import hamsterImg from '@/pages/Tasks/sections/assets/partners/hamster.png';
import hemeraImg from '@/pages/Tasks/sections/assets/partners/hemera.png';
import hexnImg from '@/pages/Tasks/sections/assets/partners/hexncoin.png';
import kemImg from '@/pages/Tasks/sections/assets/partners/kem.png';
import koloImg from '@/pages/Tasks/sections/assets/partners/kolo.png';
import meetSafeConnectImg from '@/pages/Tasks/sections/assets/partners/meetSafeConnectImg.png';
import memefiImg from '@/pages/Tasks/sections/assets/partners/memefi.png';
import memelandDef from '@/pages/Tasks/sections/assets/partners/memeland-default.png';
import memeTelegram from '@/pages/Tasks/sections/assets/partners/memeland-telegram.png';
import mogulImg from '@/pages/Tasks/sections/assets/partners/mogul.png';
import monetagImage from '@/pages/Tasks/sections/assets/partners/monetag-icon.png';
import nomisImg from '@/pages/Tasks/sections/assets/partners/nomis.png';
import piggyImg from '@/pages/Tasks/sections/assets/partners/piggypiggylogo.png';
import puppiesImg from '@/pages/Tasks/sections/assets/partners/puppiesImage.png';
import rocketImg from '@/pages/Tasks/sections/assets/partners/rocket.jpg';
import securityImg from '@/pages/Tasks/sections/assets/partners/security.png';
import swissImg from '@/pages/Tasks/sections/assets/partners/swiss.png';
import tapMinerImage from '@/pages/Tasks/sections/assets/partners/tap-miner.png';
import tigerImg from '@/pages/Tasks/sections/assets/partners/tiger.png';
import timeFarmImg from '@/pages/Tasks/sections/assets/partners/timeFarm.png';
import tonboxImg from '@/pages/Tasks/sections/assets/partners/tonbox.png';
import vertusImg from '@/pages/Tasks/sections/assets/partners/vertus.png';
import yescoinImg from '@/pages/Tasks/sections/assets/partners/yescoin.png';
import zimaImg from '@/pages/Tasks/sections/assets/partners/zimaImg.png';
import cryptoRankImg from '@/pages/Tasks/sections/assets/partners/сryptoRank.png';
import { Task } from '@/pages/Tasks/types';
import rootStore from '@/store';
import { formatNumberWithSpaces } from '@/utils';

type Props = {
  task: Task;
  isActive: boolean;
  onOpenModal: (task: Task) => void;
  activeTask?: number;
};

const TaskCard = ({ task, isActive, onOpenModal, activeTask }: Props) => {
  const {
    tasksStore: { isConfettiExploding },
  } = rootStore;

  const WebApp = useWebApp();
  const platform = WebApp.platform;

  /** не показываем таску на устройствах, отличных от apple,
   * если у таски стоит тип phone_type: 2 */
  if (task.phone_type === 2 && platform !== 'ios' && platform !== 'macos')
    return null;

  const isActiveRule = isActive || !task.is_active;

  return (
    <>
      <Wrapper onClick={() => onOpenModal(task)}>
        <Row
          isActive={isActiveRule}
          $isTonkeeperIcon={task.type === 'tonkeeper_wallet'}
          $isTonstakersIcon={
            task.type === 'tonstakers_telegram' ||
            task.type === 'tonstakers_twitter'
          }
          $isBullsIcon={task.type === 'bulls'}
          $isBoomIcon={task.design_id === 6}
          $isTrustWalletIcon={task.design_id === 7}
          $isTapMinerTask={task.design_id === 9}
          $isBullRunTask={task.design_id === 10}
          $isMonetagTask={task.design_id === 11}
        >
          <ConfettiWrapper>
            {activeTask === task.id && isConfettiExploding && (
              <ConfettiExplosion
                force={0.6}
                duration={2500}
                particleCount={350}
                zIndex={100}
              />
            )}
          </ConfettiWrapper>

          {task.type === 'bulls' && (
            <>
              <BullsBg />
              <img src={bullsBg} alt="" id="sec-bulls-bg" />
            </>
          )}

          <Col>
            <Ratio
              isActive={isActiveRule}
              $isTonkeeperIcon={task.design_id === 1}
              $isTonstakersIcon={task.design_id === 2}
              $isBullsIcon={task.design_id === 3}
              $isTrustWalletIcon={task.design_id === 7}
              $isSecurityAIIcon={task.design_id === 8}
              $isPiggyIcon={task.type === 'PiggyPiggy'}
              $isBitgetIcon={task.type === 'Bitget'}
              $isTapMinerTask={task.design_id === 9}
              $isBullRunTask={task.design_id === 10}
              $isMonetagTask={task.design_id === 11}
            >
              {(task.type === 'telegram' || task.type === 'telegram_boost') && (
                <Telegram />
              )}
              {task.type === 'twitter' && <Twitter />}
              {task.type === 'tonkeeper_wallet' && <TonkeeperIcon />}
              {task.design_id === 7 && <TrustWallet />}
              {task.design_id === 8 && (
                <img src={securityImg} alt="" id="security-img" />
              )}
              {task.type === 'PiggyPiggy' && (
                <img src={piggyImg} alt="" id="piggy-img" />
              )}
              {task.type === 'Bitget' && (
                <img src={bitgetImg} alt="" id="bitget-img" />
              )}
              {task.design_id === 9 && (
                <img src={tapMinerImage} alt="" id="tap-miner-img" />
              )}
              {task.design_id === 10 && (
                <img src={bullRubImage} alt="" id="bull-run-img" />
              )}
              {task.design_id === 11 && (
                <img src={monetagImage} alt="" id="monetag-img" />
              )}

              {task.icon && task.icon.startsWith('https://') ? (
                <img src={task.icon} alt="" id="image-from-server" />
              ) : (
                <>
                  {task.type === 'ogc' && <OgcIcon />}
                  {(task.design_id === 4 || task.design_id === 5) && (
                    <img
                      src={meetSafeConnectImg}
                      alt=""
                      id="meet-safe-connect-img"
                    />
                  )}
                  {task.design_id === 12 && (
                    <img
                      src={safeShieldImg}
                      alt=""
                      id="meet-safe-connect-img"
                    />
                  )}
                  {task.design_id === 13 && (
                    <img src={safeInWayImg} alt="" id="meet-safe-connect-img" />
                  )}
                  {task.type === 'hexn' && (
                    <img src={hexnImg} alt="" id="hexn-coin-img" />
                  )}
                  {task.type === 'wormfare' && (
                    <img src={wormFare} alt="" id="wormfare-coin-img" />
                  )}
                  {task.type === 'Mogul' && (
                    <img src={mogulImg} alt="" id="mogul-img" />
                  )}
                  {task.type === 'TimeFarm' && (
                    <img src={timeFarmImg} alt="" id="time-farm-img" />
                  )}
                  {task.type === 'bulls' && (
                    <img src={bullsImg} alt="" id="bulls-img" />
                  )}
                  {task.type === 'CryptoRank' && (
                    <img src={cryptoRankImg} alt="" id="crypto-rank-img" />
                  )}
                  {task.type === 'Blocksport' && (
                    <img src={blockSportImg} alt="" id="blocksport-img" />
                  )}
                  {task.type === 'zimabank' && (
                    <img src={zimaImg} alt="" id="zima-img" />
                  )}
                  {task.type === 'CATS' && (
                    <img src={catsImg} alt="" id="cats-img" />
                  )}
                  {task.type === 'vertus' && (
                    <img src={vertusImg} alt="" id="vertus-img" />
                  )}
                  {task.type === 'puppies' && (
                    <img src={puppiesImg} alt="" id="puppies-img" />
                  )}
                  {task.type === 'artifica' && (
                    <img src={artificaImg} alt="" id="artifica-img" />
                  )}
                  {task.type === 'kolo' && (
                    <img src={koloImg} alt="" id="kolo-img" />
                  )}
                  {task.type === 'nomis' && (
                    <img src={nomisImg} alt="" id="nomis-img" />
                  )}
                  {task.type === 'rocket' && (
                    <img src={rocketImg} alt="" id="rocket-img" />
                  )}
                  {task.type === 'tiger' && (
                    <img src={tigerImg} alt="" id="tiger-img" />
                  )}
                  {task.type === 'memeland-default' && (
                    <img src={memelandDef} alt="" id="memeland-default-img" />
                  )}
                  {task.type === 'memeland-telegram' && (
                    <img src={memeTelegram} alt="" id="memeland-telegram-img" />
                  )}
                  {task.type === 'HamstersPAD' && (
                    <img src={hamstersPADImg} alt="" id="hamstersPADImg-img" />
                  )}
                  {task.type === 'tonbox' && (
                    <img src={tonboxImg} alt="" id="tonboxImg-img" />
                  )}
                  {task.type === 'seed' && (
                    <img src={seedImg} alt="" id="seed-img" />
                  )}
                  {task.type === 'kem' && (
                    <img src={kemImg} alt="" id="kem-img" />
                  )}
                  {task.type === 'Hemera' && (
                    <img src={hemeraImg} alt="" id="hemera-img" />
                  )}
                  {task.type === 'BOOMCoin' && (
                    <img src={boomImg} alt="" id="boom-img" />
                  )}
                  {task.type === 'yescoin' && (
                    <img src={yescoinImg} alt="" id="yescoin-img" />
                  )}
                  {task.type === 'memefi' && (
                    <img src={memefiImg} alt="" id="memefi-img" />
                  )}
                  {task.type === 'nbb' && (
                    <img src={hbbImg} alt="" id="hbb-img" />
                  )}
                  {task.type === 'hamster' && (
                    <img src={hamsterImg} alt="" id="hamster-img" />
                  )}
                  {task.type === 'Cuberium' && (
                    <img src={cuberiumImg} alt="" id="cuberium-img" />
                  )}
                  {task.type === 'Simple' && (
                    <img src={simpleImg} alt="" id="simple-img" />
                  )}
                  {task.type === 'Booms' && (
                    <img src={boomsImg} alt="" id="booms-img" />
                  )}
                  {task.type === 'Swiss' && (
                    <img src={swissImg} alt="" id="swiss-img" />
                  )}
                  {task.type === 'tonstakers_telegram' && (
                    <TonstakersTelegram />
                  )}
                  {task.type === 'tonstakers_twitter' && <TonstakersTwitter />}
                  {task.type === 'timeton' && <TimeTonIcon />}
                  {task.type === 'trending' && <TrendingIcon />}
                  {task.type === 'youtube' && <YouTube opacity={1} />}
                  {task.type === 'noracle' && <Noracle />}
                </>
              )}
            </Ratio>
            <TextRow
              $isTonstakersIcon={
                task.type === 'tonstakers_telegram' ||
                task.type === 'tonstakers_twitter'
              }
            >
              <TitleContainer $isActive={isActiveRule}>
                <Title
                  $isTapMinerTask={task.design_id === 9}
                  $isBullRunTask={task.design_id === 10}
                >
                  {task?.name}
                </Title>

                {(task.type === 'tonkeeper_wallet' ||
                  task.type === 'tonstakers_twitter' ||
                  task.type === 'tonstakers_telegram' ||
                  task.type === 'bulls' ||
                  task.design_id === 7 ||
                  task.design_id === 10 ||
                  task.design_id === 11) && (
                  <Text fontSize={14} fontWeight={700}>
                    Future EXTRA Bonus
                  </Text>
                )}

                {task.design_id === 4 && (
                  <MeetSafeConnectContainer>
                    <Text fontSize={11} fontWeight={400}>
                      To complete the task install the app
                    </Text>
                  </MeetSafeConnectContainer>
                )}

                {(task.design_id === 4 ||
                  task.design_id === 5 ||
                  task.design_id === 8) && (
                  <MeetSafeConnectContainer>
                    <Text fontSize={11} fontWeight={400}>
                      To complete the task, do the following steps:
                    </Text>

                    <StepsContainer>
                      <div>
                        <span>1</span>
                        <Text fontSize={12} fontWeight={400}>
                          Install the app
                        </Text>
                      </div>

                      {task.design_id !== 4 && (
                        <div>
                          <span>2</span>
                          <Text fontSize={12} fontWeight={400}>
                            Subscribe Trial
                          </Text>
                        </div>
                      )}

                      {(task.design_id === 4 || task.design_id === 8) && (
                        <div>
                          <span>{task.design_id === 4 ? 2 : 3}</span>
                          <Text fontSize={12} fontWeight={400}>
                            5-star app review
                          </Text>
                        </div>
                      )}
                    </StepsContainer>
                  </MeetSafeConnectContainer>
                )}

                {(task.design_id === 12 || task.design_id === 13) && (
                  <MeetSafeConnectContainer>
                    <Text fontSize={11} fontWeight={400}>
                      To complete the task, do the following steps
                    </Text>

                    <StepsContainer>
                      <div>
                        <span>1</span>
                        <Text fontSize={12} fontWeight={400}>
                          Install app
                        </Text>
                      </div>

                      <div>
                        <span>2</span>
                        <Text fontSize={12} fontWeight={400}>
                          {task.design_id === 12
                            ? 'Start Free Trial'
                            : 'Subscribe Free Trial'}
                        </Text>
                      </div>

                      <div>
                        <span>3</span>
                        <Text fontSize={12} fontWeight={400}>
                          {task.design_id === 12
                            ? 'Make 5-star app review'
                            : 'Leave 5-star app review'}
                        </Text>
                      </div>
                    </StepsContainer>
                  </MeetSafeConnectContainer>
                )}
              </TitleContainer>

              <Price
                isActive={isActiveRule}
                $isTonkeeperWalet={task.type === 'tonkeeper_wallet'}
                $isTonstakersIcon={
                  task.type === 'tonstakers_telegram' ||
                  task.type === 'tonstakers_twitter'
                }
                $isBullsIcon={task.type === 'bulls'}
                $isBoomIcon={task.design_id === 6}
                $isTrustWalletIcon={task.design_id === 7}
                $isTapMinerTask={task.design_id === 9}
                $isBullRunTask={task.design_id === 10}
              >
                <MmoproIconSmall />
                <span>{`+${formatNumberWithSpaces(task?.grant)}`}</span>
              </Price>

              {task.design_id === 9 && (
                <TapMinerContainer>
                  <div>
                    <JoinIcon />
                    <Text fontSize={13} fontWeight={500}>
                      Start the application
                    </Text>
                  </div>
                  <div>
                    <PlayIcon />
                    <Text fontSize={13} fontWeight={500}>
                      Play one game
                    </Text>
                  </div>
                  <div>
                    <WalletIcon />
                    <Text fontSize={13} fontWeight={500}>
                      Connect wallet in Profile
                    </Text>
                  </div>
                </TapMinerContainer>
              )}

              {!task.is_active && (
                <IsOverContainer>
                  <IsOverIcon />
                  <Text fontSize={12} fontWeight={600}>
                    Campaign is over
                  </Text>
                </IsOverContainer>
              )}
            </TextRow>
          </Col>

          <CheckmarkWrapper
            $isCompleted={isActiveRule}
            $isTrustWalletIcon={task.design_id === 7}
          >
            {isActive ? (
              <ResolvedCheckmark />
            ) : (
              <UnresolvedCheckmark
                fill={task.type === 'tonkeeper_wallet' ? '#fff' : '#8D9DAA'}
              />
            )}
          </CheckmarkWrapper>

          {task.design_id === 10 && (
            <RightAngle>
              <img src={bullRunCornerBg} alt="" />
            </RightAngle>
          )}
        </Row>
      </Wrapper>
    </>
  );
};

export default observer(TaskCard);
