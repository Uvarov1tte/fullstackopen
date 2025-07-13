import { diagnoses } from "../types/diagnoses";

import data from "../data/diagnoses";

const getDiagnoses = (): diagnoses[] => {
    return data;
};

export default {
    getDiagnoses
}