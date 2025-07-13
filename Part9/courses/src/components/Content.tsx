import type { Course, CourseProp } from "../types"

export const Content = (props: CourseProp) => {
    const allCourses: Course[] = props.courses
    return (
        <>
            {allCourses.map((c) => <p key={c.name}>{c.name}{c.exerciseCount}</p>)}
        </>
    )
}