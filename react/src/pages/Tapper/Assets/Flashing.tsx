import React from 'react';

const Flashing = (props: any) => {
	return (
		<svg
			width="12"
			height="12"
			viewBox="0 0 12 12"
			xmlns="http://www.w3.org/2000/svg"
			fill={props?.fill || "#33CC66"}
		>
			<path d="M6.5 5H10L5.5 11.5V7H2L6.5 0.5V5Z" />
		</svg>
	);
};

export default Flashing;
