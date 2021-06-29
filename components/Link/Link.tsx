import NextLink, { LinkProps } from 'next/link';
import { FC } from 'react';
import styled from 'styled-components';

const StyledLink = styled.a`
	color: inherit;
	text-decoration: none;
	cursor: pointer;
	width: 100%;
	height: 100%;

	&:hover {
		color: inherit;
		text-decoration: none;
	}
`;

const Link:FC<Omit<LinkProps, 'prefetch'>> = ({ children, ...rest }) => {
	
	return <NextLink prefetch={false} {...rest}><StyledLink>{children}</StyledLink></NextLink>
}

export default Link;
