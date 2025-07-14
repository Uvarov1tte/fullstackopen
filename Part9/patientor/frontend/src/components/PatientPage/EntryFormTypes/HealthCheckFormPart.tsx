import { TextField } from "@mui/material"

interface Props {
    value: number
    setValue: (values: number) => void
}

export const HealthCheckFormPart = ({ value, setValue }: Props) => {
    return (
        <TextField
            sx={{ marginBottom: '0.5rem' }}
            label="Healthcheck rating"
            fullWidth
            value={value}
            onChange={({ target }) => setValue(Number(target.value))}
        />
    )
}