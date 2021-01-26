import React from 'react';
import { CartContext, CartContextTuple } from '../components/Context/CartContext';
import Container from 'react-bootstrap/Container';
import { AppContext, AppContextTuple } from '../components/Context/AppContext';
import { FormData } from '../components/SignupForm/SignupForm';
import { SignupForm } from '../components/SignupForm/SignupForm';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { QuoteProduct } from '../components/QuoteProduct/QuoteProduct';
import { Button } from '../components/Button/Button';
import axios from 'axios';

export default function Quote() {
    const [cart, setCart]: CartContextTuple = React.useContext(CartContext);
    const [user, setUser]: AppContextTuple = React.useContext(AppContext);

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

    console.log(cart.cart);

    return (
        <Container className='p-2 pt-5'>
            <Row>
            {Object.entries(cart.cart).map(([key, product]) => {
                return (
                    <QuoteProduct product={product} />
                );
            })}
            </Row>
            <SignupForm anonymus returnErrors={setErrors} formData={formData} setFormData={setFormData} />
            <Button className='w-100' disabled={hasErrors(['province', 'company', 'message'])} onClick={async () =>
                axios.post('/api/quote', {
                ...formData,
                ...cart.cart
                })
            } text='Envoyer la soumission' />
        </Container>
    );
}