import { newPatientEntry, Gender, Diagnosis } from "../types";
import { z } from "zod";

export const newEntrySchemna = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string().optional(),
    gender: z.nativeEnum(Gender),
    occupation: z.string()
});

export const toNewPatientEntry = (object: unknown): newPatientEntry => {
    return newEntrySchemna.parse(object);
};

export const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [] as Array<Diagnosis['code']>;
    }

    return object.diagnosisCodes as Array<Diagnosis['code']>;
};