import { Patient, EntryFormValues } from "../../types"
import { Typography } from "@mui/material"
import { PatientInfo } from "./PatientInfo"
import { EntryDetails } from "./EntryDetails"
import { EntryForm } from "./EntryForm"

interface Props {
  patient: Patient | null | undefined
  addEntry: (values: EntryFormValues) => void;
}

export const PatientPage = ({ patient, addEntry }: Props) => {

  if (patient === null || patient === undefined) {
    return (
      <h3>No patient with this id found</h3>
    )
  }

  return (
    <div>
      <Typography variant="h4" style={{ marginTop: "0.5em" }}>{patient.name}</Typography>

      <PatientInfo patient={patient} />

      <Typography variant="h5" style={{ marginTop: "2rem", marginBottom: "0.5rem" }}>add entry</Typography>
      <EntryForm onSubmit={addEntry} />
      <Typography variant="h5" style={{ marginTop: "2rem", marginBottom: "0.5rem" }}>all entries</Typography>

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