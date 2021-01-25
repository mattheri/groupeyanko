import React from 'react';
import { CartContext, CartContextTuple } from '../components/Context/CartContext';
import Container from 'react-bootstrap/Container';
import { AppContext, AppContextTuple } from '../components/Context/AppContext';
import { SignupFormNoPassword, FormData } from '../components/SignupForm/SignupFormNoPassword';

export default function Quote() {
    const [cart, setCart]: CartContextTuple = React.useContext(CartContext);
    const [user, setUser]: AppContextTuple = React.useContext(AppContext);

    const [formData, setFormData] = React.useState<FormData>({
        firstname: '',
        lastname: '',
        email: '',
        company: '',
        address: '',
        province: 'Québec',
        city: '',
        postalCode: ''
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
        <Container>
            <SignupFormNoPassword returnErrors={setErrors} formData={formData} setFormData={setFormData} />
        </Container>
    );
}