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
                        sx={{ marginBottom: '0.5rem' }}
                        label="startDate"
                        fullWidth
                        value={startDate}
                        onChange={({ target }) => setStartDate(target.value)}
                    />
                    <TextField
                        sx={{ marginBottom: '0.5rem' }}
                        label="endDate"
                        fullWidth
                        value={endDate}
                        onChange={({ target }) => setEndDate(target.value)}
                    />
                </CardContent>
            </Card>
        </>
    )
}