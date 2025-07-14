import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient, EntryFormValues } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import { PatientPage } from "./components/PatientPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      console.log(patients)
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  const match = useMatch('/patients/:id')
  const patient = match
    ? patients.find(p => p.id === match.params.id)
    : null

  const submitNewEntry = async (values: EntryFormValues) => {
    if (match !== null) {
      try {
        const id = match.params.id
        if (id !== undefined) {
          const newEntry = await patientService.createEntry(id, values);
          const updatedPatients = patients.map((p) => p.id === id ? { ...p, entries: p.entries.concat(newEntry) } : p)
          setPatients(updatedPatients)
          console.log(patients)
        } else {
          throw new Error('Patient unavailable')
        }
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            const message = e.response.data.replace('Something went wrong. Error: ', '');
            console.error(message);
            // setError(message);
          } else {
            // setError("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", e);
          // setError("Unknown error");
        }
      }
    }
  };



  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
          <Route path="/patients/:id" element={<PatientPage patient={patient} addEntry={submitNewEntry} />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
