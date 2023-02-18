import patientsEntries from "../data/patientsEntries";
import patientData from "../data/patientsEntries";
import { newPatientEntry, PatientEntry, PublicPatient } from "../types";
import { v1 as uuid } from "uuid";

const patients: Array<PatientEntry> = patientData;

const id = uuid();

const getPublicEntries = (): Array<PublicPatient> => {
  return patientsEntries.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries
    })
  );
};

const addPatient = (entry: newPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: id,
    ...entry,
    entries: []
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find((d) => d.id === id);
  return entry;
};

export default {
  getPublicEntries,
  addPatient,
  findById
};
