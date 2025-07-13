import patientData from "../data/patients";
import { v1 as uuid } from "uuid";
import { Patient, nonSensitive, newPatientEntry } from "../types";

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
    const addedEntry: Patient = {
        id: uuid(),
        ...entry,
        entries: []
    }

    patients.push(addedEntry)
    return (addedEntry)
}

export default { getPatients, addPatient };