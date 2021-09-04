import { FC } from "react";
import CategoriesGrid from "components/CategoriesGrid/organism/CategoriesGrid";
import ProductsGrid from "components/ProductsGrid/organism/ProductsGrid";
import { Category, Product } from "types";
import StaticCategoryProps from "services/Categories/StaticCategoryProps";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

interface Props {
  response: Product[] | Category[];
  name:string;
};

export const getStaticPaths:GetStaticPaths = async () => {
  const paths = await StaticCategoryProps.paths();

  return {
    paths,
    fallback: 'blocking'
  }
};

export const getStaticProps:GetStaticProps = async (context) => {
  const { response, name } = await StaticCategoryProps.props(context);

  return {
    props: {
      response,
      name,
    },
    revalidate: 1,
  }
};

const ProductCategory:FC<Props> = ({ response, name }) => {
  const isCategory = (obj: Category[] | Product[]): obj is Category[] => {
    return (obj as Category[]).some(
      (category) => category.parent !== undefined
    );
  };
  
  if (isCategory(response)) {
    return (
      <>
        <Head key={name}><title>Proaxion - {name}</title></Head>
        <CategoriesGrid response={response} />
      </>
    );
  }

  return (
    <>
      <Head key={name}><title>Proaxion - {name}</title></Head>
      <ProductsGrid response={response} />
    </>
  );
}

export default ProductCategory;
