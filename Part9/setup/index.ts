interface BmiResult {
    weight: number;
    height: number;
    bmi: string
}

import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, Result } from './exerciseCalculator';

app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.get('/hello', (_req: any, res: any) => {
    const msg: string = 'Hello Full Stack!';

    res.send(msg);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.get('/bmi', (req: any, res: any) => {
    const height: number = Number(req.query.height);
    const weight: number = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        return res.json({ error: 'malformatted parameters' });
    }

    const bmi: string = calculateBmi(height, weight);
    const result: BmiResult = {
        weight,
        height,
        bmi
    };

    res.json(result);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.post('/exercises', (req: any, res: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const hours: number[] = req.body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const target: number = req.body.target;

    for (let h of hours) {
        if (isNaN(h)) {
            return res.json({ error: 'malformatted parameters' });
        }
    };

    if (hours.length < 7) {
        return res.json({ error: "parameters missing" });
    };

    if (isNaN(target)) {
        return res.json({ error: 'malformatted parameters' });
    };

    const result: Result = calculateExercises(hours, target);

    res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});