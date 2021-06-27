import { AppContextProvider } from 'components/Context/AppContext';
import { CartContextProvider } from 'components/Context/CartContext';
import GlobalStyles from 'components/GlobalStyles/GlobalStyles';
import React, { FC } from 'react';

const Providers:FC = ({ children }) => {

  return (
    <AppContextProvider>
      <CartContextProvider>
        <GlobalStyles />
        {children}
      </CartContextProvider>
    </AppContextProvider>
  );
}

export default Providers;
