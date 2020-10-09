import { Response, Request } from 'express';
import axios from 'axios';
import { Job, DoneCallback } from 'kue';

const kue = require('kue');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const queue = kue.createQueue({
  prefix: 'q',
  redis: {
    port: 6379,
    host: 'redis',
  },
});

app.get('/', (req: Request, res: Response) => {
  for (let i = 1; i <= 10; i++) {
    queue
      .create('element to process', {
        title: 'This testing request',
        data: i,
      })
      .priority('high')
      .save();
  }
  res.send('Hey :)');
});

queue.process('element to process', (job: Job, done: DoneCallback) => {
  axios
    .get('https://jsonplaceholder.typicode.com/todos/' + job.data.data)
    .then((result) => {
      console.log(result.data);
      done();
      return result.data;
    })
    .catch((error) => done(error));
});

app.use('/kue-api/', kue.app);

app.listen(PORT, () => console.log(`The app is listening on port ${PORT}!`));
