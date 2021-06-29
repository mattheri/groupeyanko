import firebase from 'firebase';

export type DocumentReference = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;

export type Document = firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;

export type Documents = firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]

export type QueryDocument = firebase.firestore.DocumentData;

export type QueryDocuments = QueryDocument[];

export type Firestore = firebase.firestore.Firestore;

export type FirestoreArrayFunctions = {
  push:(...elements: any[]) => firebase.firestore.FieldValue,
  remove:(...elements: any[]) => firebase.firestore.FieldValue,
}

export type ServerTimestamp = number;

export interface IFirestore {
  db:Firestore;
  array:FirestoreArrayFunctions;
  timestamp:ServerTimestamp
}

export interface QuerySuccessMessage {
  status:number;
  message:string;
}

export type Credentials = firebase.auth.UserCredential;
export interface Auth {
  login:(email:string, password:string) => Promise<Credentials>;
  signup:(email:string, password:string) => Promise<Credentials>;
  sendEmailVerification:() => Promise<void>;
  sendPasswordReset:(email:string) => Promise<QuerySuccessMessage>;
  currentUser:firebase.User;
  signout:() => Promise<void>;
  updatePassword:(email:string, oldPassword:string, newPassword:string) => Promise<QuerySuccessMessage>;
}

export interface IFirebase {
  auth:Auth;
  firestore:IFirestore;
}

export type User = firebase.User;