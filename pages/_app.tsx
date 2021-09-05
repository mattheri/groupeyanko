import "sanitize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "styles/typography.css";
import React from "react";
import Providers from "components/Providers/Providers";
import App from "components/App/App";

export default function MyApp({ Component, pageProps }) {
  return (
    <Providers>
      <App Component={Component} pageProps={pageProps} />
    </Providers>
  );
}
