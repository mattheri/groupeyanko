import { FC, Children } from "react";
import { Carousel as BootstrapCarousel } from "react-bootstrap";
import { ChevronRightSquare } from "@styled-icons/boxicons-solid/ChevronRightSquare";
import { ChevronLeftSquare } from "@styled-icons/boxicons-solid/ChevronLeftSquare";
import theme from "theme/theme";

interface ControlledProps {
	activeIndex:number;
	onSelect:(selectedIndex:number, e:Record<string, unknown>) => void;
}
interface Props {
	interval?:number | null;
	controlled?:ControlledProps | null;
	fade?:boolean;
}

const Carousel:FC<Props> = ({
	interval = null,
	controlled = null,
	fade = false,
	children 
}) => {
	if (controlled) {
		const { activeIndex, onSelect } = controlled;

		return (
			<BootstrapCarousel
				activeIndex={activeIndex}
				onSelect={onSelect}
				prevIcon={<ChevronLeftSquare color={theme.colors.primary} size="4rem" />} 
				nextIcon={<ChevronRightSquare color={theme.colors.primary} size="4rem" />} 
				interval={interval}
				fade={fade}
			>
				{Children.map(children, (child, index) => (
						<BootstrapCarousel.Item key={index}>
							{child}
						</BootstrapCarousel.Item>
					))}
			</BootstrapCarousel>
		);
	}

	return (
		<BootstrapCarousel 
			prevIcon={<ChevronLeftSquare color={theme.colors.primary} size="4rem" />} 
			nextIcon={<ChevronRightSquare color={theme.colors.primary} size="4rem" />} 
			interval={interval}
			fade={fade}
		>
			{Children.map(children, (child, index) => (
					<BootstrapCarousel.Item key={index}>
						{child}
					</BootstrapCarousel.Item>
				))}
		</BootstrapCarousel>
	);
};

export default Carousel;