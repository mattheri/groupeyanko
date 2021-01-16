import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Card } from '../../components/Card/Card';
import { usePagination } from '../../components/Hooks/usePagination';
import { Category, Product } from '../../next-env';
import { GET } from '../../utils/utils';

type ProductCategoryProps = {
    products: Product[]
}

export default function ProductCategory({ products }: ProductCategoryProps) {
    const { paginatedItems, pagination, paginationProps, Pagination } = usePagination(products, 9);
    console.log(paginatedItems);

    return (
        <Container fluid as="main">
            <Container>
                <Row>
                {paginatedItems[pagination].map(product =>
                    <Col key={product.id} xs={12} md={6} lg={4}>
                    <Card
                        url={`/product/${product.id}`}
                        description={product.name}
                        src={product.images.length > 0 ? product.images[0].src : '/uploads/images/placeholder.png'} />
                    </Col>)}
                </Row>
            </Container>
            <Pagination {...paginationProps} />
        </Container>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const response: Category[] = await (await GET(`products/categories?per_page=100&hide_empty=true`)).data;

    const paths = response.map(category => ({ params: { id: `${category.id}` } }));

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const response: Product[] = await (await GET(`products?category=${params.id}`)).data;

    return {
        props: {
            products: response
        },
        revalidate: 1
    }
}