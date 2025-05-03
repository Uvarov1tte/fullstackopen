import { Part } from "./Part"

export function Content(props) {
    return (
        <>
            <Part part={props.p1} exercise={props.e1}></Part >
            <Part part={props.p2} exercise={props.e2}></Part >
            <Part part={props.p3} exercise={props.e3}></Part >
        </>
    )
}