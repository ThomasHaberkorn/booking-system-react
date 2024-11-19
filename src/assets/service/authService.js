// import {
//     getAuth,
//     signInWithEmailAndPassword,
//     createUserWithEmailAndPassword,
//     signInWithPopup,
//     GoogleAuthProvider,
//     setPersistence,
//     browserSessionPersistence,
// } from "firebase/auth";
// import {doc, setDoc} from "firebase/firestore";
// import {db} from "./../../firebase-config";

// const auth = getAuth();

// // Persistenz festlegen (LocalStorage oder SessionStorage)
// setPersistence(auth, browserSessionPersistence) // Wechsle zu browserLocalPersistence für persistentes Login
//     .then(() => {
//         console.log("Persistenz erfolgreich gesetzt.");
//     })
//     .catch((error) => {
//         console.error("Fehler beim Setzen der Persistenz:", error);
//     });

// // Anmeldung mit E-Mail und Passwort
// export const loginWithEmail = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
// };

// // Registrierung mit E-Mail, Passwort und Name
// export const registerWithEmail = async (email, password, name) => {
//     try {
//         const userCredential = await createUserWithEmailAndPassword(
//             auth,
//             email,
//             password
//         );
//         const user = userCredential.user;

//         // Benutzerdaten in Firestore speichern
//         await setDoc(doc(db, "users", user.uid), {
//             email: user.email,
//             name: name,
//             status: "patient", // Standardstatus für neue Benutzer
//         });

//         console.log("Benutzer erfolgreich registriert:", user.email);
//         return userCredential.user;
//     } catch (error) {
//         console.error("Registrierungsfehler:", error);
//         throw error;
//     }
// };

// // Anmeldung mit Google
// export const loginWithGoogle = () => {
//     const googleProvider = new GoogleAuthProvider();
//     return signInWithPopup(auth, googleProvider);
// };

// // Benutzer abmelden
// export const logout = () => {
//     return auth.signOut();
// };

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    setPersistence,
    browserSessionPersistence,
} from "firebase/auth";
import {doc, setDoc, getDoc} from "firebase/firestore";
import {db} from "./../../firebase-config";
import showOverlay from "./overlay";

const auth = getAuth();

// Persistenz festlegen (LocalStorage oder SessionStorage)
// Wähle entweder browserSessionPersistence oder browserLocalPersistence
setPersistence(auth, browserSessionPersistence)
    .then(() => {
        console.log("Persistenz erfolgreich gesetzt.");
    })
    .catch((error) => {
        console.error("Fehler beim Setzen der Persistenz:", error);
    });

// Anmeldung mit E-Mail und Passwort
export const loginWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// Registrierung mit E-Mail, Passwort und Name
export const registerWithEmail = async (email, password, name) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        // Benutzerdaten in Firestore speichern
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            name: name,
            status: "patient", // Standardstatus für neue Benutzer
        });

        console.log("Benutzer erfolgreich registriert:", user.email);
        return user; // Du kannst hier auch `userCredential.user` zurückgeben
    } catch (error) {
        console.error("Registrierungsfehler:", error);
        throw error;
    }
};

// Anmeldung mit Google
export const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Überprüfen, ob Benutzer in Firestore existiert
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
            // Benutzerdaten in Firestore speichern
            await setDoc(userDocRef, {
                email: user.email,
                name: user.displayName || "Unbekannt",
                status: "patient", // Standardstatus oder je nach Bedarf anpassen
            });
            console.log(
                "Neuer Google-Benutzer in Firestore gespeichert:",
                user.email
            );
        } else {
            console.log(
                "Google-Benutzer existiert bereits in Firestore:",
                user.email
            );
        }

        return user;
    } catch (error) {
        console.error("Fehler bei der Google-Anmeldung:", error);
        throw error;
    }
};

// Benutzer abmelden
export const logout = async () => {
    try {
        await auth.signOut();
        showOverlay("Erfolgreich ausgeloggt!");

        // Beispiel für Zustandsrücksetzung
        localStorage.removeItem("userRole"); // Lokale Daten löschen
        localStorage.removeItem("userId"); // Falls ID gespeichert ist
    } catch (error) {
        console.error("Fehler beim Logout:", error);
        throw error;
    }
};
