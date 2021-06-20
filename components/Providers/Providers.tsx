import { AppContextProvider } from 'components/Context/AppContext';
import { CartContextProvider } from 'components/Context/CartContext';
import { NavigationContextProvider } from 'components/Context/NavigationContext';
import GlobalStyles from 'components/GlobalStyles/GlobalStyles';
import React, { FC } from 'react';
import { CookiesProvider } from 'react-cookie';

const Providers:FC = ({ children }) => {

  return (
    <CookiesProvider>
      <AppContextProvider>
        <CartContextProvider>
          <NavigationContextProvider>
            <GlobalStyles />
            {children}
          </NavigationContextProvider>
        </CartContextProvider>
      </AppContextProvider>
    </CookiesProvider>
  );
}

export default Providers;
