import { Card, CardContent, TextField, Typography } from "@mui/material"
interface Props {
    employerName: string;
    setEmployerName: (values: string) => void;
    startDate: string;
    setStartDate: (values: string) => void;
    endDate: string;
    setEndDate: (values: string) => void;
}

export const OccupationalHealthcareFormPart = ({ employerName, setEmployerName, startDate, setStartDate, endDate, setEndDate }: Props) => {
    return (
        <>
            <Card variant="outlined" sx={{ marginBottom: '0.5rem' }}>
                <CardContent>
                    <Typography variant="body1">Employment information</Typography>
                    <TextField
                        sx={{ marginBottom: '0.5rem' }}
                        label="employerName"
                        fullWidth
                        value={employerName}
                        onChange={({ target }) => setEmployerName(target.value)}
                    />
                    <Typography variant="body1">Sick leave</Typography>

                    <TextField
                        id="date"
                        label="start date"
                        type="date"
                        sx={{ marginBottom: '0.5rem', marginTop: '0.5rem' }}
                        value={startDate}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={({ target }) => setStartDate(target.value)}
                    />

                    <TextField
                        id="date"
                        label="end date"
                        type="date"
                        sx={{ marginBottom: '0.5rem' }}
                        value={endDate}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={({ target }) => setEndDate(target.value)}
                    />

                </CardContent>
            </Card>
        </>
    )
}