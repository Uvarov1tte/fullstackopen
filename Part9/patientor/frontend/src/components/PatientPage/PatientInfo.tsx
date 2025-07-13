import { Female, Male } from "@mui/icons-material"
import { Patient } from "../../types"
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"


interface Props {
  patient: Patient
}

export const PatientInfo = (props: Props) => {

  const patient = props.patient

  return (
    <>
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
    </>
  )
}