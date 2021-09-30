import Footer from 'components/Footer/organism/Footer';
import useRouterEvents from 'components/Hooks/useRouterEvents';
import LoaderController, { LoaderRef } from 'components/Loader/organism/LoaderRef';
import Main from 'components/Main/Main';
import { Navbar } from 'components/Navbar/organism/Navbar';
import React, { FC, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import PageTransition from 'components/PageTransition/PageTransition';
import styled from 'styled-components';
import Head from 'next/head';

const App:FC = ({ children }) => {

  const loaderRef = useRef<LoaderRef>(null);
  
  useRouterEvents('routeChangeStart', loaderRef.current?.startLoading);
  useRouterEvents('routeChangeComplete', loaderRef.current?.stopLoading);
  useRouterEvents('routeChangeError', loaderRef.current?.stopLoading);

  return(
    <>
      <Head>
        <link
          rel="preload"
          href="/fonts/Baloo_2/Baloo2-Regular.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Mark Pro Bold/Mark Pro Bold.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <LoaderController ref={loaderRef} />
      <Navbar />
      <Main>
        <PageTransition>
          {children}
        </PageTransition>
      </Main>
    </>
  );
}

export default App;
