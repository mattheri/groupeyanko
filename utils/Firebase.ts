import firebase from 'firebase';

class Firebase {
    app: firebase.app.App;
    constructor() {
        this.app = this._init()
    }

    _init() {
        const config = {
            apiKey: "AIzaSyDfqGiEOGaDmsnxx8XZb-xi6SPhPO64Dek",
            authDomain: "proaxion-d9a15.firebaseapp.com",
            projectId: "proaxion-d9a15",
            storageBucket: "proaxion-d9a15.appspot.com",
            messagingSenderId: "436357606185",
            appId: "1:436357606185:web:6cc7f7b3f9929d14e92538",
            measurementId: "G-FEBN9405JR"
        }
        
        return !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
    }
}

export default new Firebase().app;