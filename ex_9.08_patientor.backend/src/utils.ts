import { 
  NewPatient, 
  Gender,
  Diagnose,  
  HealthCheckRating, 
  EntryType,
  NewEntry,
  Entry,
} from "./types";

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

const isEntries =(entries: Array<unknown>): entries is Array<Entry> => {
  return Array.isArray(entries);
};

const parseEntries = (entries: Array<unknown>): Array<Entry> => {
  if (!entries) {
    return [];
  }
  if (!isEntries(entries)) {
    throw new Error('Incorrect entries');
  }
  return entries;
};

type PatientFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: Array<unknown>};

const checkNewPatientData = ({name, dateOfBirth, ssn, gender, occupation, entries}: PatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseStringParam(name, 'name'),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseStringParam(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseStringParam(occupation, 'occupation'),
    entries: parseEntries(entries),
  };
  return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(param);
};

const parseEntryType = (entryType:unknown): EntryType => {
  if (!entryType || !isEntryType(entryType)) {
    throw new Error('Incorrect or missing entryType: ' + entryType);
  }
  return entryType;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRating = (param:any): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseRating = (rating:any): HealthCheckRating => {
  const values: Array<number> = [0,1,2,3];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!values.includes(rating) || !isRating(rating)) {
    throw new Error('Incorrect or missing HealthCheckRating');
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return rating;
};

const isDiagnosisCodes =( param: Array<any>): param is Array<Diagnose['code']> => {
  return param.every((diagnosis) => typeof diagnosis === 'string');
};


const parseDiagnosisCodes =( diagnosisCodes: Array<any>) : Array<Diagnose['code']> => {
  if (!diagnosisCodes || !isDiagnosisCodes(diagnosisCodes)) {
    throw new Error('Incorrect or missing diagnoses codes');
  }
  return diagnosisCodes;
};

const checkNewEntryData = (entryToCheck: any): NewEntry => {
  const type = parseEntryType(entryToCheck.type);
  const entry = {
    description: parseStringParam(entryToCheck.description, 'description'),
    date: parseDate(entryToCheck.date),
    specialist: parseStringParam(entryToCheck.specialist, 'specialist'),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    diagnosisCodes: parseDiagnosisCodes(entryToCheck.diagnosisCodes)
  };

  switch (type) {
    case "HealthCheck":
      return {
        ...entry,
        type: type, 
        healthCheckRating: parseRating(entryToCheck.healthCheckRating)
      };

    case "OccupationalHealthcare":
      return {
        ...entry,
        type:type, 
        employerName: parseStringParam(entryToCheck.employerName, 'employerName')
      };
    case "Hospital":
      return {
        ...entry,
        type: type
      };
    default:
      throw new Error('Incorrect or missing type');
    }
};

export {checkNewPatientData, checkNewEntryData};


