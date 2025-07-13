import { Patient } from "../../types"
import { Typography } from "@mui/material"
import { PatientInfo } from "./PatientInfo"
import { EntryDetails } from "./EntryDetails"

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
      <Typography variant="h4" style={{ marginTop: "0.5em" }}>{patient.name}</Typography>

      <PatientInfo patient={patient} />

      <Typography variant="h5" style={{ marginTop: "2rem", marginBottom: "0.5rem" }}>entries</Typography>

      <div>
        {
          patient.entries.map((e) => {

            return (
              <EntryDetails key={e.id} entry={e} />
            )
          })
        }
      </div>
    </div>
  )
}