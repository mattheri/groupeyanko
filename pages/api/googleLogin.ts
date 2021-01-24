import type { NextApiRequest, NextApiResponse } from 'next';
import { GET } from '../../utils/utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { user, email } = req.body;
    const isPreviousCustomer = await (await GET(`customers?email=${email}`)).data;

    if (isPreviousCustomer.length) {
        res.send(JSON.stringify({
            email: user.email,
            name: user.displayName,
            picture: user.photoURL,
            isVerified: user.emailVerified,
            previousCustomer: isPreviousCustomer,
            id: await user.getIdToken()
        }));
    } else {
        res.send(JSON.stringify({
            email: user.email,
            name: user.displayName,
            picture: user.photoURL,
            isVerified: user.emailVerified,
            id: await user.getIdToken()
        }));
    }
}