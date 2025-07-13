import { NextFunction } from "express";
import { newEntrySchemna } from "./utils";
import { Request, Response } from 'express';
import z from "zod";

export const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newEntrySchemna.parse(req.body)
        next()
    } catch (error: unknown) {
        next(error)
    }
}

export const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

