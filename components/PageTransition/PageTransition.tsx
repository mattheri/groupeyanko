import useRouterEvents, { RouterEventCallback } from 'components/Hooks/useRouterEvents';
import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled, { keyframes, css } from 'styled-components';

enum TransitionStage {
	In = 'in',
	Out = 'out',
	Current = 'current',
}

const transitionVeilKeyframes = (transitionStage:TransitionStage) => keyframes`
	from {
		opacity: ${transitionStage === TransitionStage.Out ? 0 : 1};
	} to {
		opacity: ${transitionStage === TransitionStage.Out ? 1 : 0};
	}
`;

const Veil = styled.div<{ transitionStage:TransitionStage }>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: white;
	z-index: 999999;
	animation: ${({ transitionStage }) => transitionVeilKeyframes(transitionStage)} 0.5s ease-in-out forwards;
`;

const PageTransition:FC = ({ children }) => {
	const [displayChildren, setDisplayChildren] = useState({
		in: null,
		out: null,
		current: children,
	})
	const [transitionStage, setTransitionStage] = useState(TransitionStage.Current);
	const router = useRouter();

	const onRouteChange:RouterEventCallback = (url) => {
		const isCurrentPage = url === router.pathname;

		if (isCurrentPage) return;

		const nextTransitionStage = transitionStage === TransitionStage.Current ? TransitionStage.Out : TransitionStage.In;
		setTransitionStage(nextTransitionStage);
	}

	useRouterEvents('routeChangeComplete', onRouteChange);
	useRouterEvents('routeChangeError', onRouteChange);

	const onVeilAnimationEnd = () => {
		if (transitionStage === TransitionStage.In) return setTransitionStage(TransitionStage.Current);

		setTransitionStage(TransitionStage.In);
	}

	useEffect(
		() => {
			if (transitionStage === TransitionStage.Current) return;

			transitionStage === TransitionStage.Out && setDisplayChildren((state) => ({ 
				in: children,
				out: state.current,
				current: children,
			}));
		},
		[transitionStage]
	)

	const isTransitioning = transitionStage !== TransitionStage.Current;

	return (
		<>
			{isTransitioning && <Veil transitionStage={transitionStage} onAnimationEnd={onVeilAnimationEnd} />}
			{displayChildren[transitionStage]}
		</>
	)
}

export default PageTransition;
