import React from "react";
import Head from "next/head";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { GetStaticProps } from "next";
import { Category } from "../next-env";
import { Card } from "../components/Card/Card";
import { GET } from "../utils/utils";
import { useBreadcrumbs } from "../components/Hooks/useBreadcrumbs";

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
      <Container>
        <Row>
          {response
            .filter((category) => !category._links.up)
            .map((category, i) => (
              <Col
                key={category.id}
                xs={12}
                md={6}
                lg={4}
                className="d-flex justify-content-center p-0"
              >
                <Card
                  index={i}
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
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await GET(
    "products/categories?per_page=100&hide_empty=true"
  );

  return {
    props: {
      response: response.data,
    },
    revalidate: 1,
  };
};
