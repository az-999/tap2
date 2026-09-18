import cabin from '@/pages/Ships/pages/ShipsCraftPage/components/CrossShipsModal/components/SelectShip/assets/cabin.png';
import engine from '@/pages/Ships/pages/ShipsCraftPage/components/CrossShipsModal/components/SelectShip/assets/engine.png';
import leftWing from '@/pages/Ships/pages/ShipsCraftPage/components/CrossShipsModal/components/SelectShip/assets/left-wing.png';
import nose from '@/pages/Ships/pages/ShipsCraftPage/components/CrossShipsModal/components/SelectShip/assets/nose.png';
import rightWing from '@/pages/Ships/pages/ShipsCraftPage/components/CrossShipsModal/components/SelectShip/assets/right-wing.png';
import tail from '@/pages/Ships/pages/ShipsCraftPage/components/CrossShipsModal/components/SelectShip/assets/tail.png';
import { PartShipKey } from '@/pages/Ships/types';

export const SHIP_PARTS: Record<PartShipKey, string> = {
  'Cabin Module': cabin,
  'Right Wing Module': rightWing,
  'Left Wing Module': leftWing,
  'Engine Unit Module': engine,
  'Tail Section Module': tail,
  'Ship Nose Module': nose,
};
