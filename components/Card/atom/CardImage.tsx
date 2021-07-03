import { FC } from 'react';
import Image from 'next/image';
interface Props {
	src:string;
	alt:string;
}

const CardImage:FC<Props> = ({ src, alt }) => {
	return (
		<Image src={src} alt={alt} layout='fill' objectFit='contain' />
	);
};

export default CardImage;
