import { FC } from 'react';
import InnerProfileLayouteNavbar from '../atom/InnerProfileLayouteNavbar';
import ProfileLayoutNavbarLinks, { ProfileLayoutNavbarLink } from './ProfileLayoutNavbarLinks';

interface Props {
	links:ProfileLayoutNavbarLink[];
	isActive:(path:string) => boolean;
}

const ProfileLayoutNavbar:FC<Props> = ({ links, isActive }) => {
	return(
		<nav>
			<InnerProfileLayouteNavbar>
				<ProfileLayoutNavbarLinks links={links} isActive={isActive} />
			</InnerProfileLayouteNavbar>
		</nav>
	);
}

export default ProfileLayoutNavbar;