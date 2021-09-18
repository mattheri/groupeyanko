import React from "react";
import Container from "react-bootstrap/Container";
import { Product } from "types";
import ProductSection from "components/Product/organism/ProductSection";
import StaticProductsProps from "services/Products/StaticProductsProps";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

type ProductPageProps = {
  product:Product;
  relatedProducts:Product[];
};

export const getStaticPaths:GetStaticPaths = async () => {
  const paths = await StaticProductsProps.paths();

  return {
    paths,
    fallback: 'blocking'
  }
};

export const getStaticProps:GetStaticProps = async (context) => {
  const { product, relatedProducts } = await StaticProductsProps.props(context);

  return {
    props: {
      product,
      relatedProducts,
    },
    revalidate: 60,
  }
};

export default function ProductPage({ product, relatedProducts }: ProductPageProps) {

  return (
    <Container>
      <Head><title>Proaxion - {product.name}</title></Head>
      <ProductSection product={product} relatedProducts={relatedProducts} />
    </Container>
  );
}
