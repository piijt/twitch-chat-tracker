import express from 'express';
import {index} from './routes'

export const app = express();
app.use(express.json({limit: '256mb'}))
app.set('port', 1337);
app.set('host', 'localhost');
app.use(index);
