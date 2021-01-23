import React from 'react';
import Popup from 'reactjs-popup';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from '../Button/Button';
import { useForm } from '../Hooks/useForm';

type ModalPopupProps = {
    trigger: JSX.Element
}

export function ModalPopup({ trigger, children }: React.PropsWithChildren<ModalPopupProps>) {

    return (
        <Popup lockScroll modal nested trigger={trigger}>
            {(close: () => void) => (
                React.Children.map(children, (c: JSX.Element) => React.cloneElement(c, { ...c.props, close: close }))
            )}
        </Popup>
    );
}