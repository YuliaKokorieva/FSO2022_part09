import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue } from "../state";

const PatientPage = () => {
  const {id} = useParams<{id:string}>();
  const [{patient}, dispatch] = useStateValue();
  React.useEffect(()=> {
    const fetchPatientById = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const {data: patient} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch({type: "SET_PATIENT", payload: patient});
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
        </div>
        : "no patient selected"
      }
     

    </div>
  );
};


export default PatientPage;