import express from "express";
import data from "../data/diagnoses";
import { diagnoses } from "../types/diagnoses";
const router = express.Router();

router.get("/", (_req, res) => {
    const diagnoses: diagnoses[] = data
    res.send(diagnoses);
});

export default router