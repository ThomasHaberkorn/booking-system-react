import React, { useState, useEffect } from 'react';
import './calendar.scss';
import appointmentsData from './../../assets/data/appointments.jsx';
import { collection, getDocs, addDoc } from "firebase/firestore"; // Firebase Funktionen
import { db } from './../../firebase-config';


const Calendar = () => {
    // Beispiel-Daten für Termine (lokal)
    const [appointments] = useState(appointmentsData);


    // Daten aus Firebase
    const [firebaseAppointments, setFirebaseAppointments] = useState([]);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const hours = Array.from({ length: 10 }, (_, i) => `${8 + i}:00`);

    // Firebase-Daten abrufen
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "appointments"));
                const fetchedAppointments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setFirebaseAppointments(fetchedAppointments);
            } catch (error) {
                console.error("Error fetching appointments from Firebase:", error);
            }
        };

        fetchAppointments();
    }, []);

    // Termin buchen
    const handleBooking = async (day, time, therapistIndex) => {
        // Update Firebase
        try {
            const newAppointment = {
                day,
                time,
                therapists: [null, null, null, null]
            };
            newAppointment.therapists[therapistIndex] = 'You';

            const docRef = await addDoc(collection(db, "appointments"), newAppointment);
            console.log("Appointment added with ID:", docRef.id);

            // Update Firebase-Daten im State
            setFirebaseAppointments([...firebaseAppointments, { id: docRef.id, ...newAppointment }]);
            alert(`Termin am ${day} um ${time} gebucht!`);
        } catch (error) {
            console.error("Error adding appointment to Firebase:", error);
        }
    };

    // Lokale und Firebase-Daten kombinieren
    const combinedAppointments = [...appointments, ...firebaseAppointments];

    return (
        <div className="calendar">
            <div className="header">
                <div className="time-header"></div>
                {days.map((day) => (
                    <div key={day} className="day-header">{day}</div>
                ))}
            </div>
            <div className="body">
                {hours.map((hour) => (
                    <div key={hour} className="row">
                        {/* Uhrzeit-Spalte */}
                        <div className="time-cell">{hour}</div>
                        {/* Tage-Spalten */}
                        {days.map((day) => {
                            const appointment = combinedAppointments.find(
                                (appt) => appt.day === day && appt.time === hour
                            );

                            return (
                                <div className="cell" key={`${day}-${hour}`}>
                                    {Array.from({ length: 4 }).map((_, therapistIndex) => {
                                        const therapist = appointment?.therapists[therapistIndex];

                                        return (
                                            <div
                                                key={therapistIndex}
                                                className={`quadrant ${
                                                    therapist ? 'booked' : 'free'
                                                }`}
                                                onClick={() =>
                                                    !therapist && handleBooking(day, hour, therapistIndex)
                                                }
                                            >
                                                {therapist || 'Frei'}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <div className="legend">
                <h3>Legende</h3>
                <ul>
                    <li style={{ backgroundColor: '#e8f5e9' }}>Therapeut 1: Alexander</li>
                    <li style={{ backgroundColor: '#e3f2fd' }}>Therapeut 2: Julia</li>
                    <li style={{ backgroundColor: '#f3e5f5' }}>Therapeut 3: Lisa</li>
                    <li style={{ backgroundColor: '#fff3e0' }}>Therapeut 4: Clara</li>
                </ul>
            </div>
        </div>
    );
};

export default Calendar;
