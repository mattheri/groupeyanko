import { FC } from 'react';
import styled from 'styled-components';

interface Props {
	className?:string;
}

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
`;

const AddToCartContainer:FC<Props> = ({ className, children }) => {

	return (
		<>
			<Container className={className}>
				{children}
			</Container>
		</>
	);
}

export default AddToCartContainer;
