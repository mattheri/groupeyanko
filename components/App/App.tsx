import { Footer } from 'components/Footer/Footer';
import useRouterEvents from 'components/Hooks/useRouterEvents';
import LoaderController, { LoaderRef } from 'components/Loader/organism/LoaderRef';
import Main from 'components/Main/Main';
import { Navbar } from 'components/Navbar/organism/Navbar';
import React, { FC, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PageTransition from 'components/PageTransition/PageTransition';
import styled from 'styled-components';

const MainCol = styled(Col)`
  position: relative;
`;

interface Props {
  Component:any;
  pageProps:any;
}

const App:FC<Props> = ({ Component, pageProps }) => {
  const loaderRef = useRef<LoaderRef>(null);
  
  useRouterEvents('routeChangeStart', loaderRef.current?.startLoading);
  useRouterEvents('routeChangeComplete', loaderRef.current?.stopLoading);
  useRouterEvents('routeChangeError', loaderRef.current?.stopLoading);

  return(
    <>
      <LoaderController ref={loaderRef} />
        <Navbar />
          <Main>
            <Row>
              <Col>
                <MainCol className='p-0'>
                  <PageTransition>
                    <Component {...pageProps} />
                  </PageTransition>
                </MainCol>
              </Col>
            </Row>
          </Main>
      <Footer />
    </>
  );
}

export default App;
