import type { AllCoursesProp } from "../types"
import { Part } from "./Part"

export const Content = (props: AllCoursesProp) => {
    const allCourses = props.courses
    return (
        <>
            {allCourses.map((c) => <Part key={c.name} course={c}/>)}
        </>
    )
}