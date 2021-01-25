import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { useForm } from '../Hooks/useForm';

export type FormData = {
    firstname: string,
    lastname: string,
    email: string,
    password?: string,
    reType?: string,
    company: string,
    address: string,
    province: string,
    city: string,
    postalCode: string,
    message?: string
}

type SignUpProps = {
    formData: FormData,
    setFormData: React.Dispatch<React.SetStateAction<FormData>>,
    returnErrors: React.Dispatch<React.SetStateAction<FormData>>,
    anonymus?: boolean
}

export function SignupForm({ formData, setFormData, returnErrors, anonymus }: SignUpProps) {

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

    React.useEffect(() => {
        returnErrors(errors);
    }, [errors]);

    const formatPostalCode = () => {
        if (!formData.postalCode.includes(' ')) {
            return formData.postalCode
                .toUpperCase()
                .replace(/(\w{3})/, '$1 ')
                .replace(/(^\s+|\s+$)/, '')
        }

        return formData.postalCode.toUpperCase();
    }
    return (
        <Form
            onChange={handleChange}
            noValidate>
            <Form.Row>
                <Col xs={12} md={6}>
                    <Form.Group>
                        <Form.Label>
                            Prénom *
                        </Form.Label>
                        <Form.Control name='firstname' id='firstname' value={formData.firstname} required />
                    </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                    <Form.Group>
                        <Form.Label>
                            Nom *
                        </Form.Label>
                        <Form.Control name='lastname' id='lastname' value={formData.lastname} required />
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
                    type='email'
                    value={formData.email} />
                <Form.Control.Feedback as='small' type='invalid'>
                    {errors.email}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Compagnie
                </Form.Label>
                <Form.Control name='company' id='company' value={formData.company} />
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Adresse *
                </Form.Label>
                <Form.Control required name='address' id='address' value={formData.address} />
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
                        <Form.Control required name='city' id='city' value={formData.city} />
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
                            id='postalCode'
                            value={formatPostalCode()} />
                        <Form.Control.Feedback as='small' type='invalid'>
                            {errors.postalCode}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Form.Row>
            {!anonymus ?
                <>    
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
                </> :
                <>
                    <Form.Group>
                        <Form.Label>
                            Message (optionel)
                        </Form.Label>
                        <Form.Control value={formData.message} as='textarea' rows={9} id='message' name='message' />
                    </Form.Group>
                </>
            }
        </Form>
    );
}