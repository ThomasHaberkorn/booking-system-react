import React, { useRef } from "react";
import "./home.scss";
import therapeut from "./../../assets/img/therapeut.jpeg";
import { gsap } from "gsap";
import InfoText from "./../../assets/service/InfoText";

const Home = () => {
    const instructionDiv = useRef(null);

    const handleMouseEnter = () => {
        gsap.to(instructionDiv.current, {
            opacity: 1,
            duration: 0.5,
            x: -300, 
            ease: "power2.out",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(instructionDiv.current, {
            x: 300, 
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

            {/* InfoText-Komponente */}
            <div
                ref={instructionDiv}
                style={{
                    position: "fixed",
                    top: "8vw",
                    left: "80%",
                    transform: "translate(-50%, -50%)",
                    opacity: 0,
                    x: 300, 
                    display: "block",
                    zIndex: 100,
                }}
            >
                <InfoText onClose={handleMouseLeave} />
            </div>
        </>
    );
};

export default Home;
