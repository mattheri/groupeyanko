import Container from 'components/Container/Container';
import { useRouter } from 'next/router';
import { FC } from 'react';
import ProfileLayoutContainer from '../molecule/ProfileLayoutContainer';
import ProfileLayoutNavbar from '../molecule/ProfileLayoutNavbar';
import { ProfileLayoutNavbarLink } from '../molecule/ProfileLayoutNavbarLinks';

const LINKS:ProfileLayoutNavbarLink[] = [
	{
		name: "Mes informations",
		path: "/me/informations"
	},
	{
		name: "Mes soumissions",
		path: "/me/myQuotes"
	},
	{
		name: "Changer de mot de passe",
		path: "/me/updatePassword"
	}
]

const ProfileLayout:FC = ({ children }) => {
	const router = useRouter();

	const isActive = (path:string) => router.pathname === path;

	return(
		<ProfileLayoutContainer>
			<ProfileLayoutNavbar links={LINKS} isActive={isActive} />
			{children}
		</ProfileLayoutContainer>
	);
}

export default ProfileLayout;