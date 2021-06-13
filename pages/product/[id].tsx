import React from "react";
import Container from "react-bootstrap/Container";
import { Product } from "next-env";
import { useRouter } from "next/router";
import { ProductSection } from "components/Product/ProductSection";
import { useBreadcrumbs } from "components/Hooks/useBreadcrumbs";
import StaticProductsProps from "services/Products/StaticProductsProps";

type ProductPageProps = {
  product: Product;
};

export const getStaticPaths = StaticProductsProps.paths.bind(StaticProductsProps);

export const getStaticProps = StaticProductsProps.props.bind(StaticProductsProps);

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
