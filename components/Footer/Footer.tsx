import React from 'react';
import styles from './footer.module.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import cn from 'classnames';

export function Footer() {
    return (
        <Container fluid className='px-0 mx-0' as='footer'>
            <Row className={cn({
                [styles.footer]: styles.footer,
                ['px-0 mx-0']: true
            })}>

            </Row>
        </Container>
    );
}