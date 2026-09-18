import rootStore from '@/store';
import { useMemo } from "react";
import { DEFAULT_ENERGY } from "./store";

export const useProgressColor = () => {
	const {
		tapperStore: {
			energy
		},
	} = rootStore;

	const progress = useMemo(() => (
		Number((energy / DEFAULT_ENERGY * 100).toFixed(0))
	), [ energy ]);

	// Ensure the value is within the range 0 - 100
	const clampedValue = Math.min(100, Math.max(0, progress));

	// Start color (rgba(98, 172, 239, 1))
	const startColor = {
		r: 98,
		g: 172,
		b: 239,
		a: 1
	};

	// End color (rgba(51, 240, 102, 1))
	const endColor = {
		r: 51,
		g: 240,
		b: 102,
		a: 1
	};

	// Calculate the interpolated color
	const r = Math.round(startColor.r + (endColor.r - startColor.r) * (clampedValue / 100));
	const g = Math.round(startColor.g + (endColor.g - startColor.g) * (clampedValue / 100));
	const b = Math.round(startColor.b + (endColor.b - startColor.b) * (clampedValue / 100));
	const a = startColor.a + (endColor.a - startColor.a) * (clampedValue / 100);

	return `rgba(${r}, ${g}, ${b}, ${a})`;
};

