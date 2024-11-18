import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCsR_J73KpG3NQSqWibHhCNH7dvcgXeKHU",
    authDomain: "booking-system-react.firebaseapp.com",
    projectId: "booking-system-react",
    storageBucket: "booking-system-react.appspot.com", // Korrigierter Wert
    messagingSenderId: "1068878536548",
    appId: "1:1068878536548:web:05a66ae9edd3953770e471",
};

// Firebase-App initialisieren
const app = initializeApp(firebaseConfig);

// Firestore und Auth exportieren
const db = getFirestore(app);
const auth = getAuth(app);
console.log("Firebase App:", app);

export {db, auth};
