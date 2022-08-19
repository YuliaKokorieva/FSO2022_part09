import patients from "../../data/patients";
import { NonSensitivePatientData, Patient, NewPatient, Entry, NewEntry } from "../types";
import { v1 as uuid } from 'uuid';

const getPatients = (): Array<Patient>=> {
  return patients;
};

const getPatientById = (id:string): Patient | undefined => {
  const requestedPatiend=patients.filter(patient=> patient.id===id)[0];
  if (requestedPatiend) {
    return requestedPatiend;
  } else {
    return undefined;
  }
};

const getNonSensitivePatientEntries =(): NonSensitivePatientData[] => {
  return patients.map(({id,name,dateOfBirth,gender,occupation, entries})=> ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
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



const addEntry = (entry:NewEntry, patientId:string):Entry => {
  const patient = patients.find(p=>p.id===patientId);
  if (patient) {
    const addedEntry = {
      ...entry,
      id: uuid()
    };
    patient.entries?.push(addedEntry);
    return addedEntry;
  } else {
    throw new Error(`No patient with id ${patientId} found`);
  }
};

export default {
  getPatients,
  getNonSensitivePatientEntries,
  addPatient,
  getPatientById,
  addEntry
};