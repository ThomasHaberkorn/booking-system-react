// import React, { useState } from "react";
// import "./loginWindow.scss";
// import { loginWithEmail, registerWithEmail, loginWithGoogle } from "./../../assets/service/authService";
// import  showOverlay from "./../../assets/service/overlay"; // Importiere den Overlay-Service


// const LoginWindow = ({ onClose }) => {
//     const [isRegister, setIsRegister] = useState(false); // Umschalten zwischen Login und Registrierung
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [errorMessage, setErrorMessage] = useState(""); // Fehlernachricht

//     const handleSubmit = async () => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex für E-Mail-Validierung

//         // Validierung der Eingaben
//         if (!email || !password) {
//             setErrorMessage("Bitte geben Sie eine gültige E-Mail-Adresse und ein Passwort ein.");
//             return;
//         }

//         if (!emailRegex.test(email)) {
//             setErrorMessage("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
//             return;
//         }

//         if (isRegister && password.length < 1) {
//             setErrorMessage("Das Passwort muss mindestens 6 Zeichen lang sein.");
//             return;
//         }

//         // Firebase-Logik ausführen
//         try {
//             if (isRegister) {
//                 await registerWithEmail(email, password);
//                 showOverlay("Registrierung erfolgreich!"); // Zeige Overlay statt Alert
//             } else {
//                 await loginWithEmail(email, password);
//                 showOverlay("Login erfolgreich!"); // Zeige Overlay statt Alert
//             }
//             setErrorMessage(""); // Fehlernachricht zurücksetzen
//             onClose(); // Fenster schließen
//         } catch (error) {
//             console.error("Fehler:", error.message);
//             setErrorMessage("Fehler: " + error.message);
//         }
//     };

//     const handleGoogleLogin = async () => {
//         try {
//             await loginWithGoogle();
//             showOverlay("Erfolgreich mit Google angemeldet!"); // Zeige Overlay statt Alert
//             setErrorMessage(""); // Fehlernachricht zurücksetzen
//             onClose(); // Fenster schließen
//         } catch (error) {
//             console.error("Fehler beim Google-Login:", error.message);
//             setErrorMessage("Google-Login fehlgeschlagen: " + error.message);
//         }
//     };
    

//     return (
//         <div className="login-window">
//             <div className="login-content">
//                 <h2>{isRegister ? "Registrieren" : "Anmelden"}</h2>
//                 {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Fehleranzeige */}
//                 <input
//                     type="email"
//                     placeholder="E-Mail"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Passwort"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button onClick={handleSubmit}>
//                     {isRegister ? "Registrieren" : "Anmelden"}
//                 </button>
//                 <button onClick={handleGoogleLogin}>Mit Google anmelden</button>
//                 <p onClick={() => setIsRegister(!isRegister)}>
//                     {isRegister ? "Zurück zum Login" : "Noch keinen Account? Registrieren"}
//                 </p>
//                 <button className="close-button" onClick={onClose}>X</button>
//             </div>
//         </div>
//     );
// };

// export default LoginWindow;

import React, { useState } from "react";
import "./loginWindow.scss";
import { loginWithEmail, registerWithEmail, loginWithGoogle } from "./../../assets/service/authService";
import showOverlay from "./../../assets/service/overlay"; // Importiere den Overlay-Service

const LoginWindow = ({ onClose }) => {
    const [isRegister, setIsRegister] = useState(false); // Umschalten zwischen Login und Registrierung
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState(""); // Neuer Zustand für Name
    const [errorMessage, setErrorMessage] = useState(""); // Fehlernachricht

    const handleSubmit = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex für E-Mail-Validierung

        // Validierung der Eingaben
        if (!email || !password || (isRegister && !name)) {
            setErrorMessage("Bitte füllen Sie alle Felder aus.");
            return;
        }

        if (!emailRegex.test(email)) {
            setErrorMessage("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
            return;
        }

        if (isRegister && password.length < 6) {
            setErrorMessage("Das Passwort muss mindestens 6 Zeichen lang sein.");
            return;
        }

        // Firebase-Logik ausführen
        try {
            if (isRegister) {
                await registerWithEmail(email, password, name); // Name übergeben
                showOverlay("Registrierung erfolgreich!"); // Zeige Overlay statt Alert
            } else {
                await loginWithEmail(email, password);
                showOverlay("Login erfolgreich!"); // Zeige Overlay statt Alert
            }
            setErrorMessage(""); // Fehlernachricht zurücksetzen
            onClose(); // Fenster schließen
        } catch (error) {
            console.error("Fehler:", error.message);
            setErrorMessage("Fehler: " + error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            showOverlay("Erfolgreich mit Google angemeldet!"); // Zeige Overlay statt Alert
            setErrorMessage(""); // Fehlernachricht zurücksetzen
            onClose(); // Fenster schließen
        } catch (error) {
            console.error("Fehler beim Google-Login:", error.message);
            setErrorMessage("Google-Login fehlgeschlagen: " + error.message);
        }
    };

    return (
        <div className="login-window">
            <div className="login-content">
                <h2>{isRegister ? "Registrieren" : "Anmelden"}</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Fehleranzeige */}
                {isRegister && ( // Eingabefeld für Name nur bei Registrierung anzeigen
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                )}
                <input
                    type="email"
                    placeholder="E-Mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSubmit}>
                    {isRegister ? "Registrieren" : "Anmelden"}
                </button>
                <button onClick={handleGoogleLogin}>Mit Google anmelden</button>
                <p onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? "Zurück zum Login" : "Noch keinen Account? Registrieren"}
                </p>
                <button className="close-button" onClick={onClose}>X</button>
            </div>
        </div>
    );
};

export default LoginWindow;
