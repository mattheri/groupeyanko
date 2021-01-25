import type { NextApiRequest, NextApiResponse } from 'next';
import { GET } from '../../utils/utils';
import { LocalLogin } from '../../utils/logins';
import { db } from '../../utils/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValidated = emailRegex.test(req.body.email) && req.body.email;

    if (emailValidated) {
        const {
            email,
            password,
            firstname,
            lastname,
            company,
            address,
            province,
            city,
            postalCode,
        } = req.body;

        const login = new LocalLogin();
        const userDB = db().collection('users');

        try {
            const user = (await login.signup(email, password)).user;
            await login.sendEmailVerification();

            const userData = await userDB.add({
                address: address,
                city: city,
                company: company,
                email: user.email,
                firstname: firstname,
                lastname: lastname,
                picture: user.photoURL,
                postalCode: postalCode,
                province: province,
                wooId: 0
            });

            return res.send(JSON.stringify({
                email: user.email,
                name: user.displayName,
                picture: user.photoURL,
                isVerified: user.emailVerified,
                additionalUserInformation: (await userData.get()).data(),
            }));
        } catch (e) {
            return console.log({
                code: e.code,
                message: e.message
            });
        }
    }
}