// import React, { useState, useEffect } from 'react';
// import './navbar.scss';
// import logo from './../../assets/img/logo.webp';
// import { NavLink } from 'react-router-dom';
// import { auth } from './../../firebase-config';
// import { signOut, onAuthStateChanged } from 'firebase/auth';
// import LoginWindow from '../loginWindow/loginWindow';

// const Navbar = () => {
//     const [showLogin, setShowLogin] = useState(false); // Zustand für Login-Fenster
//     const [user, setUser] = useState(null); // Zustand für den angemeldeten Benutzer

//     // Überwacht den Authentifizierungsstatus
//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//             setUser(currentUser);
//         });
//         return () => unsubscribe(); // Aufräumen, wenn Komponente entladen wird
//     }, []);

//     // Logout-Funktion
//     const handleLogout = async () => {
//         try {
//             await signOut(auth);
//             alert("Erfolgreich ausgeloggt!");
//         } catch (error) {
//             console.error("Fehler beim Logout:", error);
//         }
//     };

//     return (
//         <>
//             <div className="mainContainer">
//                 <div className="innerContainer">
//                     <div className="nameContainer"><img src={logo} alt="PhysioVital Logo" /></div>
//                     <div className="navigation">
//                         <NavLink className="navItem" to="/">Home</NavLink>
//                         <NavLink className="navItem" to="/services">Leistungen</NavLink>
//                         <NavLink className="navItem" to="/calendar">Kalender</NavLink>
//                         <NavLink className="navItem" to="/contact">Kontakt</NavLink>
//                         <NavLink className="navItem" to="/aboutus">Über uns</NavLink>
                        
//                         {/* Login oder Logout anzeigen */}
//                         {user ? (
//                             <div className="navItem logout" onClick={handleLogout}>Logout</div>
//                         ) : (
//                             <div className="navItem login" onClick={() => setShowLogin(true)}>Login</div>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Login-Fenster */}
//             {showLogin && <LoginWindow onClose={() => setShowLogin(false)} />}
//         </>
//     );
// };

// export default Navbar;


import React, { useState, useEffect } from 'react';
import './navbar.scss';
import logo from './../../assets/img/logo.webp';
import { NavLink } from 'react-router-dom';
import { auth } from './../../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import LoginWindow from '../loginWindow/loginWindow';
import showOverlay from './../../assets/service/overlay'; // Import des Overlays
import { logout } from "../../assets/service/authService";
const Navbar = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    

    const handleLogout = async () => {
        try {
            await logout(); // Logout aus dem AuthService
            setUser(null); // Benutzer zurücksetzen
            // Füge hier einen Event-Trigger hinzu, um den Zustand zurückzusetzen
            const logoutEvent = new CustomEvent("userLoggedOut");
            window.dispatchEvent(logoutEvent); // Event auslösen
            showOverlay("Erfolgreich ausgeloggt!");
        } catch (error) {
            console.error("Fehler beim Logout:", error);
        }
    };

    return (
        <>
            <div className="mainContainer">
                <div className="innerContainer">
                    <div className="nameContainer"><img src={logo} alt="PhysioVital Logo" /></div>
                    <div className="navigation">
                        <NavLink className="navItem" to="/">Home</NavLink>
                        <NavLink className="navItem" to="/services">Leistungen</NavLink>
                        <NavLink className="navItem" to="/calendar">Kalender</NavLink>
                        <NavLink className="navItem" to="/contact">Kontakt</NavLink>
                        <NavLink className="navItem" to="/aboutus">Über uns</NavLink>
                        {user ? (
                            <div className="navItem logout" onClick={handleLogout}>Logout</div>
                        ) : (
                            <div className="navItem login" onClick={() => setShowLogin(true)}>Login</div>
                        )}
                    </div>
                </div>
            </div>
            {showLogin && <LoginWindow onClose={() => setShowLogin(false)} />}
        </>
    );
};

export default Navbar;
