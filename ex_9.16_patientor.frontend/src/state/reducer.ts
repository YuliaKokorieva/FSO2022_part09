import { State } from "./state";
import { Diagnose, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
    type: "SET_DIAGNOSES";
    payload: Diagnose[]
  }
  | {
    type: "ADD_ENTRY";
    id: string;
    payload: Entry;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: action.payload
      };
    case "SET_DIAGNOSES": 
      return {
        ...state,
        diagnoses: action.payload
      };
    case "ADD_ENTRY": {
      const patient = state.patients[action.id];
      let updatedPatient:Patient ={...patient};
      if (patient.entries) {
        updatedPatient = {
          ...patient,
          entries: [...patient.entries, action.payload]
        };
      } else {
        updatedPatient = {
          ...patient,
          entries: [action.payload]
        };
      }
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.id]: updatedPatient,
        },
      };
    }
    default:
      return state; 
  }
};
