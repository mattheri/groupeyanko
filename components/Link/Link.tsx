import NextLink, { LinkProps } from 'next/link';
import { FC } from 'react';

const Link:FC<Omit<LinkProps, 'prefetch'>> = ({ children, ...rest }) => {
	
	return <NextLink prefetch={false} {...rest}>{children}</NextLink>
}

export default Link;
