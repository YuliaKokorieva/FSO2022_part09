import express from 'express';
import patientService from '../services/patientService';
import {checkNewPatientData, checkNewEntryData} from '../utils';

const router = express.Router();

router.get('/', (_req,res)=> {
  res.send(patientService.getNonSensitivePatientEntries());
});

router.get('/:id', (req, res) => {
  const requestedPatient = patientService.getPatientById(req.params.id);
  if (requestedPatient) {
    res.send(requestedPatient);
  } else {
    res.status(404).send(`no such patient`);
  }
});

router.post('/', (req,res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = checkNewPatientData(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);

  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const newEntry = checkNewEntryData(req.body);
  const addedEntry = patientService.addEntry(newEntry, req.params.id);
  res.json(addedEntry);

});

export default router;
