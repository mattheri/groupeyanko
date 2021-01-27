import React from 'react';
import { useRouter } from 'next/router';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { NavigationContext, NavigationContextTuple } from '../Context/NavigationContext';
import Link from 'next/link';
import { filter } from 'lodash';

export function Breadcrumbs() {
    const router = useRouter();
    const [navigationState, setNavigationState]: NavigationContextTuple = React.useContext(NavigationContext);

    return (
        <Breadcrumb className='mt-5 mx-5'>
            {Object.entries(navigationState).map(([key, value]) => <Breadcrumb.Item active={router.asPath === value}><Link href={value}>{key}</Link></Breadcrumb.Item>)}
        </Breadcrumb>
    );
}