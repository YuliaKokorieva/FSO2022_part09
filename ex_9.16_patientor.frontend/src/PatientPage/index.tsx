import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient, Entry } from "../types";
import { useStateValue, setPatient, addEntry } from "../state";
import { HealthCheck, Hospital, OccupationalHealthcare } from "./EntryTypes";
import { Button, Divider } from "@material-ui/core";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

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

const showGender =(gender:string) => {
  switch (gender) {
    case "female":
      return (<FemaleIcon/>);
    case "male":
      return (<MaleIcon/>);
    default: 
      return null;
  }
};

const PatientPage = () => {
  const {id} = useParams<{id:string}>();

  const [{patient}, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry =async(values:EntryFormValues) => {

    try{
      if (id){
        const{data:newEntry} = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, values);
        dispatch(addEntry(newEntry, id));
        closeModal();
      }      
    } catch (e:unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };


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
  }, [dispatch, patient]);

  return(
    <div>
      {patient
        ? 
        <div>
          <h2>{patient.name}</h2>
          gender: {showGender(patient.gender)}<br/>
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

          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
          />
          <Button variant="contained" onClick={() => openModal()}>
            Add New Entry
          </Button>
          
        </div>
        : "no patient selected"
      }
    </div>
  );
};

export default PatientPage;