import React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import { Category } from "next-env";
import { useBreadcrumbs } from "../components/Hooks/useBreadcrumbs";
import BigCardsController from "components/BigCard/organism/BigCardsController";
import StaticCategoryProps from "services/Categories/StaticCategoryProps";

type Props = {
  response: Category[];
};

export const getStaticProps: GetStaticProps = async () => {
  const parentCategories = await StaticCategoryProps.initialProps();

  return {
    props: {
      response: parentCategories,
    },
    revalidate: 1,
  };
};

export default function Home({ response }: Props) {
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
