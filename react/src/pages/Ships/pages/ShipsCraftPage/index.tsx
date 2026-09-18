import { useTonAddress } from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SecureLS from 'secure-ls';

import BackButton from '@/components/BackButton';
import Modal from '@/components/Modal';
import Text from '@/components/UI/Text';
import UnavailablePage from '@/components/UnavailablePage';

import CraftingVideoLoaderTooltip from '@/pages/Ships/pages/ShipsCraftPage/components/CraftingVideoLoaderTooltip';
import CrossShipsModal from '@/pages/Ships/pages/ShipsCraftPage/components/CrossShipsModal';
import SelectPartsShipTooltip from '@/pages/Ships/pages/ShipsCraftPage/components/CrossShipsModal/components/SelectPartsShipTooltip';
import SelectShipsTooltip from '@/pages/Ships/pages/ShipsCraftPage/components/CrossShipsModal/components/SelectShipsTooltip';
import ErrorCraftModal from '@/pages/Ships/pages/ShipsCraftPage/components/ErrorCraftModal';
import ShipsCraft from '@/pages/Ships/pages/ShipsCraftPage/components/ShipsCraft';
import SuccessCraftModal from '@/pages/Ships/pages/ShipsCraftPage/components/SuccessCraftModal';
import {
  ShipsPageWrapper,
  TitleWrapper,
} from '@/pages/Ships/pages/ShipsCraftPage/styled';
import rootStore from '@/store';
import { AppPath, NftsPath, ShipsPath } from '@/types/routes';

const ls = new SecureLS();

const ShipsCraftPage = () => {
  const navigate = useNavigate();

  const {
    userStore: {
      userInfo: {
        nft: { shipkraft },
      },
    },
    shipsStore: {
      setIsCraftShipSuccess,
      isCraftShipSuccess,
      isCraftShipError,
      setIsCraftShipError,
      fetchAllShipPartsExistingNfts,
      isCrossShipsModalActive,
      setIsCrossShipsModalActive,
    },
  } = rootStore;

  const wallet = useTonAddress();

  const onSuccessButtonClick = () => {
    fetchAllShipPartsExistingNfts({ account_id: wallet });
    setIsCraftShipSuccess(false);
    ls.remove('craftShipLevelSecure');

    navigate(`${AppPath.nfts}/${NftsPath.myNfts}`);
  };

  return (
    <ShipsPageWrapper>
      {shipkraft < 1 ? (
        <UnavailablePage type="game" />
      ) : (
        <>
          <BackButton navigatePath={`${AppPath.ships}/${ShipsPath.banners}`} />

          <TitleWrapper>
            <Text fontSize={22} fontWeight={700}>
              Assemble Your Ship
            </Text>

            <div>
              <Text fontSize={12} fontWeight={400}>
                Deploy your spaceship in the game and earn rewards
              </Text>
              <Text fontSize={12} fontWeight={400}>
                in the form of NFTs, tokens, and other prizes
              </Text>
            </div>
          </TitleWrapper>

          <>
            <ShipsCraft />

            <CraftingVideoLoaderTooltip />
            <Modal
              isActive={isCraftShipSuccess}
              onClose={() => null}
              withoutCloseButton={true}
              withoutHeader={true}
            >
              <SuccessCraftModal onClose={onSuccessButtonClick} />
            </Modal>
            <Modal
              isActive={isCraftShipError}
              onClose={() => setIsCraftShipError(false)}
            >
              <ErrorCraftModal />
            </Modal>
            <Modal
              isActive={isCrossShipsModalActive}
              onClose={() => setIsCrossShipsModalActive(false)}
              color="#2A2E30"
            >
              <CrossShipsModal />
            </Modal>

            <SelectShipsTooltip />
            <SelectPartsShipTooltip />
          </>
        </>
      )}
    </ShipsPageWrapper>
  );
};

export default observer(ShipsCraftPage);
