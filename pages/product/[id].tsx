import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { GetStaticPaths, GetStaticProps } from "next";
import { GET } from "../../utils/utils";
import { Product } from "../../next-env";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import { AddToCart } from "../../components/AddToCart/AddToCart";
import { ProductSection } from "../../components/Product/ProductSection";
import { useBreadcrumbs } from "../../components/Hooks/useBreadcrumbs";

type ProductPageProps = {
  product: Product;
};

export default function ProductPage({ product }: ProductPageProps) {
  const router = useRouter();
  const { setNavigationState } = useBreadcrumbs();

  React.useEffect(() => {
    setNavigationState([product.name, router.asPath]);
  }, []);

  if (router.isFallback) {
    return (
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <Skeleton height={150} />
          </Col>
          <Col xs={12} md={4}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Col>
        </Row>
        <Row>
          <Col>
            <Skeleton />
            <Skeleton />
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <ProductSection product={product} />
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  let page = 1;
  const allProducts: Product[] = [];

  while (page) {
    const response = await GET(`products?per_page=100&page=${page}`);
    allProducts.concat(response.data);

    if (parseInt(response.headers["x-wp-totalpages"]) === page) {
      page = 0;
      break;
    }

    if (parseInt(response.headers["x-wp-totalpages"]) > 1) {
      page++;
    }
  }

  const paths = allProducts.map((product) => ({
    params: { id: `${product.id}` },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product: Product = await (await GET(`products/${params.id}`)).data;

  return {
    props: {
      product,
    },
    revalidate: 1,
  };
};
