import useRouterEvents, { RouterEventCallback } from 'components/Hooks/useRouterEvents';
import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled, { keyframes, css } from 'styled-components';

enum TransitionStage {
	In = 'in',
	Out = 'out',
	Current = 'current',
	FutureIn = 'futureIn',
}

const InKeyframes = keyframes`
	from {
		transform: translate3d(100%, 0, 0);
	}
	to {
		transform: translate3d(0, 0, 0);
	}
`;

const OutKeyframes = keyframes`
	from {
		transform: scale3d(1, 1, 1);
	}
	to {
		transform: scale3d(0.9, 0.9, 0.9);
	}
`;

const In = css`
	animation: ${InKeyframes} 0.5s cubic-bezier(0.87, 0, 0.13, 1) both;
`;

const Out = css`
	animation: ${OutKeyframes} 0.2s cubic-bezier(0.87, 0, 0.13, 1) both;
`;

const Container = styled.div<{stage:TransitionStage}>`
	${({ stage }) => stage === TransitionStage.Out && Out};
`;

const PreviousContainer = styled.div`
	${Out}
	z-index: -1;
`;

const FutureContainer = styled.div<{stage:TransitionStage}>`
	position: absolute;
	top: 0;
	right: 0;
	${In};
	background-color: white;
	height: 100vh;
	width: 100vw;
`;

const PageTransition:FC = ({ children }) => {
	const [displayChildren, setDisplayChildren] = useState({
		previous: null,
		current: children,
		future: null,
	});
	const [transitionStage, setTransitionStage] = useState(TransitionStage.Current);
	const router = useRouter();

	const transitionFutureIn = () => setTransitionStage(TransitionStage.FutureIn);
	const transitionIn = () => setTransitionStage(TransitionStage.In);
	const transitionOut:RouterEventCallback = (url) => {
		if (url === router.pathname) return;
		setTransitionStage(TransitionStage.Out);
	};
	const setPreviousAndFutureChildren = () => setDisplayChildren((state) => ({ previous: state.current, current: null, future: children }));

	const setCurrentChildren = () => setDisplayChildren((state) => ({ previous: null, current: state.future, future: null }));

	const cancelAnimation = () => {
		setTransitionStage(TransitionStage.Current);
		if (!displayChildren.previous) {
			return setDisplayChildren((state) => ({ ...state, current: state.current }));
		}

		return setDisplayChildren((state) => ({ ...state, current: state.previous }));
	};

	const initiateInTransitionOnAnimationEnd = () => {
		transitionFutureIn();
		setPreviousAndFutureChildren();
	}

	const swapFutureChildrenToCurrentOnAnimationEnd = () => {
		transitionIn();
		setCurrentChildren();
	}

	useEffect(() => {
		if (transitionStage === TransitionStage.Out) initiateInTransitionOnAnimationEnd();
	}, [transitionStage]);

	useRouterEvents('routeChangeComplete', transitionOut);
	useRouterEvents('routeChangeError', cancelAnimation);

	return (
		<>
		{displayChildren.previous && (
			<PreviousContainer>
				{displayChildren.previous}
			</PreviousContainer>
		)}
		{displayChildren.current && (
			<Container
				stage={transitionStage}
			>
				{displayChildren.current}
			</Container>
		)}
		{displayChildren.future && (
			<FutureContainer
				onAnimationEnd={swapFutureChildrenToCurrentOnAnimationEnd}
				stage={transitionStage}
			>
				{displayChildren.future}
			</FutureContainer>
		)}
		</>
	);
}

export default PageTransition;
