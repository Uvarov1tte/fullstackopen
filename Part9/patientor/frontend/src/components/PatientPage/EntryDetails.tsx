import { useEffect, useState } from "react"
import diagnosesService from "../../services/diagnoses"
import { Diagnosis, Entry } from "../../types"
import { HealthCheck } from "./EntryTypes/HealthCheck"
import { Hospital } from "./EntryTypes/Hospital"
import { OccupationalHealthcare } from "./EntryTypes/OccupationalHealthcare"
import { Card, CardContent, Typography, List, ListItem } from "@mui/material"

interface Props {
  entry: Entry
}

export const EntryDetails = (props: Props) => {

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      console.log(diagnoses)
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, [])

  const entry = props.entry


  return (
    <Card variant="outlined" sx={{ marginBottom: "1rem" }}>
      <CardContent>
        <Typography variant="h6"> {entry.date}</Typography>
        <Typography variant="body1" sx={{ marginBottom: "0.5rem" }}>{entry.description}</Typography>

        <>
          {
            entry.type === "Hospital" ?
              <Hospital entry={entry} />
              : entry.type === "OccupationalHealthcare" ?
                <OccupationalHealthcare entry={entry} />
                : <HealthCheck entry={entry} />
          }
        </>

        <Typography variant="body2" sx={{ marginTop: "0.5rem" }}>Diagnoses</Typography>
        <List>
          {
            entry.diagnosisCodes
              ? entry.diagnosisCodes.map((d) => {
                const description = diagnoses.find((i) => i.code === d)?.name
                return (
                  <ListItem key={d}><Typography variant="body2">• {d} {description}</Typography></ListItem>
                )
              })
              : <></>
          }
        </List>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>Diagnosed by {entry.specialist}</Typography>
      </CardContent>
    </Card>
  )

}