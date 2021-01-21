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
    response: Product[] | Category[]
}

export default function ProductCategory({ response }: ProductCategoryProps) {

    const router = useRouter();

    if (router.isFallback) {
        const skeletonItems = [];
        for (let i = 0; i <= 9; i++) {
            skeletonItems.push(i);
        }

        return (
            <Container>
                <Row>
                    {skeletonItems.map((skeleton, i) => (
                        <Col key={i} xs={12} md={6} lg={4} className='d-flex justify-content-center p-0' style={{ height: '23rem' }}>
                            <Skeleton />
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }

    const isCategory = (obj: Category[] | Product[]): obj is Category[] => {
        return (obj as Category[]).some(category => category.parent !== undefined);
    }

    if (isCategory(response)) {
        const { paginatedItems, pagination, paginationProps, Pagination } = usePagination(response, 9);
        return (
            <>
                <Container>
                    <Row>
                        {paginatedItems[pagination].map(category =>
                            <Col key={category.id} xs={12} md={6} lg={4} className='d-flex justify-content-center p-0'>
                                <Card
                                    url={`/category/${category.id}`}
                                    description={category.description ? category.description : category.name}
                                    src={category.image.src} />
                            </Col>)}
                    </Row>
                </Container>
                <Pagination {...paginationProps} />
            </>
        )
    } else {
        const { paginatedItems, pagination, paginationProps, Pagination } = usePagination(response, 9);
        return (
            <>
                <Container>
                    <Row>
                        {paginatedItems[pagination].map(product =>
                                    <Col key={product.id} xs={12} md={6} lg={4} className='d-flex justify-content-center p-0'>
                                        <Card
                                            url={`/product/${product.id}`}
                                            description={product.name}
                                                src={product.images.length > 0 ? product.images[0].src : '/uploads/images/placeholder.png'}
                                                addToCart product={product} />
                                            </Col>
                            )}
                    </Row>
                </Container>
                <Pagination {...paginationProps} />
            </>
        )
    }

}

export const getStaticPaths: GetStaticPaths = async () => {
    let page = 1;
    const allResponses: Category[] = [];
    while (page) {
        const response: Category[] = await (await GET(`products/categories?per_page=100&hide_empty=true&page=${page}`)).data;
        allResponses.concat(response);

        if (response.length < 10) {
            page = 0;
        } else {
            page++;
        }
    }

    const paths = allResponses.map(category => ({ params: { id: `${category.id}` } }));

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    let response: Product[] = await (await GET(`products/categories?parent=${params.id}&per_page=100`)).data;

    if (!response || !response.length) {
        response = await (await GET(`products?category=${params.id}&per_page=100`)).data;
    }

    return {
        props: {
            response
        },
        revalidate: 1
    }
}