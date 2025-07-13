import type { CourseProp, CoursePart } from "../types"

export const Part = (props: CourseProp) => {
    const course: CoursePart = props.course


    switch (course.kind) {
        case "basic":
            return (
                <div>
                    <b>{course.name}</b>
                    <p><i>{course.description}</i></p>
                </div>
            )
        case "group":
            return (
                <div>
                    <b>{course.name}</b>
                    <p>project exercises {course.exerciseCount}</p>
                </div>
            )
        case "background":
            return (
                <div>
                    <b>{course.name}</b>
                    <p><i>{course.description}</i></p>
                    <p>more materials at {course.backgroundMaterial}</p>
                </div>
            )
        case "special":
            return (
                <div>
                    <b>{course.name}</b>
                    <p><i>{course.description}</i></p>
                    <p>required skills: {course.requirements.join(",")}</p>
                </div>
            )
    }
}