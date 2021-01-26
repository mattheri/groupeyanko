import { NextApiRequest, NextApiResponse } from 'next';
import { Cart } from '../../components/Context/CartContext';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        firstname,
        lastname,
        email,
        company,
        address,
        province,
        city,
        postalCode,
        message,
        cart
    } = req.body;

    const emailBody = `
    Bonjour,

    Vous avez une nouvelle soumission de:
    - Nom:      ${firstname} ${lastname}
    - Courriel: ${email}
    - Compagnie:${company ? company : 'Aucune'}
    - Adresse:  ${address}
                ${city} 
                ${province}, ${postalCode}
    - Message:  ${message ? message : 'Aucun'}
    
    Voici les produits demandés:
    ${Object.entries((cart as Cart)).map(([key, value]) => `
        - ${value}
    `)}
    `;
}