import { NextApiRequest, NextApiResponse } from 'next';
import CategoryService from 'services/Categories/CategoryService';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    
    const category = await CategoryService.fetchCategory(id as string);

    return res.send(JSON.stringify(category));
}