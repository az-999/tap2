import secondVoucher from '../Assets/1-1.png';
import thirdVoucher from '../Assets/1-2.png';
import forthVoucher from '../Assets/1-3.png';
import fifthVoucher from '../Assets/1-4.png';
import firstVoucher from '../Assets/1.png';

export const useGetVoucherImage = () => {
  const getNftImage = (id: number) => {
    switch (id) {
      case 1:
        return firstVoucher;
      case 2:
        return secondVoucher;
      case 3:
        return thirdVoucher;
      case 4:
        return forthVoucher;
      case 5:
        return fifthVoucher;
      default:
        return firstVoucher;
    }
  };

  return { getNftImage };
};
