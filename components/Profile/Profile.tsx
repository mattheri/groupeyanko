import { useAuth } from 'components/Hooks/useAuth';
import BasicInformations from 'components/Informations/BasicInformations';
import MyQuotes from 'components/MyQuotes/organism/MyQuotes';
import SideNavigation, { SidenavTab } from 'components/SideNavigation/organism/SideNavigation';
import UpdatePassword from 'components/UpdatePassword/organism/UpdatePassword';
import { FC } from 'react';
import { Container } from 'react-bootstrap';

const Profile:FC = () => {
  const { userInfo, userId, update } = useAuth();

  const tabs:SidenavTab[] = [
    {
      tab: 'Informations',
      key: 1
    },
    {
      tab: 'Changer le mot de passe',
      key: 2,
    },
    {
      tab: 'Mes soumissions',
      key: 3,
    }
  ]

  return (
    <Container className='py-5'>
      <SideNavigation tabs={tabs}>
        <BasicInformations />
        <UpdatePassword />
        <MyQuotes />
      </SideNavigation>
    </Container>
  );
};

export default Profile;
