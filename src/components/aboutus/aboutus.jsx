import React, { Component } from 'react';
import "./aboutus.scss";
import alex from './../../assets/img/alexander.jpeg';
import julia from './../../assets/img/julia.jpeg';
import lisa from './../../assets/img/lisa.jpeg';
import clara from './../../assets/img/clara.jpeg';


const AboutUs = () => (
        <div className="innerContent">
            <div className="column">
                <div className="imgContainer"><img src={alex} alt="" /></div>
                <div className="textContainer">
                    <div className="title"><h4>Alexander Braun</h4></div>
                    <h5>Spezialgebiet: Sportphysiotherapie & Rehabilitation</h5>
                    Alexander ist ein erfahrener Sportphysiotherapeut, der jahrelang mit Profi-Athleten gearbeitet hat. Sein Fokus liegt darauf, Sportverletzungen effizient zu behandeln und die Leistungsfähigkeit seiner Patienten wiederherzustellen. Mit seiner Leidenschaft für Bewegung hilft er nicht nur Sportlern, sondern auch Alltagshelden, wieder fit zu werden.
                </div>
            </div>
            <div className="column">
                <div className="imgContainer"><img src={julia} alt="" /></div>
                <div className="textContainer">
                    <div className="title"><h4>Julia Richter</h4></div>
                    <h5>Spezialgebiet: Kinder- und Jugendphysiotherapie</h5>
                    Julia hat eine herzliche Art und ein besonderes Talent, mit Kindern und Jugendlichen zu arbeiten. Sie ist spezialisiert auf die Behandlung von Entwicklungsstörungen, Haltungsproblemen und Verletzungen im Wachstum. Ihr Ziel ist es, den kleinen Patienten spielerisch zu helfen, ein gesundes Körpergefühl zu entwickeln.
                </div>
            </div>
            <div className="column">
                <div className="imgContainer"><img src={lisa} alt="" /></div>
                <div className="textContainer">
                    <div className="title"><h4>Lisa Meier</h4></div>
                    <h5>Spezialgebiet: Prävention und Ergonomieberatung</h5>
                    Lisa ist Expertin für präventive Physiotherapie und hilft Menschen, Beschwerden vorzubeugen. Ob Arbeitsplatzanalyse, ergonomische Tipps oder gezielte Übungen – sie unterstützt ihre Patienten dabei, langfristig gesund und beweglich zu bleiben.
                </div>
            </div>
            <div className="column">
                <div className="imgContainer"><img src={clara} alt="" /></div>
                <div className="textContainer">
                    <div className="title"><h4>Clara Weber</h4></div>
                    <h5>Spezialgebiet: Schmerztherapie & Entspannungstechniken</h5>
                    Clara hat sich auf die Behandlung von chronischen Schmerzen und stressbedingten Verspannungen spezialisiert. Mit gezielten Techniken wie manueller Therapie, Triggerpunktmassage und Atemübungen hilft sie ihren Patienten, Schmerzen zu lindern und wieder Lebensqualität zu gewinnen.
                </div>
            </div>
        </div>
    );

    export default AboutUs;