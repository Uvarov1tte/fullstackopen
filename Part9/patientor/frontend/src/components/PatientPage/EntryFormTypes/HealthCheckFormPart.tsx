import { Select, MenuItem } from "@mui/material"

interface Props {
    value: number
    setValue: (values: number) => void
}

export const HealthCheckFormPart = ({ value, setValue }: Props) => {
    return (
        <Select
            sx={{ marginBottom: '0.5rem' }}
            labelId="Healthcheck"
            id="Healthcheck"
            fullWidth
            value={value}
            label="Healthcheck Rating"
            onChange={({ target }) => setValue(Number(target.value))}
        >
            <MenuItem value={0}>Healthy</MenuItem>
            <MenuItem value={1}>LowRisk</MenuItem>
            <MenuItem value={2}>HighRisk</MenuItem>
            <MenuItem value={3}>CriticalRisk</MenuItem>
        </Select>
    )
}