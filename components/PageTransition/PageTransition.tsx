import useRouterEvents, { RouterEventCallback } from 'components/Hooks/useRouterEvents';
import { FC, useState } from 'react';
import styles from './pageTransition.module.scss';
import { useRouter } from 'next/router';

enum TransitionStage {
	In = 'in',
	Out = 'out',
	Current = 'current',
}

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
		<div
			onAnimationEnd={initiateInTransitionOnAnimationEnd}
			className={styles[transitionStage]}
		>
			{displayChildren.current}
		</div>
	);
}

export default PageTransition;
