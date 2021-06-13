import { Breadcrumbs } from 'components/Breadcrumbs/organism/Breadcrumbs';
import { Filter } from 'components/Filter/organism/Filter';
import { Footer } from 'components/Footer/Footer';
import useRouterEvents from 'components/Hooks/useRouterEvents';
import LoaderController, { LoaderRef } from 'components/Loader/organism/LoaderRef';
import { Navbar } from 'components/Navbar/Navbar';
import { motion, AnimateSharedLayout } from 'framer-motion';
import React, { FC, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

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
        <Container
          fluid
          className="py-5"
          style={{ minHeight: "100vh" }}
          as={motion.main}
        >
          <Row as={motion.div}>
            <AnimateSharedLayout>
              <Filter />
              <Col style={{ overflow: "visible" }} as={motion.div}>
                <Container>
                  <Breadcrumbs />
                </Container>
                <Component {...pageProps} />
              </Col>
            </AnimateSharedLayout>
          </Row>
        </Container>
      <Footer />
    </>
  );
}

export default App;
