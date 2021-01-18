import { AppContextProvider } from '../components/Context/AppContext';
import { CartContextProvider } from '../components/Context/CartContext';
import '../styles/globals.scss';
import Head from 'next/head';
import { Navbar } from '../components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/popup.scss';
import Container from 'react-bootstrap/Container';
import { Footer } from '../components/Footer/Footer';
import { useRouter, Router } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AppContextProvider>
      <CartContextProvider>
        <Navbar />
        <Container fluid className='py-5 px-0' as='main'>
          <Component {...pageProps} />
        </Container>
        <Footer />
      </CartContextProvider>
    </AppContextProvider>
  );
}
