// import React from 'react';
// import './contact.scss';
// import map from './../../assets/img/map.webp';

// const Contact = () => {
//     return (
//         <div className="contact">
//             <h1>Kontakt</h1>
//             <div className="contact-details">
//                 <div className="contact-info">
//                     <h2>Kontaktinformationen</h2>
//                     <p><strong>Adresse:</strong> Inselstraße 1, 12345 Lummerland</p>
//                     <p><strong>Telefon:</strong> +49 123 456789</p>
//                     <p><strong>E-Mail:</strong> info@physiovital-lummerland.de</p>
//                     <div className="contact-map">
//                 <h2>Unser Standort</h2>
//                 <img
//                     src={map}
//                     alt="Karte von Lummerland"
//                     className="map-image"
//                 />
//             </div>
//                 </div>
//                 <div className="contact-form">
//                     <h2>Schreiben Sie uns</h2>
//                     <form>
//                         <div className="form-group">
//                             <label htmlFor="name">Name:</label>
//                             <input type="text" id="name" name="name" placeholder="Ihr Name" required />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="email">E-Mail:</label>
//                             <input type="email" id="email" name="email" placeholder="Ihre E-Mail-Adresse" required />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="message">Nachricht:</label>
//                             <textarea id="message" name="message" rows="5" placeholder="Ihre Nachricht" required></textarea>
//                         </div>
//                         <button type="submit" className="submit-button">Absenden</button>
//                     </form>
//                 </div>
//             </div>
            
//         </div>
//     );
// };

// export default Contact;


import React, { useState } from 'react';
import './contact.scss';
import map from './../../assets/img/map.webp';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('https://physio-vital.haberkorn-thomas.de/sendMail.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Deine Formulardaten
            });
    
            if (response.ok) {
                setStatus('Nachricht erfolgreich gesendet!');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('Fehler beim Senden der Nachricht.');
            }
        } catch (error) {
            setStatus('Fehler beim Senden der Nachricht.');
        }
    };

    return (
        <div className="contact">
            <h1>Kontakt</h1>
            <div className="contact-details">
                <div className="contact-info">
                    <h2>Kontaktinformationen</h2>
                    <p><strong>Adresse:</strong> Inselstraße 1, 12345 Lummerland</p>
                    <p><strong>Telefon:</strong> +49 123 456789</p>
                    <p><strong>E-Mail:</strong> info@physiovital-lummerland.de</p>
                    <div className="contact-map">
                        <h2>Unser Standort</h2>
                        <img
                            src={map}
                            alt="Karte von Lummerland"
                            className="map-image"
                        />
                    </div>
                </div>
                <div className="contact-form">
                    <h2>Schreiben Sie uns</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Ihr Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">E-Mail:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Ihre E-Mail-Adresse"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Nachricht:</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                placeholder="Ihre Nachricht"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="submit-button">Absenden</button>
                    </form>
                    {status && <p className="status">{status}</p>}
                </div>
            </div>
        </div>
    );
};

export default Contact;
