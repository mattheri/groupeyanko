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
            <Container>
                <Skeleton />
            </Container>
        );
    }

    return (
        <Container>
            
        </Container>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    let page = 1;
    const allProducts: Product[] = [];

    while (page) {
        const products: Product[] = await (await GET(`products?per_page=10&page=${page}`)).data;
        allProducts.concat(products);

        if (products.length < 10) {
            page = 0;
        } else {
            page++;
        }
    }

    const paths = allProducts.map(product => ({ params: { id: `${product.id}` } }));

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