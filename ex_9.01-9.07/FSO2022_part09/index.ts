import express from 'express';
import {calculateBmi} from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { query, validationResult } from 'express-validator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', 
  query('height').isNumeric(),
  query('weight').isNumeric(),
  (req, res)=> {
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({ error: "malformatted parameters" });
    }

    return res.send({
      weight: req.query === undefined ? undefined : Number(req.query.weight),
      height : req.query === undefined ? undefined : Number(req.query.height),
      bmi: req.query === undefined ? undefined : calculateBmi(Number(req.query.height),Number(req.query.weight))

  });
});

app.post('/exercises', (req, res) => {
  const parametersPresent = [
    "daily_exercises" in req.body,
    "target" in req.body
  ];
  
  if (parametersPresent.includes(false)) {
    res.send({error: "parameters missing"});
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if ((!isNaN(target)) && (!daily_exercises.some(isNaN))) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      res.send(calculateExercises(daily_exercises, target));
    } else {
      res.send({error: "malformatted parameters"});
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});