import { Female, Male } from "@mui/icons-material"
import { Patient } from "../../types"

interface Props {
    patient: Patient | null | undefined
}

export const PatientPage = (props: Props) => {
    const patient = props.patient

    if (patient === null || patient === undefined) {
        return (
            <h3>No patient with this id found</h3>
        )
    }

    return (
        <div>
            <h3>{patient.name}</h3>
            <table>
                <tbody>
                    <tr>
                        <td><b>gender</b></td>
                        <td>{patient.gender === "male" ? <Male /> : patient.gender === "female" ? <Female /> : <>{patient.gender}</>}</td>
                    </tr>
                    <tr>
                        <td><b>ssn</b></td>
                        <td>{patient.ssn}</td>
                    </tr>
                    <tr>
                        <td><b>occupation</b></td>
                        <td>{patient.occupation}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}