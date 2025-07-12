interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDesctiption: string;
    target: number;
    average: number

};

const parseHours = (args: string[]): number[] => {

    let result = [];
    const hours = args.slice(2)
    for (let a of hours) {
        if (!isNaN(Number(a))) {
            result.push(Number(a))
        }
        else {
            throw new Error('Provided values were not numbers!');
        }
    }

    return result
}



const calculateExercises = (hours: number[]) => {
    const periodLength = hours.length;
    let trainingDays = 0;

    for (let i of hours) {
        if (i > 0) {
            trainingDays++;
        }
    }

    const target = 2;
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

    return result

};


try {
    const hours = parseHours(process.argv);
    console.log(calculateExercises(hours));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}