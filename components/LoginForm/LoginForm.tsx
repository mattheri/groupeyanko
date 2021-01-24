import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { Button } from '../Button/Button';
import { useForm } from '../Hooks/useForm';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useAuth } from '../Hooks/useAuth';

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
                    <Button className='w-50' disabled={hasErrors()} onClick={() => handleAuth(formData)} text='Connexion' />
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