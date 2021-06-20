import React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import { Category } from "next-env";
import { useBreadcrumbs } from "../components/Hooks/useBreadcrumbs";
import AxiosService from "services/AxiosService";
import BigCardsController from "components/BigCard/organism/BigCardsController";

type Props = {
  response: Category[];
};

export default function Home({ response }: Props) {
  const { setNavigationState } = useBreadcrumbs();

  React.useEffect(() => setNavigationState(["Accueil", "/"]), []);

  return (
    <>
      <Head>
        <title>Proaxion - Catalogue</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BigCardsController categories={response} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await AxiosService.fetch({
    url: 'products/categories?per_page=100&hide_empty=true',
  })

  return {
    props: {
      response: response.data,
    },
    revalidate: 1,
  };
};
