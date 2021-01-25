import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useForm } from '../components/Hooks/useForm';
import { Button } from '../components/Button/Button';
import { useAuth } from '../components/Hooks/useAuth';
import styles from '../components/LoginForm/loginform.module.scss';
import { SignupForm, FormData } from '../components/SignupForm/SignupForm';

export default function Signup() {
    const [formData, setFormData] = React.useState<FormData>({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        reType: '',
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

    const { handleAuth, handleSignUp } = useAuth();
    
    return (
        <Container className='p-2 pt-5'>
            <SignupForm returnErrors={setErrors} formData={formData} setFormData={setFormData} />
            <Row>
                <Col className='d-flex justify-content-center'>
                    <Button className='mt-4 w-100 w-lg-50' disabled={hasErrors()} onClick={() => handleSignUp(formData)} text='Créer mon compte' />
                </Col>
            </Row>
        </Container>
    );
}