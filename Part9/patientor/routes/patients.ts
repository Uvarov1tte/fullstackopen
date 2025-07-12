import express from "express";
import { nonSensitive } from "../types/patients";
import patientsService from "../services/patientsService";
import { newPatientParser, errorMiddleware } from "../utils/middleware";
import { Request, Response } from 'express';
const router = express.Router();

router.get("/", (_req, res) => {
    const patients: nonSensitive[] = patientsService.getPatients()
    res.send(patients);
});

router.post("/", newPatientParser, (req: Request, res: Response) => {
    const addedEntry = patientsService.addPatient(req.body);
    res.json(addedEntry);
});

router.use(errorMiddleware);

export default router