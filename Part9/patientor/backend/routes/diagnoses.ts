import express from "express";
import { diagnoses } from "../types/diagnoses";
import  diagnosesService  from "../services/diagnosesService"

const router = express.Router();

router.get("/", (_req, res) => {
    const diagnoses: diagnoses[] = diagnosesService.getDiagnoses()
    res.send(diagnoses);
});

export default router