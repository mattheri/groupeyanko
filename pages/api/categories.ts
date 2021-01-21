import type { NextApiRequest, NextApiResponse } from 'next';
import { GET } from '../../utils/utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await (await GET('products/categories?per_page=100&hide_empty=true')).data;

    res.send(JSON.stringify(response));
}