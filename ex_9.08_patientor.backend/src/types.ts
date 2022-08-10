export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string
}

export type NonSensitivePatientData = Omit<Patient, 'ssn'>

export interface Diagnose {
  code: string,
  name: string,
  latin?: String
};