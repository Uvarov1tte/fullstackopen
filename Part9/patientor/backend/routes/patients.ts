import express from "express";
import patientsService from "../services/patientsService";
import { newPatientParser, errorMiddleware } from "../utils/middleware";
import { Request, Response } from 'express';
import { parseDiagnosisCodes } from "../utils/utils";
const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
    const patients = patientsService.getPatients()
    res.send(patients);
});

router.get("/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const allPatients = patientsService.getPatients()
    const patient = allPatients.find((p) => p.id === id)
    res.send(patient)
})

router.post("/", newPatientParser, (req: Request, res: Response) => {
    const addedPatient = patientsService.addPatient(req.body);
    res.json(addedPatient);
});

router.post("/:id/entries", (req: Request, res: Response) => {
    const id = req.params.id

    const newEntry = {
        ...req.body,
        diagnosisCodes: parseDiagnosisCodes(req.body)
    }

    const addedEntry = patientsService.addEntry(id, newEntry);
    res.json(addedEntry);
});

router.use(errorMiddleware);

export default router