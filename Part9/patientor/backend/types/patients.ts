import { z } from "zod";
import { newEntrySchemna } from "../utils/utils";

export interface patients {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: Gender;
    occupation: string;
};

export enum Gender {
    male = "male",
    female = "female",
    other = "other"
};

export type newPatientEntry = z.infer<typeof newEntrySchemna>;
export type nonSensitive = Omit<patients, 'ssn'>;