import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient, Entry } from "../types";
import { useStateValue, setPatient } from "../state";
import { HealthCheck, Hospital, OccupationalHealthcare } from "./EntryTypes";
import { Divider } from "@material-ui/core";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails:React.FC<({entry:Entry})> = ({entry}) => {
  switch (entry.type) {

    case "HealthCheck":
      return <HealthCheck entry={entry}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry}/>;
    case "Hospital":
      return <Hospital entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatientPage = () => {
  const {id} = useParams<{id:string}>();
  const [{patient}, dispatch] = useStateValue();
  
  React.useEffect(()=> {
    const fetchPatientById = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const {data: patient} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(setPatient(patient));
      } catch (e) {
        console.log(e);
      }
    };

    void fetchPatientById();
  }, [dispatch]);

  return(
    <div>
      {patient
        ? 
        <div>
          <h2>{patient.name}</h2>
          gender: {patient.gender}<br/>
          ssn: {patient.ssn}<br/>
          occupation: {patient.occupation}<br/>
          <h3>entries</h3>
          {
            patient.entries?.map((entry: Entry) => (
              <React.Fragment key={entry.id}>
                <Divider/>
                <EntryDetails entry={entry} />
                <Divider/>
              </React.Fragment>
            )            
            )
          }
          
        </div>
        : "no patient selected"
      }
    </div>
  );
};

export default PatientPage;