import diagnosesEntries from "../../data/diagnoses";
import { Diagnose } from "../types";

const getDiagnoses =() : Array<Diagnose> => {
  return diagnosesEntries;
};

export default {
  getDiagnoses
}