import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { GetStaticPaths, GetStaticProps } from 'next';
import { GET } from '../../utils/utils';
import { Product } from '../../next-env';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';

export default function ProductPage({ product }) {

    const router = useRouter();

    if (router.isFallback) {
        return (
            <Container fluid>
                <Container>
                    <Skeleton />
                </Container>
            </Container>
        );
    }

    return (
        <Container fluid>
            <Container>
                
            </Container>
        </Container>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const products: Product[] = await (await GET('products')).data;

    const paths = products.map(product => ({ params: { id: `${product.id}` } }));

    return {
        paths,
        fallback: true
    }

}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const product: Product = await (await GET(`products/${params.id}`)).data;

    return {
        props: {
            product
        },
        revalidate: 1
    }
}