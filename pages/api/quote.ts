import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // const {
    //     firstname,
    //     lastname,
    //     email,
    //     company,
    //     address,
    //     province,
    //     city,
    //     postalCode,
    //     message,
    //     cart
    // } = req.body;

    // const emailBody = `
    // Bonjour,

    // Vous avez une nouvelle soumission de:
    // - Nom:      ${firstname} ${lastname}
    // - Courriel: ${email}
    // - Compagnie:${company ? company : 'Aucune'}
    // - Adresse:  ${address}
    //             ${city} 
    //             ${province}, ${postalCode}
    // - Message:  ${message ? message : 'Aucun'}`;
    // const _links = Object.entries(cart)
    //                 .map(([key, value]) => Object.entries(value)
    //                 .filter(([key, value]) => key === '_links'))
    //                 .flat()[0][1].self[0].href;
    // const quote = `
    //     ${Object.entries(cart).map(([key, value]) => (
    //         Object.entries(value).map(([key, value]) => (

    //         ))))}
    // `;

    // console.log(emailBody);
}