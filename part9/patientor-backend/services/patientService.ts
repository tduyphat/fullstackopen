import patientsEntries from "../data/patientsEntries";
import patientData from "../data/patientsEntries";
import { newPatientEntry, NonSSNPatient, PatientEntry } from "../types";
import { v1 as uuid } from "uuid";

const patients: Array<PatientEntry> = patientData;

const id = uuid();

const getNonSSNEntries = (): NonSSNPatient[] => {
  return patientsEntries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

const addPatient = (entry: newPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: id,
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find((d) => d.id === id);
  return entry;
};

export default {
  getNonSSNEntries,
  addPatient,
  findById,
};
