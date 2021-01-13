import { AppContextProvider } from '../components/Context/AppContext'
import '../styles/globals.scss';
import Head from 'next/head';
import { Navbar } from '../components/Navbar/Navbar';

export default function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Navbar />
      <Component {...pageProps} />
    </AppContextProvider>
  );
}
