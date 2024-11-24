import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../firebase-config.js";
import patientsData from "../../assets/data/patients.jsx";
import "./patientList.scss";
import { useNavigate } from "react-router-dom";

const PatientList = () => {
    const [patients] = useState([...patientsData]);
    const [firebasePatients, setFirebasePatients] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedPatient, setEditedPatient] = useState(null);
    const navigate = useNavigate();

    // Authentifizierung überprüfen
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (!user) {
                navigate("/"); 
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    // Firebase-Patienten laden
    useEffect(() => {
        const fetchFirebasePatients = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const fetchedPatients = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name || "Unbekannt",
                    email: doc.data().email || "Keine Email",
                    phone: doc.data().phone || "Keine Nummer",
                }));
                setFirebasePatients(fetchedPatients);
            } catch (error) {
                console.error("Fehler beim Laden der Firebase-Patienten:", error);
            }
        };

        fetchFirebasePatients();
    }, []);

    // Patienten kombinieren und sortieren
    const combinedPatients = [...firebasePatients, ...patients]
        .reduce((acc, current) => {
            const exists = acc.find((p) => p.id === current.id);
            if (!exists) acc.push(current);
            return acc;
        }, [])
        .sort((a, b) => a.name.localeCompare(b.name));

    // Bearbeitung starten
    const startEditing = (index) => {
        setEditingIndex(index);
        setEditedPatient({ ...combinedPatients[index] });
    };

    // Bearbeitung speichern
    const saveEditing = async () => {
        if (!editedPatient) return;

        try {
            const docRef = doc(db, "users", editedPatient.id);
            await setDoc(docRef, {
                ...editedPatient,
                id: editedPatient.id,
            });
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
