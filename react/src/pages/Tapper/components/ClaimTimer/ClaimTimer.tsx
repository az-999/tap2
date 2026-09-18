import React, { useMemo } from 'react';
import Timer from "../Timer";
import rootStore from '@/store';
import { TimerContainer, AnimatedBorder, Content, Text } from './styled';
import { FARMING_PERIOD } from "../../store";

const ClaimTimer = () => {
	const {
		tapperStore: { time },
	} = rootStore;

	const percent = useMemo(() => (
		Number(((time / FARMING_PERIOD) * 100).toFixed(0))
	), [ time ]);

	return (
		<TimerContainer>
			<AnimatedBorder time={percent} />
			<Content>
				<Text>Claim in</Text>
				<Timer />
			</Content>
		</TimerContainer>
	);
};

export default ClaimTimer;