import React from 'react';
import styles from './footer.module.scss';
import Row from 'react-bootstrap/Row';
import cn from 'classnames';

export function Footer() {
    return (
        <Row as='footer' className={cn({
            [styles.footer]: styles.footer,
            ['px-0 mx-0']: true
        })}>

        </Row>
    );
}