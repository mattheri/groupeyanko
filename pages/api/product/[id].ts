import { NextApiRequest, NextApiResponse } from 'next';
import ProductService from 'services/Products/ProductService';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    
    const product = await ProductService.fetchProduct(id as string);

    return res.send(JSON.stringify(product));
}