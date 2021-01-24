import axios from 'axios';
import React from 'react';
import { AppContext, AppContextTuple } from '../Context/AppContext';
import { Router, useRouter } from 'next/router';

type UseAuthProps = {
    email: string,
    password: string
}

export function useAuth() {
    const [appState, setAppState]: AppContextTuple = React.useContext(AppContext);
    const router = useRouter();

    const handleAuth = async ({ email, password }: UseAuthProps) => {
        try {
            const user = await (await axios.post('/api/login', { email, password })).data;

            if (user) {
                setAppState(state => Object.assign(
                    {},
                    state,
                    {
                        connected: true,
                        user: user,
                        locale: 'fr'
                    }
                ))
            }
        } catch (e) {
            console.log(e);
        }
    }

    return handleAuth;
}   