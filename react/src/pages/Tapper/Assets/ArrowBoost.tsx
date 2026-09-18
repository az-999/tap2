import React from 'react';

const ArrowBoost = (props: any) => {
	return (
		<svg
			width="10"
			height="11"
			viewBox="0 0 10 11"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<g clipPath="url(#clip0_2607_1785)">
				<path
					d="M4.99967 0.5L0.833008 4.78735L1.78233 5.76417L4.99967 2.45365L8.21702 5.76417L9.16634 4.78735L4.99967 0.5ZM4.99967 4.40248L0.833008 8.68985L1.78233 9.66667L4.99967 6.35612L8.21702 9.66667L9.16634 8.68985L4.99967 4.40248Z" />
			</g>
			<defs>
				<clipPath id="clip0_2607_1785">
					<rect width="10" height="10" fill="white" transform="translate(0 0.5)" />
				</clipPath>
			</defs>
		</svg>

	);
};

export default ArrowBoost;