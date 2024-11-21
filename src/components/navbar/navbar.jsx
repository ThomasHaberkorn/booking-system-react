


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
            await logout(); // Logout durchführen
            setUser(null); // Benutzer zurücksetzen
    
            // Event für Logout auslösen
            const logoutEvent = new CustomEvent("userLoggedOut");
            window.dispatchEvent(logoutEvent);
    
            showOverlay("Erfolgreich ausgeloggt!");
    
            // Seite neu laden, falls sich der Benutzer auf der Kalender-Seite befindet
            if (window.location.pathname === "/calendar") {
                window.location.reload(); // Seite neu laden
            }
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
