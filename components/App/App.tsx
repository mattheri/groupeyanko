import { Breadcrumbs } from 'components/Breadcrumbs/organism/Breadcrumbs';
import { Footer } from 'components/Footer/Footer';
import useRouterEvents from 'components/Hooks/useRouterEvents';
import Background from 'components/Background/Background';
import LoaderController, { LoaderRef } from 'components/Loader/organism/LoaderRef';
import Main from 'components/Main/Main';
import { Navbar } from 'components/Navbar/organism/Navbar';
import React, { FC, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

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
              <Container>
                <Breadcrumbs />
              </Container>
              <Component {...pageProps} />
            </Col>
          </Row>
        </Main>
      <Footer />
      <Background />
    </>
  );
}

export default App;
