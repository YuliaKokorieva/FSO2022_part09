import patients from "../../data/patients";
import { NonSensitivePatientData, Patient, NewPatient } from "../types";
import { v1 as uuid } from 'uuid';

const getPatients = (): Array<Patient>=> {
  return patients;
};

const getNonSensitivePatientEntries =(): NonSensitivePatientData[] => {
  return patients.map(({id,name,dateOfBirth,gender,occupation})=> ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient =(patient: NewPatient) : Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatientEntries,
  addPatient
};