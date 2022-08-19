export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries?: Entry[]
}

export enum Gender {
  Male = 'male',
  Female = 'female'
}

export type NonSensitivePatientData = Omit<Patient, 'ssn' >;

export type NewPatient = Omit<Patient, 'id'>;

export interface Diagnose {
  code: string,
  name: string,
  latin?: string
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>
}

export interface NewBaseEntry {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface Discharge {
  date: string,
  criteria: string
}

export interface SickLeave {
  startDate: string,
  endDate: string
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge?: Discharge;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare',
  employerName: string,
  sickLeave?: SickLeave
}

export interface NewHealthCheckEntry extends NewBaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface NewHospitalEntry extends NewBaseEntry {
  type: "Hospital";
  discharge?: Discharge;
}

export interface NewOccupationalHealthcareEntry extends NewBaseEntry {
  type: 'OccupationalHealthcare',
  employerName: string,
  sickLeave?: SickLeave
}

export enum EntryType {
  HealthCheck = "HealthCheck", 
  Hospital = "Hospital", 
  OccupationalHealthcare = "OccupationalHealthcare"
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

  export type NewEntry =
  | NewHospitalEntry
  | NewOccupationalHealthcareEntry
  | NewHealthCheckEntry;