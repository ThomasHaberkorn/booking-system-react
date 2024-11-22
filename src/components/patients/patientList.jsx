import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase-config.js";
import patientsData from "../../assets/data/patients.jsx";
import "./patientList.scss";

const PatientList = () => {
    const [patients] = useState([...patientsData]);
    const [firebasePatients, setFirebasePatients] = useState([]);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null); // Rolle initial auf null setzen
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedPatient, setEditedPatient] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUserId(user.uid);

                try {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUserRole(userData?.status || "guest");
                    } else {
                        setUserRole("guest");
                    }
                } catch (error) {
                    console.error("Fehler beim Laden der Benutzerrolle:", error);
                    setUserRole("guest");
                }
            } else {
                setUserRole("guest");
            }
        });
        return () => unsubscribe();
    }, []);

    // Firebase-Patienten laden
    useEffect(() => {
        const fetchFirebasePatients = async () => {
            if (!userId) return;

            try {
                const querySnapshot = await getDocs(collection(db, `users/${userId}/patients`));
                const fetchedPatients = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setFirebasePatients(fetchedPatients);
            } catch (error) {
                console.error("Fehler beim Laden der Firebase-Patienten:", error);
            }
        };

        fetchFirebasePatients();
    }, [userId]);

    // Lokale und Firebase-Daten kombinieren
    const combinedPatients = patients.map((localPatient) => {
        const firebasePatient = firebasePatients.find((p) => p.id === localPatient.id);
        return firebasePatient || localPatient;
    });

    // Wenn die Rolle noch nicht gesetzt ist, lade die Seite nicht
    if (userRole === null) {
        return <div>Laden...</div>;
    }

    // Wenn der Benutzer nicht admin ist, verweigere den Zugriff
    if (userRole !== "admin") {
        return <div>Sie haben keine Berechtigung, diese Seite zu sehen.</div>;
    }

    // Bearbeitung starten
    const startEditing = (index) => {
        setEditingIndex(index);
        setEditedPatient({ ...combinedPatients[index] });
    };

    // Bearbeitung speichern
    const saveEditing = async () => {
        if (!editedPatient || !userId) return;

        try {
            const docRef = doc(db, `users/${userId}/patients`, editedPatient.id);
            await setDoc(docRef, editedPatient);

            setFirebasePatients((prev) =>
                [...prev.filter((p) => p.id !== editedPatient.id), editedPatient]
            );

            setEditingIndex(null);
            setEditedPatient(null);
        } catch (error) {
            console.error("Fehler beim Speichern des bearbeiteten Patienten:", error);
        }
    };

    // Bearbeitung abbrechen
    const cancelEditing = () => {
        setEditingIndex(null);
        setEditedPatient(null);
    };

    return (
        <div className="patient-list">
            <h2>Patientenliste</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Telefon</th>
                        <th>Aktionen</th>
                    </tr>
                </thead>
                <tbody>
                    {combinedPatients.map((patient, index) => (
                        <tr key={patient.id}>
                            {editingIndex === index ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            value={editedPatient.name}
                                            onChange={(e) =>
                                                setEditedPatient({
                                                    ...editedPatient,
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="email"
                                            value={editedPatient.email}
                                            onChange={(e) =>
                                                setEditedPatient({
                                                    ...editedPatient,
                                                    email: e.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editedPatient.phone}
                                            onChange={(e) =>
                                                setEditedPatient({
                                                    ...editedPatient,
                                                    phone: e.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <button onClick={saveEditing}>Speichern</button>
                                        <button onClick={cancelEditing}>Abbrechen</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{patient.name}</td>
                                    <td>{patient.email}</td>
                                    <td>{patient.phone || "Keine Nummer"}</td>
                                    <td>
                                        <button onClick={() => startEditing(index)}>Bearbeiten</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PatientList;
