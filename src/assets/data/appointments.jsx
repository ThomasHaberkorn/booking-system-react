const appointments = [
    { 
        day: "Monday", 
        time: "08:00", 
        therapists: [
            { patientId: "patient1", therapistName: "Therapeut 1" },
            null, 
            null, 
            null
        ]
    },
    { 
        day: "Monday", 
        time: "09:00", 
        therapists: [
            null, 
            { patientId: "patient2", therapistName: "Therapeut 2" },
            null, 
            null
        ]
    },
    { 
        day: "Monday", 
        time: "10:00", 
        therapists: [
            null, 
            null, 
            { patientId: "patient3", therapistName: "Therapeut 3" },
            null
        ]
    },
    { 
        day: "Monday", 
        time: "11:00", 
        therapists: [
            null, 
            null, 
            null, 
            { patientId: "patient4", therapistName: "Therapeut 4" }
        ]
    },
    { 
        day: "Monday", 
        time: "12:00", 
        therapists: [
            { patientId: "patient1", therapistName: "Therapeut 1" },
            { patientId: "patient2", therapistName: "Therapeut 2" },
            null, 
            null
        ]
    },
    { 
        day: "Tuesday", 
        time: "08:00", 
        therapists: [
            null, 
            null, 
            { patientId: "patient3", therapistName: "Therapeut 3" },
            null
        ]
    },
    { 
        day: "Tuesday", 
        time: "09:00", 
        therapists: [
            { patientId: "patient4", therapistName: "Therapeut 4" },
            null, 
            null, 
            null
        ]
    },
    { 
        day: "Tuesday", 
        time: "10:00", 
        therapists: [
            null, 
            { patientId: "patient2", therapistName: "Therapeut 2" },
            { patientId: "patient3", therapistName: "Therapeut 3" },
            null
        ]
    },
    { 
        day: "Tuesday", 
        time: "11:00", 
        therapists: [
            null, 
            null, 
            null, 
            { patientId: "patient4", therapistName: "Therapeut 4" }
        ]
    },
    { 
        day: "Tuesday", 
        time: "12:00", 
        therapists: [
            { patientId: "patient1", therapistName: "Therapeut 1" },
            null, 
            { patientId: "patient3", therapistName: "Therapeut 3" },
            null
        ]
    },
    { 
        day: "Wednesday", 
        time: "08:00", 
        therapists: [
            { patientId: "patient2", therapistName: "Therapeut 2" },
            { patientId: "patient4", therapistName: "Therapeut 4" },
            null, 
            null
        ]
    },
    
];

export default appointments;
