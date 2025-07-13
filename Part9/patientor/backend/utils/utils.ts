import { newPatientEntry, Gender } from "../types";
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