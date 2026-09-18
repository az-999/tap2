import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import { Circle, Svg, ProgressWrap } from './styled';
import { DEFAULT_ENERGY } from '../../store';

type RadialProgressProps = {
	energy: number;
};

const RadialProgress = observer(({ energy }: RadialProgressProps) => {
	const progress = useMemo(() => Number((energy / DEFAULT_ENERGY * 100).toFixed(0)), [ energy ]);

	return (
		<ProgressWrap>
			<Svg viewBox="0 0 294 294">
				<Circle
					r="145"
					cx="150"
					cy="150"
					fill="transparent"
					strokeWidth="5"
					strokeDasharray={`${(progress / 100) * 911.5} 910.48`}
				/>
			</Svg>
		</ProgressWrap>
	);
});

export default RadialProgress;
