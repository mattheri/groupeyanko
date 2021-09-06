import { NextApiRequest, NextApiResponse } from 'next';
import QuoteDatabaseClient from 'services/Quotes/QuoteDatabaseClient';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, quote } = req.body;
    const quotes = QuoteDatabaseClient.addQuoteToQuotes(quote, id);

    return res.send(JSON.stringify(quotes));
}