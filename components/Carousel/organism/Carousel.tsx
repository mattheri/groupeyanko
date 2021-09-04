import { FC, Children } from "react";
import { Carousel as BootstrapCarousel } from "react-bootstrap";

const Carousel:FC = ({ children }) => {
	
	return (
		<BootstrapCarousel>
			{Children.map(children, (child, index) => (
					<BootstrapCarousel.Item key={index}>
						{child}
					</BootstrapCarousel.Item>
				))}
		</BootstrapCarousel>
	);
};

export default Carousel;