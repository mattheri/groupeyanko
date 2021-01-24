import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useForm } from '../components/Hooks/useForm';
import { Button } from '../components/Button/Button';
import { LocalLogin } from '../utils/logins';

export default function Signup() {
    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
        reType: '',
        company: '',
        address: '',
        province: 'Québec',
        city: '',
        postalCode: ''
    });

    const isEqualWith = (id: string) => {

        return (value: string) => {
            return value === formData[`${id}`]
        }
    }
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
        ],
        reType: [
            {
                other: isEqualWith('password'),
                message: 'Le champ doit être identique.'
            }
        ],
        company: [
            {
                pattern: /\*/,
                message: ''
            }
        ],
        address: [
            {
                pattern: /\*/,
                message: ''
            }
        ],
        province: [
            {
                pattern: /\D/,
                message: ''
            }
        ],
        city: [
            {
                pattern: /\D/,
                message: ''
            }
        ],
        postalCode: [
            {
                pattern: /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
                message: 'Entrer un code postal valide.'
            }
        ]
    }

    const { errors, handleChange } = useForm(validation, formData, setFormData);
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
            <Form
                onChange={handleChange}
                noValidate>
                <Form.Row>
                    <Col xs={12} md={6}>
                        <Form.Group>
                            <Form.Label>
                                Prénom *
                            </Form.Label>
                            <Form.Control required />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group>
                            <Form.Label>
                                Nom *
                            </Form.Label>
                            <Form.Control required />
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Group>
                    <Form.Label>
                        Courriel *
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
                        Compagnie
                    </Form.Label>
                    <Form.Control name='company' id='company' />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Adresse *
                    </Form.Label>
                    <Form.Control required name='address' id='address' />
                </Form.Group>
                <Form.Row>
                    <Col xs={12} md={6} lg={4}>
                        <Form.Group>
                            <Form.Label>
                                Province *
                            </Form.Label>
                            <Form.Control name='province' id='province' as='select'>
                                <option value='Québec'>Québec</option>
                                <option value='Alberta'>Alberta</option>
                                <option value='Colombie-Britannique'>Colombie Britannique</option>
                                <option value='Nouveau-Brunswick'>Nouveau Brunswick</option>
                                <option value='Labardor'>Labardor</option>
                                <option value='Territoires du Nord-Ouest'>Territoires du Nord-Ouest</option>
                                <option value='Nouvelle Écosse'>Nouvelle Écosse</option>
                                <option value='Nunavut'>Nunavut</option>
                                <option value='Saskatchewan'>Saskatchewan</option>
                                <option value='Yukon'>Yukon</option>
                                <option value='Île du Prince-Édouard'>Île du Prince-Édouard</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <Form.Group>
                            <Form.Label>
                                Ville *
                            </Form.Label>
                            <Form.Control required name='city' id='city' />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <Form.Group>
                            <Form.Label>
                                Code Postal *
                            </Form.Label>
                            <Form.Control
                                isValid={formData.postalCode && errors.postalCode.length === 0}
                                isInvalid={formData.postalCode && errors.postalCode.length > 0}
                                required
                                name='postalCode'
                                id='postalCode' />
                            <Form.Control.Feedback as='small' type='invalid'>
                                {errors.postalCode}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col xs={12} md={6}>
                        <Form.Group>
                            <Form.Label>
                                Mot de passe *
                            </Form.Label>
                            <Form.Control
                                isValid={formData.password && errors.password.length === 0}
                                isInvalid={formData.password && errors.password.length > 0}
                                required
                                name='password'
                                id='password'
                                type='password' />
                            <small>
                                Le mot de passe doit contenir 8 caractères dont une lettre et un chiffre.
                            </small>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group>
                            <Form.Label>
                                Entrez de nouveau le mot de passe *
                            </Form.Label>
                            <Form.Control
                                isValid={formData.reType && errors.reType.length === 0}
                                isInvalid={formData.reType && errors.reType.length > 0}
                                required
                                name='reType'
                                id='reType'
                                type='password' />
                            <Form.Control.Feedback as='small' type='invalid'>
                                {errors.reType}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Form.Row>
            </Form>
            <Row>
                <Col className='d-flex justify-content-center'>
                    <Button className='mt-4 w-100 w-lg-50' disabled={hasErrors()} onClick={async () => {
                        const user = await new LocalLogin().signup(formData.email, formData.password);
                        console.log(user);
                    }} text='Créer mon compte' />
                </Col>
            </Row>
        </Container>
    );
}