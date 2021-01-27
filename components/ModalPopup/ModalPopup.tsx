import React from 'react';
import Popup from 'reactjs-popup';

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