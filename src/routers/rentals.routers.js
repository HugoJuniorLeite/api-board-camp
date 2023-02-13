import { Router } from "express";

import { insertRentals, listRentals } from "../controllers/rentals.controler.js";



import { validateSchema } from "../middlewares/validadeSchema.js";
import { newRentalSchema } from "../schemas/newRentalSchema.js";


const rentalsRouter = Router()


rentalsRouter.get("/rentals", listRentals);
rentalsRouter.post("/rentals",validateSchema(newRentalSchema), insertRentals);

export default rentalsRouter;