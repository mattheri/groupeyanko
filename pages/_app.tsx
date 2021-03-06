import "sanitize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/popup.scss";
import "../styles/modal.scss";
import "../styles/globals.scss";
import "nprogress/nprogress.css";
import { AppContextProvider } from "../components/Context/AppContext";
import { CartContextProvider } from "../components/Context/CartContext";
import { Navbar } from "../components/Navbar/Navbar";
import Container from "react-bootstrap/Container";
import { Footer } from "../components/Footer/Footer";
import { Router } from "next/router";
import NProgress from "nprogress";
import { Filter } from "../components/Filter/Filter";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { motion, AnimateSharedLayout } from "framer-motion";
import { CookiesProvider } from "react-cookie";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import React from "react";
import { NavigationContextProvider } from "../components/Context/NavigationContext";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <AppContextProvider>
        <CartContextProvider>
          <NavigationContextProvider>
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
                    <Col
                      xs={{ offset: 0, span: 12 }}
                      md={{ offset: 1, span: 10 }}
                      lg={{ offset: 3, span: 6 }}
                    >
                      <Breadcrumbs />
                    </Col>
                    <Component {...pageProps} />
                  </Col>
                </AnimateSharedLayout>
              </Row>
            </Container>
            <Footer />
          </NavigationContextProvider>
        </CartContextProvider>
      </AppContextProvider>
    </CookiesProvider>
  );
}
