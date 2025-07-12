import data from "../data/patients";
import { v1 as uuid } from "uuid";
import { patients, nonSensitive, Gender } from "../types/patients";

let patients: patients[] = data.map(({ id, name, dateOfBirth, gender, occupation, ssn }) => ({
    id,
    dateOfBirth,
    name,
    occupation,
    gender: Gender[gender as keyof typeof Gender],
    ssn: ssn ?? undefined,
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

const addPatient = (
    name: string, dateOfBirth: string, gender: string, occupation: string, ssn: string
): patients => {
    const addedEntry: patients = {
        id: uuid(),
        name,
        dateOfBirth,
        ssn,
        gender: Gender[gender as keyof typeof Gender],
        occupation,
    }

    patients.push(addedEntry)
    return (addedEntry)
}

export default { getPatients, addPatient };