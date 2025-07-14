import { Typography } from "@mui/material"
import type { HealthCheckEntry } from "../../../types"

interface Props {
  entry: HealthCheckEntry
}

export const HealthCheck = (props: Props) => {

  const entry = props.entry

  return (
    <Typography variant="body2">Health check rating: {entry.healthCheckRating}</Typography>
  )
}