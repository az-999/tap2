import { useCallback } from 'react';

export const useGetLootboxUrl = (lootboxId: number) => {
  const getLootboxUrl = useCallback(() => {
    switch (lootboxId) {
      case 1:
        return `${window.location.origin}/img/DriveCore-Alpha.png`;
      case 2:
        return `${window.location.origin}/img/DriveCore-Beta.png`;
      case 3:
        return `${window.location.origin}/img/DriveCore-Gamma.png`;
      case 4:
        return `${window.location.origin}/img/DriveCore-Delta.png`;
      case 5:
        return `${window.location.origin}/img/DriveCore-Epsilon.png`;
      case 6:
        return `${window.location.origin}/img/DriveCore-Zeta.png`;
      case 7:
        return `${window.location.origin}/img/DriveCore-Eta.png`;
      case 8:
        return `${window.location.origin}/img/DriveCore-Theta.png`;
      case 9:
        return `${window.location.origin}/img/DriveCore-Iota.png`;
    }
  }, [lootboxId]);

  const getVideoLootboxUrl = useCallback(() => {
    switch (lootboxId) {
      case 1:
        return `${window.location.origin}/img/box_01_new.mp4`;
      case 2:
        return `${window.location.origin}/img/box_02_new.mp4`;
      case 3:
        return `${window.location.origin}/img/box_03_new.mp4`;
      case 4:
        return `${window.location.origin}/img/box_04_new.mp4`;
      case 5:
        return `${window.location.origin}/img/box_05_new.mp4`;
      case 6:
        return `${window.location.origin}/img/box_06_new.mp4`;
      case 7:
        return `${window.location.origin}/img/box_07_new.mp4`;
      case 8:
        return `${window.location.origin}/img/box_08_new.mp4`;
      case 9:
        return `${window.location.origin}/img/box_09_new.mp4`;
    }
  }, [lootboxId]);

  return { getLootboxUrl, getVideoLootboxUrl };
};
