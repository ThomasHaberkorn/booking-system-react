
import React, { useState, useEffect } from 'react';
import './calendar.scss';
import appointmentsData from './../../assets/data/appointments.jsx';
import sampleAppointments from './../../assets/data/sampleAppointments.jsx';
import patientsData from './../../assets/data/patients.jsx'; // Lokale Patienten importieren
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db, auth } from './../../firebase-config';
import { onAuthStateChanged } from "firebase/auth";

const Calendar = () => {
    const [appointments] = useState([...appointmentsData, ...sampleAppointments]);
    const [firebaseAppointments, setFirebaseAppointments] = useState([]);
    const [patients, setPatients] = useState([...patientsData]); // Initialisierung mit lokalen Patienten
    const [userRole, setUserRole] = useState("guest");
    const [userId, setUserId] = useState(null);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const hours = Array.from({ length: 10 }, (_, i) => `${8 + i}:00`);

    // Nutzerrolle und ID abrufen
    useEffect(() => {
        const fetchUserRole = async () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    console.log("User logged in:", user.uid);
                    setUserId(user.uid);

                    try {
                        const userDocRef = doc(db, "users", user.uid);
                        const userDocSnap = await getDoc(userDocRef);
                        if (userDocSnap.exists()) {
                            const userData = userDocSnap.data();
                            console.log("User Data from Firestore:", userData);

                            setUserRole(userData?.status || "guest");
                            console.log("User Role:", userData?.status || "guest");
                        } else {
                            console.log("No such user document!");
                        }
                    } catch (error) {
                        console.error("Error fetching user role:", error);
                    }
                } else {
                    console.log("No user logged in.");
                }
            });
        };

        fetchUserRole();
    }, []);


    useEffect(() => {
        const handleLogoutReset = () => {
            setUserRole("guest"); // Rolle zurücksetzen
            setUserId(null); // Benutzer-ID zurücksetzen
        };
    
        // Event-Listener hinzufügen
        window.addEventListener("userLoggedOut", handleLogoutReset);
    
        // Event-Listener beim Verlassen des Components entfernen
        return () => {
            window.removeEventListener("userLoggedOut", handleLogoutReset);
        };
    }, []);
    

    // Termine und Patienten aus Firebase abrufen
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "appointments"));
                const fetchedAppointments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                console.log("Appointments from Firestore:", fetchedAppointments);
                setFirebaseAppointments(fetchedAppointments);
            } catch (error) {
                console.error("Error fetching appointments from Firebase:", error);
            }
        };

        const fetchPatients = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const fetchedPatients = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                console.log("Patients from Firestore:", fetchedPatients);

                // Patienten kombinieren
                setPatients(prevPatients => [...prevPatients, ...fetchedPatients]);
            } catch (error) {
                console.error("Error fetching patients from Firebase:", error);
            }
        };

        fetchAppointments();
        fetchPatients();
    }, []);

    // Patientennamen basierend auf der patientId holen
    const getPatientName = (patientId) => {
        const patient = patients.find(p => p.id === patientId);
        console.log("Patient ID:", patientId, "Patient Name:", patient?.name || "Unbekannt");
        return patient ? patient.name : 'Unbekannt';
    };

    // Alle Termine kombinieren
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
            <div className="time-cell">{hour}</div>
            {days.map((day) => {
                const appointment = combinedAppointments.find(
                    (appt) => appt.day === day && appt.time === hour
                );

                return (
                    <div className="cell" key={`${day}-${hour}`}>
                        {Array.from({ length: 4 }).map((_, therapistIndex) => {
                            const therapistData = appointment?.therapists[therapistIndex];
                            const isFree = !therapistData || !therapistData.patientId;
                            const isOwnAppointment = therapistData?.patientId === userId;
                            const isBlocked = !isFree && userRole !== 'admin' && !isOwnAppointment;

                            return (
                                <div
                                    key={therapistIndex}
                                    className={`quadrant ${
                                        isFree
                                            ? 'free'
                                            : isOwnAppointment
                                            ? 'own'
                                            : isBlocked
                                            ? 'blocked'
                                            : 'admin-view'
                                    }`}
                                >
                                    {isFree
                                        ? 'Frei'
                                        : isOwnAppointment
                                        ? 'Dein Termin'
                                        : isBlocked
                                        ? 'Geblockt'
                                        : getPatientName(therapistData.patientId) || 'Unbekannt'}
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
