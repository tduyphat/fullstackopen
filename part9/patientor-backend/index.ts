import express from 'express';
import cors from 'cors';

import diagnosesRouter from './router/diagnoses';
import patientsRouter from './router/patients';

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('build'));
const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('pinged');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});