import { useStateValue } from "../state";
import { Diagnose, Entry } from "../types";
// import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
// import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
// import { SentimentVeryDissatisfied } from "@material-ui/icons";

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

const healthRating =(entry:Entry) => {
  switch (entry.healthCheckRating) {
    case 0:
      // return (<div><SentimentSatisfiedAltIcon/><SentimentSatisfiedAltIcon/></div>);
      return (<div>++</div>);
    case 1: 
      // return (<div><SentimentSatisfiedAltIcon/></div>);
      return (<div>+</div>);
    case 2: 
      // return (<div><SentimentNeutralIcon/></div>);
      return (<div>-</div>);
    case 3: 
      // return (<div><SentimentVeryDissatisfied/></div>);
      return (<div>--</div>);
    default:
      return null;
  }


};

export const HealthCheck:React.FC<({entry:Entry})> =({entry}) => {
  return (
    <div>
      <br/>
      type: {entry.type} <br/>
      {entry.date}<br/>
      {entry.description}<br/>
      Diagnosed by {entry.specialist}<br/>
      healthcheck rating: {healthRating(entry)}
      {diagnoseInfo(entry)}
      <br/>
    </div>
  );
};

export const OccupationalHealthcare:React.FC<({entry:Entry})> =({entry}) => {

  return (
    <div>
      <br/>
      type: {entry.type}<br/>
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
      type: {entry.type}<br/>
      {entry.date}<br/>
      {entry.description}<br/>
      {diagnoseInfo(entry)}
      <br/>
    </div>
  );
};