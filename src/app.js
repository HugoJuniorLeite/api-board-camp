import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import routers from './routers/index.routers.js';
//import gamesRouter from './routers/games.routers.js';
//import customersRouter from './routers/customers.routers.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routers);
//app.use([gamesRouter,customersRouter])

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`sever rodando na porta ${port}`));
