import { NewPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseStringParam =(stringParam:unknown, paramName: string):string=> {
  if (!stringParam || !isString(stringParam)) {
    throw new Error(`Incorrect or missing ${paramName}`);
  }
  return stringParam;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender:unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown};

const checkNewPatientData = ({name, dateOfBirth, ssn, gender, occupation}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseStringParam(name, 'name'),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseStringParam(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseStringParam(occupation, 'occupation')
  };
  return newPatient;
};

export default checkNewPatientData;