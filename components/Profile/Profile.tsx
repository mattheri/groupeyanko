import { useAuth } from 'components/Hooks/useAuth';
import Informations from 'components/Informations/Informations';
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
        <Informations user={userInfo} userId={userId} onUpdate={update} />
        <UpdatePassword userEmail={userInfo.email} />
        <MyQuotes />
      </SideNavigation>
    </Container>
  );
};

export default Profile;
