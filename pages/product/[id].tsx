import React from "react";
import Container from "react-bootstrap/Container";
import { Product } from "next-env";
import { useRouter } from "next/router";
import { ProductSection } from "components/Product/ProductSection";
import { useBreadcrumbs } from "components/Hooks/useBreadcrumbs";
import StaticProductsProps from "services/Products/StaticProductsProps";
import { GetStaticPaths, GetStaticProps } from "next";

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
  const router = useRouter();
  const { setNavigationState } = useBreadcrumbs();

  React.useEffect(() => {
    setNavigationState([product.name, router.asPath]);
  }, []);

  return (
    <Container>
      <ProductSection product={product} />
    </Container>
  );
}
