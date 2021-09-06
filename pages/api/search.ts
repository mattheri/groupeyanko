import type { NextApiRequest, NextApiResponse } from 'next';
import ProductService from 'services/Products/ProductService';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const results = await ProductService.searchProduct(req.body.query);

    res.send(JSON.stringify(results));
}