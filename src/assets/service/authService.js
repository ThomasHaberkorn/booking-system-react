import {auth} from "./../../firebase-config"; // Aus Firebase-Konfiguration importieren
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore"; // Für Firestore
import {db} from "./../../firebase-config"; // Firestore-Konfiguration

// Login mit E-Mail und Passwort
export const loginWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// Registrierung mit E-Mail und Passwort
export const registerWithEmail = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        // Firestore: Benutzer mit Status hinzufügen
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            status: "patient", // Status hinzufügen
        });

        console.log(
            "Benutzer erfolgreich registriert und gespeichert:",
            user.email
        );
        return user; // Rückgabe des registrierten Benutzers
    } catch (error) {
        console.error("Registrierungsfehler:", error);
        throw error;
    }
};

// Login mit Google
export const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
};
