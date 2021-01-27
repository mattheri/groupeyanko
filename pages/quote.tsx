import React from 'react';
import { CartContext, CartContextTuple } from '../components/Context/CartContext';
import Container from 'react-bootstrap/Container';
import { AppContext, AppContextTuple } from '../components/Context/AppContext';
import { FormData } from '../components/SignupForm/SignupForm';
import { SignupForm } from '../components/SignupForm/SignupForm';
import Row from 'react-bootstrap/Row';
import { QuoteProduct } from '../components/QuoteProduct/QuoteProduct';
import { Button } from '../components/Button/Button';
import { sendEmail } from '../utils/utils';
import Link from 'next/link';

export default function Quote() {
    const [cart, , , setCart]: CartContextTuple = React.useContext(CartContext);
    const [user, setUser]: AppContextTuple = React.useContext(AppContext);
    const [quoteMsg, setQuoteMsg] = React.useState('Envoyer la soumission');

    const [formData, setFormData] = React.useState<FormData>({
        firstname: user.connected && user.user.additionalUserInformation.firstname || '',
        lastname: user.connected && user.user.additionalUserInformation.lastname || '',
        email: user.connected && user.user.additionalUserInformation.email || '',
        company: user.connected && user.user.additionalUserInformation.company || '',
        address: user.connected && user.user.additionalUserInformation.address || '',
        province: user.connected && user.user.additionalUserInformation.province || 'Québec',
        city: user.connected && user.user.additionalUserInformation.city || '',
        postalCode: user.connected && user.user.additionalUserInformation.postalCode || '',
        message: ''
    });

    const [errors, setErrors] = React.useState<FormData>();

    const hasErrors = (fieldsToIgnore?: string[]) => {
        const condition = fieldsToIgnore ?
            Object.entries(formData).
                filter(([key, value]) => fieldsToIgnore.every(keys => keys !== key))
                .every(([key, value]) => value.length > 0) :
            Object.entries(formData)
                .every(([key, value]) => value.length > 0);
        
        if (condition) {
            return false;
        }

        return true;
    }

    const handleSendEmail = async () => {
        try {
            const status = await sendEmail(formData, cart.cart);
    
            if (status.status === 200) {
                setQuoteMsg('Soumission envoyée');
                setCart(cart => Object.assign({}, cart, { cart: {} }));
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Container className='p-2 pt-5'>
            <Row>
            {Object.entries(cart.cart).map(([key, product]) => {
                return (
                    <QuoteProduct product={product} />
                );
            })}
            </Row>
            {Object.keys(cart.cart).length > 0 ?
                <>    
                    <SignupForm anonymus returnErrors={setErrors} formData={formData} setFormData={setFormData} />
                    <Button className='w-100' disabled={hasErrors(['province', 'company', 'message'])} onClick={handleSendEmail} text={quoteMsg} />
                </> :
                <>
                    <h1 className='text-center'>Vous n'avez pas encore d'articles dans votre panier. Ajoutez des articles afin de pouvoir envoyer votre soumission.</h1>
                    <Link href='/'><a className='text-center text-primary'><h1>Retour au catalogue</h1></a></Link>
                </>
            }
        </Container>
    );
}