export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface Entry {}

export type PublicPatient = Omit<PatientEntry, "ssn" | "entries">;

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
  ssn: string;
  entries: Entry[];
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type newPatientEntry = Omit<PatientEntry, "id">;
