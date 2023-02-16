import express from 'express';
import { parseArgumentsBmi, calculateBmi } from './bmiCalculator';
import { calculateExercises, parseArguments } from './exerciseCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: any, res: any) => {
  const weightQ = req.query.weight
  const heightQ = req.query.height
  if(!weightQ || !heightQ) {
      res.status(400)
      res.send({
          error: "malformatted parameters"
      })
  } else {
      try{
      const {weight, height} = parseArgumentsBmi(
          Number(heightQ),
          Number(weightQ)
      )
      res.send({
          weight: weight,
          height: height,
          bmi: calculateBmi(height, weight)
      })
      } catch(error) {
          res.status(400)
          res.send({
              error: "malformatted parameters"
          })
      }
  }
})

interface bodyExercise {
  daily_exercises : Array<number>,
  target: number
}

app.post('/exercises', (req, res) => {
  const body = req.body as bodyExercise;
  const daily_exercises = body.daily_exercises;
  const targetR = body.target;
  if(!daily_exercises || !targetR) {
      res.status(400);
      res.send({
          error: "missing parameters"
      });
  } else {
      try{
      const {target, exerciseHours} = parseArguments(
          daily_exercises,
          Number(targetR)
      );
      res.send(calculateExercises(target, exerciseHours));
      } catch(error) {
          res.status(400);
          res.send({
              error: "malformatted parameters"
          });
      }
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});