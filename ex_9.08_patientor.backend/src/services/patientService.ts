import patients from "../../data/patients";
import { NonSensitivePatientData, Patient } from "../types";

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

export default {
  getPatients,
  getNonSensitivePatientEntries
}