import React, { useState, useEffect, useRef, useCallback, TouchEvent, useMemo } from 'react';
import { Container, Circle, EndCircle, Direction } from './styled';
import rootStore from '@/store';
import BoostBtnZipper from "../../Assets/BoostBtnZipper";

export type DirectionType = 'up' | 'down' | 'left' | 'right';

const directions: DirectionType[] = ['up', 'down', 'left', 'right'];

const FreezeCaptcha: React.FC = () => {
	const {
		tapperStore: {
			setCompletedFreeze
		}
	} = rootStore;

	const [direction, setDirection] = useState<DirectionType | null>(null);
	const [startPosition, setStartPosition] = useState<{ x: number; y: number } | null>(null);
	const [circlePosition, setCirclePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const [isCompleted, setIsCompleted] = useState<boolean>(false);
	const [threshold, setThreshold] = useState<number>(0);
	const [directionSize, setDirectionSize] = useState<number>(0); // Размер направляющих
	const [circleSize, setCircleSize] = useState<number>(0); // Размер кругов
	const containerRef = useRef<HTMLDivElement>(null);
	const circleRef = useRef<HTMLDivElement>(null);
	const circleRefEnd = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setCircleSize(Number((20 * (1 / 100) * threshold).toFixed(0)));
		setDirectionSize(Number((20 * (1 / 100) * threshold).toFixed(0)));
	}, [threshold]);

	const endCirclePosition = useMemo(() => ({
		up: { x: 0, y: -threshold },
		down: { x: 0, y: threshold },
		left: { x: -threshold, y: 0 },
		right: { x: threshold, y: 0 },
	}), [threshold]);

	useEffect(() => {
		const randomDirection: DirectionType = directions[Math.floor(Math.random() * directions.length)];
		setDirection(randomDirection);
	}, []);

	useEffect(() => {
		if (containerRef.current) {
			setThreshold(containerRef.current.offsetWidth);
		}
	}, []);

	const isOverlap = useCallback((x1: number, y1: number, x2: number, y2: number) => {
		const distanceX = Math.abs(x1 - x2);
		const distanceY = Math.abs(y1 - y2);
		return distanceX < circleSize && distanceY < circleSize;
	}, [circleSize]);

	const handleTouchStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
		console.log('handleTouchStart');
		if (!isCompleted) {
			setStartPosition({
				x: e.touches[0].clientX,
				y: e.touches[0].clientY,
			});

			setCircleSize(Number((22 * (1 / 100) * threshold).toFixed(0)));
		}
	}, [isCompleted, threshold]);

	const handleTouchMove = useCallback((e: TouchEvent<HTMLDivElement>) => {
		if (!startPosition || isCompleted) return;

		const deltaX = e.touches[0].clientX - startPosition.x;
		const deltaY = e.touches[0].clientY - startPosition.y;

		switch (direction) {
			case 'right':
				setCirclePosition({ x: Math.min(Math.max(deltaX, 0), threshold), y: 0 });
				break;
			case 'left':
				setCirclePosition({ x: Math.max(Math.min(deltaX, 0), -threshold), y: 0 });
				break;
			case 'down':
				setCirclePosition({ x: 0, y: Math.min(Math.max(deltaY, 0), threshold) });
				break;
			case 'up':
				setCirclePosition({ x: 0, y: Math.max(Math.min(deltaY, 0), -threshold) });
				break;
			default:
				break;
		}

		// Проверка на пересечение
		if (direction) {
			const endCircle = endCirclePosition[direction];
			const overlap = isOverlap(
				circlePosition.x + deltaX,
				circlePosition.y + deltaY,
				endCircle.x,
				endCircle.y
			);

			if (overlap) {
				setIsCompleted(true);
				setCompletedFreeze();
			}
		}
	}, [circlePosition.x, circlePosition.y, direction, endCirclePosition, isCompleted, isOverlap, setCompletedFreeze, startPosition, threshold]);

	const handleTouchEnd = useCallback((e: TouchEvent<HTMLDivElement>) => {
		e.stopPropagation();
		e.preventDefault();

		if (!isCompleted) {
			setCirclePosition({ x: 0, y: 0 });

			setCircleSize(Number((20 * (1 / 100) * threshold).toFixed(0)));
		}
	}, [isCompleted, threshold]);

	return (
		<Container ref={containerRef} size={directionSize}>
			<Circle
				x={circlePosition.x}
				y={circlePosition.y}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				size={circleSize}
				ref={circleRef}
			>
				<BoostBtnZipper />
			</Circle>
			{direction && (
				<>
					<EndCircle direction={direction} size={circleSize} ref={circleRefEnd} />
					<Direction
						direction={direction}
						size={directionSize}
					/>
				</>
			)}
		</Container>
	);
};

export default FreezeCaptcha;
