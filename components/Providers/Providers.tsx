import { AppContextProvider } from 'components/Context/AppContext';
import { CartContextProvider } from 'components/Context/CartContext';
import { NavigationContextProvider } from 'components/Context/NavigationContext';
import React, { FC } from 'react';
import { CookiesProvider } from 'react-cookie';

const Providers:FC = ({ children }) => {

  return (
    <CookiesProvider>
      <AppContextProvider>
        <CartContextProvider>
          <NavigationContextProvider>
            {children}
          </NavigationContextProvider>
        </CartContextProvider>
      </AppContextProvider>
    </CookiesProvider>
  );
}

export default Providers;
