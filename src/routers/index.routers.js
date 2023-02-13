
import { Router } from "express";
import gamesRouters from "./games.routers.js";
import customersRouter from "./customers.routers.js";
import rentalsRouter from "./rentals.routers.js";


const router = Router();

router.use(gamesRouters, customersRouter, rentalsRouter);

export default router;  