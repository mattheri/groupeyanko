import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { Button } from '../Button/Button';
import { useForm } from '../Hooks/useForm';
import Col from 'react-bootstrap/Col';
import { useAuth } from '../Hooks/useAuth';
import styles from './loginform.module.scss';

type LoginFormProps = {
    close?: () => void
}

export function LoginForm({ close }: LoginFormProps) {

    const [formData, setFormData] = React.useState({
        email: '',
        password: ''
    });

    const validation = {
        email: [
            {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Entrer une adresse valide.'
            }
        ],
        password: [
            {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: 'Le mot de passe doit être au moins 8 charactères de long et contenir une lettre et un chiffre.'
            }
        ]
    }
    const { errors, handleChange } = useForm(validation, formData, setFormData);

    const hasErrors = () => {
        if (
            Object.entries(formData).every(([key, value]) => value.length > 0) &&
            Object.entries(errors).every(([key, value]) => value.length === 0)
        ) {
            return false;
        }

        return true;
    }

    const handleAuth = useAuth();

    return (
        <Container className='pt-2 pr-2 pl-2'>
            <Form
                onChange={handleChange}
                noValidate>
                <Form.Group>
                    <Form.Label>
                        Email
                    </Form.Label>
                    <Form.Control
                        required
                        isValid={formData.email && errors.email.length === 0}
                        isInvalid={formData.email && errors.email.length > 0}
                        name='email'
                        id='email'
                        type='email' />
                    <Form.Control.Feedback as='small' type='invalid'>
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control
                        isValid={formData.password && errors.password.length === 0}
                        isInvalid={formData.password && errors.password.length > 0}
                        required
                        name='password'
                        id='password'
                        type='password' />
                    <Form.Control.Feedback as='small' type='invalid'>
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
            </Form>
            <Row>
                <Col className='d-flex justify-content-center'>
                    <Button className='w-50' disabled={hasErrors()} onClick={() => handleAuth(formData, 'local', close)} text='Connexion' />
                </Col>
            </Row>
            <hr />
            <Row>
                <Col className='d-flex justify-content-center'>
                    <Button className={styles.googlebtn} secondary onClick={() => handleAuth({}, 'google', close)}>
                        <span className='pr-2'>Continuer avec</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                        </svg>
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col className='d-flex justify-content-center align-items-center pt-5'>
                    <small>Vous n'avez pas de compte?</small>
                    <Button className='ml-2' size='sm' onClick={() => close()} href='/signup' text='Créer un compte' />
                </Col>
            </Row>
        </Container>
    );
}