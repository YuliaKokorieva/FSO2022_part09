import React, { createContext, useContext, useReducer } from "react";
import { Diagnose, Entry, Patient } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  patient:  Patient | Record<string, never>;
  diagnoses: Array<Diagnose>;
};

const initialState: State = {
  patients: {},
  patient: {},
  diagnoses: []
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);

export const setPatientList = (patients: Array<Patient>):Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients
  };
};

export const setPatient = (patient: Patient):Action => {
  return {
    type: "SET_PATIENT",
    payload: patient
  };
};

export const setDiagnoses = (diagnoses: Array<Diagnose>): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: diagnoses
  };
};

export const addEntry =(entry:Entry, id:string): Action => {
  return {
    type: "ADD_ENTRY",
    id:id,
    payload: entry
  };
};


