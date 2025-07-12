import express from "express";
import data from "../data/patients";
import { noSsn } from "../types/patients";
const router = express.Router();

router.get("/", (_req, res) => {
    const patients: noSsn[] = data.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, dateOfBirth, name, occupation, gender }))
    res.send(patients);
});

export default router