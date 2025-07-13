import { Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import type { OccupationalHealthcareEntry } from "../../../types"

interface Props {
  entry: OccupationalHealthcareEntry
}

export const OccupationalHealthcare = (props: Props) => {

  const entry = props.entry
  return (
    <div>
      <Typography variant="body2">Employer information</Typography>
      
      <TableContainer>
        <Table sx={{ maxWidth: 500 }} size="small">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">employer name</TableCell>
              <TableCell style={{ width: 160 }} align="justify">
                {entry.employerName}
              </TableCell>
            </TableRow>
            {
              entry.sickLeave ?
                <TableRow>
                  <TableCell component="th" scope="row">sick leave</TableCell>
                  <TableCell style={{ width: 300 }} align="justify">
                    from <i>{entry.sickLeave?.startDate}</i> to <i>{entry.sickLeave?.endDate}</i>
                  </TableCell>
                </TableRow>
                : <></>
            }

          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}