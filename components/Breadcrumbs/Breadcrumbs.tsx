import React from 'react';
import { useRouter } from 'next/router';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { NavigationContext, NavigationContextTuple } from '../Context/NavigationContext';
import Link from 'next/link';
import { filter } from 'lodash';

export function Breadcrumbs() {
    const router = useRouter();
    const [navigationState, setNavigationState] = React.useState({
        [`Accueil`]: '/'
    })

    React.useEffect(() => {
        console.log(router);
        setNavigationState(state => {

            if (router.asPath.includes("category")) {
                return {
                    [`Accueil`]: '/',
                    [`Catégorie`]: router.asPath || '/'
                }
            }

            if (router.asPath.includes("product")) {
                return Object.assign(
                    {},
                    state,
                    {
                        ["Produit"]: router.asPath || '/'
                    }
                )
            }

            return {
                [`Accueil`]: '/'
            }
        })
    }, [router])

    return (
        <Breadcrumb className='mt-5'>
            {Object.entries(navigationState).map(([key, value]) => <Breadcrumb.Item key={key} active={router.asPath === value}><Link href={value}>{key}</Link></Breadcrumb.Item>)}
        </Breadcrumb>
    );
}