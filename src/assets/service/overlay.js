import React from "react";
import ReactDOM from "react-dom";
import "./overlay.scss";

const showOverlay = (message) => {
    const overlayRoot = document.getElementById("overlay-root");
    if (!overlayRoot) {
        console.error("Fehler: Kein Overlay-Root vorhanden.");
        return;
    }

    // Overlay-Komponente
    const Overlay = () => (
        <div className="overlay">
            <p>{message}</p>
        </div>
    );

    // Overlay anzeigen
    const overlayElement = document.createElement("div");
    overlayRoot.appendChild(overlayElement);
    ReactDOM.render(<Overlay />, overlayElement);

    // Overlay nach 3 Sekunden entfernen
    setTimeout(() => {
        ReactDOM.unmountComponentAtNode(overlayElement);
        overlayRoot.removeChild(overlayElement);
    }, 3000);
};

export default showOverlay;
