import { AppContextProvider } from '../components/Context/AppContext';
import { CartContextProvider } from '../components/Context/CartContext';
import '../styles/globals.scss';
import Head from 'next/head';
import { Navbar } from '../components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <CartContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </CartContextProvider>
    </AppContextProvider>
  );
}
