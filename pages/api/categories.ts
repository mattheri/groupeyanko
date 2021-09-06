import type { NextApiRequest, NextApiResponse } from 'next';
import CategoryService from 'services/Categories/CategoryService';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const categories = await CategoryService.fetchAllCategories();

    res.send(JSON.stringify(categories));
}