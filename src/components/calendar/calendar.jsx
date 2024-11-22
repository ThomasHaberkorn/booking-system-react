import React, { useState, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import './calendar.scss';
import appointmentsData from './../../assets/data/appointments.jsx';
// import sampleAppointments from './../../assets/data/sampleAppointments.jsx';
import patientsData from './../../assets/data/patients.jsx';
import { collection, getDocs, addDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
import { db, auth } from './../../firebase-config';
import { onAuthStateChanged } from "firebase/auth";
import ConfirmModal from './../../assets/service/ConfirmModal.jsx';
import LoginWindow from '../loginWindow/loginWindow';

const Calendar = forwardRef((props, ref) => {
    const [appointments] = useState([...appointmentsData]);
    const [firebaseAppointments, setFirebaseAppointments] = useState([]);
    const [patients, setPatients] = useState([...patientsData]);
    const [userRole, setUserRole] = useState("guest");
    const [userId, setUserId] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [reloadKey, setReloadKey] = useState(0);
    const [showLogin, setShowLogin] = useState(false); 
    const [pendingBooking, setPendingBooking] = useState(null); 

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const hours = Array.from({ length: 10 }, (_, i) => `${8 + i}:00`);

    useImperativeHandle(ref, () => ({
        reloadCalendar: () => setReloadKey(prevKey => prevKey + 1)
    }));

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

        const fetchPatients = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const firebasePatients = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                const combinedPatients = [...patientsData, ...firebasePatients];
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
    }, [reloadKey]);



    const getPatientName = (therapistData) => {
        if (!therapistData) return "Unbekannt";
        if (therapistData.name) return therapistData.name;

        const patient = patients.find(p => p.id === therapistData.patientId);
        return patient ? patient.name : "Unbekannt";
    };

    const combinedAppointments = [...appointments, ...firebaseAppointments];

const handleToggleAppointment = useCallback(async (day, time, therapistIndex, existingAppointment) => {
    if (!userId) {
        setPendingBooking({ day, time, therapistIndex });
        setShowLogin(true); 
        return;
    }

    if (existingAppointment) {
        setSelectedAppointment(existingAppointment);
        setShowConfirm(true);
    } else {
        try {
            let patientName = "Unbekannt";
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
}, [userId]);

// useEffect nutzt die Funktion nach ihrer Definition
useEffect(() => {
    if (userId && pendingBooking) {
        const { day, time, therapistIndex } = pendingBooking;
        handleToggleAppointment(day, time, therapistIndex);
        setPendingBooking(null); 
    }
}, [userId, pendingBooking, handleToggleAppointment]);

    
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
            <div key={reloadKey} className="calendar">
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
                                                        : getPatientName(therapistData)}
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

            {showConfirm && (
                <ConfirmModal
                    message="Möchten Sie diesen Termin wirklich absagen?"
                    onConfirm={confirmDeleteAppointment}
                    onCancel={() => setShowConfirm(false)}
                />
            )}

            {showLogin && (
                <LoginWindow onClose={() => setShowLogin(false)} />
            )}
        </>
    );
});

export default Calendar;
