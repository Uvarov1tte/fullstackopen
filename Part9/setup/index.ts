import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';

app.get('/hello', (_req: any, res: any) => {
    res.send('Hello Full Stack!');
});
app.get('/bmi', (req: any, res: any) => {
    console.log(req.query)
    const height = req.query.height;
    const weight = req.query.weight;

    if (isNaN(Number(height)) || isNaN(Number(weight))) {
        return res.json({ error: 'malformatted parameters' });
    }

    const bmi = calculateBmi(height, weight);
    const result = {
        weight,
        height,
        bmi
    };

    res.json(result)
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});