import React from 'react';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AppContext } from '../components/Context/AppContext';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { Category } from '../next-env';
import { Card } from '../components/Card/Card';

type Props = {
  response: Category[]
}

export default function Home({ response }: Props) {
  const [appState] = React.useContext(AppContext);
  console.log(response.filter(category => !category._links.up));

  const text = {
    fr: {
      title: 'Proaxion - Catalogue'
    },
    en: {
      title: 'Proaxion - Catalog'
    }
  }

  return (
    <>
      <Head>
        <title>{text[appState.locale].title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid as="main">
        <Container>
          <Row>
          {response.filter(category => !category._links.up).map(category =>
            <Col key={category.id} xs={12} md={6} lg={4}>
              <Card
              id={category.id}
              description={category.description ? category.description : category.name}
              alt={category.image.alt}
              src={category.image.src} />
            </Col>)}
          </Row>
        </Container>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const response = await axios.get(`${process.env.API_ENDPOINT}products/categories?per_page=100&hide_empty=true`, {
    auth: {
      username: process.env.API_KEY,
      password: process.env.API_SECRET
    }
  });
  return {
    props: {
        response: response.data
      }
    }
}
