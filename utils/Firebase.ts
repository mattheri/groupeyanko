import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

class Firebase {
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

  auth() {
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
          return await firebase.auth().sendPasswordResetEmail(email);
        } catch (e) {
          console.log({
            code: e.code,
            message: e.message,
          });
        }
      },

      currentUser: firebase.auth().currentUser,

      signout: async () => firebase.auth().signOut(),
    };
  }

  firestore() {
    return {
      db: firebase.firestore(),
    };
  }
}

export default new Firebase();
