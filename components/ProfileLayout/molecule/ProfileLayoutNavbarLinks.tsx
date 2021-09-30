import Button from 'components/Button/Button';
import { FC } from 'react';
import InnerProfileLayoutNavbarLink from '../atom/InnerProfileLayoutNavbarLink';

export interface ProfileLayoutNavbarLink {
	name:string;
	path:string;
}

interface Props {
	links:ProfileLayoutNavbarLink[];
	isActive:(path:string) => boolean;
}

const ProfileLayoutNavbarLinks:FC<Props> = ({ links, isActive }) => {
	return(
		<>
			{links.map(({ name, path }) => (
				<InnerProfileLayoutNavbarLink key={path}>
					<Button className="w-100" tertiary={isActive(path)} href={path}>
						{name}
					</Button>
				</InnerProfileLayoutNavbarLink>
			))}
		</>
	);
}

export default ProfileLayoutNavbarLinks;