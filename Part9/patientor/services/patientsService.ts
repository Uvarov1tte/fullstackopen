import data from "../data/patients";
import { v1 as uuid } from "uuid";
import { patients, nonSensitive, Gender, newPatientEntry } from "../types/patients";

let patients: patients[] = data.map(({ id, name, dateOfBirth, gender, occupation, ssn }) => ({
    id,
    dateOfBirth,
    name,
    occupation,
    gender: Gender[gender as keyof typeof Gender],
    ssn,
}))

const getPatients = (): nonSensitive[] => {
    const patients: nonSensitive[] = data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        dateOfBirth,
        name,
        occupation,
        gender: Gender[gender as keyof typeof Gender]
    }))

    return patients;
};

const addPatient = (entry: newPatientEntry): patients => {
    const addedEntry: patients = {
        id: uuid(),
        ...entry
    }

    patients.push(addedEntry)
    return (addedEntry)
}

export default { getPatients, addPatient };