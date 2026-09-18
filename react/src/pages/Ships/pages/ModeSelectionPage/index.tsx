import React from 'react';
import { useNavigate } from 'react-router-dom';

import BackButton from '@/components/BackButton';

import ButtonWithBorder from '@/pages/Ships/components/ButtonWithBorder';
import ShieldIcon from '@/pages/Ships/components/ButtonWithBorder/assets/ShieldIcon';
import SkullIcon from '@/pages/Ships/components/ButtonWithBorder/assets/SkullIcon';
import defenseMarkImg from '@/pages/Ships/pages/ModeSelectionPage/assets/defenseMarkImg.png';
import pirateMarkImg from '@/pages/Ships/pages/ModeSelectionPage/assets/pirateMarkImg.png';
import {
  ModeItem,
  ModeSelectionPageContainer,
} from '@/pages/Ships/pages/ModeSelectionPage/styled';
import { AppPath, RootPath, ShipsPath } from '@/types/routes';

const ModeSelectionPage = () => {
  const navigate = useNavigate();

  return (
    <ModeSelectionPageContainer>
      <BackButton delta={-1} />

      <ModeItem $index={0}>
        <div>
          <img src={pirateMarkImg} alt="" />
          <ButtonWithBorder
            icon={<SkullIcon />}
            title="PIRATE MODE"
            color="red"
            onClick={() => navigate(`${AppPath.ships}/${ShipsPath.pirate}`)}
          />
        </div>
      </ModeItem>
      <ModeItem $index={1}>
        <div>
          <img src={defenseMarkImg} alt="" />
          <ButtonWithBorder
            icon={<ShieldIcon />}
            title="Defense MODE"
            color="green"
            onClick={() => navigate(`${AppPath.ships}/${ShipsPath.defense}`)}
          />
        </div>
      </ModeItem>
    </ModeSelectionPageContainer>
  );
};

export default ModeSelectionPage;
