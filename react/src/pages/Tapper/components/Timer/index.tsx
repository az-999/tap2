import { observer } from 'mobx-react-lite';

import Text from '@/components/UI/Text';

import { DateWrapper } from './styled';
import useFarmingStatus from '@/hooks/useFarmingStatus';
import rootStore from '@/store';

const Timer = () => {
	const {
		tapperStore: { time },
	} = rootStore;
	const { isInProgress } = useFarmingStatus();
	const FARMING_PERIOD = process.env.REACT_APP_FARMING_PERIOD
		? Number(process.env.REACT_APP_FARMING_PERIOD)
		: 0;

	// const timeDifference = FARMING_PERIOD - time;
	const timeDifference = Math.max(FARMING_PERIOD - time, 0); // Ensure non-negative time difference

	const hours = Math.floor((timeDifference % (3600 * 24)) / 3600)
		.toString()
		.padStart(2, '0');
	const minutes = Math.floor((timeDifference % 3600) / 60)
		.toString()
		.padStart(2, '0');
	const seconds = Math.floor(timeDifference % 60)
		.toString()
		.padStart(2, '0');

	if (!isInProgress) return null;

	return (
		<DateWrapper>
			{(hours !== '00') && (
				<Text fontSize={11} fontWeight={600} color={'#FFF'}>
					{hours === '-1' ? '0' : hours}h
				</Text>
			)}
			<Text fontSize={11} fontWeight={600} color={'#FFF'}>
				{minutes === '-1' ? '0' : minutes}m
			</Text>
			{(hours === '00' && (
				<Text fontSize={11} fontWeight={600} color={'#FFF'}>
					{seconds === '-1' ? '0' : seconds}s
				</Text>
			))}
		</DateWrapper>
	);
};

export default observer(Timer);
