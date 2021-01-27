import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Button } from '../components/Button/Button';
import { useForm } from '../components/Hooks/useForm';
import { LocalLogin } from '../utils/logins';
import { useRouter } from 'next/router';

export default function ForgotPassword() {

    const [formData, setFormData] = React.useState({
        email: ''
    });

    const validation = {
        email: [
            {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Entrer une adresse valide.'
            }
        ]
    }

    const { errors, handleChange } = useForm(validation, formData, setFormData);

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
    const [emailSent, setEmailSent] = React.useState(false);
    const router = useRouter();

    const handleSendEmailReset = () => {
        const login = new LocalLogin();
        login.sendPasswordReset(formData.email);
        setEmailSent(true);

        setTimeout(() => {
            router.push('/');
        }, 10000);
    }


    return (
        <Container className='py-5'>
            {!emailSent ? 
                <>
                    <h1>
                        Vous avez oublié votre mot de passe?
                    </h1>
                    <Form onChange={handleChange}>
                        <Form.Group>
                            <Form.Label>
                                Entrez votre courriel
                            </Form.Label>
                            <Form.Control
                                required
                                isValid={formData.email && errors.email.length === 0}
                                isInvalid={formData.email && errors.email.length > 0}
                                name='email'
                                id='email'
                                type='email'
                                value={formData.email} />
                            <Form.Control.Feedback as='small' type='invalid'>
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                    <Button onClick={handleSendEmailReset} text='Réinitialiser mon mot de passe' />
            </> : 
                <h1>Un courriel a été envoyé à {formData.email}</h1>
            }
        </Container>
    );
}