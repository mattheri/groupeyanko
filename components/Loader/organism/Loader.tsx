import { FC } from 'react';
import Background from '../atom/Background';
import LoadingAnimation from '../atom/LoadingAnimation';

const Loader:FC = () => {

  return (
    <Background>
      <LoadingAnimation />
    </Background>
  );
};

export default Loader;
