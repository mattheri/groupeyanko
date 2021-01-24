import axios from 'axios';
import React from 'react';
import { AppContext, AppContextTuple } from '../Context/AppContext';
import { Router, useRouter } from 'next/router';
import { GoogleLogin } from '../../utils/logins';

type UseAuthProps = {
    email?: string,
    password?: string
}

export function useAuth() {
    const [appState, setAppState]: AppContextTuple = React.useContext(AppContext);
    const router = useRouter();

    const handleAuth = async ({ email, password }: UseAuthProps, type?: 'local' | 'google', callback?: () => void) => {
        switch (type) {
            case 'google':
                try {
                    const google = new GoogleLogin();
                    const user = await google.Login();
                    const userComplete = await (await axios.post('/api/googleLogin', {
                        email: user.email,
                        user
                    })).data;
        
                    if (user) {
                        callback();
                        return setAppState(state => Object.assign(
                            {},
                            state,
                            {
                                connected: true,
                                user: userComplete,
                                locale: 'fr'
                            }
                        ))
                    }

                } catch (e) {
                    console.log({
                        code: e.code,
                        message: e.message
                    });
                }

                return;
            default:
                try {
                    const user = await (await axios.post('/api/login', { email, password })).data;
        
                    if (user) {
                        callback();
                        return setAppState(state => Object.assign(
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
    }

    return handleAuth;
}   