import React from 'react';
import { CartContext, CartContextTuple } from '../components/Context/CartContext';
import Container from 'react-bootstrap/Container';
import { AppContext, AppContextTuple } from '../components/Context/AppContext';
import { SignupFormNoPassword, FormData } from '../components/SignupForm/SignupFormNoPassword';
import { SignupForm } from '../components/SignupForm/SignupForm';

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

    const hasErrors = () => {
        if (
            Object.entries(formData).
                filter(([key, value]) => key !== 'company')
                .every(([key, value]) => value.length > 0) &&
            Object.entries(errors)
                .filter(([key, value]) => key !== 'province')
                .every(([key, value]) => value.length === 0)
        ) {
            return false;
        }

        return true;
    }

    return (
        <Container className='p-2 pt-5'>
            <SignupForm anonymus returnErrors={setErrors} formData={formData} setFormData={setFormData} />
        </Container>
    );
}