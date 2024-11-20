// import React, { useState, useEffect } from 'react';
// import './calendar.scss';
// import appointmentsData from './../../assets/data/appointments.jsx';
// import sampleAppointments from './../../assets/data/sampleAppointments.jsx';
// import patientsData from './../../assets/data/patients.jsx'; // Lokale Patienten importieren
// import { collection, getDocs, addDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
// import { db, auth } from './../../firebase-config';
// import { onAuthStateChanged } from "firebase/auth";

// const Calendar = () => {
//     const [appointments] = useState([...appointmentsData, ...sampleAppointments]);
//     const [firebaseAppointments, setFirebaseAppointments] = useState([]);
//     const [patients, setPatients] = useState([...patientsData]); // Initialisierung mit lokalen Patienten
//     const [userRole, setUserRole] = useState("guest");
//     const [userId, setUserId] = useState(null);

//     const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
//     const hours = Array.from({ length: 10 }, (_, i) => `${8 + i}:00`);

//     // Nutzerrolle und ID abrufen
//     useEffect(() => {
//         const fetchUserRole = async () => {
//             onAuthStateChanged(auth, async (user) => {
//                 if (user) {
//                     console.log("User logged in:", user.uid);
//                     setUserId(user.uid);

//                     try {
//                         const userDocRef = doc(db, "users", user.uid);
//                         const userDocSnap = await getDoc(userDocRef);
//                         if (userDocSnap.exists()) {
//                             const userData = userDocSnap.data();
//                             console.log("User Data from Firestore:", userData);

//                             setUserRole(userData?.status || "guest");
//                             console.log("User Role:", userData?.status || "guest");
//                         } else {
//                             console.log("No such user document!");
//                         }
//                     } catch (error) {
//                         console.error("Error fetching user role:", error);
//                     }
//                 } else {
//                     console.log("No user logged in.");
//                 }
//             });
//         };

//         fetchUserRole();
//     }, []);

//     // Firebase-Daten abrufen
//     useEffect(() => {
//         const fetchAppointments = async () => {
//             try {
//                 const querySnapshot = await getDocs(collection(db, "appointments"));
//                 const fetchedAppointments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//                 console.log("Appointments from Firestore:", fetchedAppointments);
//                 setFirebaseAppointments(fetchedAppointments);
//             } catch (error) {
//                 console.error("Error fetching appointments from Firebase:", error);
//             }
//         };

//         const fetchPatients = async () => {
//             try {
//                 const querySnapshot = await getDocs(collection(db, "users"));
//                 const fetchedPatients = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//                 console.log("Patients from Firestore:", fetchedPatients);

//                 setPatients(prevPatients => [...prevPatients, ...fetchedPatients]);
//             } catch (error) {
//                 console.error("Error fetching patients from Firebase:", error);
//             }
//         };

//         fetchAppointments();
//         fetchPatients();
//     }, []);

//     // Patientennamen basierend auf der patientId holen
//     const getPatientName = (patientId) => {
//         const patient = patients.find(p => p.id === patientId);
//         return patient ? patient.name : 'Unbekannt';
//     };

//     // Alle Termine kombinieren
//     const combinedAppointments = [...appointments, ...firebaseAppointments];

//     // Termin blockieren oder abbestellen
//     const handleToggleAppointment = async (day, time, therapistIndex, existingAppointment) => {
//         try {
//             if (existingAppointment) {
//                 const confirmCancel = window.confirm("Möchten Sie diesen Termin wirklich absagen?");
//                 if (confirmCancel) {
//                     // Termin löschen
//                     await deleteDoc(doc(db, "appointments", existingAppointment.id));
//                     setFirebaseAppointments(prev =>
//                         prev.filter(appt => appt.id !== existingAppointment.id)
//                     );
//                     console.log("Appointment cancelled:", existingAppointment.id);
//                 }
//             } else {
//                 // Termin blockieren
//                 const newAppointment = {
//                     day,
//                     time,
//                     therapists: [null, null, null, null],
//                 };
//                 newAppointment.therapists[therapistIndex] = {
//                     patientId: userId,
//                     status: 'blocked',
//                 };

//                 const docRef = await addDoc(collection(db, "appointments"), newAppointment);
//                 console.log("Blocked appointment added with ID:", docRef.id);

//                 setFirebaseAppointments(prev => [...prev, { id: docRef.id, ...newAppointment }]);
//             }
//         } catch (error) {
//             console.error("Error toggling appointment:", error);
//         }
//     };

//     return (
//         <div className="calendar">
//             <div className="header">
//                 <div className="time-header"></div>
//                 {days.map((day) => (
//                     <div key={day} className="day-header">{day}</div>
//                 ))}
//             </div>
//             <div className="body">
//                 {hours.map((hour) => (
//                     <div key={hour} className="row">
//                         <div className="time-cell">{hour}</div>
//                         {days.map((day) => {
//                             const appointment = combinedAppointments.find(
//                                 (appt) => appt.day === day && appt.time === hour
//                             );

//                             return (
//                                 <div className="cell" key={`${day}-${hour}`}>
//                                     {Array.from({ length: 4 }).map((_, therapistIndex) => {
//                                         const therapistData = appointment?.therapists[therapistIndex];
//                                         const isFree = !therapistData || !therapistData.patientId;
//                                         const isOwnAppointment = therapistData?.patientId === userId;
//                                         const isBlocked = !isFree && userRole !== 'admin' && !isOwnAppointment;

//                                         return (
//                                             <div
//                                                 key={therapistIndex}
//                                                 className={`quadrant ${
//                                                     isFree
//                                                         ? 'free'
//                                                         : isOwnAppointment
//                                                         ? 'own'
//                                                         : isBlocked
//                                                         ? 'blocked'
//                                                         : 'admin-view'
//                                                 }`}
//                                                 onClick={() =>
//                                                     isFree || isOwnAppointment
//                                                         ? handleToggleAppointment(day, hour, therapistIndex, appointment)
//                                                         : null
//                                                 }
//                                             >
//                                                 {isFree
//                                                     ? 'Frei'
//                                                     : isOwnAppointment
//                                                     ? 'Dein Termin'
//                                                     : isBlocked
//                                                     ? 'Geblockt'
//                                                     : getPatientName(therapistData.patientId) || 'Unbekannt'}
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Calendar;


import React, { useState, useEffect } from 'react';
import './calendar.scss';
import appointmentsData from './../../assets/data/appointments.jsx';
import sampleAppointments from './../../assets/data/sampleAppointments.jsx';
import patientsData from './../../assets/data/patients.jsx';
import { collection, getDocs, addDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
import { db, auth } from './../../firebase-config';
import { onAuthStateChanged } from "firebase/auth";
import ConfirmModal from './../../assets/service/ConfirmModal.jsx';




const Calendar = () => {
    const [appointments] = useState([...appointmentsData, ...sampleAppointments]);
    const [firebaseAppointments, setFirebaseAppointments] = useState([]);
    const [patients, setPatients] = useState([...patientsData]);
    const [userRole, setUserRole] = useState("guest");
    const [userId, setUserId] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false); // Steuerung für modalen Dialog
    const [selectedAppointment, setSelectedAppointment] = useState(null); // Aktueller Termin

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const hours = Array.from({ length: 10 }, (_, i) => `${8 + i}:00`);

    useEffect(() => {
        const fetchUserRole = async () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    setUserId(user.uid);

                    try {
                        const userDocRef = doc(db, "users", user.uid);
                        const userDocSnap = await getDoc(userDocRef);
                        if (userDocSnap.exists()) {
                            const userData = userDocSnap.data();
                            setUserRole(userData?.status || "guest");
                        }
                    } catch (error) {
                        console.error("Error fetching user role:", error);
                    }
                }
            });
        };

        fetchUserRole();
    }, []);



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

        // const fetchPatients = async () => {
        //     try {
        //         const querySnapshot = await getDocs(collection(db, "users"));
        //         const fetchedPatients = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        //         setPatients(prevPatients => [...prevPatients, ...fetchedPatients]);
        //     } catch (error) {
        //         console.error("Error fetching patients from Firebase:", error);
        //     }
        // };

        const fetchPatients = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const firebasePatients = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
                // Kombiniere lokale und Firebase-Patienten
                const combinedPatients = [...patientsData, ...firebasePatients];
    
                // Entferne Duplikate basierend auf der ID
                const uniquePatients = combinedPatients.reduce((acc, current) => {
                    const exists = acc.find(patient => patient.id === current.id);
                    if (!exists) acc.push(current);
                    return acc;
                }, []);
    
                setPatients(uniquePatients);
            } catch (error) {
                console.error("Error fetching patients from Firebase:", error);
            }
        };

        fetchAppointments();
        fetchPatients();
    }, []);

    // const getPatientName = (patientId) => {
    //     const patient = patients.find(p => p.id === patientId);
    //     return patient ? patient.name : 'Unbekannt';
    // };

    // const getPatientName = (patientId) => {
    //     if (!patientId) return "Unbekannt";
    //     const patient = patients.find(p => p.id === patientId);
    //     console.log("Admin view - Patient ID:", patientId, "Name:", patient?.name || "Unbekannt");
    //     return patient ? patient.name : "Unbekannt";
    // };
    
    const getPatientName = (patientId) => {
        if (!patientId) return "Unbekannt"; // Falls keine Patient-ID vorhanden
        const patient = patients.find(p => p.id === patientId);
        console.log("Admin view - Patient ID:", patientId, "Name:", patient?.name || "Unbekannt");
        return patient ? patient.name : "Unbekannt"; // Suche in der kombinierten Patientenliste
    };
    

    const combinedAppointments = [...appointments, ...firebaseAppointments];

    // Termin blockieren oder anzeigen, wenn Termin gelöscht werden soll
    const handleToggleAppointment = async (day, time, therapistIndex, existingAppointment) => {
        if (existingAppointment) {
            setSelectedAppointment(existingAppointment);
            setShowConfirm(true);
        } else {
            try {
                let patientName = "Unbekannt";
    
                // Benutzerinformationen aus Firebase laden
                const userDocRef = doc(db, "users", userId);
                const userDocSnap = await getDoc(userDocRef);
    
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    patientName = userData.name || "Unbekannt";
                }
    
                const newAppointment = {
                    day,
                    time,
                    therapists: [null, null, null, null],
                };
    
                // Speichere patientId und name
                newAppointment.therapists[therapistIndex] = {
                    patientId: userId,
                    name: patientName,
                    status: 'blocked',
                };
    
                const docRef = await addDoc(collection(db, "appointments"), newAppointment);
                setFirebaseAppointments(prev => [...prev, { id: docRef.id, ...newAppointment }]);
            } catch (error) {
                console.error("Error adding appointment:", error);
            }
        }
    };
    
    // Termin löschen nach Bestätigung
    const confirmDeleteAppointment = async () => {
        try {
            await deleteDoc(doc(db, "appointments", selectedAppointment.id));
            setFirebaseAppointments(prev =>
                prev.filter(appt => appt.id !== selectedAppointment.id)
            );
            setShowConfirm(false);
            setSelectedAppointment(null);
        } catch (error) {
            console.error("Error deleting appointment:", error);
        }
    };

    return (
        <>
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
                                                    onClick={() =>
                                                        isFree || isOwnAppointment
                                                            ? handleToggleAppointment(day, hour, therapistIndex, appointment)
                                                            : null
                                                    }
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
            </div>

            {/* Modaler Dialog für Bestätigung */}
            {showConfirm && (
                <ConfirmModal
                    message="Möchten Sie diesen Termin wirklich absagen?"
                    onConfirm={confirmDeleteAppointment}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </>
    );
};

export default Calendar;
