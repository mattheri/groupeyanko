import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Skeleton from "react-loading-skeleton";
import { Card } from "../../components/Card/Card";
import { useBreadcrumbs } from "../../components/Hooks/useBreadcrumbs";
import { usePagination } from "../../components/Hooks/usePagination";
import { Category, Product } from "../../next-env";
import { GET } from "../../utils/utils";

type ProductCategoryProps = {
  response: Product[] | Category[];
  name: [string | null, string];
};

export default function ProductCategory({
  response,
  name,
}: ProductCategoryProps) {
  const router = useRouter();
  const { setNavigationState } = useBreadcrumbs();

  React.useEffect(() => {
    if (name[0] !== null) {
      setNavigationState([
        [
          ((name[0] as unknown) as Category).name,
          `/category/${((name[0] as unknown) as Category).id}`,
        ],
        [name[1], router.asPath],
      ]);
    } else {
      setNavigationState([name[1], router.asPath]);
    }
  }, [name]);

  if (router.isFallback) {
    const skeletonItems = [];
    for (let i = 0; i <= 9; i++) {
      skeletonItems.push(i);
    }

    return (
      <Container>
        <Row>
          {skeletonItems.map((skeleton, i) => (
            <Col
              key={i}
              xs={12}
              md={6}
              lg={4}
              className="d-flex justify-content-center p-0"
              style={{ height: "23rem" }}
            >
              <Skeleton />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }

  const isCategory = (obj: Category[] | Product[]): obj is Category[] => {
    return (obj as Category[]).some(
      (category) => category.parent !== undefined
    );
  };

  const {
    paginatedItems,
    pagination,
    paginationProps,
    Pagination,
  } = usePagination(response as any[], 9);
  if (isCategory(response)) {
    return (
      <>
        <Container>
          <Row>
            {(paginatedItems as Category[][])[pagination].map((category) => (
              <Col
                key={category.id}
                xs={12}
                md={6}
                lg={4}
                className="d-flex justify-content-center p-0"
              >
                <Card
                  url={`/category/${category.id}`}
                  description={
                    category.description ? category.description : category.name
                  }
                  src={category.image.src}
                />
              </Col>
            ))}
          </Row>
        </Container>
        <Pagination {...paginationProps} />
      </>
    );
  } else {
    return (
      <>
        <Container>
          <Row>
            {(paginatedItems as Product[][])[pagination].map((product, i) => (
              <Col
                key={product.id}
                xs={12}
                md={6}
                lg={4}
                className="d-flex flex-wrap justify-content-center p-0"
              >
                <Card
                  index={i}
                  url={`/product/${product.id}`}
                  description={product.name}
                  src={
                    product.images.length > 0
                      ? product.images[0].src
                      : "/uploads/images/placeholder.png"
                  }
                  addToCart
                  product={product}
                />
              </Col>
            ))}
          </Row>
        </Container>
        <Pagination {...paginationProps} />
      </>
    );
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  let page = 1;
  const allResponses: Category[] = [];
  while (page) {
    const response = await GET(
      `products/categories?per_page=100&hide_empty=true&page=${page}`
    );
    allResponses.concat(response.data);

    if (parseInt(response.headers["x-wp-totalpages"]) === page) {
      page = 0;
      break;
    }

    if (parseInt(response.headers["x-wp-totalpages"]) > 1) {
      page++;
    }
  }

  const paths = allResponses.map((category) => ({
    params: { id: `${category.id}` },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category: Category = await (
    await GET(`products/categories/${params.id}`)
  ).data;
  let parentCategory = category.parent
    ? await (await GET(`products/categories/${category.parent}`)).data
    : null;
  let response = await (
    await GET(
      `products/categories?parent=${params.id}&per_page=100&hide_empty=true`
    )
  ).data;

  if (!response || !response.length) {
    response = await (await GET(`products?category=${params.id}&per_page=100`))
      .data;
  }

  return {
    props: {
      response,
      name: [parentCategory, category.name],
    },
    revalidate: 1,
  };
};
