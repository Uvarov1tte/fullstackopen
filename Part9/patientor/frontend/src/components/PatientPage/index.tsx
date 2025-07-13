import { Female, Male } from "@mui/icons-material"
import { Patient } from "../../types"
import { List, ListItem, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"

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

      <TableContainer>
        <Table sx={{ maxWidth: 250 }} size="small">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">gender</TableCell>
              <TableCell style={{ width: 160 }} align="justify">
                {patient.gender === "male" ? <Male /> : patient.gender === "female" ? <Female /> : <>{patient.gender}</>}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">ssn</TableCell>
              <TableCell style={{ width: 160 }} align="justify">
                {patient.ssn === undefined ? <>not provided</> : <>patient.ssn</>}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">gender</TableCell>
              <TableCell style={{ width: 160 }} align="justify">
                {patient.occupation}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" style={{ marginTop: "2rem", marginBottom: "0.5rem" }}>entries</Typography>

      <div>
        {
          patient.entries.map((e) => {

            return (
              <div key={e.id}>
                <Typography variant="body1"><b>{e.date}</b>: <i>{e.description}</i></Typography>
                <List>
                  {
                    e.diagnosisCodes
                      ? e.diagnosisCodes.map((d) => {
                        return (
                          <ListItem key={d}><Typography variant="body2">• {d}</Typography></ListItem>
                        )
                      })
                      : <></>
                  }
                </List>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}