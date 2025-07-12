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

export interface newPatient{
    name: string,
    dateOfBirth: string,
    ssn: string;
    gender: string;
    occupation: string
}

export type nonSensitive = Omit<patients, 'ssn'>;