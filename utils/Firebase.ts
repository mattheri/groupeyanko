import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { IFirebase } from 'services/domain/Database';

class Firebase implements IFirebase {
  constructor() {
    this._init();
  }

  private _init() {
    const config = {
      apiKey: "AIzaSyDfqGiEOGaDmsnxx8XZb-xi6SPhPO64Dek",
      authDomain: "proaxion-d9a15.firebaseapp.com",
      projectId: "proaxion-d9a15",
      storageBucket: "proaxion-d9a15.appspot.com",
      messagingSenderId: "436357606185",
      appId: "1:436357606185:web:6cc7f7b3f9929d14e92538",
      measurementId: "G-FEBN9405JR",
    };

    return !firebase.apps.length
      ? firebase.initializeApp(config)
      : firebase.app();
  }

  public get auth() {
    return {
      login: async (email: string, password: string) => {
        try {
          return await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);
        } catch (e) {
          console.log({
            code: e.code,
            message: e.message,
          });
        }
      },

      signup: async (email: string, password: string) => {
        try {
          const user = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);
          return user;
        } catch (e) {
          console.log({
            code: e.code,
            message: e.message,
          });
        }
      },

      sendEmailVerification: async () => {
        try {
          return await firebase.auth().currentUser.sendEmailVerification();
        } catch (e) {
          console.log({
            code: e.code,
            message: e.message,
          });
        }
      },

      sendPasswordReset: async (email: string) => {
        try {
          await firebase.auth().sendPasswordResetEmail(email);
          return { status: 200, message: 'Courriel envoyé avec succès' };
        } catch (e) {
          console.log({
            code: e.code,
            message: e.message,
          });
        }
      },

      currentUser: firebase.auth().currentUser,

      signout: async () => firebase.auth().signOut(),

      updatePassword: async (email:string, oldPassword:string, newPassword:string) => {
        try {
          await this.auth.login(email, oldPassword);
          await firebase.auth().currentUser.updatePassword(newPassword);
          return { status: 200, message: 'Mot de passe modifié avec succès' };
        } catch (e) {
          console.log({
            code: e.code,
            message: e.message,
          })
        }
      }
    };
  }

  public get firestore() {
    return {
      db: firebase.firestore(),
      array: {
        push: firebase.firestore.FieldValue.arrayUnion,
        remove: firebase.firestore.FieldValue.arrayRemove,
      },
      timestamp:firebase.firestore.Timestamp.now().toMillis(),
    };
  }
}

export default new Firebase();
