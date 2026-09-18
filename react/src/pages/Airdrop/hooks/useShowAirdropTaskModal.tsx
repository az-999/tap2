import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import AirdropTaskAlert, {
  AirdropTaskAlertType,
} from '@/pages/Airdrop/components/AirdropTaskAlert';
import { defaultSweetAlertOptions } from '@/pages/Airdrop/sweetAlertOptions';

interface UseShowSuccessfullyModalProps {
  title: string;
  type: AirdropTaskAlertType;
  reward?: number;
  pointsReward?: number;
}

export const useShowAirdropTaskModal = () => {
  const showModal = async (props: UseShowSuccessfullyModalProps) =>
    await withReactContent(Swal).fire({
      ...defaultSweetAlertOptions,
      width: 280,
      html: <AirdropTaskAlert {...props} />,
    });

  return { showModal };
};
