import Firebase from './Firebase';

type Credentials = {
    email: string,
    password: string
}

export const googleLogin = () => {

}

export class LocalLogin {
    constructor() { }
    
    async login(email: string, password: string) {
        try {
            return await Firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (e) {
            console.log({
                code: e.code,
                message: e.message
            });
        }
    }

    async logout() {
        try {
            return await Firebase.auth().signOut();
        } catch (e) {
            console.log({
                code: e.code,
                message: e.message
            });
        }
    }

    async signup(email: string, password: string) {
        try {
            const user = await Firebase.auth().createUserWithEmailAndPassword(email, password);
            await Firebase.auth().currentUser.sendEmailVerification();
            return user;
        } catch (e) {
            console.log({
                code: e.code,
                message: e.message
            })
        }
    }

    async sendEmailVerification() {
        try {
            return await Firebase.auth().currentUser.sendEmailVerification();
        } catch (e) {
            console.log({
                code: e.code,
                message: e.message
            })
        }
    }

    async sendPasswordReset(email: string) {
        try {
            return await Firebase.auth().sendPasswordResetEmail(email);
        } catch (e) {
            console.log({
                code: e.code,
                message: e.message
            })
        }
    }
}