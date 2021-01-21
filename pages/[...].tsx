import { GetStaticProps } from 'next';
import React from 'react';
import { Button } from '../components/Button/Button';
import { Category } from '../next-env';
import { GET } from '../utils/utils';

export default function Aside({ categories }) {
    console.log(categories);
    return (
        <aside>
            <Button onClick={() => console.log(categories)}>
                Yay
            </Button>
        </aside>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    let page = 1;
    const allResponses: Category[] = [];
    while (page) {
        const response: Category[] = await (await GET(`products/categories?per_page=100&hide_empty=true&page=${page}`)).data;
        allResponses.concat(response);

        if (response.length < 100) {
            page = 0;
        } else {
            page++;
        }
    }

    return {
        props: {
            categories: allResponses
        }
    }
}