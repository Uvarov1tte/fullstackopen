import type { CourseName } from "../types"

export const Header = (props: CourseName) => {
    return (
        <h1> {props.name}</h1>
    )
}