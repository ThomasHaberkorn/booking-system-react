// import React from 'react';
// import './home.scss';
// import therapeut from './../../assets/img/therapeut.jpeg';
// import { gsap } from 'gsap';

// const Home = () => (
//     <div className="innerContent">
//         <div className="textContent">
//             <div className="innerTextContent">
//                 <h1>Willkommen bei PhysioVital</h1>
//                 <p>
//                     Wir bieten Ihnen die Möglichkeit, Termine für verschiedene Dienstleistungen zu buchen. 
//                     Wählen Sie einfach die gewünschte Dienstleistung und den passenden Mitarbeiter aus und buchen Sie Ihren Termin.
//                 </p>
//             </div>
//             <div className="infoButton">
//                 <div className="howTo">How to use</div>
               
//             </div>
//         </div>
//         <div className="imgContent">
//             <img src={therapeut} alt="Therapeut" />
//         </div>
//     </div>
// );

// export default Home;

import React, { useRef } from "react";
import "./home.scss";
import therapeut from "./../../assets/img/therapeut.jpeg";
import closeIcon from "./../../assets/img/close.png";
import { gsap } from "gsap";

const Home = () => {
    const instructionDiv = useRef(null);

    const handleMouseEnter = () => {
        gsap.to(instructionDiv.current, {
            x: 0, // Fenster in die Ansicht bringen
            duration: 0.5,
            opacity: 1,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(instructionDiv.current, {
            x: 300, // Fenster aus der Ansicht bewegen
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
        });
    };

    return (
        <>
            <div className="innerContent">
                <div className="textContent">
                    <div className="innerTextContent">
                        <h1>Willkommen bei PhysioVital</h1>
                        <p>
                            Wir bieten Ihnen die Möglichkeit, Termine für verschiedene Dienstleistungen zu buchen. 
                            Wählen Sie einfach die gewünschte Dienstleistung und den passenden Mitarbeiter aus und buchen Sie Ihren Termin.
                        </p>
                    </div>
                    <div className="infoButton">
                        <div
                            className="howTo"
                            onMouseEnter={handleMouseEnter}
                        >
                            How to use
                        </div>
                    </div>
                </div>
                <div className="imgContent">
                    <img src={therapeut} alt="Therapeut" />
                </div>
            </div>
            <div ref={instructionDiv} className="instructions">
                <img
                    src={closeIcon}
                    alt="Close"
                    className="closeButton"
                    onClick={handleMouseLeave}
                />
              <h3>Willkommen auf meinem Buchungssystem</h3>
                <p>Hier findest du Informationen über dieses Projekt:</p>
                <p>Das Ziel dieses Systems ist es, Patienten die Möglichkeit zu geben, online Termine zu buchen. Eine Registrierung ist dafür notwendig.</p>
                <p>Nicht registrierte oder nicht angemeldete Nutzer können zwar freie Termine einsehen, jedoch keine Buchungen vornehmen.</p>
                <p>Sobald sich Patienten registriert haben, können sie Termine buchen und auch wieder stornieren.</p>
                <p>Die Termine anderer Patienten werden im Kalender lediglich als geblockte Zeiten angezeigt, ohne dass persönliche Daten sichtbar sind.</p>
                <h3>Der Mitarbeiterzugang</h3>
                <p>Es wird auch einen speziellen Zugang für Mitarbeiter geben. Dieser Zugang ermöglicht es, alle Termine und die dazugehörigen Patientendaten einzusehen, wie zum Beispiel E-Mail-Adresse und Name. Die Telefonnummer ist optional.</p>
                <div className="infoBN">
                    <p><strong>Benutzername:</strong> Mitarbeiter</p>
                    <p><strong>Passwort:</strong> 123456</p>
                </div>
                <p>Um die hinterlegten Daten zu schützen, können mit dem Mitarbeiterzugang keine Termine oder Patientendaten gelöscht werden.</p>
                <h3>Der Adminzugang</h3>
                <p>Der Adminzugang ermöglicht es, Termine und Patientendaten zu löschen. Diese Zugangsdaten gebe ich jedoch nicht heraus :&#41;</p>
                <h3>Habt viel Spaß und eine wunderschöne Zeit!</h3>

            </div>
        </>
    );
};

export default Home;
