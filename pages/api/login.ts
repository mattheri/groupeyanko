import type { NextApiRequest, NextApiResponse } from 'next';
import { GET } from '../../utils/utils';
import { LocalLogin } from '../../utils/logins';
import { db } from '../../utils/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValidated = emailRegex.test(req.body.email) && req.body.email;

    if (emailValidated) {
        const { email, password } = req.body;
        const isPreviousCustomer = await (await GET(`customers?email=${req.body.email}`)).data;
        const login = new LocalLogin();
        const userDB = db().collection('users');
    
        if (isPreviousCustomer.length) {
            const user = (await login.signup(email, password)).user;

            try {
                const {
                    id,
                    first_name,
                    last_name,
                    shipping: {
                        company,
                        address_1,
                        address_2,
                        city,
                        postCode,
                        state
                    },
                    avatar_url
                } = isPreviousCustomer[0];

                const userData = await userDB.add({
                    address: address_1 + ' ' + address_2,
                    city: city,
                    company: company,
                    email: user.email,
                    firstname: first_name,
                    lastname: last_name,
                    picture: avatar_url,
                    postalCode: postCode,
                    province: state,
                    wooId: id
                });

                res.send(JSON.stringify({
                    email: user.email,
                    name: user.displayName,
                    picture: user.photoURL,
                    isVerified: user.emailVerified,
                    additionalUserInformation: (await userData.get()).data()
                }));
            } catch (e) {
                console.log({
                    code: e.code,
                    message: e.message
                });
            }
        } else {
            const user = (await login.login(email, password)).user;
            const additionalUserInformation = (await userDB.where('email', '==', `${user.email}`).get()).docs.map(doc => doc.data())[0];
            res.send(JSON.stringify({
                email: user.email,
                name: user.displayName,
                picture: user.photoURL || 'none',
                isVerified: user.emailVerified,
                additionalUserInformation
            }));
        }
    }
}