import express from "express";
import { Diagnosis } from "../types";
import diagnosesService from "../services/diagnosesService"

const router = express.Router();

router.get("/", (_req, res) => {
    const diagnoses: Diagnosis[] = diagnosesService.getDiagnoses()
    res.send(diagnoses);
});

export default router