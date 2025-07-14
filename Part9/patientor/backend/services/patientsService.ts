import patientData from "../data/patients";
import { v1 as uuid } from "uuid";
import { Patient, nonSensitive, newPatientEntry, NewEntry, Entry } from "../types";

const patients = patientData

const getPatients = (): nonSensitive[] => {
    const patients: nonSensitive[] = patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        dateOfBirth,
        name,
        occupation,
        gender,
        entries
    }))

    return patients;
};

const addPatient = (entry: newPatientEntry): Patient => {
    const addedPatient: Patient = {
        id: uuid(),
        ...entry,
        entries: []
    }

    patients.push(addedPatient)
    return (addedPatient)
}

const addEntry = (patientId: string, entry: NewEntry): Entry => {
    const addedEntry: Entry = {
        id: uuid(),
        ...entry,
    }

    const patient = patients.find((p) => p.id === patientId)

    if (!patient) {
        throw new Error("Unable to find patient")
    }

    patient.entries.push(addedEntry)
    return addedEntry

}

export default { getPatients, addPatient, addEntry };