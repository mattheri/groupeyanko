import React from 'react';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AppContext } from '../components/Context/AppContext';
import { GetStaticProps } from 'next';
import { Category } from '../next-env';
import { Card } from '../components/Card/Card';
import { GET } from '../utils/utils';

type Props = {
  response: Category[]
}

export default function Home({ response }: Props) {
  // const [appState] = React.useContext(AppContext);
  
  // const text = {
  //   fr: {
  //     title: 'Proaxion - Catalogue'
  //   },
  //   en: {
  //     title: 'Proaxion - Catalog'
  //   }
  // }

  return (
    <>
      <Head>
        <title>Proaxion - Catalogue</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid as="main">
        <Container>
          <Row>
          {response.filter(category => !category._links.up).map(category =>
            <Col key={category.id} xs={12} md={6} lg={4} className='d-flex justify-content-center p-0'>
              <Card
              url={`/category/${category.id}`}
              description={category.description ? category.description : category.name}
              src={category.image.src} />
            </Col>)}
          </Row>
        </Container>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const response = await GET('products/categories?per_page=100&hide_empty=true');
  return {
    props: {
        response: response.data
    },
    revalidate: 1
    }
}
