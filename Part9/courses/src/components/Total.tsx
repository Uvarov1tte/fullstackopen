import type { CourseProp } from "../types";

export const Total = (props: CourseProp) => {
    const Total: number = props.courses.reduce((sum, part) => sum + part.exerciseCount, 0);

    return (
        <p>Total: {Total} exercise(s)</p>
    )
}