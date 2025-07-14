import { Card, CardContent, TextField, Typography } from "@mui/material"
interface Props {
    dischargeDate: string,
    setDischargeDate: (values: string) => void,
    criteria: string,
    setCriteria: (values: string) => void
}

export const HospitalFormPart = ({ dischargeDate, setDischargeDate, criteria, setCriteria }: Props) => {
    return (
        <Card variant="outlined" sx={{ marginBottom: '0.5rem' }}>
            <CardContent>
                <Typography variant="body1">Discharge</Typography>
                <TextField
                    id="dischargeDate"
                    type="date"
                    sx={{ marginBottom: '0.5rem' }}
                    fullWidth
                    value={dischargeDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={({ target }) => setDischargeDate(target.value)}
                />
                <TextField
                    sx={{ marginBottom: '0.5rem' }}
                    label="criteria"
                    fullWidth
                    value={criteria}
                    onChange={({ target }) => setCriteria(target.value)}
                />
            </CardContent>
        </Card>
    )
}