import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Skeleton from 'react-loading-skeleton';
import { Card } from '../../components/Card/Card';
import { usePagination } from '../../components/Hooks/usePagination';
import { Category, Product } from '../../next-env';
import { GET } from '../../utils/utils';

type ProductCategoryProps = {
    products: Product[]
}

export default function ProductCategory({ products }: ProductCategoryProps) {
    const { paginatedItems, pagination, paginationProps, Pagination } = usePagination(products, 9);

    const router = useRouter();

    if (router.isFallback) {
        const skeletonItems = [];
        for (let i = 0; i <= 9; i++) {
            skeletonItems.push(i);
        }

        return (
            <Container fluid>
                <Container>
                    <Row>
                        {skeletonItems.map(skeleton => (
                            <Col>
                                <Skeleton />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </Container>
        );
    }

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
        fallback: true
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