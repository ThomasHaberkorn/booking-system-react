import React from "react";
import closeIcon from "./../../assets/img/close.png";
import "./InfoText.scss";

const InfoText = ({ onClose }) => {
    return (
        <div className="instructions">
            <img
                src={closeIcon}
                alt="Close"
                className="closeButton"
                onClick={onClose}
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
            <p>Der Adminzugang ermöglicht es, Termine und Patientendaten zu löschen. Diese Zugangsdaten gebe ich jedoch nicht heraus:&#41;</p>
        </div>
    );
};

export default InfoText;
