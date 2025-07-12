import express from "express";
import { nonSensitive } from "../types/patients";
const router = express.Router();
import patientsService from "../services/patientsService";

router.get("/", (_req, res) => {
    const patients: nonSensitive[] = patientsService.getPatients()
    res.send(patients);
});

router.post("", (req, res) => {
    const { name, dateOfBirth, gender, occupation, ssn } = req.body
    const addedEntry = patientsService.addPatient(name, dateOfBirth, gender, occupation, ssn)

    res.json(addedEntry)
})

export default router