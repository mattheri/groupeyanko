import axios from 'axios';
import React from 'react';
import { AppContext, AppContextTuple } from '../Context/AppContext';
import { useRouter } from 'next/router';

type UseAuthProps = {
    email?: string,
    password?: string
}

export function useAuth() {
    const [appState, setAppState]: AppContextTuple = React.useContext(AppContext);
    const router = useRouter();

    const handleAuth = async ({ email, password }: UseAuthProps, type?: 'local' | 'google', callback?: () => void, onError?: React.Dispatch<React.SetStateAction<string>>) => {
        switch (type) {
            case 'google':
                // try {
                //     const google = new GoogleLogin();
                //     const user = await google.Login();
                //     const userComplete = await (await axios.post('/api/googleLogin', {
                //         email: user.email,
                //         user
                //     })).data;
        
                //     if (user) {
                //         callback && callback();
                //         return setAppState(state => Object.assign(
                //             {},
                //             state,
                //             {
                //                 connected: true,
                //                 user: userComplete,
                //                 locale: 'fr'
                //             }
                //         ))
                //     }

                // } catch (e) {
                //     console.log({
                //         code: e.code,
                //         message: e.message
                //     });
                // }

                return;
            default:
                try {
                    const response = (await axios.post('/api/login', { email, password }));
                    const user = response.data;
                    if (response.status !== 200) {
                        throw new Error("Le nom d'utilisateur ou le mot de passe est incorrect.");
                    }

                    if (user) {
                        callback && callback();
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
                    console.log(e.message);
                    onError && onError("Le nom d'utilisateur ou le mot de passe est incorrect.");
                }
                
        }
    }

    const handleSignUp = async (formData: any, onError?: React.Dispatch<React.SetStateAction<string>>, callback?: () => void) => {
        try {
            const response = await axios.post('/api/signup', formData);
            const user = response.data;

            if (response.status !== 200) {
                throw new Error("L'utilisateur existe déjà. Veuillez vous connecter ou utiliser une autre adresse courriel.");
            }
            if (user) {
                callback && callback();
                setAppState(state => Object.assign(
                    {},
                    state,
                    {
                        connected: true,
                        user: user,
                        locale: 'fr'
                    }
                ))

                return router.push('/');
            }
        } catch (e) {
            console.log(e);
            onError && onError("L'utilisateur existe déjà. Veuillez vous connecter ou utiliser une autre adresse courriel.");
        }
    }

    return { handleAuth, handleSignUp };
}   