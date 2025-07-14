import { SyntheticEvent, useState } from "react"
import { EntryFormValues, Diagnosis } from "../../types";
import { TextField, Grid, Button, Select, MenuItem, InputLabel, Typography, OutlinedInput } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { HealthCheckFormPart } from "./EntryFormTypes/HealthCheckFormPart";
import { OccupationalHealthcareFormPart } from "./EntryFormTypes/OccupationalHealthcareFormPart";
import { HospitalFormPart } from "./EntryFormTypes/HospitalFormPart";

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    diagnosisList: Array<Diagnosis['code']>
}

export const EntryForm = ({ onSubmit, diagnosisList }: Props) => {

    const [type, setType] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [specialist, setSpecialist] = useState('')
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([])

    const [healthCheckRating, setHealthCheckRating] = useState(0)

    const [dischargeDate, setDischargeDate] = useState('')
    const [criteria, setCriteria] = useState('')

    const [employerName, setEmployerName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const addEntry = (evt: SyntheticEvent) => {
        evt.preventDefault()

        if (type !== "") {

            switch (type) {
                case "HealthCheck":
                    onSubmit({
                        date,
                        description,
                        specialist,
                        healthCheckRating,
                        diagnosisCodes,
                        type
                    })
                    break
                case "Hospital":
                    onSubmit({
                        date,
                        description,
                        specialist,
                        discharge: {
                            date: dischargeDate,
                            criteria
                        },
                        diagnosisCodes,
                        type
                    })
                    break
                case "OccupationalHealthcare":
                    onSubmit({
                        date,
                        description,
                        specialist,
                        employerName,
                        sickLeave: {
                            startDate,
                            endDate
                        },
                        diagnosisCodes,
                        type
                    })
                    break
            }
        } else {
            alert("Form has not been correctly filled; entry type has not been selected.")
        }

    }

    const onCancel = () => {
        setType('')
        setDescription('')
        setDate('')
        setSpecialist('')
        setHealthCheckRating(0)
        setDiagnosisCodes([])
        setDischargeDate('')
        setCriteria('')
        setEmployerName('')
        setStartDate('')
        setEndDate('')
    }

    const handleMultipleSelect = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
        const {
            target: { value },
        } = event;
        setDiagnosisCodes(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div >
            <form onSubmit={addEntry}>
                <InputLabel style={{ marginTop: 20 }}>Entry Type</InputLabel>
                <Select
                    sx={{ marginBottom: '0.5rem' }}
                    labelId="type"
                    id="type"
                    fullWidth
                    value={type}
                    label="Type"
                    onChange={({ target }) => setType(target.value)}
                >
                    <MenuItem value={"HealthCheck"}>Healthcheck</MenuItem>
                    <MenuItem value={"Hospital"}>Hospital</MenuItem>
                    <MenuItem value={"OccupationalHealthcare"}>Occupational Healthcare</MenuItem>
                </Select>
                <TextField
                    sx={{ marginBottom: '0.5rem' }}
                    label="Description"
                    fullWidth
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                />
                <TextField
                    id="date"
                    label="Date"
                    type="date"
                    sx={{ marginBottom: '0.5rem' }}
                    value={date}
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={({ target }) => setDate(target.value)}
                />
                <TextField
                    sx={{ marginBottom: '0.5rem' }}
                    label="Specialist"
                    fullWidth
                    value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)}
                />

                {
                    type === "Hospital" ?
                        <HospitalFormPart
                            dischargeDate={dischargeDate}
                            setDischargeDate={setDischargeDate}
                            criteria={criteria}
                            setCriteria={setCriteria} />
                        : type === "OccupationalHealthcare" ?
                            <OccupationalHealthcareFormPart
                                employerName={employerName}
                                setEmployerName={setEmployerName}
                                startDate={startDate}
                                setStartDate={setStartDate}
                                endDate={endDate}
                                setEndDate={setEndDate}
                            />
                            : type === "HealthCheck" ?
                                <HealthCheckFormPart
                                    value={healthCheckRating}
                                    setValue={setHealthCheckRating} />
                                : <Typography
                                    variant="body1"
                                    sx={{ color: 'red' }}
                                >
                                    Please select entry type for more details
                                </Typography>
                }


                <InputLabel id="demo-multiple-name-label">Diagnoses</InputLabel>
                <Select
                    fullWidth
                    sx={{ marginBottom: '0.5rem' }}
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={diagnosisCodes}
                    onChange={handleMultipleSelect}
                    input={<OutlinedInput label="Diagnosis code" />}
                >
                    {diagnosisList.map((d) => (
                        <MenuItem
                            key={d}
                            value={d}
                        >
                            {d}
                        </MenuItem>
                    ))}
                </Select>
                <Grid container>
                    <Grid item xs={6}>
                        <Button
                            color="secondary"
                            variant="contained"
                            style={{ float: "left" }}
                            type="button"
                            onClick={onCancel}
                        >
                            Clear
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            style={{
                                float: "right",
                            }}
                            type="submit"
                            variant="contained"
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}