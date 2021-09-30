import "sanitize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "styles/typography.css";
import React, { ReactNode } from "react";
import Providers from "components/Providers/Providers";
import App from "components/App/App";
import { NextPage } from "next";
import { AppProps } from "next/app";

type NextPageWithLayout = NextPage & {
  getLayout?:(page:ReactNode) => ReactNode;
}

type AppPropsWithLayout = AppProps & {
  Component:NextPageWithLayout;
}

export default function MyApp({ Component, pageProps }:AppPropsWithLayout) {
  const withLayout = Component.getLayout ?? ((page) => page)
  
  return (
    <Providers>
      <App>
        {withLayout(<Component {...pageProps} />)}
      </App>
    </Providers>
  );
}
