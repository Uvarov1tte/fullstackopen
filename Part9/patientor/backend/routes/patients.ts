import express from "express";
import patientsService from "../services/patientsService";
import { newPatientParser, errorMiddleware } from "../utils/middleware";
import { Request, Response } from 'express';
const router = express.Router();

router.get("/", (_req, res) => {
    const patients = patientsService.getPatients()
    res.send(patients);
});

router.get("/:id", (req, res) => {
    const id = req.params.id
    const allPatients = patientsService.getPatients()
    const patient = allPatients.filter((p) => p.id === id ? p : !p)[0]
    console.log(patient)
    res.send(patient)
})

router.post("/", newPatientParser, (req: Request, res: Response) => {
    const addedEntry = patientsService.addPatient(req.body);
    res.json(addedEntry);
});

router.use(errorMiddleware);

export default router