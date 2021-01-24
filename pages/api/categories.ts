import type { NextApiRequest, NextApiResponse } from 'next';
import { Category } from '../../next-env';
import { GET } from '../../utils/utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let page = 1;
    while (page) {
        const response = await GET(`products/categories?per_page=100&hide_empty=true&page=${page}`);
        const allCategories: Category[] = [...response.data];
        

        if (parseInt(response.headers['x-wp-totalpages']) === page) {
            return res.send(JSON.stringify(allCategories));
        }
        
        if (parseInt(response.headers['x-wp-totalpages']) > 1) {
            page++;
        }
    }
}