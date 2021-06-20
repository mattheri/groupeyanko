import useRouterEvents, { RouterEventCallback } from 'components/Hooks/useRouterEvents';
import { FC, useState } from 'react';
import styles from './pageTransition.module.scss';
import { useRouter } from 'next/router';
import styled, { keyframes, css } from 'styled-components';

enum TransitionStage {
	In = 'in',
	Out = 'out',
	Current = 'current',
}

const InKeyframes = keyframes`
	0% {
		transform: translate3d(-50%, 0, 0) scale3d(0.9, 0.9, 0.9);
		opacity: 0;
	}
	70% {
		transform: translate3d(0, 0, 0) scale3d(0.9, 0.9, 0.9);
		opacity: 1;
	}
	100% {
		transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
		opacity: 1;
	}
`;

const OutKeyframes = keyframes`
	0% {
	transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
	opacity: 1;
	}
	30% {
		transform: translate3d(0, 0, 0) scale3d(0.9, 0.9, 0.9);
		opacity: 1;
	}
	100% {
		transform: translate3d(50%, 0, 0) scale3d(0.9, 0.9, 0.9);
		opacity: 0;
	}
`;

const In = css`
	animation: ${InKeyframes} 0.5s cubic-bezier(0.87, 0, 0.13, 1) both;
`;

const Out = css`
	animation: ${OutKeyframes} 0.5s cubic-bezier(0.87, 0, 0.13, 1) both;
`;

const Container = styled.div<{stage:TransitionStage}>`
	${({ stage }) => {
		if (stage === TransitionStage.In) return In;
		
		return Out;
	}}
`;

const PageTransition:FC = ({ children }) => {
	const [displayChildren, setDisplayChildren] = useState({
		previous: null,
		current: children,
	});
	const [transitionStage, setTransitionStage] = useState(TransitionStage.Current);
	const router = useRouter();

	const transitionIn = () => setTransitionStage(TransitionStage.In);
	const transitionOut:RouterEventCallback = (url) => {
		if (url === router.pathname) return;
		setTransitionStage(TransitionStage.Out);
	};
	const changeChildren = () => setDisplayChildren((state) => ({ previous: state.current, current: children }));

	const cancelAnimation = () => {
		setTransitionStage(TransitionStage.Current);
		if (!displayChildren.previous) {
			return setDisplayChildren((state) => ({ ...state, current: state.current }));
		}

		return setDisplayChildren((state) => ({ ...state, current: state.previous }));
	};

	const initiateInTransitionOnAnimationEnd = () => {
		transitionIn();
		changeChildren();
	}

	useRouterEvents('routeChangeComplete', transitionOut);
	useRouterEvents('routeChangeError', cancelAnimation);

	return (
		<Container
			onAnimationEnd={initiateInTransitionOnAnimationEnd}
			stage={transitionStage}
		>
			{displayChildren.current}
		</Container>
	);
}

export default PageTransition;
