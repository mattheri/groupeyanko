import firebase from 'firebase';
import Firebase from './Firebase';

export class GoogleLogin {
    provider: firebase.auth.GoogleAuthProvider;
    constructor() {
        this.provider = new firebase.auth.GoogleAuthProvider()
    }
    
    async Login() {
        try {
            await Firebase.auth().signInWithRedirect(this.provider);
            return (await Firebase.auth().getRedirectResult()).user;
        } catch (e) {
            console.log({
                code: e.code,
                message: e.message
            });
        }
    }

    async Signout() {
        Firebase.auth().signOut();
    }
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