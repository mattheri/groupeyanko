import { NextApiRequest, NextApiResponse } from 'next';
import QuoteDatabaseClient from 'services/Quotes/QuoteDatabaseClient';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    
    const quotes = await QuoteDatabaseClient.getUserQuotes(id as string);

    return res.send(JSON.stringify(quotes));
}