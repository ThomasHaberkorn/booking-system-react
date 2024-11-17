import React from 'react';
import './services.scss';

const Services = () => {
    const services = [
        {
            title: 'Sportphysiotherapie',
            description: 'Effektive Rehabilitation und Prävention von Sportverletzungen. Alexander Braun hilft Ihnen, schneller wieder fit zu werden und Ihre Leistung zu steigern.',
        },
        {
            title: 'Kinder- und Jugendphysiotherapie',
            description: 'Einfühlsame Behandlung für die Jüngsten: Julia Richter unterstützt Kinder und Jugendliche bei Entwicklungsstörungen, Haltungsproblemen und Wachstumsschmerzen.',
        },
        {
            title: 'Manuelle Therapie',
            description: 'Gezielte Mobilisation und Schmerzlinderung durch manuelle Grifftechniken – ideal für akute und chronische Beschwerden.',
        },
        {
            title: 'Schmerztherapie',
            description: 'Individuelle Schmerzbehandlung mit Techniken wie Triggerpunktmassage und Mobilisation. Clara Weber sorgt für spürbare Erleichterung.',
        },
        {
            title: 'Entspannungstechniken',
            description: 'Stressabbau durch Atemübungen, progressive Muskelentspannung und andere Techniken, die Körper und Geist zur Ruhe bringen.',
        },
        {
            title: 'Prävention',
            description: 'Erhalten Sie individuelle Übungspläne und Beratung, um langfristig Beschwerden vorzubeugen. Lisa Meier hilft Ihnen, gesund und aktiv zu bleiben.',
        },
        {
            title: 'Ergonomieberatung',
            description: 'Optimieren Sie Ihren Arbeitsplatz und vermeiden Sie Fehlhaltungen. Lisa Meier zeigt Ihnen, wie Sie Beschwerden vermeiden.',
        },
        {
            title: 'Postoperative Rehabilitation',
            description: 'Gezielte Nachbehandlung nach Operationen, um die Beweglichkeit wiederherzustellen und die Heilung zu unterstützen.',
        },
    ];

    return (
        <div className="serviceContent">
            <h1>Unsere Leistungen</h1>
            <div className="services-list">
                {services.map((service, index) => (
                    <div key={index} className="service-item">
                        <h2>{service.title}</h2>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
