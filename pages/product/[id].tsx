import React from "react";
import Container from "react-bootstrap/Container";
import { Product } from "types";
import { ProductSection } from "components/Product/ProductSection";
import StaticProductsProps from "services/Products/StaticProductsProps";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

type ProductPageProps = {
  product: Product;
};

export const getStaticPaths:GetStaticPaths = async () => {
  const paths = await StaticProductsProps.paths();

  return {
    paths,
    fallback: 'blocking'
  }
};

export const getStaticProps:GetStaticProps = async (context) => {
  const product = await StaticProductsProps.props(context);

  return {
    props: {
      product
    },
    revalidate: 1,
  }
};

export default function ProductPage({ product }: ProductPageProps) {

  return (
    <Container>
      <Head><title>Proaxion - {product.name}</title></Head>
      <ProductSection product={product} />
    </Container>
  );
}
