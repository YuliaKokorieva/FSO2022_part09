import { useStateValue } from "../state";
import { Diagnose, Entry, HealthCheckEntry, OccupationalHealthcareEntry } from "../types";
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { SentimentVeryDissatisfied } from "@material-ui/icons";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React from "react";


const fetchDiagnoseDescr =(diagnose:string) => {
  const [{diagnoses}, ] = useStateValue();
  return diagnoses.find((d:Diagnose)=> d.code===diagnose)?.name;
};

const diagnoseInfo = (entry:Entry) => {
    return (
    <div>
    {
      entry.diagnosisCodes && entry.diagnosisCodes.length>0
      ? (
          <div>
            <br/>
            Diagnoses info:
            <ul>
            {entry.diagnosisCodes.map((diagnose:string) => (
              <li key={diagnose}>
                {diagnose}: {fetchDiagnoseDescr(diagnose)}
              </li>
            ))
            }
            </ul>
          </div>
          )
      :null
    }
    </div>
  );
};

const healthRating =(entry:HealthCheckEntry) => {
  switch (entry.healthCheckRating) {
    case 0:
      return (<React.Fragment><SentimentSatisfiedAltIcon/><SentimentSatisfiedAltIcon/></React.Fragment>);
    case 1: 
      return (<SentimentSatisfiedAltIcon/>);
    case 2: 
      return (<SentimentNeutralIcon/>);
    case 3: 
      return (<SentimentVeryDissatisfied/>);
    default:
      return null;
  }
};

export const HealthCheck:React.FC<({entry:HealthCheckEntry})> =({entry}) => {
  return (
    <div>
      <br/>
      <FavoriteBorderIcon/><br/>
      {entry.date}<br/>
      {entry.description}<br/>
      Diagnosed by {entry.specialist}<br/>
      healthcheck rating: {healthRating(entry)}
      {diagnoseInfo(entry)}
      <br/>
    </div>
  );
};

export const OccupationalHealthcare:React.FC<({entry:OccupationalHealthcareEntry})> =({entry}) => {

  return (
    <div>
      <br/>
      <MedicalInformationIcon/><br/>
      {entry.date}<br/>
      employer: {entry.employerName}<br/>
      {entry.description}<br/>
      {diagnoseInfo(entry)}
      <br/>
    </div>
  );
};

export const Hospital:React.FC<({entry:Entry})> =({entry}) => {

  return (
    <div>
      <br/>
      <LocalHospitalIcon/><br/>
      date: {entry.date}<br/>
      {entry.description}<br/>
      {diagnoseInfo(entry)}
      <br/>
    </div>
  );
};