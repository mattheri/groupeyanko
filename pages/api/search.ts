import type { NextApiRequest, NextApiResponse } from 'next';
import { GET } from '../../utils/utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await GET(`products?search=${req.body.query}`);

    res.send(JSON.stringify(response.data));
}