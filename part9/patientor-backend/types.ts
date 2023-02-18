export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender,
  occupation: string;
  ssn: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type NonSSNPatient = Omit<PatientEntry, 'ssn'>;

export type newPatientEntry = Omit<PatientEntry, 'id'>;
