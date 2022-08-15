import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient, Entry, Diagnose } from "../types";
import { useStateValue, setPatient } from "../state";

const PatientPage = () => {
  const {id} = useParams<{id:string}>();
  const [{patient, diagnoses}, dispatch] = useStateValue();
  
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
          <p>gender: {patient.gender}</p>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          <h3>entries</h3>
          <p>
            {
              patient.entries?.map((entry: Entry) => (
                <div key={entry.id}>
                  <p>{entry.date} {entry.description}</p>
                  <ul>
                    {entry.diagnosisCodes?.map((diagnosis: string)=> (
                      <li key={diagnosis}>
                        {diagnosis}: {diagnoses.find((d:Diagnose)=> d.code===diagnosis)?.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            }
          </p>
        </div>
        : "no patient selected"
      }
    </div>
  );
};

export default PatientPage;