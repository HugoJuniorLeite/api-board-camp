import { Router } from "express";

import { insertRentals, listRentals } from "../controllers/rentals.controler.js";

const rentalsRouter = Router()


rentalsRouter.get("/rentals", listRentals);
rentalsRouter.post("/rentals",insertRentals);

export default rentalsRouter;