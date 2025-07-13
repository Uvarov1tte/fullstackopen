import { Typography } from "@mui/material"
import type { HospitalEntry } from "../../../types"

interface Props {
  entry: HospitalEntry
}

export const Hospital = (props: Props) => {

  const entry = props.entry

  return (
    <Typography variant="body2">Discharged: {entry.discharge.date} <i>{entry.discharge.criteria}</i></Typography>
  )
}