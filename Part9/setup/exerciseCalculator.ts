interface Params {
    target: number,
    hours: number[]
}
export interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDesctiption: string;
    target: number;
    average: number

};

const parseHours = (args: string[]): Params => {
    if (args.length > 2) {
        if (args.length < 9) throw new Error('Not enough arguments');
        if (args.length > 9) throw new Error('Too many arguments');
    }

    const target = Number(args[2]);
    let hours: number[] = [];
    const initialHours = args.slice(3);
    for (let a of initialHours) {
        if (!isNaN(Number(a))) {
            hours.push(Number(a));
        }
        else {
            throw new Error('Provided values were not numbers!');
        }
    }

    return {
        target,
        hours
    };
};



export const calculateExercises = (hours: number[], target: number): Result => {
    const periodLength = hours.length;
    let trainingDays = 0;

    for (let i of hours) {
        if (i > 0) {
            trainingDays++;
        }
    }

    const average = hours.reduce((total, h) => total + h, 0) / hours.length;
    let success = true,
        rating: number,
        ratingDesctiption: string;

    if (average < target) {
        success = false;
    }

    if (average < 1.5) {
        rating = 1;
        ratingDesctiption = "maybe considering exercising more";
    } else if (average >= 1.5 && average < 2) {
        rating = 2;
        ratingDesctiption = "not too bad but could be better";
    } else {
        rating = 3;
        ratingDesctiption = "great work, keep it up!";
    }

    const result = {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDesctiption,
        target,
        average
    };

    return result;

};


if (process.argv.length > 2) {
    try {
        const { target, hours } = parseHours(process.argv);
        console.log(calculateExercises(hours, target));
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    };
}