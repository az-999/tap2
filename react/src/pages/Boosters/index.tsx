import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BackButton from '@/components/BackButton';
import Modal from '@/components/Modal';
import Button from '@/components/UI/Button';

import { useGetMode } from '@/hooks/useGetMode';
import nprogressInstance from '@/nprogressInstance';
import Zipper from '@/pages/Boosters/assets/Zipper';
import X2 from '@/pages/Boosters/assets/x2.png';
import X3 from '@/pages/Boosters/assets/x3.png';
import X5 from '@/pages/Boosters/assets/x5.png';
import BoosterCard from '@/pages/Boosters/components/BoosterCard';
import ModalContent from '@/pages/Boosters/components/ModalContent/ModalContent';
import {
  BoostersList,
  StyledBoosters,
  SubTitle,
  Title,
} from '@/pages/Boosters/styled';
import rootStore from '@/store';
import { AppPath, RootPath } from '@/types/routes';
import Utils from '@/utils';

export interface Booster {
  id: number;
  points: 'x2' | 'x3' | 'x5';
  message: string;
  bonus: string;
  imgSrc: string;
  price: number;
  totalDuration: number;
}

type ModalContentType = 'buy' | 'success' | 'error' | 'noMoney' | 'serverError';
export type ModalContentState = {
  type: ModalContentType;
  points: 'x2' | 'x3' | 'x5';
};

const boosterData: Booster[] = [
  {
    id: 1,
    points: 'x2',
    message: 'Increase Points X2 per Day',
    bonus: '+4 000 000 Point',
    imgSrc: X2,
    price: 4_000_000,
    totalDuration: 60 * 60 * 24, // 1 day
  },
  {
    id: 2,
    points: 'x3',
    message: 'Increase Points X3 per Week',
    bonus: '+30 000 000 Point',
    imgSrc: X3,
    price: 30_000_000,
    totalDuration: 60 * 60 * 24 * 7, // 1 week
  },
  {
    id: 3,
    points: 'x5',
    message: 'Increase Points X5 per Month',
    bonus: '+200 000 000 Point',
    imgSrc: X5,
    price: 200_000_000,
    totalDuration: 60 * 60 * 24 * 30, // 1 month
  },
];

const Boosters = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalContentState | null>(null);

  const {
    userStore: {
      userInfo,
      addErrorResponse,
      addRewardTooltip,
      addRewardWithoutBalanceTooltip,
    },
    boostersStore: { buyBoost, deleteBoost },
    isLoading,
    addErrorTooltip,
  } = rootStore;
  const { isProdMode, isStageMode } = useGetMode();

  const handleBuyBooster = (points: 'x2' | 'x3' | 'x5') => {
    nprogressInstance.start();

    buyBoost(points)
      .then(() => {
        setIsModalOpen(true);
        setModalType({
          type: 'success',
          points,
        });
      })
      .catch((err) => {
        addErrorResponse(err);

        if (Utils.getErrorMessage(err)) {
          addErrorTooltip(Utils.getErrorMessage(err));
        }

        setModalType({
          type: 'serverError',
          points,
        });
      });

    nprogressInstance.done();
  };

  const showSwal = (selectedBoost: Booster) => {
    // сначала проверка на наличие активного BOOST
    if (
      userInfo.info?.boost &&
      Number(userInfo.info.boost.slice(-1)) >=
        Number(selectedBoost.points.slice(-1))
    ) {
      setIsModalOpen(true);
      setModalType({
        type: 'error',
        points: selectedBoost.points,
      });

      return;
    }

    // потом проверка наличия денег на выбранный BOOST
    if (Number(userInfo.balance) < selectedBoost.price) {
      setIsModalOpen(true);
      setModalType({
        type: 'noMoney',
        points: selectedBoost.points,
      });

      return;
    }

    // если всё ок покупаем BOOST
    setIsModalOpen(true);
    setModalType({
      type: 'buy',
      points: selectedBoost.points,
    });
  };

  return (
    <StyledBoosters>
      <BackButton navigatePath={RootPath.base} />

      <Title
        onClick={isProdMode || isStageMode ? () => null : () => deleteBoost()}
      >
        <Zipper />
        Boosters
      </Title>
      <SubTitle>Boosters for your profit</SubTitle>

      <BoostersList>
        {boosterData.map((booster) => (
          <BoosterCard
            key={booster.id}
            boosterData={booster}
            onClick={() => showSwal(booster)}
            isActive={booster.points === userInfo.info?.boost}
          />
        ))}
      </BoostersList>

      {modalType && (
        <Modal isActive={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalContent
            modalData={modalType}
            onClick={handleBuyBooster}
            disabled={isLoading}
          />
        </Modal>
      )}

      {/** todo поставил пока сюда кнопку перехода на страницу Bump Ticket */}
      {!isProdMode && !isStageMode && (
        <div
          style={{
            width: '100%',
            marginTop: 30,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <Button
            onClick={() =>
              addRewardTooltip({
                reward: 567023,
                prevBalance: userInfo.balance - 567023,
              })
            }
          >
            Test reward
          </Button>

          <Button
            onClick={() =>
              addRewardWithoutBalanceTooltip({
                reward: 567023,
              })
            }
          >
            Test reward without balance
          </Button>
        </div>
      )}
    </StyledBoosters>
  );
};

export default observer(Boosters);
