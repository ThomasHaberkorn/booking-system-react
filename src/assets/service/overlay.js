import React from "react";
import {createRoot} from "react-dom/client";
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

    // Container für das Overlay erstellen
    const overlayElement = document.createElement("div");
    overlayRoot.appendChild(overlayElement);

    // Root erstellen und rendern
    const root = createRoot(overlayElement);
    root.render(<Overlay />);

    // Overlay nach 3 Sekunden entfernen
    setTimeout(() => {
        root.unmount();
        overlayRoot.removeChild(overlayElement);
    }, 3000);
};

export default showOverlay;
