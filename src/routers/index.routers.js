
import { Router } from "express";
import gamesRouters from "./games.routers.js";
import customersRouter from "./customers.routers.js";


const router = Router();

router.use(gamesRouters, customersRouter);


export default router;  