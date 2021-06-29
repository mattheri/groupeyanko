import type { NextApiRequest, NextApiResponse } from 'next';
import UserService from 'services/User/UserService';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await UserService.resetPassword(req.body.email);

    res.send(JSON.stringify(response));
}