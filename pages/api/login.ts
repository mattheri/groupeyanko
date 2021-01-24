import type { NextApiRequest, NextApiResponse } from 'next';
import { GET } from '../../utils/utils';
import { LocalLogin } from '../../utils/logins';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValidated = emailRegex.test(req.body.email) && req.body.email;

    if (emailValidated) {
        const { email, password } = req.body;
        const isPreviousCustomer = await (await GET(`customers?email=${req.body.email}`)).data;
        const login = new LocalLogin();
    
        if (isPreviousCustomer.length) {
            const user = (await login.signup(email, password)).user;
            res.send(JSON.stringify({
                email: user.email,
                name: user.displayName,
                picture: user.photoURL,
                isVerified: user.emailVerified,
                previousCustomer: isPreviousCustomer,
                id: await user.getIdToken()
            }));
        } else {
            const user = (await login.login(email, password)).user;
            res.send(JSON.stringify({
                email: user.email,
                name: user.displayName,
                picture: user.photoURL,
                isVerified: user.emailVerified,
                id: await user.getIdToken()
            }));
        }
    }
}