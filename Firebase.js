import * as fire from 'firebase';
// import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyD6THU7ITcYdUK_xS4oolPRtwMLeaidMlw",
    authDomain: "auth-2b88a.firebaseapp.com",
    databaseURL: "https://auth-2b88a.firebaseio.com",
    projectId: "auth-2b88a",
    storageBucket: "auth-2b88a.appspot.com",
    messagingSenderId: "739272698096",
    appId: "1:739272698096:web:92e57f9793339a6bee3a35",
};

fire.initializeApp(config);

export default fire;
// export const firestore = firebase.firestore();
// export const database = firebase.database();
// export const auth = firebase.auth();

